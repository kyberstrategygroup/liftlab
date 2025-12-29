import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

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

async function getAvailability(base44, { date }) {
    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");
    
    // Parse date and get day boundaries in Toronto timezone
    const targetDate = new Date(date);
    const timeMin = new Date(targetDate);
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date(targetDate);
    timeMax.setHours(23, 59, 59, 999);

    // Fetch events from Google Calendar
    const calendarResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
        `timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true`,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    );

    if (!calendarResponse.ok) {
        throw new Error('Failed to fetch calendar events');
    }

    const calendarData = await calendarResponse.json();
    const bookedSlots = calendarData.items.map(event => ({
        start: event.start.dateTime,
        end: event.end.dateTime
    }));

    // Generate available slots (9 AM - 8 PM, 30-min slots, 10-min buffer)
    const availableSlots = generateTimeSlots(targetDate, bookedSlots);

    return Response.json({ availableSlots });
}

function generateTimeSlots(date, bookedSlots) {
    const slots = [];
    const dayOfWeek = date.getDay();
    
    // Working hours: Mon-Fri 9 AM - 8 PM, Sat-Sun 10 AM - 6 PM
    let startHour = (dayOfWeek >= 1 && dayOfWeek <= 5) ? 9 : 10;
    let endHour = (dayOfWeek >= 1 && dayOfWeek <= 5) ? 20 : 18;

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const slotStart = new Date(date);
            slotStart.setHours(hour, minute, 0, 0);
            
            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotEnd.getMinutes() + 30);

            // Check if slot conflicts with booked times (including 10-min buffer)
            const hasConflict = bookedSlots.some(booked => {
                const bookedStart = new Date(booked.start);
                const bookedEnd = new Date(booked.end);
                
                // Add 10-min buffer
                bookedStart.setMinutes(bookedStart.getMinutes() - 10);
                bookedEnd.setMinutes(bookedEnd.getMinutes() + 10);

                return (slotStart < bookedEnd && slotEnd > bookedStart);
            });

            // Only include future slots
            if (!hasConflict && slotStart > new Date()) {
                slots.push(slotStart.toISOString());
            }
        }
    }

    return slots;
}

async function createBooking(base44, { serviceType, clientName, clientEmail, clientPhone, appointmentDate, notes }) {
    const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");
    
    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);

    // Create Google Calendar event
    const event = {
        summary: `LiftLab ${serviceType} – ${clientName}`,
        description: `Client: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nService: ${serviceType}${notes ? `\n\nNotes: ${notes}` : ''}`,
        start: {
            dateTime: startTime.toISOString(),
            timeZone: 'America/Toronto'
        },
        end: {
            dateTime: endTime.toISOString(),
            timeZone: 'America/Toronto'
        },
        location: 'LiftLab, 123 Main St, Toronto, ON',
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 60 }
            ]
        }
    };

    const calendarResponse = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }
    );

    if (!calendarResponse.ok) {
        const errorText = await calendarResponse.text();
        throw new Error(`Failed to create calendar event: ${errorText}`);
    }

    const calendarEvent = await calendarResponse.json();

    // Save booking to database
    const booking = await base44.asServiceRole.entities.Booking.create({
        service_type: serviceType,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        appointment_date: appointmentDate,
        duration_minutes: 30,
        google_calendar_event_id: calendarEvent.id,
        status: 'confirmed',
        notes: notes || ''
    });

    // Generate iCal file content
    const icsContent = generateICS({
        summary: event.summary,
        description: event.description,
        location: event.location,
        start: startTime,
        end: endTime,
        organizer: 'LiftLab'
    });

    // Send confirmation email
    await base44.asServiceRole.integrations.Core.SendEmail({
        from_name: 'LiftLab',
        to: clientEmail,
        subject: `Booking Confirmed: ${serviceType} on ${startTime.toLocaleDateString()}`,
        body: `
Hi ${clientName},

Your ${serviceType} at LiftLab has been confirmed!

📅 Date: ${startTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
⏰ Time: ${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Toronto' })} EST
📍 Location: LiftLab, 123 Main St, Toronto, ON
⏱️ Duration: 30 minutes

What to expect:
• Arrive 5 minutes early
• Wear comfortable athletic clothing
• Bring a water bottle
• Be ready to discuss your fitness goals

Add to your calendar:
🔗 Google Calendar: ${calendarEvent.htmlLink}

We've attached an .ics file so you can add this to Apple Calendar or any other calendar app.

Questions? Reply to this email or call us at (123) 456-7890.

See you soon!
The LiftLab Team
        `
    });

    return Response.json({
        success: true,
        booking,
        googleCalendarLink: calendarEvent.htmlLink,
        icsContent
    });
}

function generateICS({ summary, description, location, start, end, organizer }) {
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LiftLab//Booking System//EN
BEGIN:VEVENT
UID:${Date.now()}@liftlab.ca
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:${summary}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
LOCATION:${location}
ORGANIZER;CN=${organizer}:MAILTO:contact@liftlab.ca
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
}