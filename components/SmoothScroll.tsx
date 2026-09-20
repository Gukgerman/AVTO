"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

/**
 * Drives Lenis off Framer Motion's own rAF scheduler (`frame`) instead of
 * starting a second requestAnimationFrame loop, so scroll smoothing and
 * whileInView/animate updates stay on a single synced frame.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      anchors: true,
      respectReducedMotion: true,
    });

    function onFrame({ timestamp }: { timestamp: number }) {
      lenis.raf(timestamp);
    }

    frame.update(onFrame, true);

    return () => {
      cancelFrame(onFrame);
      lenis.destroy();
    };
  }, []);

  return null;
}
