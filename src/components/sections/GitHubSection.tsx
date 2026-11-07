"use client";

import { ArrowUpRight, Github, Star, GitFork } from "lucide-react";
import { useEffect, useState } from "react";
import { githubSection } from "@/config/profile";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
};

type ApiResponse = {
  repos: Repo[] | null;
  fetchedAt?: string;
  error?: string;
};

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#663399",
  "Jupyter Notebook": "#DA5B0B",
  Vue: "#41b883",
  Go: "#00ADD8",
};

function RepoSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-line bg-white/[0.03] p-6">
      <div className="h-4 w-2/3 rounded bg-white/10" />
      <div className="mt-3 h-3 w-full rounded bg-white/[0.06]" />
      <div className="mt-2 h-3 w-4/5 rounded bg-white/[0.06]" />
      <div className="mt-5 flex gap-3">
        <div className="h-3 w-14 rounded bg-white/[0.06]" />
        <div className="h-3 w-14 rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group flex h-full flex-col rounded-2xl border border-line bg-white/[0.03] p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[15px] font-semibold text-mist transition-colors group-hover:text-electric-soft">
          {repo.name}
        </h3>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mist" />
      </div>
      <p className="mt-2 line-clamp-2 min-h-[2.4em] text-[12.5px] leading-relaxed text-silver">
        {repo.description ?? "No description provided yet."}
      </p>
      <div className="mt-auto flex items-center gap-4 pt-4 text-[11.5px] text-silver">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: LANG_COLORS[repo.language] ?? "#8b8b9f" }}
              aria-hidden="true"
            />
            {repo.language}
          </span>
        ) : null}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">Stars: </span>
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">Forks: </span>
          {repo.forks_count}
        </span>
      </div>
    </a>
  );
}

export function GitHubSection() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json: ApiResponse) => {
        if (cancelled) return;
        setData(json);
        if (json.error || !json.repos) setFailed(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const repos = data?.repos ?? null;
  const showFallback = failed || (repos !== null && repos.length === 0);

  return (
    <section id="github" className="relative py-24 sm:py-28" aria-label="GitHub and open source">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="09"
          eyebrow="Open Source"
          title={githubSection.title}
          description={githubSection.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Profile card */}
          <Reveal>
            <div className="card-hover flex h-full flex-col rounded-3xl border border-line bg-gradient-to-br from-white/[0.05] to-transparent p-7 sm:p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-vio shadow-lg shadow-electric/25">
                <Github className="h-7 w-7 text-white" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-mist">
                @{githubSection.username}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-silver">
                Repositories, experiments and coursework live here. Watch this space —
                open-source contributions are on the roadmap.
              </p>

              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                  Open-source interests
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {githubSection.interests.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-line bg-midnight/60 px-3 py-1 text-[11.5px] text-silver transition-colors hover:border-vio/40 hover:text-mist"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={githubSection.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_36px_-10px_rgba(61,139,255,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-soft"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Visit GitHub Profile
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Live repositories */}
          <div>
            {showFallback ? (
              <Reveal delay={0.1}>
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white/[0.02] p-10 text-center">
                  <Github className="h-8 w-8 text-dim" aria-hidden="true" />
                  <p className="mt-4 font-display text-lg font-medium text-mist">
                    Repository feed unavailable right now
                  </p>
                  <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-silver">
                    Public repositories will appear here automatically. Everything that
                    exists today is one click away on my GitHub profile.
                  </p>
                  <a
                    href={githubSection.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/50"
                  >
                    <Github className="h-4 w-4" />
                    Open github.com/{githubSection.username}
                  </a>
                </div>
              </Reveal>
            ) : repos === null ? (
              <div className="grid gap-5 sm:grid-cols-2" aria-label="Loading repositories">
                <RepoSkeleton />
                <RepoSkeleton />
                <RepoSkeleton />
                <RepoSkeleton />
              </div>
            ) : (
              <Stagger className="grid gap-5 sm:grid-cols-2">
                {repos.map((r) => (
                  <StaggerItem key={r.name}>
                    <RepoCard repo={r} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
            {data?.fetchedAt && repos && repos.length > 0 ? (
              <p className="mt-4 text-right font-mono text-[10px] text-dim">
                Live from the GitHub API · updated{" "}
                {new Date(data.fetchedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
