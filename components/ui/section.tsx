import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type Tone = "paper" | "mist" | "navy" | "navy-deep";

const toneClasses: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  navy: "bg-navy text-white",
  "navy-deep": "bg-navy-deep text-white",
};

/**
 * A full-width page section with consistent vertical rhythm and an inner
 * Container. `tone` swaps between light and dark surfaces.
 */
export function Section({
  id,
  tone = "paper",
  className,
  containerClassName,
  children,
  bare = false,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  /** Skip the inner Container (for sections that manage their own layout). */
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden py-20 md:py-28",
        toneClasses[tone],
        className
      )}
    >
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
