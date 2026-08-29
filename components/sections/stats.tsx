"use client";

import { stats, statsNote } from "@/lib/content";
import type { Stat } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { useInView } from "@/lib/hooks/use-in-view";
import { useCountUp } from "@/lib/hooks/use-count-up";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 text-white md:py-24">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 opacity-35" />
        <div className="glow-accent absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="glow-sky absolute -right-32 top-0 h-64 w-64 opacity-15" />
      </div>

      <Container className="relative">
        {/* Eyebrow */}
        <div className="mb-12 text-center">
          <span className="kicker text-accent-soft">By the Numbers</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
            Real Results for Real Carriers
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} active={inView} index={i} />
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: "shield-check" as const, text: "Licensed US Dispatch Operation" },
            { icon: "clock" as const, text: "Available 24/7 Every Day of the Year" },
            { icon: "handshake" as const, text: "Carrier-First, Always" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-xs text-white/45">
              <Icon name={item.icon} size={14} className="text-accent-soft shrink-0" />
              {item.text}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-white/35 font-mono">{statsNote}</p>
      </Container>
    </section>
  );
}

function StatItem({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  const count = useCountUp(stat.value, active, 1600 + index * 100);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-10 text-center transition-all duration-500 bg-transparent hover:bg-white/[0.04]",
        active ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="tnum stat-value text-4xl font-extrabold leading-none tracking-tight text-white sm:text-5xl md:text-[3.25rem]">
        {stat.prefix}
        <span className="bg-gradient-to-r from-white to-accent-soft bg-clip-text text-transparent">
          {count.toLocaleString()}
        </span>
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-medium text-white/55">{stat.label}</p>
    </div>
  );
}
