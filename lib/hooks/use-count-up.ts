"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 → target once `active` becomes true.
 * Respects prefers-reduced-motion (snaps straight to the target).
 */
export function useCountUp(target: number, active: boolean, durationMs = 1600): number {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Snap to the final value on the next frame (deferred to avoid a
      // synchronous state update inside the effect body).
      frame.current = requestAnimationFrame(() => setValue(target));
      return () => {
        if (frame.current) cancelAnimationFrame(frame.current);
      };
    }

    let start: number | null = null;
    // easeOutExpo for a confident, decelerating count.
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(ease(progress) * target));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, active, durationMs]);

  return value;
}
