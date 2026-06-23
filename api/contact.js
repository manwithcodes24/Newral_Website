// Vercel Serverless Function — POST /api/contact
// Sends contact form data to tech@newral.in via Resend.
//
// Setup required:
//   1. Sign up at https://resend.com
//   2. Verify your domain (newral.in) under Domains
//   3. Create an API key and add it as Vercel env var: RESEND_API_KEY
//
// Local dev: create a .env file with RESEND_API_KEY=re_xxx
// (Vite will NOT load this file — it is only used by `vercel dev` serverless runtime)

export default async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', 'https://newral.in')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, source, stage, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' })
  }

  // Basic email format guard
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Email service not configured' })
  }

  const html = `
    <h2 style="font-family:sans-serif;color:#0F172A;">New enquiry from newral.in</h2>
    <table style="font-family:sans-serif;font-size:15px;color:#334155;border-collapse:collapse;width:100%;max-width:540px;">
      <tr><td style="padding:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;font-weight:600;width:130px;">Name</td><td style="padding:8px 12px;border:1px solid #E2E8F0;">${escHtml(name)}</td></tr>
      <tr><td style="padding:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;font-weight:600;">Email</td><td style="padding:8px 12px;border:1px solid #E2E8F0;">${escHtml(email)}</td></tr>
      ${source ? `<tr><td style="padding:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;font-weight:600;">How they found us</td><td style="padding:8px 12px;border:1px solid #E2E8F0;">${escHtml(source)}</td></tr>` : ''}
      ${stage ? `<tr><td style="padding:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;font-weight:600;">Project stage</td><td style="padding:8px 12px;border:1px solid #E2E8F0;">${escHtml(stage)}</td></tr>` : ''}
      <tr><td style="padding:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;font-weight:600;vertical-align:top;">Message</td><td style="padding:8px 12px;border:1px solid #E2E8F0;white-space:pre-wrap;">${escHtml(message)}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:13px;color:#94A3B8;margin-top:24px;">Sent from the contact form at newral.in</p>
  `

  try {
    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Newral Website <noreply@newral.in>',
        to: ['tech@newral.in'],
        reply_to: email,
        subject: `New enquiry from ${name} — newral.in`,
        html,
      }),
    })

    if (!sendRes.ok) {
      const err = await sendRes.text()
      console.error('Resend error:', err)
      return res.status(502).json({ error: 'Failed to send email. Please try again.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Server error. Please try again.' })
  }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
