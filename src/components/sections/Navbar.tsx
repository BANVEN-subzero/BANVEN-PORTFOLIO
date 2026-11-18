"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/config/profile";
import { useActiveSection } from "@/hooks/useActiveSection";

const sectionIds = navLinks.map((l) => l.id);

/* Logo mark squares (matches hero motif) */
const LOGO_SQUARES: Array<[number, number]> = [
  [0.0, 0.0],
  [10.8, 10.9],
  [21.6, 21.8],
  [37.2, 0.0],
  [37.2, 10.9],
  [37.2, 21.8],
  [48.0, 0.0],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The hero's "Menu" pill opens the drawer through a custom event
  useEffect(() => {
    const onMenu = () => setOpen(true);
    window.addEventListener("au:menu", onMenu);
    return () => window.removeEventListener("au:menu", onMenu);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-electric-soft via-electric to-vio"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled && !open
            ? "glass translate-y-0 opacity-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <button
            onClick={() => goTo("home")}
            className="group flex items-center gap-3"
            aria-label="Back to home"
          >
            <svg viewBox="0 0 56.2 30" className="h-6 w-auto" fill="#fff" aria-hidden="true">
              {LOGO_SQUARES.map(([x, y], i) => (
                <rect key={i} x={x} y={y} width="8.2" height="8.2" />
              ))}
            </svg>
            <span className="hidden flex-col items-start sm:flex">
              <span className="font-display text-[15px] font-semibold leading-none text-mist">
                {profile.displayName}
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-dim">
                Software Engineer
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => goTo(link.id)}
                  data-active={active === link.id}
                  className={`nav-link text-[13.5px] font-medium transition-colors duration-300 ${
                    active === link.id ? "text-mist" : "text-silver hover:text-mist"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub profile — ${profile.github.username}`}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-silver transition-all duration-300 hover:border-electric/50 hover:text-mist sm:flex"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* Menu toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-mist transition-colors hover:border-electric/50"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu drawer — all viewport widths */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-[#0d0905]/85 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-md flex-col border-l border-line bg-ink px-7 pb-8 pt-24"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <button
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg border border-line text-mist transition-colors hover:border-electric/50"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.045, duration: 0.35 }}
                  >
                    <button
                      onClick={() => goTo(link.id)}
                      className={`w-full rounded-lg px-3 py-3 text-left font-display text-lg transition-colors ${
                        active === link.id
                          ? "bg-white/[0.05] text-mist"
                          : "text-silver hover:bg-white/[0.04] hover:text-mist"
                      }`}
                    >
                      <span className="mr-3 font-mono text-[10px] text-electric">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-2.5">
                <a
                  href={profile.cvPath}
                  download="Nyuydze-Banven-Eric-Junior-CV.pdf"
                  className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-silver transition-colors hover:border-electric/40 hover:text-mist"
                >
                  <Download className="h-4 w-4 text-electric" />
                  <span className="font-medium">Download my CV</span>
                </a>
                <a
                  href={profile.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-silver transition-colors hover:border-electric/40 hover:text-mist"
                >
                  <Github className="h-4 w-4" />
                  <span className="font-mono text-xs">{profile.github.username}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
