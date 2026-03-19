import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Resend } from 'npm:resend';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, phone, commitment, source_page } = await req.json();

    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'America/Toronto',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const htmlBody = `
      <h2>New LiftLab Lead Submission</h2>
      <p><strong>Full Name:</strong> ${name}</p>
      <p><strong>Email Address:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Commitment:</strong> ${commitment || 'Not provided'}</p>
      <br>
      <p><strong>Submitted From:</strong> ${source_page}</p>
      <p><strong>Submission Date:</strong> ${submissionDate}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">This lead was submitted through the LiftLab website.</p>
    `;

    await resend.emails.send({
      from: 'LiftLab Website <contact@liftlab.ca>',
      to: 'contact@liftlab.ca',
      bcc: 'kyberstrategygroup@gmail.com',
      subject: 'New LiftLab Lead – Schedule Consult',
      html: htmlBody
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});