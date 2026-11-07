"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Github,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useRef, useState } from "react";
import { contact, profile } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

type Status = "idle" | "sending" | "success" | "error";

type ErrorResponse = {
  ok: false;
  code: "VALIDATION" | "RATE_LIMITED" | "NOT_CONFIGURED" | "SERVER";
  message: string;
  fieldErrors?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitize(v: string) {
  // Trim + strip control characters (prevents header/control injection)
  return v.replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s+/g, " ").trim();
}

export function Contact({ email }: { email: string | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string; mailto?: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const startedAt = useRef<number>(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: { name: string; email: string; subject: string; message: string }) => {
    const errs: Record<string, string> = {};
    if (data.name.length < 2) errs.name = "Please enter your name (at least 2 characters).";
    if (!EMAIL_RE.test(data.email)) errs.email = "Please enter a valid email address.";
    if (data.subject.length < 2) errs.subject = "Please add a short subject.";
    if (data.message.length < 10) errs.message = "Your message is a little short — at least 10 characters.";
    if (data.message.length > 5000) errs.message = "Message is too long (max 5000 characters).";
    return errs;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return; // duplicate-submission guard

    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? "").trim(),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
    };

    const errs = validate(raw);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setFeedback({ tone: "error", text: "Please review the highlighted fields." });
      return;
    }

    setStatus("sending");
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...raw,
          name: sanitize(raw.name),
          subject: sanitize(raw.subject),
          company: String(fd.get("company") ?? ""), // honeypot
          startedAt: startedAt.current,
        }),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
        setFeedback({
          tone: "success",
          text: "Message sent — thank you! It has been delivered to my inbox; I'll reply to you directly.",
        });
        formRef.current?.reset();
        startedAt.current = Date.now();
      } else {
        const err = json as ErrorResponse;
        setStatus("error");
        if (err.code === "VALIDATION" && err.fieldErrors) {
          setFieldErrors(err.fieldErrors);
          setFeedback({ tone: "error", text: err.message });
        } else if (err.code === "RATE_LIMITED") {
          setFeedback({ tone: "error", text: err.message });
        } else if (err.code === "NOT_CONFIGURED") {
          // Honest fallback — offer a real mailto: link with the composed content
          const mailto = email
            ? `mailto:${email}?subject=${encodeURIComponent(`Portfolio: ${raw.subject}`)}&body=${encodeURIComponent(`${raw.message}\n\n— ${raw.name} (${raw.email})`)}`
            : undefined;
          setFeedback({
            tone: "error",
            text: err.message,
            mailto,
          });
        } else {
          setFeedback({ tone: "error", text: err.message || "Something went wrong. Please try again." });
        }
      }
    } catch {
      setStatus("error");
      setFeedback({
        tone: "error",
        text: "Network error — the message could not be sent. Please try again in a moment.",
      });
    }
  };

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API can be unavailable — fallback
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const inputCls = (hasErr: boolean) =>
    `w-full rounded-xl border bg-midnight/70 px-4 py-3 text-[14px] text-mist placeholder:text-dim transition-all duration-300 focus:border-electric/60 focus:outline-none focus:ring-2 focus:ring-electric/20 ${
      hasErr ? "border-red-400/60" : "border-line hover:border-silver/30"
    }`;

  return (
    <section id="contact" className="relative py-24 sm:py-28" aria-label="Contact">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(139,92,246,0.06),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="10"
          eyebrow="Contact"
          title={contact.title}
          description={contact.description}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left — direct channels */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              {email ? (
                <>
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent("Portfolio contact")}`}
                    className="card-hover group flex items-center gap-4 rounded-2xl border border-line bg-white/[0.03] p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/10 ring-1 ring-electric/25">
                      <Mail className="h-5 w-5 text-electric" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">
                        Email me
                      </span>
                      <span className="mt-0.5 block truncate text-[14px] font-semibold text-mist">
                        {email}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mist" />
                  </a>
                  <button
                    onClick={copyEmail}
                    className="card-hover group flex items-center gap-4 rounded-2xl border border-line bg-white/[0.03] p-5 text-left"
                    aria-live="polite"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-vio/10 ring-1 ring-vio/25">
                      {copied ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                      ) : (
                        <Copy className="h-5 w-5 text-vio" aria-hidden="true" />
                      )}
                    </span>
                    <span>
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">
                        Copy email address
                      </span>
                      <span className="mt-0.5 block text-[14px] font-semibold text-mist">
                        {copied ? "Copied to clipboard" : "Click to copy"}
                      </span>
                    </span>
                  </button>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-line bg-white/[0.02] p-5 text-[13px] leading-relaxed text-silver">
                  Direct email buttons appear here once <code className="font-mono text-electric-soft">PORTFOLIO_EMAIL</code>{" "}
                  is configured on the server (see README.md). The contact form already delivers messages securely.
                </div>
              )}

              <a
                href={profile.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex items-center gap-4 rounded-2xl border border-line bg-white/[0.03] p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-line">
                  <Github className="h-5 w-5 text-mist" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">
                    GitHub
                  </span>
                  <span className="mt-0.5 block truncate text-[14px] font-semibold text-mist">
                    github.com/{profile.github.username}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mist" />
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cy/10 ring-1 ring-cy/25">
                  <MapPin className="h-5 w-5 text-cy" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">
                    Location
                  </span>
                  <span className="mt-0.5 block text-[14px] font-semibold text-mist">
                    {profile.locationShort}
                  </span>
                </span>
              </div>

              <p className="mt-2 rounded-xl border border-line bg-white/[0.02] px-5 py-4 text-[12.5px] leading-relaxed text-silver">
                Messages sent through the form land directly in my inbox — I usually reply
                within a couple of days.
              </p>
            </div>
          </Reveal>

          {/* Right — the form */}
          <Reveal delay={0.12}>
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="card-hover rounded-3xl border border-line bg-white/[0.03] p-6 sm:p-8"
              aria-label="Contact form"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="mb-2 block text-[12.5px] font-medium text-silver">
                    Full name <span className="text-electric" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    placeholder="Your name"
                    className={inputCls(!!fieldErrors.name)}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "cf-name-err" : undefined}
                  />
                  {fieldErrors.name ? (
                    <p id="cf-name-err" className="mt-1.5 text-[11.5px] text-red-400">{fieldErrors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="cf-email" className="mb-2 block text-[12.5px] font-medium text-silver">
                    Email address <span className="text-electric" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={150}
                    placeholder="you@example.com"
                    className={inputCls(!!fieldErrors.email)}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "cf-email-err" : undefined}
                  />
                  {fieldErrors.email ? (
                    <p id="cf-email-err" className="mt-1.5 text-[11.5px] text-red-400">{fieldErrors.email}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="cf-subject" className="mb-2 block text-[12.5px] font-medium text-silver">
                  Subject <span className="text-electric" aria-hidden="true">*</span>
                </label>
                <input
                  id="cf-subject"
                  name="subject"
                  type="text"
                  maxLength={150}
                  placeholder="What is this about?"
                  className={inputCls(!!fieldErrors.subject)}
                  aria-invalid={!!fieldErrors.subject}
                  aria-describedby={fieldErrors.subject ? "cf-subject-err" : undefined}
                />
                {fieldErrors.subject ? (
                  <p id="cf-subject-err" className="mt-1.5 text-[11.5px] text-red-400">{fieldErrors.subject}</p>
                ) : null}
              </div>

              <div className="mt-5">
                <label htmlFor="cf-message" className="mb-2 block text-[12.5px] font-medium text-silver">
                  Message <span className="text-electric" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={6}
                  maxLength={5000}
                  placeholder="Tell me about the idea, opportunity or project…"
                  className={`${inputCls(!!fieldErrors.message)} resize-y`}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? "cf-message-err" : undefined}
                />
                {fieldErrors.message ? (
                  <p id="cf-message-err" className="mt-1.5 text-[11.5px] text-red-400">{fieldErrors.message}</p>
                ) : null}
              </div>

              {/* Honeypot — hidden from humans, catnip for bots */}
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label>
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-electric to-vio px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_40px_-12px_rgba(61,139,255,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(61,139,255,0.8)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              {/* Feedback */}
              <AnimatePresence>
                {feedback ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                    role="status"
                    aria-live="polite"
                  >
                    <div
                      className={`mt-5 rounded-xl border p-4 text-[13px] leading-relaxed ${
                        feedback.tone === "success"
                          ? "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-200"
                          : "border-amber-400/30 bg-amber-400/[0.07] text-amber-200"
                      }`}
                    >
                      <span className="flex items-start gap-2.5">
                        {feedback.tone === "success" ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        ) : (
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        )}
                        <span>
                          {feedback.text}
                          {feedback.mailto ? (
                            <>
                              {" "}
                              <a
                                href={feedback.mailto}
                                className="font-semibold underline underline-offset-2"
                              >
                                Email me directly instead
                              </a>{" "}
                              — your message will open in your mail app, already written.
                            </>
                          ) : null}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
