"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { hero, profile } from "@/config/profile";

/* Atelier-style easings */
const E_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const E_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const E_SWEEP: [number, number, number, number] = [0.76, 0, 0.24, 1];
const E_MENU: [number, number, number, number] = [0.25, 1, 0.5, 1];

/* Logo mark — stair-step squares (distinct geometric motif) */
const LOGO_SQUARES: Array<[number, number]> = [
  [0.0, 0.0],
  [10.8, 10.9],
  [21.6, 21.8],
  [37.2, 0.0],
  [37.2, 10.9],
  [37.2, 21.8],
  [48.0, 0.0],
];
const LOGO_DELAYS = [0.7, 0.735, 0.84, 0.91, 0.805, 0.945, 0.7];

const HEADLINE_LINES = ["BUILDING", "TECHNOLOGY", "MATTERS"];
const HEADLINE_DELAYS = [0.1, 0.18, 0.26];
const SERVICE_LABELS = [
  "Full-Stack Development",
  "AI Integration",
  "Data & Culture",
];
const SERVICE_DELAYS = [0.56, 0.62, 0.68];
const TAGLINE_LINES = [
  "Software engineering and AI systems.",
  "Rooted in Cameroon. Built with detail",
  "and technology.",
];
const TAGLINE_DELAYS = [0.78, 0.83, 0.88];

function Rise({
  children,
  delay,
  duration = 0.75,
  ease = E_QUINT,
  y = "105%",
  className,
  style,
}: {
  children: ReactNode;
  delay: number;
  duration?: number;
  ease?: [number, number, number, number];
  y?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      style={style}
      initial={reduce ? false : { y, opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </motion.span>
  );
}

export function Hero({ email }: { email: string }) {
  const reduce = useReducedMotion();

  const openMenu = () => window.dispatchEvent(new CustomEvent("au:menu"));

  return (
    <section id="home" className="au-hero" aria-label="Introduction">
      {/* ── Photo plate — never animates ── */}
      <div className="au-photo" aria-hidden="true">
        <img
          src={hero.photo.src}
          alt=""
          width={880}
          height={1100}
          fetchPriority="high"
        />
      </div>
      <div className="au-wash" aria-hidden="true" />

      {/* Thin amber arc behind the subject */}
      <svg
        className="au-arc"
        viewBox="0 0 300 110"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="au-arc-g" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e8a33d" stopOpacity="0" />
            <stop offset="0.5" stopColor="#e8a33d" />
            <stop offset="1" stopColor="#f2be6a" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M 8 104 Q 150 -46 292 104"
          stroke="url(#au-arc-g)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* ── Hairline grid — 48 columns, never animates ── */}
      <div className="au-grid" aria-hidden="true">
        {Array.from({ length: 48 }, (_, i) => (
          <i
            key={i}
            style={{ left: `calc(${(i + 0.75) / 48} * 100%)` }}
          />
        ))}
        <i className="au-grid-hi" />
      </div>

      {/* Bottom scrim for headline legibility */}
      <div className="au-scrim" aria-hidden="true" />

      {/* ── Top bar ── */}
      <a href="#home" className="au-logo" aria-label="Eric Banven — home">
        <svg viewBox="0 0 56.2 30" aria-hidden="true">
          {LOGO_SQUARES.map(([x, y], i) => (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width="8.2"
              height="8.2"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.14, ease: "easeOut", delay: LOGO_DELAYS[i] }}
            />
          ))}
        </svg>
        <motion.span
          className="au-logo-name au-small"
          initial={reduce ? false : { opacity: 0, y: "0.55em" }}
          animate={{ opacity: 1, y: "0em" }}
          transition={{ duration: 0.75, ease: E_QUINT, delay: 0.82 }}
        >
          Eric Banven
        </motion.span>
      </a>

      <p className="au-tagline au-small" aria-label={`${TAGLINE_LINES.join(" ")}`}>
        {TAGLINE_LINES.map((line, i) => (
          <span key={i} aria-hidden="true">
            <Rise delay={TAGLINE_DELAYS[i]}>{line}</Rise>
          </span>
        ))}
      </p>

      <address className="au-contact au-small">
        <span>
          <Rise delay={0.88}>
            <a href={`mailto:${email}`}>{email}</a>
          </Rise>
        </span>
        <span className="au-contact-loc">
          <Rise delay={0.93}>Yaoundé, Cameroon — Central Africa</Rise>
        </span>
        <span className="au-contact-avail">
          <Rise delay={0.98}>
            <span
              className="inline-block h-[0.5em] w-[0.5em] rounded-full animate-pulse-dot"
              style={{ background: "var(--color-electric)" }}
              aria-hidden="true"
            />
            {profile.availability}
          </Rise>
        </span>
      </address>

      <div className="au-actions au-small">
        <motion.a
          className="au-gh"
          href={profile.github.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub profile — ${profile.github.username}`}
          initial={reduce ? false : { opacity: 0, y: "0.55em" }}
          animate={{ opacity: 1, y: "0em" }}
          transition={{ duration: 0.6, ease: E_QUINT, delay: 0.98 }}
        >
          <Github className="h-[1.45em] w-[1.45em]" strokeWidth={1.6} aria-hidden="true" />
        </motion.a>
        <motion.button
          type="button"
          className="au-menu-btn"
          onClick={openMenu}
          aria-expanded={false}
          aria-haspopup="dialog"
          aria-label="Open navigation menu"
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.6, ease: E_MENU, delay: 1.02 }}
        >
          <span className="inline-block translate-y-[0em]">Menu</span>
        </motion.button>
      </div>

      {/* ── Services + rule ── */}
      <ul className="au-services au-small" aria-label="Disciplines">
        {SERVICE_LABELS.map((label, i) => (
          <li key={label}>
            <Rise delay={SERVICE_DELAYS[i]} duration={0.8} className="inline-block">
              {label}
            </Rise>
          </li>
        ))}
      </ul>
      <motion.div
        className="au-rule"
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.85, ease: E_SWEEP, delay: 0.24 }}
      />

      {/* ── Headline ── */}
      <h1 className="au-hl" aria-label="Building technology that matters.">
        {HEADLINE_LINES.map((line, i) => (
          <span key={line} className="au-hl-line" aria-hidden="true">
            <Rise delay={HEADLINE_DELAYS[i]} duration={1.05} ease={E_EXPO}>
              {line}
            </Rise>
          </span>
        ))}
      </h1>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="au-scroll au-small"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.35 }}
      >
        <span className="au-scroll-line" aria-hidden="true" />
        Scroll
      </motion.a>
    </section>
  );
}
