"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { RouteMap } from "./route-map";

interface SimulatedLoad {
  id: string;
  reference: string;
  status: string;
  origin: { label: string; city: string; time: string };
  destination: { label: string; city: string; time: string };
  metrics: { label: string; value: string }[];
}

const sampleLoads: SimulatedLoad[] = [
  {
    id: "load-1",
    reference: "REF #DRV-84920",
    status: "In Transit",
    origin: { label: "Pickup", city: "Dallas, TX", time: "08:00 AM CST" },
    destination: { label: "Delivery", city: "Atlanta, GA", time: "04:30 PM EST" },
    metrics: [
      { label: "Miles", value: "782 mi" },
      { label: "RPM", value: "$3.15" },
      { label: "Rate", value: "$2,463" },
      { label: "Weight", value: "42,500 lbs" },
    ],
  },
  {
    id: "load-2",
    reference: "REF #DRV-91204",
    status: "Dispatched",
    origin: { label: "Pickup", city: "Chicago, IL", time: "06:30 AM CST" },
    destination: { label: "Delivery", city: "Miami, FL", time: "02:00 PM EST" },
    metrics: [
      { label: "Miles", value: "1,375 mi" },
      { label: "RPM", value: "$2.95" },
      { label: "Rate", value: "$4,056" },
      { label: "Weight", value: "38,000 lbs" },
    ],
  },
  {
    id: "load-3",
    reference: "REF #DRV-77401",
    status: "Booked",
    origin: { label: "Pickup", city: "Phoenix, AZ", time: "09:00 AM MST" },
    destination: { label: "Delivery", city: "Denver, CO", time: "05:15 PM MST" },
    metrics: [
      { label: "Miles", value: "620 mi" },
      { label: "RPM", value: "$3.40" },
      { label: "Rate", value: "$2,108" },
      { label: "Weight", value: "44,100 lbs" },
    ],
  },
];

export function DispatchPanel({ className }: { className?: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const load = sampleLoads[activeIdx];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-navy-700/95 p-5 shadow-[0_40px_90px_-30px_rgba(2,6,20,0.9)] backdrop-blur-xl sm:p-6",
        className
      )}
    >
      {/* Top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] to-transparent" />

      {/* Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-full bg-positive" />
          <span className="kicker text-[0.7rem] text-white/60">Live Dispatch Feed</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-positive/15 px-3 py-1 text-xs font-semibold text-positive ring-1 ring-inset ring-positive/30">
          <Icon name="check" size={13} strokeWidth={2.5} />
          {load.status}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="font-mono text-xs text-white/60">{load.reference}</p>

        {/* Lane Switcher Buttons */}
        <div className="flex gap-1">
          {sampleLoads.map((l, idx) => (
            <button
              key={l.id}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "rounded-md px-2 py-0.5 font-mono text-[10px] font-medium transition-all",
                activeIdx === idx
                  ? "bg-accent text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              )}
            >
              Lane #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Route Visualizer */}
      <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-navy-deep/80">
        <div className="relative h-36">
          <RouteMap />
          <div className="absolute left-4 bottom-3">
            <p className="text-[0.65rem] uppercase tracking-wider text-white/60">From</p>
            <p className="text-sm font-semibold text-white">{load.origin.city}</p>
          </div>
          <div className="absolute right-4 top-3 text-right">
            <p className="text-[0.65rem] uppercase tracking-wider text-white/60">To</p>
            <p className="text-sm font-semibold text-white">{load.destination.city}</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="relative mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {load.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
          >
            <p className="text-[0.62rem] uppercase tracking-wider text-white/60">{m.label}</p>
            <p
              className={cn(
                "tnum mt-0.5 font-mono text-base font-bold",
                m.label === "Rate" ? "text-accent-soft" : "text-white"
              )}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pickup & Delivery details */}
      <div className="relative mt-4 space-y-2">
        {[load.origin, load.destination].map((point) => (
          <div
            key={point.label}
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2 text-xs"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent-soft">
              <Icon name="map-pin" size={14} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] uppercase tracking-wider text-white/60">{point.label}</p>
              <p className="truncate font-semibold text-white">{point.city}</p>
            </div>
            <p className="shrink-0 font-mono text-white/60">{point.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
