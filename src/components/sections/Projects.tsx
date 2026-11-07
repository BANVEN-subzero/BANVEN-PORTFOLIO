"use client";

import { ArrowUpRight, CheckCircle2, Github } from "lucide-react";
import { projects, profile, type Project } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { ProjectVisual, type VisualKey } from "./ProjectVisual";

function ProjectActions({ project, compact = false }: { project: Project; compact?: boolean }) {
  const size = compact ? "text-[12px] px-4 py-2" : "text-[13px] px-5 py-2.5";
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      {project.repoUrl ? (
        <>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] font-semibold text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/50 ${size}`}
          >
            <Github className="h-3.5 w-3.5" />
            View Project
            <ArrowUpRight className="h-3.5 w-3.5 text-silver" />
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full bg-electric font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-soft ${size}`}
            >
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </>
      ) : (
        <span
          className="inline-flex items-center gap-2 rounded-full border border-dashed border-line bg-white/[0.02] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-dim"
          title="A public repository will be linked here once published"
        >
          Repository coming soon
        </span>
      )}
      <a
        href={profile.github.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-center gap-1.5 text-[12.5px] font-medium text-silver transition-colors hover:text-mist"
      >
        <Github className="h-3.5 w-3.5" />
        GitHub profile
        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
    </div>
  );
}

function TechBadges({ tech }: { tech: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <li
          key={t}
          className="cursor-default rounded-md border border-line bg-midnight/70 px-2 py-1 font-mono text-[10px] text-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/40 hover:text-mist"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function FeatureList({ project }: { project: Project }) {
  const items = project.features ?? project.contribution ?? [];
  if (!items.length) return null;
  const label = project.contribution && !project.features ? "My contribution" : "Key features";
  return (
    <div className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
      <p className="sr-only">{label}</p>
      {items.map((f) => (
        <span key={f} className="flex items-start gap-2 text-[13px] leading-snug text-silver">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric/80" aria-hidden="true" />
          {f}
        </span>
      ))}
    </div>
  );
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric">
        {project.category}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-mist">
        {project.name}
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-silver">{project.description}</p>

      {project.disclaimer ? (
        <p className="mt-3 inline-flex rounded-lg border border-amber-400/25 bg-amber-400/[0.07] px-3 py-1.5 text-[11.5px] font-medium text-amber-300">
          {project.disclaimer}
        </p>
      ) : null}

      {project.models ? (
        <p className="mt-3 text-[12.5px] text-silver">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Models — </span>
          {project.models.join(" · ")}
        </p>
      ) : null}

      <FeatureList project={project} />

      {project.image && project.visual !== "cultia" ? (
        <figure className="mt-5 overflow-hidden rounded-xl border border-line">
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={1200}
            height={640}
            loading="lazy"
            className="aspect-[16/8.5] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
          />
        </figure>
      ) : null}

      <div className="mt-5">
        <TechBadges tech={project.tech} />
      </div>
      <ProjectActions project={project} compact />
    </div>
  );
}

export function Projects() {
  const flagship = projects.find((p) => p.flagship)!;
  const rest = projects.filter((p) => !p.flagship);

  return (
    <section id="projects" className="relative py-24 sm:py-28" aria-label="Featured projects">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_80%_10%,rgba(61,139,255,0.05),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Selected Work & Concepts."
          description="Six builds spanning AI, AR commerce, fintech, health tech, data science and engineering — each one an idea taken seriously."
        />

        {/* ── Flagship: CULTIA ─────────────────────── */}
        <Reveal className="mt-14">
          <article className="card-hover group relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white/[0.045] via-white/[0.02] to-transparent p-6 sm:p-8 lg:p-10">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/[0.07] blur-3xl"
              aria-hidden="true"
            />
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1.35fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-electric">{flagship.index}</span>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-amber-300">
                    Flagship project
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-mist sm:text-4xl">
                  {flagship.name}
                  <span className="mt-1 block text-base font-medium text-silver sm:text-lg">
                    Cultural Heritage & AI Integration Platform
                  </span>
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-silver">
                  {flagship.description}
                </p>
                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    Key features
                  </p>
                  <Stagger className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                    {flagship.features!.map((f) => (
                      <StaggerItem key={f} y={10}>
                        <span className="flex items-start gap-2 text-[13px] leading-snug text-silver">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/80" aria-hidden="true" />
                          {f}
                        </span>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
                <div className="mt-6">
                  <TechBadges tech={flagship.tech} />
                </div>
                <ProjectActions project={flagship} />
              </div>

              {/* Mockup — browser style with heritage imagery inside */}
              <div className="relative aspect-[16/10.5] w-full">
                <ProjectVisual id={flagship.visual as VisualKey} title={flagship.name} />
              </div>
            </div>
          </article>
        </Reveal>

        {/* ── Grid of remaining projects ───────────── */}
        <Stagger className="mt-8 grid gap-6 md:grid-cols-2" gap={0.09}>
          {rest.map((p) => (
            <StaggerItem key={p.id} className={p.visual === "labview" ? "md:col-span-2" : ""}>
              <article
                className={`card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/[0.03]`}
              >
                {/* Visual header */}
                <div className={`relative p-5 pb-0 ${
                  p.visual === "labview"
                    ? "h-[340px] sm:h-[380px]"
                    : p.visual === "tryons"
                      ? "min-h-[400px]"
                      : "aspect-[16/10]"
                }`}>
                  <ProjectVisual id={p.visual as VisualKey} title={p.name} />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <ProjectBody project={p} />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
