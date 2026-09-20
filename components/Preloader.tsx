"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MIN_VISIBLE_MS = 900;

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    function finish() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => setVisible(false), remaining);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-navy-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="14" cy="14" r="11" stroke="#f29e2e" strokeWidth="1.5" opacity="0.35" />
              <path
                d="M14 3a11 11 0 0 1 11 11"
                stroke="#f29e2e"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="14" cy="14" r="3" fill="#f29e2e" />
            </motion.svg>
            <span className="font-display text-xl font-extrabold tracking-[0.3em] text-white">
              PRESTIGE
            </span>
          </div>

          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-amber"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
