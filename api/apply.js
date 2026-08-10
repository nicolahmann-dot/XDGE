import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function — Apply Form
 * POST /api/apply
 *
 * Sends the application-form payload as a formatted HTML email to info@thexdge.com
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

function renderList(arr) {
  if (!arr || !arr.length) return '<em style="color: #999;">None selected</em>';
  return `<ul style="margin: 0; padding-left: 20px;">${arr.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    guardianName, guardianEmail, guardianPhone,
    participantName, age, institution,
    programmes, achievements, achievementOther,
    goals12mo, goals5yr,
    format, source,
    website,
  } = req.body;

  if (website) {
    return res.status(200).json({ success: true });
  }

  if (!participantName) {
    return res.status(400).json({ error: 'Participant name is required.' });
  }

  if (guardianEmail) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(guardianEmail).trim());
    if (!emailOk) {
      return res.status(400).json({ error: 'Please provide a valid guardian email address.' });
    }
  }

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #222;">
      <div style="background: #000; padding: 24px 32px; text-align: center;">
        <h1 style="color: #20E3E8; margin: 0; font-size: 22px; letter-spacing: 0.04em;">XDGE — New Application</h1>
      </div>
      <div style="padding: 32px; background: #f9f9f9; border: 1px solid #e5e5e5;">

        <!-- Parent / Guardian -->
        ${guardianName ? `
        <h2 style="font-size: 16px; color: #555; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Parent / Guardian</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; width: 40%; vertical-align: top;">Name</td>
            <td style="padding: 8px 12px;">${escapeHtml(guardianName)}</td>
          </tr>
          ${guardianEmail ? `<tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">Email</td>
            <td style="padding: 8px 12px;"><a href="mailto:${escapeHtml(guardianEmail)}" style="color: #2146E8;">${escapeHtml(guardianEmail)}</a></td>
          </tr>` : ''}
          ${guardianPhone ? `<tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">Phone</td>
            <td style="padding: 8px 12px;">${escapeHtml(guardianPhone)}</td>
          </tr>` : ''}
        </table>
        ` : ''}

        <!-- Participant -->
        <h2 style="font-size: 16px; color: #555; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Participant</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; width: 40%; vertical-align: top;">Name</td>
            <td style="padding: 8px 12px;">${escapeHtml(participantName)}</td>
          </tr>
          ${age ? `<tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">Age</td>
            <td style="padding: 8px 12px;">${escapeHtml(age)}</td>
          </tr>` : ''}
          ${institution ? `<tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">Institution</td>
            <td style="padding: 8px 12px;">${escapeHtml(institution)}</td>
          </tr>` : ''}
        </table>

        <!-- Programmes -->
        <h2 style="font-size: 16px; color: #555; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Programme Interest</h2>
        <div style="padding: 8px 12px; margin-bottom: 24px; font-size: 15px;">${renderList(programmes)}</div>

        <!-- Achievements -->
        <h2 style="font-size: 16px; color: #555; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Goals — What They Want to Achieve</h2>
        <div style="padding: 8px 12px; margin-bottom: 12px; font-size: 15px;">${renderList(achievements)}</div>
        ${achievementOther ? `<div style="padding: 8px 12px; margin-bottom: 24px; font-size: 14px; color: #555; font-style: italic;">Other: ${escapeHtml(achievementOther)}</div>` : ''}

        <!-- Goals -->
        ${goals12mo || goals5yr ? `
        <h2 style="font-size: 16px; color: #555; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Goals Detail</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px; margin-bottom: 24px;">
          ${goals12mo ? `<tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; width: 40%; vertical-align: top;">Next 12 Months</td>
            <td style="padding: 8px 12px; white-space: pre-wrap;">${escapeHtml(goals12mo)}</td>
          </tr>` : ''}
          ${goals5yr ? `<tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">Next 5 Years</td>
            <td style="padding: 8px 12px; white-space: pre-wrap;">${escapeHtml(goals5yr)}</td>
          </tr>` : ''}
        </table>
        ` : ''}

        <!-- Format + Source -->
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          ${format && format.length ? `<tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; width: 40%; vertical-align: top;">Preferred Format</td>
            <td style="padding: 8px 12px;">${format.map(escapeHtml).join(', ')}</td>
          </tr>` : ''}
          ${source && source.length ? `<tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #555; vertical-align: top;">How They Found XDGE</td>
            <td style="padding: 8px 12px;">${source.map(escapeHtml).join(', ')}</td>
          </tr>` : ''}
        </table>
      </div>
      <div style="padding: 16px 32px; font-size: 12px; color: #999; text-align: center;">
        Sent from the XDGE website application form
      </div>
    </div>
  `;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO) {
    console.error('Missing SMTP environment variables in apply endpoint:', {
      host: !process.env.SMTP_HOST,
      user: !process.env.SMTP_USER,
      pass: !process.env.SMTP_PASS,
      to: !process.env.CONTACT_TO
    });
    return res.status(500).json({ error: 'Server mail configuration is incomplete. Please ensure Vercel environment variables are set and the app is redeployed.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const replyTo = guardianEmail
      ? `"${guardianName || 'Guardian'}" <${guardianEmail}>`
      : undefined;

    await transporter.sendMail({
      from: `"XDGE Website" <${process.env.SMTP_USER}>`,
      ...(replyTo && { replyTo }),
      to: process.env.CONTACT_TO,
      subject: `New Application — ${participantName}${age ? ` (Age ${age})` : ''}`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP error (apply):', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
