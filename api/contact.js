import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function — Contact Form
 * POST /api/contact
 *
 * Sends the contact-form payload as a formatted HTML email to info@thexdge.com
 * via IONOS SMTP. All credentials live in Vercel environment variables.
 */

const ALLOWED_ORIGINS = [
  'https://thexdge.com',
  'https://www.thexdge.com',
  'http://localhost:5173',
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, guardian, email, phone, location, age, message, programmes, methods, website } = req.body;

  if (website) {
    return res.status(200).json({ success: true });
  }

  const emailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  if (!name || !email || !emailOk) {
    return res.status(400).json({ error: 'Name and a valid email are required.' });
  }

  // Build a clean HTML email
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
      <div style="background: #000; padding: 24px 32px; text-align: center;">
        <h1 style="color: #20E3E8; margin: 0; font-size: 22px; letter-spacing: 0.04em;">XDGE — New Contact Enquiry</h1>
      </div>
      <div style="padding: 32px; background: #f9f9f9; border: 1px solid #e5e5e5;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; width: 40%; vertical-align: top;">Name</td>
            <td style="padding: 10px 12px;">${escapeHtml(name)}</td>
          </tr>
          ${guardian ? `<tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Parent / Guardian</td>
            <td style="padding: 10px 12px;">${escapeHtml(guardian)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Email</td>
            <td style="padding: 10px 12px;"><a href="mailto:${escapeHtml(email)}" style="color: #2146E8;">${escapeHtml(email)}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Phone</td>
            <td style="padding: 10px 12px;">${escapeHtml(phone)}</td>
          </tr>` : ''}
          ${location ? `<tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Location</td>
            <td style="padding: 10px 12px;">${escapeHtml(location)}</td>
          </tr>` : ''}
          ${age ? `<tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Participant Age</td>
            <td style="padding: 10px 12px;">${escapeHtml(age)}</td>
          </tr>` : ''}
          ${programmes && programmes.length ? `<tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Programmes</td>
            <td style="padding: 10px 12px;">${programmes.map(escapeHtml).join(', ')}</td>
          </tr>` : ''}
          ${methods && methods.length ? `<tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Preferred Contact</td>
            <td style="padding: 10px 12px;">${methods.map(escapeHtml).join(', ')}</td>
          </tr>` : ''}
          ${message ? `<tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; vertical-align: top;">Message</td>
            <td style="padding: 10px 12px; white-space: pre-wrap;">${escapeHtml(message)}</td>
          </tr>` : ''}
        </table>
      </div>
      <div style="padding: 16px 32px; font-size: 12px; color: #999; text-align: center;">
        Sent from the XDGE website contact form
      </div>
    </div>
  `;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO) {
    console.error('Missing SMTP environment variables:', {
      host: !!process.env.SMTP_HOST,
      port: !!process.env.SMTP_PORT,
      user: !!process.env.SMTP_USER,
      pass: !!process.env.SMTP_PASS,
      to: !!process.env.CONTACT_TO
    });
    return res.status(500).json({ error: 'Server mail configuration is incomplete. Please ensure Vercel environment variables are set and the app is redeployed.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // TLS on port 587 (STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"XDGE Website" <${process.env.SMTP_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to: process.env.CONTACT_TO,
      subject: `New Contact Enquiry — ${name}`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP error (contact):', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
