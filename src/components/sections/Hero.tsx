"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { hero, profile } from "@/config/profile";
import { revealEase } from "@/components/shared/Reveal";

function RoleCycler() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.5em] min-w-[11ch] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={reduce ? false : { y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: revealEase }}
          className="text-gradient font-display font-semibold"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: revealEase } },
};

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" aria-label="Introduction">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-24">
        {/* ── Left: copy ─────────────────────────────── */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          {/* Status pill */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="font-mono text-[10.5px] font-medium tracking-[0.22em] text-emerald-300">
                {hero.status}
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[2rem] font-medium leading-snug text-silver sm:text-3xl"
          >
            {hero.greeting}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 font-display text-4xl font-bold leading-[1.08] tracking-tight text-mist sm:text-5xl lg:text-[3.4rem]"
          >
            Building ideas into{" "}
            <span className="text-gradient">technology that matters.</span>
          </motion.p>

          {/* Role cycler */}
          <motion.div
            variants={item}
            className="mt-5 flex items-center gap-3 font-display text-lg text-silver sm:text-xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-dim">Focus</span>
            <span className="h-4 w-px bg-line" aria-hidden="true" />
            <RoleCycler />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-silver"
          >
            {hero.description}
          </motion.p>

          <motion.div variants={item} className="mt-4 flex items-center gap-2 text-sm text-silver">
            <MapPin className="h-4 w-4 text-electric" aria-hidden="true" />
            <span>{profile.location}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_36px_-10px_rgba(61,139,255,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-soft hover:shadow-[0_16px_44px_-10px_rgba(61,139,255,0.75)]"
            >
              Explore My Work
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={profile.cvPath}
              download="Nyuydze-Banven-Eric-Junior-CV.pdf"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-6 py-3 text-sm font-semibold text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-vio/50 hover:bg-white/[0.07]"
            >
              Download My CV
              <Download className="h-4 w-4 text-vio transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-silver transition-colors duration-300 hover:text-mist"
            >
              Let&apos;s Connect
              <ArrowUpRight className="h-4 w-4 text-cy transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub profile — ${profile.github.username}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.04] text-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-mist/40 hover:text-mist"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: portrait ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: revealEase }}
          className="relative mx-auto w-full max-w-[400px] lg:max-w-[430px]"
        >
          {/* Ambient glow */}
          <div
            className="absolute -inset-8 rounded-[999px] bg-[radial-gradient(closest-side,rgba(61,139,255,0.16),transparent)] blur-2xl"
            aria-hidden="true"
          />
          {/* Rotating conic ring (sits behind the photo — only the outer edge shows) */}
          <div
            className="absolute -inset-[7px] overflow-hidden rounded-b-[calc(2rem+7px)] rounded-t-[187px]"
            aria-hidden="true"
          >
            <div className="absolute inset-[-40%] animate-spin-slower [background:conic-gradient(from_0deg,transparent_0deg,#3d8bff_50deg,rgba(61,139,255,0.12)_110deg,transparent_160deg,transparent_210deg,#8b5cf6_270deg,rgba(139,92,246,0.12)_320deg,transparent_360deg)]" />
          </div>
          {/* Arch frame */}
          <div className="animate-float relative overflow-hidden rounded-t-[180px] rounded-b-[2rem] border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8),0_0_60px_-20px_rgba(61,139,255,0.35)]">
            <img
              src={hero.photo.src}
              alt={hero.photo.alt}
              width={880}
              height={1100}
              className="h-auto w-full object-cover"
              fetchPriority="high"
            />
            {/* Subtle bottom gradient for chip legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/55 via-transparent to-transparent" aria-hidden="true" />
          </div>

          {/* Floating chips */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: revealEase }}
            className="absolute -left-4 bottom-10 rounded-2xl border border-white/10 bg-[#0a101d]/85 px-4 py-3 shadow-xl backdrop-blur-md sm:-left-8"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim">B.Tech. Software Engineering</p>
            <p className="mt-1 text-[13px] font-semibold text-mist">University of Buea</p>
            <p className="text-[11px] text-silver">Master&apos;s track · College of Technology</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease: revealEase }}
            className="glass absolute -right-3 top-16 flex items-center gap-2 rounded-full px-4 py-2 sm:-right-6"
          >
            <MapPin className="h-3.5 w-3.5 text-cy" aria-hidden="true" />
            <span className="text-[12px] font-medium text-mist">Yaoundé, Cameroon</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-dim transition-colors hover:text-silver md:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-current p-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-scroll-wheel" />
        </span>
      </motion.a>
    </section>
  );
}
