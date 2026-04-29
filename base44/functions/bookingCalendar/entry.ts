import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const CAL_1 = '7e2797a656fa7730ccac060877626de31b0a05d2c53b42eeeb49f6a3a295a474@group.calendar.google.com';
const CAL_2 = 'a00464030248694c2d26fa507db36d4ff1cf1ed23cf856f6af27744058991ee7@group.calendar.google.com';
const TZ = 'America/Toronto';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { action, ...params } = await req.json();

        if (action === 'getAvailability') {
            return await getAvailability(base44, params);
        } else if (action === 'createBooking') {
            return await createBooking(base44, params);
        }

        return Response.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});

async function getAccessToken(base44) {
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');
    return accessToken;
}

async function getAvailability(base44, { date }) {
    const accessToken = await getAccessToken(base44);

    // Build a time window for the selected date in Toronto time
    // We'll query the full day 6am-10pm Toronto
    const dateObj = new Date(date + 'T00:00:00');
    
    // timeMin = 6am Toronto, timeMax = 10pm Toronto
    const timeMin = torontoToUTC(date, 6, 0);
    const timeMax = torontoToUTC(date, 22, 0);

    // Use FreeBusy API to get busy times for both calendars
    const freeBusyBody = {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: TZ,
        items: [
            { id: CAL_1 },
            { id: CAL_2 }
        ]
    };

    const fbRes = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(freeBusyBody)
    });

    if (!fbRes.ok) {
        const err = await fbRes.text();
        throw new Error(`FreeBusy API error: ${err}`);
    }

    const fbData = await fbRes.json();

    // Collect all busy intervals from both calendars
    const busyIntervals = [];
    for (const calId of [CAL_1, CAL_2]) {
        const cal = fbData.calendars?.[calId];
        if (cal?.busy) {
            for (const b of cal.busy) {
                busyIntervals.push({ start: new Date(b.start), end: new Date(b.end) });
            }
        }
    }

    // Generate 30-min slots from 6am to 9:30pm Toronto
    const slots = [];
    const slotStart = torontoToUTC(date, 6, 0);
    const slotEnd = torontoToUTC(date, 22, 0);
    const now = new Date();

    let cursor = new Date(slotStart);
    while (cursor < slotEnd) {
        const end = new Date(cursor.getTime() + 30 * 60 * 1000);

        // Skip past slots
        if (cursor <= now) {
            cursor = end;
            continue;
        }

        // Check conflict with busy intervals (10-min buffer)
        const conflict = busyIntervals.some(b => {
            const bufStart = new Date(b.start.getTime() - 10 * 60 * 1000);
            const bufEnd = new Date(b.end.getTime() + 10 * 60 * 1000);
            return cursor < bufEnd && end > bufStart;
        });

        if (!conflict) {
            slots.push(cursor.toISOString());
        }

        cursor = end;
    }

    return Response.json({ availableSlots: slots });
}

async function createBooking(base44, { firstName, lastName, clientEmail, clientPhone, preferredLabTech, appointmentDate, notes }) {
    const accessToken = await getAccessToken(base44);
    const clientName = `${firstName} ${lastName}`.trim();

    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

    // Double-check slot is still free via FreeBusy
    const checkBody = {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        timeZone: TZ,
        items: [{ id: CAL_1 }, { id: CAL_2 }]
    };
    const checkRes = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(checkBody)
    });
    if (checkRes.ok) {
        const checkData = await checkRes.json();
        for (const calId of [CAL_1, CAL_2]) {
            if ((checkData.calendars?.[calId]?.busy || []).length > 0) {
                return Response.json({ error: 'SLOT_TAKEN', message: 'This time slot is no longer available. Please choose another time.' }, { status: 409 });
            }
        }
    }

    const eventSummary = `LiftLab Consultation – ${clientName}`;
    const eventDescription = [
        `Full Name: ${clientName}`,
        `Email: ${clientEmail}`,
        `Phone: ${clientPhone}`,
        `Preferred Lab Tech: ${preferredLabTech || 'No preference'}`,
        notes ? `Notes: ${notes}` : '',
        `Source: LiftLab Website`
    ].filter(Boolean).join('\n');

    const event = {
        summary: eventSummary,
        description: eventDescription,
        start: { dateTime: startTime.toISOString(), timeZone: TZ },
        end: { dateTime: endTime.toISOString(), timeZone: TZ },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 60 }
            ]
        }
    };

    // Write to CAL_1 (primary booking calendar)
    const calRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CAL_1)}/events`,
        {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        }
    );

    if (!calRes.ok) {
        const errText = await calRes.text();
        throw new Error(`Failed to create calendar event: ${errText}`);
    }

    const calendarEvent = await calRes.json();

    // Save to Booking entity
    const booking = await base44.asServiceRole.entities.Booking.create({
        service_type: 'Consultation',
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        appointment_date: appointmentDate,
        duration_minutes: 30,
        google_calendar_event_id: calendarEvent.id,
        status: 'confirmed',
        notes: [preferredLabTech ? `Preferred Lab Tech: ${preferredLabTech}` : '', notes || ''].filter(Boolean).join('\n')
    });

    // Generate ICS
    const icsContent = generateICS({
        summary: eventSummary,
        description: eventDescription,
        start: startTime,
        end: endTime
    });

    // Confirmation email to client
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 'LiftLab <contact@liftlab.ca>',
            to: clientEmail,
            subject: `Consultation Confirmed – ${startTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: TZ })}`,
            text: `Hi ${firstName},

Your consultation with LiftLab has been confirmed!

📅 Date: ${startTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: TZ })}
⏰ Time: ${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TZ })} EST
📞 Format: Phone Call (we'll call you at ${clientPhone})
⏱️ Duration: 30 minutes
${preferredLabTech ? `👟 Preferred Lab Tech: ${preferredLabTech}` : ''}

What to expect:
• We'll discuss your goals and training history
• Have your schedule ready if you'd like to book sessions
• Feel free to ask anything about our programs

Questions? Email us at contact@liftlab.ca or call (613) 627-3054.

Talk soon,
The LiftLab Team`,
            attachments: [
                {
                    filename: 'liftlab-consultation.ics',
                    content: btoa(unescape(encodeURIComponent(icsContent)))
                }
            ]
        })
    });

    // Internal notification
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 'LiftLab Bookings <contact@liftlab.ca>',
            to: 'contact@liftlab.ca',
            subject: `New Consultation: ${clientName} – ${startTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: TZ })}`,
            text: `New consultation booked via LiftLab website:\n\n${eventDescription}\n\nDate: ${startTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: TZ })}\nTime: ${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TZ })} EST\n\nGoogle Calendar: ${calendarEvent.htmlLink}`
        })
    });

    return Response.json({
        success: true,
        booking,
        googleCalendarLink: calendarEvent.htmlLink,
        icsContent
    });
}

// Convert a local Toronto date+hour+minute to a UTC Date object
function torontoToUTC(dateStr, hour, minute) {
    // Use Intl to find what UTC offset Toronto has on this date
    const probe = new Date(`${dateStr}T12:00:00Z`);
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: TZ,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    }).formatToParts(probe);
    const get = (type) => parseInt(parts.find(p => p.type === type).value);
    const localHour = get('hour');
    const utcHour = probe.getUTCHours();
    let offsetHours = localHour - utcHour;
    if (offsetHours > 12) offsetHours -= 24;
    if (offsetHours < -12) offsetHours += 24;

    const d = new Date(`${dateStr}T00:00:00Z`);
    d.setUTCHours(hour - offsetHours, minute, 0, 0);
    return d;
}

function generateICS({ summary, description, start, end }) {
    const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LiftLab//Booking//EN
BEGIN:VEVENT
UID:${Date.now()}@liftlab.ca
DTSTAMP:${fmt(new Date())}
DTSTART:${fmt(start)}
DTEND:${fmt(end)}
SUMMARY:${summary}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
ORGANIZER;CN=LiftLab:MAILTO:contact@liftlab.ca
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
}