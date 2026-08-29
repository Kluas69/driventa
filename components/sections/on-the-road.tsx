"use client";

import { useState } from "react";
import { onTheRoad } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { FleetCommandRadar } from "@/components/illustrations/fleet-command-radar";
import { cn } from "@/lib/utils";

interface ShiftDetail {
  mode: "day" | "night";
  title: string;
  timeRange: string;
  tagline: string;
  icon: "sun" | "moon";
  metrics: { label: string; value: string; detail: string }[];
  highlights: string[];
}

const shiftDetails: Record<"day" | "night", ShiftDetail> = {
  day: {
    mode: "day",
    title: "Daytime Load Sourcing & Negotiation",
    timeRange: "06:00 AM — 06:00 PM EST",
    tagline: "Aggressive rate negotiation and prime lane booking while freight demand peaks.",
    icon: "sun",
    metrics: [
      { label: "Avg RPM Target", value: "$3.25/mi", detail: "Optimized for top market rates" },
      { label: "Broker Comm Response", value: "< 2 mins", detail: "Instant phone & email negotiation" },
      { label: "Rate Con Turnaround", value: "< 10 mins", detail: "Fast packet & paperwork sign-off" },
    ],
    highlights: [
      "Curated load matching based on your equipment and preferred lanes",
      "Direct broker rate pushes & credit checks before booking",
      "Rate confirmations and setup packets handled 100% for you",
    ],
  },
  night: {
    mode: "night",
    title: "After-Hours & Overnight Dispatch Desk",
    timeRange: "06:00 PM — 06:00 AM EST",
    tagline: "Continuous monitoring, check-calls, and emergency roadside support so drivers sleep easy.",
    icon: "moon",
    metrics: [
      { label: "Dispatch Desk Uptime", value: "24/7/365", detail: "Never unmonitored on the road" },
      { label: "Emergency Response", value: "< 3 mins", detail: "Breakdown & gate dispute assistance" },
      { label: "Night Layover Rate", value: "0.0%", detail: "Zero trucks left stranded without next load" },
    ],
    highlights: [
      "24/7 dedicated phone line for urgent detention, gate & facility issues",
      "Overnight load tracking & automatic broker status updates",
      "Pre-booked morning reload strategy so you wake up with your next load",
    ],
  },
};

export function OnTheRoad() {
  const [activeShift, setActiveShift] = useState<"day" | "night">("day");

  const shift = shiftDetails[activeShift];

  return (
    <Section id="on-the-road" tone="navy-deep" className="relative overflow-hidden py-24 text-white md:py-32">
      {/* Dynamic ambient backdrop — changes subtle hue based on Day/Night mode */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 transition-opacity duration-1000">
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
        <div
          className={cn(
            "glow-accent absolute -left-32 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 transition-all duration-700",
            activeShift === "day" ? "opacity-35" : "opacity-20"
          )}
        />
        <div
          className={cn(
            "absolute -right-20 top-1/3 h-96 w-96 rounded-full blur-3xl transition-all duration-700",
            activeShift === "day" ? "bg-amber/15 opacity-40" : "bg-accent/15 opacity-30"
          )}
        />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="kicker inline-flex items-center gap-2 text-accent-soft">
            <span className="h-px w-6 bg-accent-soft/60" />
            {onTheRoad.eyebrow} &bull; 24/7 Operations Desk
            <span className="h-px w-6 bg-accent-soft/60" />
          </span>

          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {onTheRoad.title}
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            {onTheRoad.subtitle}
          </p>

          {/* Interactive Day ☀️ / Night 🌙 Shift Switcher Pill */}
          <div className="mt-8 inline-flex items-center rounded-2xl border border-white/15 bg-white/[0.06] p-1.5 backdrop-blur-xl">
            <button
              onClick={() => setActiveShift("day")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 sm:text-sm",
                activeShift === "day"
                  ? "bg-gradient-to-r from-amber to-amber/80 text-navy-deep shadow-lg"
                  : "text-white/70 hover:text-white"
              )}
            >
              <Icon name="sun" size={16} />
              Day Shift (06:00 AM - 06:00 PM)
            </button>
            <button
              onClick={() => setActiveShift("night")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 sm:text-sm",
                activeShift === "night"
                  ? "bg-gradient-to-r from-accent to-accent-strong text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              )}
            >
              <Icon name="moon" size={16} />
              Night Shift (06:00 PM - 06:00 AM)
            </button>
          </div>
        </div>

        {/* 24/7 Operational Shift Hero Panel */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Vector Fleet Command Visualizer */}
          <div className="order-2 lg:col-span-6 lg:order-1">
            <FleetCommandRadar mode={activeShift} />
          </div>

          {/* Right Shift Details Card */}
          <div className="order-1 lg:col-span-6 lg:order-2">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-navy-700/80 p-8 backdrop-blur-xl shadow-[0_30px_70px_-20px_rgba(2,6,20,0.8)] sm:p-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-accent-soft">
                  <Icon name={shift.icon} size={14} />
                  {shift.timeRange}
                </span>
                <span className="font-mono text-xs text-white/50">24/7 DISPATCH COVERAGE</span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                {shift.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                {shift.tagline}
              </p>

              {/* Metrics Row */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-5">
                {shift.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-[10px] uppercase tracking-wider text-white/50 font-mono">{m.label}</p>
                    <p className="mt-1 font-mono text-base font-bold text-accent-soft sm:text-lg">{m.value}</p>
                    <p className="text-[10px] text-white/50 truncate">{m.detail}</p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <ul className="mt-6 space-y-3">
                {shift.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs leading-relaxed text-white/85 sm:text-sm">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-positive/20 text-positive">
                      <Icon name="check" size={11} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
