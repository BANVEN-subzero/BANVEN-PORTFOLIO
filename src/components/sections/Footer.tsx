"use client";

import { ArrowUp, Github } from "lucide-react";
import { navLinks, profile } from "@/config/profile";

export function Footer() {
  const year = new Date().getFullYear();
  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative mt-4 border-t border-line bg-ink/60">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-vio font-display text-sm font-bold text-white">
              {profile.initials}
            </span>
            <div>
              <p className="font-display text-[15px] font-semibold text-mist">
                {profile.displayName}
              </p>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-dim">
                {profile.locationShort}
              </p>
            </div>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex max-w-md flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => goTo(l.id)}
                    className="text-[12.5px] text-silver transition-colors hover:text-mist"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub profile — ${profile.github.username}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-silver transition-all duration-300 hover:border-electric/50 hover:text-mist"
            >
              <Github className="h-4 w-4" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/50 hover:text-mist"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-dim">
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <p className="font-mono text-[10.5px] text-dim">
            Designed &amp; engineered with Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
