/**
 * Portfolio contact form handler
 * Deployed as an AWS Lambda function via SAM (lambda/template.yaml).
 *
 * Environment variables (set in SAM template / CodeBuild / SSM):
 *   TO_EMAIL            – recipient address (toniwallace97@outlook.com)
 *   FROM_EMAIL          – SES-verified sender (e.g. noreply@tonidocs.com OR the same address)
 *   TURNSTILE_SECRET_KEY – Cloudflare Turnstile secret (optional; set to "" to skip verification)
 *   ALLOWED_ORIGIN      – e.g. https://tonidocs.com (for CORS)
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.AWS_REGION ?? 'us-east-1' });

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? 'https://tonidocs.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

/** Simple rate-limiting via in-memory cache (resets on cold start — good enough for a portfolio). */
const recentRequests = new Map();
const RATE_LIMIT_MS = 60_000;   // window: 1 minute
const RATE_LIMIT_MAX = 3;       // max 3 submissions per IP per minute

function isRateLimited(ip) {
  const now = Date.now();
  const entry = recentRequests.get(ip) ?? { count: 0, first: now };

  if (now - entry.first > RATE_LIMIT_MS) {
    recentRequests.set(ip, { count: 1, first: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  recentRequests.set(ip, entry);
  return false;
}

/** Verify Cloudflare Turnstile token server-side */
async function verifyTurnstile(token) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // skip verification if not configured

  const body = new URLSearchParams({ secret, response: token }).toString();
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json();
  return data.success === true;
}

/** Simple HTML-escape to prevent injection in the email body */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const handler = async (event) => {
  // ── Preflight ──────────────────────────────────────────────────────────────
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid request.' }) };
  }

  const { name, email, message, honeypot, turnstileToken } = body;

  // ── Honeypot check (silent pass — don't reveal we noticed) ────────────────
  if (honeypot) {
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ success: true }) };
  }

  // ── Rate limiting ──────────────────────────────────────────────────────────
  const ip =
    event.requestContext?.identity?.sourceIp ??
    event.headers?.['X-Forwarded-For']?.split(',')[0]?.trim() ??
    'unknown';

  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Too many requests. Please wait a minute and try again.' }),
    };
  }

  // ── Input validation ───────────────────────────────────────────────────────
  if (!name?.trim() || name.trim().length < 2) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Name is required.' }) };
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Valid email is required.' }) };
  }
  if (!message?.trim() || message.trim().length < 10) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Message is required (min 10 characters).' }) };
  }

  // ── Turnstile verification ────────────────────────────────────────────────
  const turnstileOk = await verifyTurnstile(turnstileToken ?? '');
  if (!turnstileOk) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Security check failed. Please refresh and try again.' }),
    };
  }

  // ── Send email via SES ────────────────────────────────────────────────────
  const safeName    = esc(name.trim());
  const safeEmail   = esc(email.trim());
  const safeMessage = esc(message.trim()).replace(/\n/g, '<br>');

  try {
    await ses.send(new SendEmailCommand({
      Source: process.env.FROM_EMAIL,
      Destination: { ToAddresses: [process.env.TO_EMAIL] },
      ReplyToAddresses: [email.trim()],
      Message: {
        Subject: { Data: `Portfolio contact from ${name.trim()}`, Charset: 'UTF-8' },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Portfolio Contact</title></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0C0C0C">
  <h2 style="border-bottom:2px solid #FFE68C;padding-bottom:8px">New contact from portfolio</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:16px">
    <tr><td style="padding:8px 0;font-weight:bold;width:80px">Name</td><td>${safeName}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold">Email</td>
        <td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
  </table>
  <div style="margin-top:20px;background:#FAFAF8;border-left:4px solid #9DDCFF;padding:16px;border-radius:4px">
    <strong>Message:</strong><br><br>${safeMessage}
  </div>
  <p style="margin-top:24px;font-size:12px;color:#888">
    Sent via tonidocs.com contact form · IP ${esc(ip)}
  </p>
</body>
</html>`,
          },
          Text: {
            Charset: 'UTF-8',
            Data: `New contact from portfolio\n\nName: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}\n\n---\nSent via tonidocs.com`,
          },
        },
      },
    }));

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, message: 'Message sent! I\'ll be in touch soon.' }),
    };
  } catch (err) {
    console.error('SES send error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to send your message. Please try again or email me directly.' }),
    };
  }
};
