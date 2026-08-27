"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Stop observing after the first intersection. Default: true. */
  once?: boolean;
  /** IntersectionObserver rootMargin. Default: reveals slightly before entry. */
  rootMargin?: string;
  threshold?: number;
}

/**
 * Returns a ref + boolean for whether the element has entered the viewport.
 * Used by the Reveal wrapper and the stats count-up trigger.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Guard for very old browsers without IntersectionObserver: reveal on the
    // next frame (deferred so we never call setState synchronously in the effect).
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView } as const;
}
