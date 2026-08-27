"use client";

import { type ElementType, type ReactNode } from "react";
import { useInView } from "@/lib/hooks/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Fade-up on scroll. Content renders normally without JS (the `.reveal`
 * hidden state only applies under the `.js` root class — see globals.css),
 * so this is safe for SEO and progressive enhancement.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
