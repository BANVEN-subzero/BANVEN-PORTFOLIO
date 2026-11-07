"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  BrainCircuit,
  GraduationCap,
  MapPin,
  Quote,
  Rocket,
} from "lucide-react";
import { about, profile } from "@/config/profile";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "map-pin": MapPin,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  "brain-circuit": BrainCircuit,
  rocket: Rocket,
};

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28" aria-label="About me">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={about.title}
        />

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Portrait */}
          <Reveal className="relative mx-auto w-full max-w-[340px] lg:sticky lg:top-28">
            <div
              className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(139,92,246,0.14),transparent)] blur-xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)]">
              <img
                src={about.aboutPhoto.src}
                alt={about.aboutPhoto.alt}
                width={760}
                height={928}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/45 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
            <div className="glass absolute -bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl px-5 py-3.5">
              <div>
                <p className="text-[13px] font-semibold text-mist">{profile.fullName.split(" ").slice(0, 3).join(" ")}</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-dim">
                  Software Engineering
                </p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-vio font-display text-xs font-bold text-white">
                {profile.initials}
              </span>
            </div>
          </Reveal>

          {/* Bio */}
          <div>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-5 text-[15.5px] leading-[1.85] text-silver">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.15}>
              <figure className="relative my-8 rounded-2xl border border-line bg-white/[0.025] p-6 pl-12">
                <Quote
                  className="absolute left-5 top-6 h-5 w-5 text-electric"
                  aria-hidden="true"
                />
                <blockquote className="text-[15px] leading-relaxed text-mist/90">
                  {about.quote}
                </blockquote>
              </figure>
            </Reveal>

            <Stagger className="mt-8 flex flex-wrap gap-3">
              {about.highlights.map((h) => {
                const Icon = iconMap[h.icon] ?? MapPin;
                return (
                  <StaggerItem key={h.label}>
                    <span className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[13px] text-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/40 hover:text-mist">
                      <Icon className="h-3.5 w-3.5 text-electric transition-colors group-hover:text-cy" />
                      {h.label}
                    </span>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
