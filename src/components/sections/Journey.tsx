"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import { useRef } from "react";
import { education } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { revealEase } from "@/components/shared/Reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
};

export function Journey() {
  const reduce = useReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <section id="journey" className="relative py-24 sm:py-28" aria-label="Educational journey">
      {/* Section tint */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.05),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Education"
          title="The Academic Journey."
          description="Two chapters at one institution — the University of Buea has shaped everything from first lines of code to postgraduate research ambitions."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* Track */}
          <div
            className="absolute left-[22px] top-2 h-[calc(100%-16px)] w-px bg-line sm:left-1/2"
            aria-hidden="true"
          />
          {/* Animated progress line */}
          <motion.div
            ref={lineRef}
            className="absolute left-[22px] top-2 h-[calc(100%-16px)] w-px origin-top bg-gradient-to-b from-electric via-vio to-cy sm:left-1/2"
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={reduce ? undefined : { scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: revealEase }}
            aria-hidden="true"
          />

          <ol className="space-y-14">
            {education.map((ed, i) => {
              const Icon = iconMap[ed.icon] ?? GraduationCap;
              const leftSide = i % 2 === 0;
              return (
                <li key={ed.id} className="relative">
                  {/* Node */}
                  <motion.span
                    initial={reduce ? {} : { scale: 0, opacity: 0 }}
                    whileInView={reduce ? {} : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.2, ease: revealEase }}
                    className={`absolute left-[22px] top-6 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border bg-panel sm:left-1/2 ${
                      ed.statusTone === "done"
                        ? "border-emerald-400/40 text-emerald-300 shadow-[0_0_24px_-6px_rgba(52,211,153,0.5)]"
                        : "border-electric/50 text-electric shadow-[0_0_24px_-6px_rgba(61,139,255,0.6)]"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </motion.span>

                  <motion.div
                    initial={reduce ? {} : { opacity: 0, y: 26, x: 0 }}
                    whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.65, delay: 0.2 + i * 0.2, ease: revealEase }}
                    className={`ml-14 sm:ml-0 sm:w-[calc(50%-3rem)] ${
                      leftSide ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                    }`}
                  >
                    <div className={`card-hover group rounded-2xl border border-line bg-white/[0.03] p-6 sm:p-7 ${leftSide ? "" : ""}`}>
                      <div className={`flex flex-wrap gap-2 ${leftSide ? "sm:justify-end" : ""}`}>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] ${
                            ed.statusTone === "done"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-electric/10 text-electric-soft"
                          }`}
                        >
                          <span className={`h-1 w-1 rounded-full ${ed.statusTone === "done" ? "bg-emerald-300" : "bg-electric animate-pulse-dot"}`} />
                          {ed.status}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold text-mist">
                        {ed.credential}
                      </h3>
                      <p className="mt-1.5 text-sm font-medium text-silver">
                        {ed.institution}
                        <span className="text-dim"> — {ed.location}</span>
                      </p>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-silver/85">
                        {ed.note}
                      </p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
