import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Section eyebrow + heading + optional lead paragraph, with a small accent
 * rule. Used at the top of most sections for a consistent editorial rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <Reveal
          as="span"
          className={cn(
            "kicker mb-4 inline-flex items-center gap-2",
            dark ? "text-accent-soft" : "text-accent-strong"
          )}
        >
          <span className={cn("h-px w-6", dark ? "bg-accent-soft/60" : "bg-accent/60")} />
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={60}
        className={cn(
          "text-balance text-3xl leading-[1.08] sm:text-4xl md:text-[2.85rem]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={120}
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-muted"
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
