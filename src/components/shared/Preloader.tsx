"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/config/profile";

/** Brief, elegant intro overlay — shows the monogram, then lifts away. */
export function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 150 : 1050);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-vio font-display text-xl font-bold text-white shadow-lg shadow-electric/25">
              {profile.initials}
            </div>
            <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-full rounded-full bg-gradient-to-r from-electric via-vio to-cy"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
