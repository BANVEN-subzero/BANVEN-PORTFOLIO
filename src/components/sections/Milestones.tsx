"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  GraduationCap,
  Landmark,
  Layers,
} from "lucide-react";
import { milestones } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { revealEase } from "@/components/shared/Reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  briefcase: Briefcase,
  layers: Layers,
  landmark: Landmark,
  "bar-chart-3": BarChart3,
};

export function Milestones() {
  const reduce = useReducedMotion();
  return (
    <section id="milestones" className="relative py-24 sm:py-28" aria-label="Achievements and milestones">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="07"
          eyebrow="Milestones"
          title="Progress Worth Marking."
          description="Verified steps on the journey — each one earned, none exaggerated. This list grows as new milestones are reached."
        />

        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m, i) => {
            const Icon = iconMap[m.icon] ?? Layers;
            return (
              <motion.li
                key={m.id}
                initial={reduce ? {} : { opacity: 0, y: 30 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: revealEase }}
                className="group relative"
              >
                <div className="card-hover relative h-full overflow-hidden rounded-2xl border border-line bg-white/[0.03] p-6">
                  {/* Ghost number */}
                  <span
                    className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[64px] font-bold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-electric/[0.09]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-electric/15 to-vio/15 ring-1 ring-line transition-all duration-500 group-hover:ring-electric/40">
                    <Icon className="h-5 w-5 text-electric transition-colors duration-300 group-hover:text-cy" />
                  </span>
                  <h3 className="mt-4 font-display text-[15.5px] font-semibold leading-snug text-mist">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-silver">{m.detail}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
