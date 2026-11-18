"use client";

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        aria-hidden="true"
      >
        <span className="font-mono text-xs text-electric tracking-[0.25em]">
          {index}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-electric/70 to-transparent" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-silver">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-mist sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-[15px] leading-relaxed text-silver ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
