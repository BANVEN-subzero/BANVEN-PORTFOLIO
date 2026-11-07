"use client";

import {
  BarChart3,
  BrainCircuit,
  Cpu,
  FlaskConical,
  Landmark,
  Network,
  Rocket,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { research } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "brain-circuit": BrainCircuit,
  sparkles: Sparkles,
  "bar-chart-3": BarChart3,
  "trending-up": TrendingUp,
  landmark: Landmark,
  cpu: Cpu,
  network: Network,
  rocket: Rocket,
};

export function Research() {
  const f = research.featured;
  return (
    <section id="research" className="relative py-24 sm:py-28" aria-label="Research and data interests">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_15%_30%,rgba(139,92,246,0.055),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Research"
          title={research.title}
          description={research.description}
        />

        {/* Interest grid */}
        <Stagger className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-4" gap={0.05}>
          {research.interests.map((it) => {
            const Icon = iconMap[it.icon] ?? Sparkles;
            return (
              <StaggerItem key={it.label}>
                <div className="card-hover group flex h-full flex-col items-start gap-3 rounded-2xl border border-line bg-white/[0.03] px-4 py-5 sm:p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-line transition-colors duration-300 group-hover:bg-electric/10 group-hover:ring-electric/30">
                    <Icon className="h-4 w-4 text-electric transition-colors group-hover:text-cy" />
                  </span>
                  <span className="text-[13px] font-medium leading-snug text-silver transition-colors group-hover:text-mist">
                    {it.label}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Featured research */}
        <Reveal className="mt-10">
          <article className="card-hover group relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white/[0.045] via-white/[0.02] to-transparent p-7 sm:p-9">
            <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-vio">
                  <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                  {f.kicker}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-mist sm:text-2xl">
                  {f.title}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-silver">{f.summary}</p>

                <div className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {f.approaches.map((a) => (
                    <span key={a} className="flex items-start gap-2 text-[13px] leading-snug text-silver">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cy" aria-hidden="true" />
                      {a}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-md bg-vio/10 px-2.5 py-1 font-mono text-[10px] text-vio ring-1 ring-vio/25">
                    {f.models[0]}
                  </span>
                  <span className="rounded-md bg-vio/10 px-2.5 py-1 font-mono text-[10px] text-vio ring-1 ring-vio/25">
                    {f.models[1]}
                  </span>
                  {f.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-midnight/70 px-2.5 py-1 font-mono text-[10px] text-silver"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini forecast visual (illustrative only) */}
              <div className="relative rounded-2xl border border-line bg-midnight/70 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim">
                    Model output — illustrative
                  </span>
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-silver">
                    Forecast
                  </span>
                </div>
                <svg
                  viewBox="0 0 320 150"
                  className="mt-3 w-full"
                  role="img"
                  aria-label="Illustrative chart comparing observed data points with a modelled forecast trend"
                >
                  {[25, 55, 85, 115].map((y) => (
                    <line key={y} x1="8" y1={y} x2="312" y2={y} stroke="#1a2440" strokeWidth="1" />
                  ))}
                  {/* observed scatter */}
                  {[
                    [22, 108], [48, 96], [74, 100], [100, 82], [126, 74],
                    [152, 66], [178, 58], [204, 52],
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#3d8bff" opacity="0.85" />
                  ))}
                  {/* regression fit */}
                  <path
                    d="M 14 112 L 216 44"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* dashed forecast continuation */}
                  <path
                    d="M 216 44 S 260 28, 306 20"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                    strokeLinecap="round"
                  />
                  <circle cx="306" cy="20" r="3.5" fill="#22d3ee" />
                  <text x="230" y="14" fontSize="9" fill="#22d3ee" fontFamily="monospace">
                    predicted
                  </text>
                  <text x="30" y="132" fontSize="9" fill="#5f6c84" fontFamily="monospace">
                    observed sample
                  </text>
                </svg>
                <p className="mt-2 text-[11.5px] leading-relaxed text-dim">
                  Linear Regression &amp; Random Forest models compared against observed
                  patterns — {f.note.toLowerCase()}
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
