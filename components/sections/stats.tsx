"use client";

import { stats, statsNote } from "@/lib/content";
import type { Stat } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { useInView } from "@/lib/hooks/use-in-view";
import { useCountUp } from "@/lib/hooks/use-count-up";
import { cn } from "@/lib/utils";

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
        <div className="glow-accent absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 opacity-25" />
      </div>

      <Container className="relative">
        <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} active={inView} index={i} />
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-white/60">{statsNote}</p>
      </Container>
    </section>
  );
}

function StatItem({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  const count = useCountUp(stat.value, active, 1400 + index * 120);

  return (
    <div
      className={cn(
        "reveal flex flex-col items-center text-center",
        active && "is-visible"
      )}
      style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
    >
      <p className="tnum font-display text-4xl font-extrabold leading-none tracking-tight sm:text-5xl md:text-[3.5rem]">
        {stat.prefix}
        <span className="bg-gradient-to-r from-white to-accent-soft bg-clip-text text-transparent">
          {count}
        </span>
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-medium text-white/60">{stat.label}</p>
    </div>
  );
}
