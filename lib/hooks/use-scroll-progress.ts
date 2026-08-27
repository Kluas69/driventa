"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far a referenced element has travelled up through the viewport,
 * as a 0 → 1 value:
 *   0  — the element's top is still at (or below) the bottom of the viewport
 *   1  — the element's top has risen to `finishAt` × viewport-height
 *
 * Drives scroll-linked entrance animations (the "On the Road" truck drive-in).
 * rAF-throttled with passive scroll + resize listeners; SSR-safe; cleans up.
 * Honors prefers-reduced-motion by pinning progress to its finished value (1),
 * so consumers render their final resting state with no motion.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  finishAt = 0.5
) {
  const ref = useRef<T | null>(null);
  const frame = useRef<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: skip the drive-in entirely — pin to the finished state.
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (prefersReduced) {
      frame.current = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(frame.current);
    }

    let ticking = false;

    const measure = () => {
      ticking = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const top = el.getBoundingClientRect().top;
      // Travel window: from the viewport bottom (start) up to finishAt × vh (end).
      const raw = (vh - top) / (vh - vh * finishAt);
      setProgress(Math.min(Math.max(raw, 0), 1));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame.current = requestAnimationFrame(measure);
    };

    // Initial read is deferred through rAF (never a synchronous setState here).
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [finishAt]);

  return { ref, progress } as const;
}
