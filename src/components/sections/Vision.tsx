"use client";

import {
  BrainCircuit,
  Code2,
  GitBranch,
  Globe,
  Plane,
  Rocket,
} from "lucide-react";
import { vision } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "code-2": Code2,
  "brain-circuit": BrainCircuit,
  globe: Globe,
  plane: Plane,
  rocket: Rocket,
  "git-branch": GitBranch,
};

export function Vision() {
  return (
    <section id="vision" className="relative py-24 sm:py-28" aria-label="Future ambitions">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_100%,rgba(61,139,255,0.06),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="08"
          eyebrow="Vision"
          title={vision.title}
          description={vision.description}
          align="center"
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {vision.ambitions.map((a) => {
            const Icon = iconMap[a.icon] ?? Code2;
            return (
              <StaggerItem key={a.index}>
                <div className="card-hover group relative h-full overflow-hidden rounded-3xl border border-line bg-white/[0.03] p-7">
                  <span
                    className="pointer-events-none absolute right-5 top-4 select-none font-display text-5xl font-bold text-white/[0.05] transition-colors duration-500 group-hover:text-electric/15"
                    aria-hidden="true"
                  >
                    {a.index}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-vio shadow-lg shadow-electric/20 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-mist">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-silver">
                    {a.detail}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <StaggerItem className="mt-10 text-center">
          <p className="mx-auto max-w-xl text-[14.5px] leading-relaxed text-silver">
            The direction is set — the work continues. If any of this resonates with a
            project, programme or team, the next chapter could start{" "}
            <a
              href="#contact"
              className="font-medium text-gradient underline decoration-electric/40 underline-offset-4 transition-opacity hover:opacity-80"
            >
              with a conversation
            </a>
            .
          </p>
        </StaggerItem>
      </div>
    </section>
  );
}
