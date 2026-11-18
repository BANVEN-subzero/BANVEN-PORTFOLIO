"use client";

import { motion } from "framer-motion";
import { Briefcase, CalendarRange, Sparkles } from "lucide-react";
import { experience } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28" aria-label="Professional experience">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Experience"
          title="Where Practice Meets Theory."
          description={experience.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Company card */}
          <Reveal>
            <div className="card-hover flex h-full flex-col rounded-3xl border border-line bg-white/[0.03] p-7 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-vio shadow-lg shadow-electric/20">
                  <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-mist">
                    {experience.company}
                  </h3>
                  <p className="mt-1 text-[13.5px] font-medium text-electric-soft">
                    {experience.position}
                  </p>
                </div>
              </div>

              {/* Two separate internship periods — not continuous employment */}
              <div className="mt-6 space-y-3">
                {experience.periods.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 rounded-xl border border-line bg-midnight/60 px-4 py-3"
                  >
                    <CalendarRange className="h-4 w-4 shrink-0 text-cy" aria-hidden="true" />
                    <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3">
                      <span className="text-[13.5px] font-semibold text-mist">{p.period}</span>
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">
                        {p.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-vio/25 bg-vio/[0.07] p-4">
                <p className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-vio">
                  <Sparkles className="h-3 w-3" aria-hidden="true" /> Final internship project
                </p>
                <p className="mt-2 text-[14px] font-semibold text-mist">
                  {experience.finalProject.name}
                </p>
                <p className="mt-0.5 text-[12.5px] text-silver">
                  {experience.finalProject.note}
                </p>
              </div>

              <p className="mt-auto pt-6 text-[12px] leading-relaxed text-dim">
                The two periods above are separate internships — there was no continuous
                employment between them.
              </p>
            </div>
          </Reveal>

          {/* Highlights */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-3xl border border-line bg-white/[0.02] p-7 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-silver">
                What I worked on
              </p>
              <Stagger className="mt-5 flex flex-wrap gap-2.5" gap={0.045}>
                {experience.highlights.map((h) => (
                  <StaggerItem key={h} y={12}>
                    <span className="inline-block cursor-default rounded-full border border-line bg-midnight/60 px-3.5 py-1.5 text-[12.5px] text-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/40 hover:text-mist">
                      {h}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { v: "2", l: "Internship periods" },
                  { v: "10+", l: "Practice areas" },
                  { v: "1", l: "AR product build" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-line bg-midnight/60 px-3 py-4 text-center"
                  >
                    <p className="font-display text-2xl font-bold text-gradient">{s.v}</p>
                    <p className="mt-1 text-[10.5px] leading-tight text-silver">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
