"use client";

import {
  BrainCircuit,
  Code2,
  Database,
  Globe,
  Wrench,
} from "lucide-react";
import { skills } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "code-2": Code2,
  globe: Globe,
  database: Database,
  "brain-circuit": BrainCircuit,
  wrench: Wrench,
};

const accentStyles = {
  electric: {
    icon: "text-electric bg-electric/10 ring-electric/30",
    glow: "hover:border-electric/40",
  },
  violet: {
    icon: "text-vio bg-vio/10 ring-vio/30",
    glow: "hover:border-vio/40",
  },
  cyan: {
    icon: "text-cy bg-cy/10 ring-cy/30",
    glow: "hover:border-cy/40",
  },
} as const;

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28" aria-label="Technical skills">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title="The Toolkit."
          description="Technologies I use across coursework, internships and personal builds — organised the way I actually reach for them. Levels grow with every project."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {skills.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            const a = accentStyles[cat.accent];
            const wide = cat.id === "data-ai";
            return (
              <StaggerItem
                key={cat.id}
                className={wide ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <div
                  className={`card-hover group h-full rounded-2xl border border-line bg-white/[0.03] p-6 ${a.glow}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${a.icon}`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="font-display text-[15.5px] font-semibold text-mist">
                      {cat.label}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <li
                        key={s}
                        className="cursor-default rounded-lg border border-line bg-midnight/60 px-2.5 py-1.5 text-[12px] font-medium text-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-mist/25 hover:text-mist"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}

          {/* Filler statement card — keeps the grid rhythm on desktop */}
          <StaggerItem className="lg:col-span-1">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-electric/[0.09] via-transparent to-vio/[0.09] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
                Currently exploring
              </p>
              <p className="mt-4 font-display text-lg font-medium leading-snug text-mist">
                Deeper ML practice, system design patterns and cloud-native tooling — one deliberate step at a time.
              </p>
              <span
                className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-electric/15 blur-3xl"
                aria-hidden="true"
              />
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
