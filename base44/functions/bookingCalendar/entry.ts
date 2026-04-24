import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// The two Google Calendar IDs powering the appointment schedules
const CALENDARS = [
  {
    id: 'a00464030248694c2d26fa507db36d4ff1cf1ed23cf856f6af27744058991ee7@group.calendar.google.com',
    coach: 'Stephen Radecki'
  }//,
  // {
  //   id: 'info@rideaufitco.ca',
  //   coach: 'Ashley Howatt'
  // }
];

const TORONTO_TZ = 'America/Toronto';
const SLOT_DURATION_MINUTES = 30;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { action, ...params } = body;

    if (action === 'getAvailability') {
      return await getAvailability(base44, params);
    } else if (action === 'createBooking') {
      return await createBooking(base44, params);
    } else if (action === 'getCalendarIds') {
      return await getCalendarIds(base44);
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('bookingCalendar error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function getAuthHeader(base44) {
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');
  return { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };
}

// Helper: discover actual calendar IDs by listing calendars and finding appointment schedules
async function getCalendarIds(base44) {
  const headers = await getAuthHeader(base44);
  const res = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=250', { headers });
  const data = await res.json();
  return Response.json({ calendars: data.items || [] });
}

async function getAvailability(base44, { date, calendarIds }) {
  const headers = await getAuthHeader(base44);

  // Use the provided calendarIds or fall back to defaults
  const cals = calendarIds && calendarIds.length > 0
    ? calendarIds.map(id => ({ id, coach: 'Unknown' }))
    : CALENDARS;

  // Build day boundaries in Toronto time
  const dayStart = torontoMidnight(date);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  // Query freebusy for all calendars to find blocked times
  const freebusyBody = {
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    timeZone: TORONTO_TZ,
    items: cals.map(c => ({ id: c.id }))
  };

  const fbRes = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers,
    body: JSON.stringify(freebusyBody)
  });

  if (!fbRes.ok) {
    const err = await fbRes.text();
    console.error('FreeBusy error:', err);
    // Fallback: try to fetch events from each calendar
    return await getAvailabilityFromEvents(base44, headers, cals, dayStart, dayEnd);
  }

  const fbData = await fbRes.json();

  // Also fetch actual appointment schedule events to find available windows
  // Google Appointment Schedules create "Open appointment slots" as events with specific format
  const allSlots = [];
  
  for (const cal of cals) {
    const busyPeriods = (fbData.calendars?.[cal.id]?.busy) || [];
    const slots = await getSlotsForCalendar(headers, cal, dayStart, dayEnd, busyPeriods);
    allSlots.push(...slots);
  }

  // Sort by time and deduplicate
  allSlots.sort((a, b) => new Date(a.start) - new Date(b.start));
  const unique = deduplicateSlots(allSlots);

  return Response.json({ availableSlots: unique });
}

async function getSlotsForCalendar(headers, cal, dayStart, dayEnd, busyPeriods) {
  // Fetch all events for this calendar on this day to find appointment slot openings
  const eventsUrl = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal.id)}/events`);
  eventsUrl.searchParams.set('timeMin', dayStart.toISOString());
  eventsUrl.searchParams.set('timeMax', dayEnd.toISOString());
  eventsUrl.searchParams.set('singleEvents', 'true');
  eventsUrl.searchParams.set('maxResults', '250');

  const evRes = await fetch(eventsUrl.toString(), { headers });
  if (!evRes.ok) {
    console.error(`Events fetch error for ${cal.id}:`, await evRes.text());
    return [];
  }

  const evData = await evRes.json();
  const events = evData.items || [];

  // Look for appointment availability windows (Google creates "Open slots" or "Appointment slot" events)
  // These typically have eventType = 'outOfOffice' for blocks, or the schedule creates slot events
  // For appointment schedules, available slots appear as events with status='tentative' or specific titles
  // Also check for working hours / appointment slot openings
  
  // Strategy: generate 30-min slots within business hours, then remove busy ones
  // If we find appointment slot events, use those windows instead
  
  const appointmentSlotEvents = events.filter(e => 
    e.eventType === 'workingLocation' ||
    (e.summary && (
      e.summary.toLowerCase().includes('appointment') ||
      e.summary.toLowerCase().includes('available') ||
      e.summary.toLowerCase().includes('open')
    ))
  );

  let availableWindows = [];

  if (appointmentSlotEvents.length > 0) {
    // Use the appointment slot events as available windows
    availableWindows = appointmentSlotEvents.map(e => ({
      start: new Date(e.start.dateTime || e.start.date),
      end: new Date(e.end.dateTime || e.end.date)
    }));
  } else {
    // Fall back to generating slots within the appointment schedule's working hours
    // Default: 9 AM - 5 PM Toronto time, 30-min slots
    const windowStart = new Date(dayStart);
    const windowEnd = new Date(dayStart);
    setTorontoTime(windowStart, 9, 0);
    setTorontoTime(windowEnd, 17, 0);
    availableWindows = [{ start: windowStart, end: windowEnd }];
  }

  const slots = [];
  const now = new Date();

  for (const window of availableWindows) {
    const current = new Date(window.start);
    while (current < window.end) {
      const slotEnd = new Date(current);
      slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_DURATION_MINUTES);

      if (slotEnd > window.end) break;

      // Skip past slots
      if (current <= now) {
        current.setMinutes(current.getMinutes() + SLOT_DURATION_MINUTES);
        continue;
      }

      // Check against busy periods
      const isBusy = busyPeriods.some(busy => {
        const bs = new Date(busy.start);
        const be = new Date(busy.end);
        // 10-min buffer
        bs.setMinutes(bs.getMinutes() - 10);
        be.setMinutes(be.getMinutes() + 10);
        return current < be && slotEnd > bs;
      });

      if (!isBusy) {
        slots.push({
          start: current.toISOString(),
          end: slotEnd.toISOString(),
          calendarId: cal.id,
          coach: cal.coach
        });
      }

      current.setMinutes(current.getMinutes() + SLOT_DURATION_MINUTES);
    }
  }

  return slots;
}

// Fallback: use events API directly if FreeBusy fails
async function getAvailabilityFromEvents(base44, headers, cals, dayStart, dayEnd) {
  const allSlots = [];
  
  for (const cal of cals) {
    const slots = await getSlotsForCalendar(headers, cal, dayStart, dayEnd, []);
    allSlots.push(...slots);
  }

  allSlots.sort((a, b) => new Date(a.start) - new Date(b.start));
  return Response.json({ availableSlots: deduplicateSlots(allSlots) });
}

function deduplicateSlots(slots) {
  const seen = new Set();
  return slots.filter(slot => {
    const key = slot.start;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function torontoMidnight(dateStr) {
  // Parse YYYY-MM-DD and get midnight Toronto time as UTC
  const [year, month, day] = dateStr.split('-').map(Number);
  // Create date in Toronto timezone by formatting
  const dt = new Date(`${dateStr}T00:00:00`);
  // Use Intl to find the UTC equivalent of midnight in Toronto
  const torontoMidnightStr = new Intl.DateTimeFormat('sv-SE', {
    timeZone: TORONTO_TZ,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(dt);
  
  // Build the date at Toronto midnight
  // Simpler approach: use a fixed reference
  const utcDate = new Date(`${dateStr}T00:00:00`);
  // Get offset at that moment
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: TORONTO_TZ,
    hour: 'numeric',
    hour12: false,
    day: 'numeric'
  });
  
  // Just create the date directly
  const result = new Date(Date.UTC(year, month - 1, day, 5, 0, 0)); // 5 AM UTC = midnight EST (UTC-5)
  // Adjust for DST: Toronto is UTC-4 in summer, UTC-5 in winter
  // Use Intl to find actual offset
  const testDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const torontoHour = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: TORONTO_TZ,
    hour: 'numeric',
    hour12: false
  }).format(testDate));
  const utcOffset = 12 - torontoHour; // hours behind UTC
  
  return new Date(Date.UTC(year, month - 1, day, utcOffset, 0, 0));
}

function setTorontoTime(date, hour, minute) {
  // Set the date to a specific hour/minute in Toronto time
  // Get the date in Toronto
  const dateStr = new Intl.DateTimeFormat('sv-SE', {
    timeZone: TORONTO_TZ,
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(date);
  
  // Get UTC offset for Toronto at this date
  const testDate = new Date(`${dateStr}T12:00:00Z`);
  const torontoHour = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: TORONTO_TZ,
    hour: 'numeric',
    hour12: false
  }).format(testDate));
  const utcOffset = 12 - torontoHour;

  const [year, month, day] = dateStr.split('-').map(Number);
  const utcHour = hour + utcOffset;
  date.setTime(Date.UTC(year, month - 1, day, utcHour, minute, 0));
}

async function createBooking(base44, {
  firstName, lastName, clientEmail, clientPhone,
  preferredCoach, appointmentDate, slotEnd, calendarId, notes
}) {
  const headers = await getAuthHeader(base44);

  const clientName = `${firstName} ${lastName}`.trim();
  const startTime = new Date(appointmentDate);
  const endTime = slotEnd ? new Date(slotEnd) : new Date(startTime.getTime() + SLOT_DURATION_MINUTES * 60000);

  // Determine which calendar to write to
  let targetCalendarId = calendarId;
  if (!targetCalendarId) {
    // Default to first calendar if not specified
    targetCalendarId = CALENDARS[0].id;
  }

  const eventSummary = `LiftLab Consultation – ${clientName}`;
  const eventDescription = [
    `Full Name: ${clientName}`,
    `Email: ${clientEmail}`,
    `Phone: ${clientPhone}`,
    preferredCoach ? `Preferred Lab Tech: ${preferredCoach}` : null,
    notes ? `Notes: ${notes}` : null,
    `Source: LiftLab website`
  ].filter(Boolean).join('\n');

  const event = {
    summary: eventSummary,
    description: eventDescription,
    start: { dateTime: startTime.toISOString(), timeZone: TORONTO_TZ },
    end: { dateTime: endTime.toISOString(), timeZone: TORONTO_TZ },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 60 }
      ]
    },
    attendees: [{ email: clientEmail, displayName: clientName }]
  };

  const calRes = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(targetCalendarId)}/events`,
    { method: 'POST', headers, body: JSON.stringify(event) }
  );

  if (!calRes.ok) {
    const err = await calRes.text();
    throw new Error(`Failed to create Google Calendar event: ${err}`);
  }

  const calEvent = await calRes.json();

  // Save booking record to DB
  const booking = await base44.asServiceRole.entities.Booking.create({
    service_type: 'Consultation',
    client_name: clientName,
    client_email: clientEmail,
    client_phone: clientPhone,
    appointment_date: startTime.toISOString(),
    duration_minutes: SLOT_DURATION_MINUTES,
    google_calendar_event_id: calEvent.id,
    status: 'confirmed',
    notes: [preferredCoach ? `Preferred Lab Tech: ${preferredCoach}` : '', notes || ''].filter(Boolean).join('\n')
  });

  // Generate ICS
  const icsContent = generateICS({ summary: eventSummary, description: eventDescription, start: startTime, end: endTime });

  // Send confirmation email to client
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'LiftLab <contact@liftlab.ca>',
      to: clientEmail,
      subject: `Consultation Confirmed – ${startTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`,
      text: `Hi ${firstName},

Your consultation with LiftLab has been confirmed!

📅 Date: ${startTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
⏰ Time: ${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TORONTO_TZ })} EST
⏱️ Duration: ${SLOT_DURATION_MINUTES} minutes
${preferredCoach ? `👤 Lab Tech: ${preferredCoach}` : ''}

Questions? Reply to this email or call us at (613) 627-3054.

Talk to you soon!
The LiftLab Team`,
      attachments: [{ filename: 'liftlab-consultation.ics', content: btoa(unescape(encodeURIComponent(icsContent))) }]
    })
  });

  // Notify LiftLab
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'LiftLab Bookings <contact@liftlab.ca>',
      to: 'contact@liftlab.ca',
      subject: `New Consultation Booked – ${clientName}`,
      text: `New booking:\n\n${eventDescription}\n\nDate: ${startTime.toLocaleString('en-US', { timeZone: TORONTO_TZ })} EST\nCalendar Event: ${calEvent.htmlLink}`
    })
  });

  return Response.json({
    success: true,
    booking,
    googleCalendarLink: calEvent.htmlLink,
    icsContent
  });
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