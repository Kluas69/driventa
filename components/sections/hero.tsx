"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

/* Animated counter hook */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return count;
}

function LiveStatBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const loadsBooked = useCountUp(12847, 2000, visible);
  const carriers = useCountUp(840, 1800, visible);
  const avgRpm = useCountUp(318, 1600, visible);
  const uptime = useCountUp(100, 1400, visible);

  const stats = [
    { value: loadsBooked.toLocaleString(), suffix: "+", label: "Loads Booked" },
    { value: carriers.toLocaleString(), suffix: "+", label: "Active Carriers" },
    { value: `$${(avgRpm / 100).toFixed(2)}`, suffix: "/mi", label: "Avg Rate Negotiated" },
    { value: uptime, suffix: "%", label: "Dispatch Uptime" },
  ];

  return (
    <div ref={ref} className="mt-8 sm:mt-10">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-navy-deep/60 px-2 py-4 text-center sm:px-5">
              <div className="stat-value text-xl font-extrabold text-white sm:text-2xl">
                {s.value}
                <span className="text-accent-soft">{s.suffix}</span>
              </div>
              <div className="mt-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white/50 sm:text-[0.65rem]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const microBadges = [
  { icon: "check" as const, label: "No long-term contract" },
  { icon: "clock" as const, label: "24/7 support" },
  { icon: "route" as const, label: "All 48 states" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-deep text-white sm:min-h-[600px]"
    >
      {/* Background image */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/driventa-mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-[65%_center] opacity-80 sm:hidden"
          sizes="(min-width: 640px) 0px, 100vw"
        />
        <Image
          src="/driventa.png"
          alt=""
          fill
          priority
          className="hidden object-center object-cover opacity-90 sm:block"
          sizes="(max-width: 640px) 0px, 100vw"
        />
      </div>

      {/* Gradient overlays — mobile (darker to reduce noise) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 sm:hidden" style={{ background: "linear-gradient(180deg, rgba(6,12,25,0.95) 0%, rgba(6,12,25,0.85) 30%, rgba(6,12,25,0.6) 50%, rgba(6,12,25,0.95) 100%)" }} />

      {/* Gradient overlay — desktop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block" style={{ background: "linear-gradient(100deg, rgba(6,12,25,0.97) 0%, rgba(6,12,25,0.88) 38%, rgba(6,12,25,0.55) 60%, rgba(6,12,25,0.12) 80%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-navy-deep to-transparent sm:block" />

      {/* Ambient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="orb-drift absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/[0.07] blur-3xl" />
        <div className="orb-drift-slow absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-sky/[0.05] blur-3xl" />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-24 pt-32 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
        <div className="max-w-2xl">

          {/* Live badge */}
          <Reveal as="div" className="flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.07] px-3.5 py-1.5 text-xs font-medium text-white/75 backdrop-blur-md">
              <span className="pulse-dot-blue h-2 w-2 rounded-full bg-accent-glow" />
              {hero.eyebrow}
            </span>
          </Reveal>

          {/* Headline */}
          <Reveal
            as="h1"
            delay={80}
            className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.1] tracking-tight sm:mt-7 sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem] lg:leading-[1.04]"
          >
            Keep Your Trucks
            <br />
            Moving.{" "}
            <span className="text-shimmer">
              We&apos;ll Handle
              <br className="sm:hidden" />
              {" "}the Dispatch.
            </span>
          </Reveal>

          {/* Subtitle */}
          <Reveal
            as="p"
            delay={160}
            className="mt-4 max-w-lg text-[0.95rem] leading-[1.65] text-white/65 sm:mt-7 sm:text-lg sm:leading-relaxed"
          >
            {hero.subtitle}
          </Reveal>

          {/* CTAs */}
          <Reveal as="div" delay={240} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <Button
              href="/apply"
              size="lg"
              trailingIcon="arrow-right"
              className="h-[3.25rem] rounded-2xl px-7 text-base font-bold shadow-[0_16px_48px_-12px_rgba(37,99,235,0.5)] sm:h-14"
            >
              Apply as a Carrier
            </Button>
            <Button
              href={site.cta.secondary.href}
              size="lg"
              variant="onDarkOutline"
              leadingIcon="phone"
              className="h-[3.25rem] rounded-2xl px-7 text-base sm:h-14"
            >
              {site.phone.display}
            </Button>
          </Reveal>

          {/* Micro-badges */}
          <Reveal as="div" delay={300} className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:mt-5">
            {microBadges.map((b) => (
              <span key={b.label} className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-white/50">
                <Icon name={b.icon} size={13} className="text-positive" strokeWidth={2.5} />
                {b.label}
              </span>
            ))}
          </Reveal>

          {/* Live stats */}
          <Reveal delay={380}>
            <LiveStatBar />
          </Reveal>

          {/* Scroll hint */}
          <Reveal as="div" delay={460} className="mt-8 hidden sm:block">
            <a
              href="#services"
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-white/35 transition-colors hover:text-white/60"
            >
              <Icon name="chevron-down" size={14} strokeWidth={2} className="animate-bounce" />
              Explore our services
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
