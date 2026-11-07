/**
 * Server-side contact/email configuration.
 * Single source of truth = environment variables (see .env / .env.example).
 * NOTE: this module must only be imported from server code (API routes / server components).
 */

export type ContactConfig = {
  /** Destination inbox for portfolio messages (PORTFOLIO_EMAIL). */
  email: string | null;
  /** Verified "from" address (CONTACT_FROM_EMAIL) — falls back to Resend's testing sender. */
  fromEmail: string;
  /** Whether a Resend API key is present. */
  deliveryReady: boolean;
};

export function getContactConfig(): ContactConfig {
  const email = (process.env.PORTFOLIO_EMAIL ?? "").trim() || null;
  const fromEmail =
    (process.env.CONTACT_FROM_EMAIL ?? "").trim() || "Portfolio Contact <onboarding@resend.dev>";
  const deliveryReady = Boolean((process.env.RESEND_API_KEY ?? "").trim());
  return { email, fromEmail, deliveryReady };
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export function buildContactEmail(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const timestamp = new Date().toISOString();
  const subject = `New Portfolio Message — ${input.name}`.replace(/[\r\n]+/g, " ").slice(0, 200);

  const rows: Array<[string, string]> = [
    ["Visitor name", input.name],
    ["Visitor email", input.email],
    ["Subject", input.subject],
    ["Submitted (UTC)", timestamp],
  ];

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#0a0f1c;font-family:Segoe UI,Arial,sans-serif;color:#e6ebf5;">
  <div style="max-width:560px;margin:0 auto;background:#101828;border:1px solid #1f2a44;border-radius:14px;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#1d4ed8,#7c3aed);padding:18px 24px;">
      <h1 style="margin:0;font-size:16px;color:#fff;">New Portfolio Message</h1>
      <p style="margin:4px 0 0;font-size:12px;color:#dbe3f4;">Nyuydze Banven Eric Junior — portfolio contact form</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 24px;color:#8ea0bd;width:130px;vertical-align:top;">${k}</td><td style="padding:10px 24px 10px 0;color:#e6ebf5;">${escapeHtml(v)}</td></tr>`
        )
        .join("")}
      <tr><td style="padding:10px 24px;color:#8ea0bd;vertical-align:top;">Message</td>
      <td style="padding:10px 24px 20px 0;color:#e6ebf5;white-space:pre-wrap;line-height:1.65;">${escapeHtml(
        input.message
      )}</td></tr>
    </table>
    <div style="padding:14px 24px;border-top:1px solid #1f2a44;font-size:11px;color:#667799;">
      Reply directly to this email to answer the visitor (reply-to is set to their address).
    </div>
  </div>
</body></html>`;

  const text = [
    "NEW PORTFOLIO MESSAGE",
    "",
    `Visitor name: ${input.name}`,
    `Visitor email: ${input.email}`,
    `Subject: ${input.subject}`,
    `Submitted (UTC): ${timestamp}`,
    "",
    "Message:",
    input.message,
    "",
    "— Reply directly to this email to answer the visitor.",
  ].join("\n");

  return { subject, html, text, timestamp };
}
