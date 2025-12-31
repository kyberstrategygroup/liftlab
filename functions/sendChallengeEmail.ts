import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Resend } from 'npm:resend';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { firstName, lastName, mobile, email, goal, preferredTime } = await req.json();

    console.log('Processing challenge application:', { firstName, lastName, email });

    const submissionDate = new Date().toLocaleString('en-US', { 
      timeZone: 'America/Toronto',
      dateStyle: 'full', 
      timeStyle: 'short' 
    });

    const htmlBody = `
      <h2>New 8-Week Challenge Application</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Biggest Goal in 8 Weeks:</strong> ${goal}</p>
      <p><strong>Preferred Time:</strong> ${preferredTime}</p>
      <br>
      <p><strong>Page Source:</strong> /8-week-challenge</p>
      <p><strong>Submission Date:</strong> ${submissionDate}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">This application was submitted through the LiftLab website.</p>
    `;

    console.log('Sending email via Resend...');
    const result = await resend.emails.send({
      from: 'LiftLab Website <contact@liftlab.ca>',
      to: 'contact@liftlab.ca',
      bcc: 'kyberstrategygroup@gmail.com',
      subject: 'New 8-Week Challenge Application',
      html: htmlBody
    });

    console.log('Resend result:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.error('Resend error:', result.error);
      return Response.json({ success: false, error: result.error.message }, { status: 500 });
    }

    return Response.json({ success: true, emailId: result.data?.id });
  } catch (error) {
    console.error('Function error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});