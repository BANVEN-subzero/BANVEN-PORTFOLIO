import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { buildContactEmail, getContactConfig } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* ── Input validation ──────────────────────────────────────────────── */
const contactSchema = z.object({
  name: z
    .string()
    .transform((v) => v.trim().replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s+/g, " "))
    .pipe(z.string().min(2, "Please enter your name.").max(100, "Name is too long.")),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.string().email("Please enter a valid email address.").max(150)),
  subject: z
    .string()
    .transform((v) => v.trim().replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s+/g, " "))
    .pipe(z.string().min(2, "Please add a short subject.").max(150, "Subject is too long.")),
  message: z
    .string()
    .trim()
    .pipe(z.string().min(10, "Message is a little short.").max(5000, "Message is too long.")),
  /** Honeypot — must stay empty. */
  company: z.string().optional().default(""),
  /** Client render/first-interaction timestamp for the time trap. */
  startedAt: z.number().int().nonnegative().optional(),
});

/* ── Basic in-memory rate limiting (per IP) ──────────────────────────
 * Keeps things working on this single Node server. For a multi-instance
 * deployment, move this to Redis or similar.
 */
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  // Opportunistic cleanup
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return list.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

const fail = (
  code: "VALIDATION" | "RATE_LIMITED" | "NOT_CONFIGURED" | "SERVER",
  message: string,
  status: number,
  fieldErrors?: Record<string, string>
) =>
  NextResponse.json({ ok: false, code, message, ...(fieldErrors ? { fieldErrors } : {}) }, { status });

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("VALIDATION", "Invalid request body.", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return fail("VALIDATION", "Please review the highlighted fields.", 400, fieldErrors);
  }

  const data = parsed.data;

  // ── Spam defences ─────────────────────────────────────────────────
  // 1) Honeypot: pretend everything is fine, send nothing.
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true });
  }
  // 2) Time trap: humans take a few seconds to fill the form.
  if (typeof data.startedAt === "number" && Date.now() - data.startedAt < 2000) {
    return fail("RATE_LIMITED", "That was too fast — please try again in a moment.", 429);
  }
  // 3) Rate limit per IP.
  if (rateLimited(clientIp(req))) {
    return fail(
      "RATE_LIMITED",
      "Too many messages from this connection recently. Please try again in about 15 minutes.",
      429
    );
  }

  // ── Delivery configuration ────────────────────────────────────────
  const config = getContactConfig();
  if (!config.email) {
    return fail(
      "NOT_CONFIGURED",
      "Email delivery is not configured yet on the server (PORTFOLIO_EMAIL missing).",
      503
    );
  }
  if (!config.deliveryReady) {
    return fail(
      "NOT_CONFIGURED",
      "The contact form's email provider is not configured yet (missing RESEND_API_KEY), so the message was not sent.",
      503
    );
  }

  // ── Send via Resend ───────────────────────────────────────────────
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailContent = buildContactEmail({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    const { error } = await resend.emails.send({
      from: config.fromEmail,
      to: [config.email],
      replyTo: `${data.name} <${data.email}>`,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    if (error) {
      console.error("[contact] Resend provider error:", error);
      return fail(
        "SERVER",
        "The email provider rejected the message. Please try again shortly or reach me on GitHub.",
        502
      );
    }

    return NextResponse.json({ ok: true, deliveredAt: emailContent.timestamp });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return fail(
      "SERVER",
      "The message could not be delivered right now. Please try again shortly or reach me on GitHub.",
      502
    );
  }
}
