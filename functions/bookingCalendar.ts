import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import ICAL from 'npm:ical.js@2.1.0';

const ICAL_URL = 'https://calendar.google.com/calendar/ical/9a1a1c7fc5a02f07c4b1d037f59bce3affddf48b41afb8ca7b3cfc887977b3e3%40group.calendar.google.com/public/basic.ics';

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
    try {
        // Fetch booked events from public iCal feed
        const response = await fetch(ICAL_URL);
        const icalData = await response.text();
        
        const jcalData = ICAL.parse(icalData);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');
        
        const bookedSlots = vevents.map(vevent => {
            const event = new ICAL.Event(vevent);
            return {
                start: event.startDate.toJSDate().toISOString(),
                end: event.endDate.toJSDate().toISOString()
            };
        });

        // Parse target date
        const targetDate = new Date(date);
        
        // Generate available slots (9 AM - 8 PM, 30-min slots, 10-min buffer)
        const availableSlots = generateTimeSlots(targetDate, bookedSlots);

        return Response.json({ availableSlots });
    } catch (error) {
        console.error('Error fetching iCal:', error);
        // Fallback to empty booked slots if iCal fetch fails
        const targetDate = new Date(date);
        const availableSlots = generateTimeSlots(targetDate, []);
        return Response.json({ availableSlots });
    }
}

function generateTimeSlots(date, bookedSlots) {
    const slots = [];
    const dayOfWeek = date.getDay();

    let startHour = new Date().getTimezoneOffset() == 300 ? 5 : 4;
    let endHour = new Date().getTimezoneOffset() == 300 ? 29 : 28;
    console.log("FRONTEND LOG", "TESTING TESTING TESTING")

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

    const eventSummary = `LiftLab ${serviceType} – ${clientName}`;
    const eventDescription = `Client: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nService: ${serviceType}${notes ? `\n\nNotes: ${notes}` : ''}`;
    const location = 'Phone Consultation';

    // Create Google Calendar event
    const event = {
        summary: eventSummary,
        description: eventDescription,
        start: {
            dateTime: startTime.toISOString(),
            timeZone: 'America/Toronto'
        },
        end: {
            dateTime: endTime.toISOString(),
            timeZone: 'America/Toronto'
        },
        location: location,
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 60 }
            ]
        }
    };

    const calendarResponse = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/9a1a1c7fc5a02f07c4b1d037f59bce3affddf48b41afb8ca7b3cfc887977b3e3@group.calendar.google.com/events',
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
        summary: eventSummary,
        description: eventDescription,
        location: location,
        start: startTime,
        end: endTime,
        organizer: 'LiftLab'
    });

    // Send confirmation email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 'LiftLab <contact@liftlab.ca>',
            to: clientEmail,
            subject: `Phone Consultation Confirmed: ${serviceType} on ${startTime.toLocaleDateString()}`,
            text: `Hi ${clientName},

    Your phone consultation with LiftLab has been confirmed!

    📅 Date: ${startTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    ⏰ Time: ${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Toronto' })} EST
    📞 Format: Phone Call
    ⏱️ Duration: 30 minutes

    What to expect:
    • We'll call you at ${clientPhone} at the scheduled time
    • Have your schedule ready if you want to book training sessions
    • Be ready to discuss your fitness goals and training history
    • Feel free to ask any questions about our programs

    Add this appointment to your calendar using the .ics file attachment.

    Questions? Reply to this email or call us at (613) 627-3054.

    Talk to you soon!
    The LiftLab Team`,
            attachments: [
                {
                    filename: 'liftlab-appointment.ics',
                    content: btoa(unescape(encodeURIComponent(icsContent)))
                }
            ]
        })
    });

    if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        console.error('Failed to send email:', errorText);
    }

    // Send notification email to LiftLab
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 'LiftLab Bookings <contact@liftlab.ca>',
            to: 'contact@liftlab.ca',
            subject: `New Booking: ${serviceType} - ${clientName}`,
            text: `New booking received:

Client: ${clientName}
Email: ${clientEmail}
Phone: ${clientPhone}
Service: ${serviceType}
Date: ${startTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Toronto' })} EST

${notes ? `Notes: ${notes}` : 'No notes provided'}

View in Google Calendar: ${calendarEvent.htmlLink}`
        })
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