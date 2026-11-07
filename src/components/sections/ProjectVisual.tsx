"use client";

/**
 * Custom-designed HTML/CSS application mockups for each featured project.
 * These are hand-built UI concepts — deliberately NOT presented as real
 * application screenshots (each carries a "UI concept preview" tag).
 */

import { motion } from "framer-motion";
import {
  Compass,
  HeartPulse,
  Landmark,
  LineChart as LineChartIcon,
  Sparkles,
  Store,
  Wallet,
} from "lucide-react";

function ConceptTag() {
  return (
    <span className="absolute bottom-2.5 right-3 z-20 rounded-md border border-white/10 bg-midnight/80 px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-silver/80 backdrop-blur-sm">
      UI concept preview
    </span>
  );
}

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.04] px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="mx-auto flex max-w-[240px] items-center gap-1.5 rounded-md bg-midnight/80 px-3 py-1 font-mono text-[9px] text-silver/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
          {url}
        </span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* ── CULTIA ─────────────────────────────────────────── */
function CultiaMockup() {
  return (
    <BrowserChrome url="cultia-heritage.cm">
      <div className="grid h-full grid-cols-[45%_55%]">
        {/* Heritage panel */}
        <div className="relative overflow-hidden">
          <img
            src="/images/projects/cultia-heritage.webp"
            alt="Carved African wooden stool shown inside the CULTIA heritage stories panel"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-mist backdrop-blur-sm">
              <Landmark className="h-3 w-3" /> Heritage stories
            </span>
            <p className="mt-2 font-display text-[13px] font-semibold leading-snug text-white">
              The craft of the carve stool
            </p>
            <p className="mt-1 text-[10px] leading-snug text-silver">
              Symbolism & craft across Cameroonian chiefdoms
            </p>
          </div>
        </div>
        {/* App panel */}
        <div className="flex flex-col gap-2.5 bg-panel p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-500/80 to-orange-600/80 font-display text-[9px] font-bold text-white">
                C
              </span>
              <span className="font-display text-[11px] font-semibold text-mist">CULTIA</span>
            </div>
            <div className="hidden gap-1.5 sm:flex">
              {["Stories", "Quiz", "Progress"].map((t) => (
                <span key={t} className="rounded-md bg-white/[0.05] px-2 py-1 text-[8.5px] text-silver">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Ethnic groups chips */}
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dim">Ethnic groups</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {["Bamileke", "Beti", "Fulani", "Douala", "Bakweri"].map((g, i) => (
                <span
                  key={g}
                  className={`rounded-full px-2 py-0.5 text-[8.5px] ${
                    i === 0
                      ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30"
                      : "bg-white/[0.05] text-silver"
                  }`}
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* AI chat */}
          <div className="min-h-0 flex-1 space-y-2 overflow-hidden rounded-lg border border-white/[0.07] bg-midnight/70 p-2.5">
            <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-cy">
              <Sparkles className="h-2.5 w-2.5" /> Cultural AI assistant
            </div>
            <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-electric/20 px-2.5 py-1.5 text-[9px] leading-snug text-mist">
              Tell me about the Bamileke chiefdom traditions
            </div>
            <div className="w-fit max-w-[90%] rounded-lg rounded-bl-sm bg-white/[0.06] px-2.5 py-1.5 text-[9px] leading-snug text-silver">
              In the Bamileke chiefdoms, the Fon…{" "}
              <span className="inline-block h-2.5 w-[2px] animate-pulse bg-cy align-middle" />
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-dim">
              <span>Learning progress</span>
              <span className="text-amber-300">68%</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ── TRYONS ─────────────────────────────────────────── */
function TryonsMockup() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/10">
      {/* Photo backdrop */}
      <img
        src="/images/projects/tryons-concept.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-25"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-vio/25 via-midnight/70 to-midnight/90" />

      {/* Phone 1 — storefront */}
      <div className="absolute left-[7%] top-[9%] w-[38%] max-w-[210px] overflow-hidden rounded-[1.3rem] border border-white/15 bg-panel shadow-2xl">
        <div className="flex items-center justify-between bg-white/[0.05] px-3 py-2">
          <span className="flex items-center gap-1 font-display text-[9px] font-bold text-mist">
            <Store className="h-2.5 w-2.5 text-vio" /> TryOn Space
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-2.5">
          {["Sneakers", "Hoodie", "Blazer", "Cap"].map((p, i) => (
            <div key={p} className="rounded-lg bg-white/[0.05] p-1.5">
              <div
                className={`mb-1 h-9 rounded-md bg-gradient-to-br ${
                  ["from-electric/40 to-electric/10", "from-vio/40 to-vio/10", "from-cy/40 to-cy/10", "from-amber-500/40 to-amber-500/10"][i]
                }`}
              />
              <p className="text-[7.5px] font-medium text-mist">{p}</p>
              <p className="text-[7px] text-silver">
                <span className="sr-only">Price: </span>25,000 FCFA
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Phone 2 — AR try-on */}
      <div className="absolute bottom-[8%] right-[8%] w-[40%] max-w-[220px] overflow-hidden rounded-[1.3rem] border border-vio/40 bg-panel shadow-[0_20px_60px_-15px_rgba(139,92,246,0.45)]">
        <div className="flex items-center justify-between bg-white/[0.05] px-3 py-2">
          <span className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.14em] text-vio">
            AR preview
          </span>
          <span className="rounded-full bg-vio/20 px-1.5 py-0.5 text-[7px] font-semibold text-vio">
            LIVE
          </span>
        </div>
        {/* AR body frame */}
        <div className="relative mx-2.5 mb-2 h-[86px] overflow-hidden rounded-lg bg-gradient-to-b from-midnight to-panel ring-1 ring-vio/25">
          <div className="absolute left-1/2 top-2 h-6 w-6 -translate-x-1/2 rounded-full bg-gradient-to-br from-silver/40 to-silver/10" />
          <div className="absolute left-1/2 top-[34px] h-11 w-14 -translate-x-1/2 rounded-lg bg-gradient-to-br from-vio/50 to-electric/30 ring-1 ring-vio/40" />
          <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-midnight/80 px-2 py-0.5 text-[7px] text-mist">
            Medium Fit · 96% match
          </span>
        </div>
        <div className="px-2.5 pb-2.5">
          <div className="rounded-md bg-gradient-to-r from-vio to-electric py-1.5 text-center text-[8px] font-semibold text-white">
            Try this on
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── U-TRUST ────────────────────────────────────────── */
function UTrustMockup() {
  const txs = [
    { label: "Transport", amt: "-12,500", pos: false },
    { label: "Freelance payout", amt: "+85,000", pos: true },
    { label: "Groceries", amt: "-23,400", pos: false },
  ];
  return (
    <BrowserChrome url="utrust.finance">
      <div className="grid h-full grid-cols-[42%_58%] gap-3 bg-panel p-4">
        {/* Balance + donut */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-white/[0.07] bg-midnight/70 p-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dim">Total balance</p>
            <p className="mt-1 font-display text-lg font-bold text-mist">
              486,200 <span className="text-[10px] font-medium text-silver">FCFA</span>
            </p>
            <p className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-1.5 py-0.5 text-[7.5px] font-medium text-emerald-300">
              ▼ 8% vs last month
            </p>
          </div>
          {/* Donut */}
          <div className="flex min-h-0 flex-1 items-center justify-center rounded-xl border border-white/[0.07] bg-midnight/70 p-3">
            <svg viewBox="0 0 42 42" className="h-[92px] w-[92px]" role="img" aria-label="Spending distribution donut chart illustration">
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#1a2440" strokeWidth="6" />
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#3d8bff" strokeWidth="6" strokeDasharray="42 58" strokeDashoffset="25" strokeLinecap="round" />
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="30 70" strokeDashoffset="83" strokeLinecap="round" />
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#22d3ee" strokeWidth="6" strokeDasharray="16 84" strokeDashoffset="53" strokeLinecap="round" />
              <text x="21" y="23.5" textAnchor="middle" fontSize="6.5" fill="#edf2fb" fontWeight="600">Budget</text>
            </svg>
          </div>
        </div>
        {/* Transactions */}
        <div className="flex flex-col rounded-xl border border-white/[0.07] bg-midnight/70 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-mist">
              <Wallet className="h-3 w-3 text-electric" /> Recent expenses
            </span>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.15em] text-dim">FCFA</span>
          </div>
          <div className="mt-2 flex-1 space-y-1.5">
            {txs.map((t) => (
              <div key={t.label} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-1.5">
                <span className="flex items-center gap-1.5 text-[9px] text-silver">
                  <span className={`h-1.5 w-1.5 rounded-full ${t.pos ? "bg-emerald-400" : "bg-electric"}`} />
                  {t.label}
                </span>
                <span className={`font-mono text-[9px] ${t.pos ? "text-emerald-300" : "text-mist"}`}>
                  {t.amt}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <div className="flex justify-between font-mono text-[7.5px] uppercase tracking-[0.14em] text-dim">
              <span>Monthly budget</span><span className="text-cy">72%</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-electric to-cy" />
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ── MEDISCAN AI ────────────────────────────────────── */
function MediscanMockup() {
  return (
    <BrowserChrome url="mediscan-ai.health">
      <div className="flex h-full flex-col gap-2.5 bg-[#f4f8fb] p-4 text-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-200/70">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-cy to-teal-500">
              <HeartPulse className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="font-display text-[11px] font-bold text-slate-800">MediScan AI</span>
          </div>
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[7.5px] font-semibold uppercase tracking-wide text-teal-600 ring-1 ring-teal-200">
            Educational concept
          </span>
        </div>

        {/* Symptom input */}
        <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/70">
          <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Describe how you feel
          </p>
          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
            <span className="text-[9px] text-slate-400">Mild headache and fatigue since morning…</span>
            <span className="inline-block h-2.5 w-[2px] animate-pulse bg-cy" />
          </div>
        </div>

        {/* Info result */}
        <div className="min-h-0 flex-1 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/70">
          <div className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-teal-600">
            <Sparkles className="h-2.5 w-2.5" /> General information
          </div>
          <div className="mt-1.5 space-y-1.5">
            <div className="h-1.5 w-[92%] rounded-full bg-slate-100" />
            <div className="h-1.5 w-[80%] rounded-full bg-slate-100" />
            <div className="h-1.5 w-[86%] rounded-full bg-slate-100" />
          </div>
          <div className="mt-2.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[8px] leading-snug text-amber-700 ring-1 ring-amber-200">
            Preliminary information only — always consult a qualified healthcare professional.
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ── ANALYTICS ──────────────────────────────────────── */
function AnalyticsMockup() {
  const bars = [34, 58, 42, 71, 63, 88];
  return (
    <BrowserChrome url="youth-employment.analysis">
      <div className="grid h-full grid-cols-[38%_62%] gap-3 bg-panel p-4">
        {/* KPIs */}
        <div className="flex flex-col gap-2.5">
          {[
            { k: "Informal sector share", v: "Majority", tone: "text-electric" },
            { k: "Median job search span", v: "Extended", tone: "text-vio" },
            { k: "Forecast trend", v: "Modelled", tone: "text-cy" },
          ].map((c) => (
            <div key={c.k} className="flex-1 rounded-xl border border-white/[0.07] bg-midnight/70 p-2.5">
              <p className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-dim">{c.k}</p>
              <p className={`mt-1 font-display text-[13px] font-bold ${c.tone}`}>{c.v}</p>
            </div>
          ))}
        </div>
        {/* Chart */}
        <div className="flex flex-col rounded-xl border border-white/[0.07] bg-midnight/70 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-mist">
              <LineChartIcon className="h-3 w-3 text-cy" /> Employment pattern model
            </span>
            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-wider text-silver">
              Illustrative
            </span>
          </div>
          <div className="relative mt-2 min-h-0 flex-1">
            <svg viewBox="0 0 260 110" className="h-full w-full" preserveAspectRatio="none" role="img" aria-label="Illustrative bar and forecast line chart">
              {/* grid lines */}
              {[20, 45, 70, 95].map((y) => (
                <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="#1a2440" strokeWidth="1" />
              ))}
              {/* bars */}
              {bars.map((h, i) => (
                <rect
                  key={i}
                  x={14 + i * 40}
                  y={95 - h * 0.85}
                  width="22"
                  height={h * 0.85}
                  rx="3"
                  fill={i === bars.length - 1 ? "#22d3ee" : "#3d8bff"}
                  opacity={0.35 + i * 0.11}
                />
              ))}
              {/* forecast line */}
              <path
                d="M10 84 C 60 70, 90 58, 130 52 S 210 30, 252 22"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
              <circle cx="252" cy="22" r="3" fill="#8b5cf6" />
            </svg>
          </div>
          <div className="mt-1 flex justify-between font-mono text-[7px] uppercase tracking-[0.14em] text-dim">
            <span>Random Forest · forecast</span>
            <span className="text-vio">trend →</span>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ── LABVIEW ────────────────────────────────────────── */
function LabviewMockup() {
  const keys = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "=", "+"];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#12172b] shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.04] px-3.5 py-2">
        <span className="flex items-center gap-2 font-mono text-[9px] text-silver">
          <span className="h-2 w-2 rounded-sm bg-cy/80" />
          Quadratic Solver & Calculator — LabVIEW 2023
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[46%_54%] gap-3 p-3.5">
        {/* Calculator */}
        <div className="flex flex-col rounded-lg border border-white/[0.07] bg-midnight/70 p-2.5">
          <div className="rounded-md bg-black/40 px-2.5 py-2 text-right font-mono text-[11px] text-cy">
            1,024
          </div>
          <div className="mt-2 grid min-h-0 flex-1 grid-cols-4 gap-1.5">
            {keys.map((k) => (
              <span
                key={k}
                className={`flex items-center justify-center rounded-md text-[10px] font-semibold ${
                  ["÷", "×", "−", "+"].includes(k)
                    ? "bg-electric/15 text-electric-soft"
                    : k === "="
                      ? "bg-gradient-to-br from-electric to-vio text-white"
                      : "bg-white/[0.06] text-mist"
                }`}
              >
                {k}
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-1.5">
            {["MS", "MR", "M+"].map((m) => (
              <span key={m} className="flex-1 rounded-md bg-white/[0.04] py-1 text-center font-mono text-[8px] text-silver">
                {m}
              </span>
            ))}
          </div>
        </div>
        {/* Quadratic solver */}
        <div className="flex flex-col rounded-lg border border-white/[0.07] bg-midnight/70 p-2.5">
          <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-dim">
            <Compass className="h-2.5 w-2.5 text-cy" /> Quadratic roots — ax² + bx + c
          </div>
          <div className="mt-2 flex gap-1.5">
            {["a = 1", "b = −3", "c = 2"].map((v) => (
              <span key={v} className="flex-1 rounded-md bg-black/40 px-2 py-1 text-center font-mono text-[9px] text-mist">
                {v}
              </span>
            ))}
          </div>
          <div className="relative mt-2 min-h-0 flex-1 overflow-hidden rounded-md bg-black/30">
            <svg viewBox="0 0 200 90" className="h-full w-full" preserveAspectRatio="none" role="img" aria-label="Parabola graph crossing the x-axis at two roots">
              <line x1="0" y1="45" x2="200" y2="45" stroke="#2a3a5f" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="90" stroke="#2a3a5f" strokeWidth="1" />
              <path d="M 20 12 Q 100 128 180 12" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
              <circle cx="40" cy="45" r="3" fill="#8b5cf6" />
              <circle cx="160" cy="45" r="3" fill="#8b5cf6" />
            </svg>
          </div>
          <div className="mt-2 flex gap-1.5 font-mono text-[8.5px]">
            <span className="flex-1 rounded-md bg-vio/15 px-2 py-1 text-vio">x₁ = 1.00</span>
            <span className="flex-1 rounded-md bg-vio/15 px-2 py-1 text-vio">x₂ = 2.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Router ─────────────────────────────────────────── */
const registry = {
  cultia: { el: CultiaMockup, accent: "from-amber-500/20", icon: Landmark },
  tryons: { el: TryonsMockup, accent: "from-vio/20", icon: Store },
  utrust: { el: UTrustMockup, accent: "from-electric/20", icon: Wallet },
  mediscan: { el: MediscanMockup, accent: "from-cy/20", icon: HeartPulse },
  analytics: { el: AnalyticsMockup, accent: "from-cy/20", icon: LineChartIcon },
  labview: { el: LabviewMockup, accent: "from-vio/20", icon: Compass },
} as const;

export type VisualKey = keyof typeof registry;

export function ProjectVisual({ id, title }: { id: VisualKey; title: string }) {
  const Entry = registry[id];
  const Mock = Entry.el;
  const Icon = Entry.icon;
  return (
    <div className="relative h-full">
      {/* Ambient accent glow */}
      <div
        className={`pointer-events-none absolute -inset-6 bg-gradient-to-br ${Entry.accent} to-transparent opacity-60 blur-2xl`}
        aria-hidden="true"
      />
      <motion.div
        className="relative h-full transition-transform duration-500 ease-out group-hover:scale-[1.025] group-hover:-translate-y-1"
        aria-hidden="true" /* decorative — card body carries the semantics */
      >
        <Mock />
      </motion.div>
      <ConceptTag />
      <span className="sr-only">{title} interface concept preview</span>
      <Icon className="absolute left-3 top-3 z-20 h-3.5 w-3.5 text-mist/50" aria-hidden="true" />
    </div>
  );
}
