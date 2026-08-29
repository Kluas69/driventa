"use client";

import { cn } from "@/lib/utils";

interface FleetCommandRadarProps {
  mode: "day" | "night";
  className?: string;
}

export function FleetCommandRadar({ mode, className }: FleetCommandRadarProps) {
  const isDay = mode === "day";

  return (
    <div className={cn("relative w-full overflow-hidden rounded-3xl border border-white/15 bg-navy-deep/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8", className)}>
      {/* Dynamic Grid Background */}
      <div className="bg-grid-dark absolute inset-0 opacity-50" aria-hidden="true" />

      {/* Ambient Glows */}
      <div
        className={cn(
          "pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-all duration-700",
          isDay ? "bg-amber/20 opacity-60" : "bg-sky/20 opacity-40"
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-3xl transition-all duration-700",
          isDay ? "bg-accent/25 opacity-50" : "bg-accent-strong/40 opacity-60"
        )}
        aria-hidden="true"
      />

      {/* HUD Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-positive" />
          <span className="font-mono text-xs font-semibold tracking-wider text-white/80 uppercase">
            {isDay ? "Daytime Load Operations HUD" : "Overnight Dispatch Command HUD"}
          </span>
        </div>
        <span className="font-mono text-[11px] text-white/50">
          MODE: <span className={isDay ? "text-amber font-bold" : "text-sky font-bold"}>{mode.toUpperCase()}</span> &bull; 24/7 ACTIVE
        </span>
      </div>

      {/* Main Vector Semi-Truck & Route Canvas */}
      <div className="relative z-10 my-6">
        <svg viewBox="0 0 600 240" fill="none" className="h-auto w-full text-white" aria-hidden="true">
          <defs>
            {/* LED Headlight Beam Gradient */}
            <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDay ? "#f5a524" : "#38bdf8"} stopOpacity="0.8" />
              <stop offset="100%" stopColor={isDay ? "#f5a524" : "#38bdf8"} stopOpacity="0" />
            </linearGradient>

            {/* Trailer Body Gradient */}
            <linearGradient id="trailerBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#060c19" />
            </linearGradient>

            {/* Metallic Roof Accent */}
            <linearGradient id="roofAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Underglow Light Pool */}
          <ellipse
            cx="300"
            cy="202"
            rx="230"
            ry="12"
            fill={isDay ? "#f5a524" : "#2563eb"}
            opacity={isDay ? "0.3" : "0.45"}
            className="transition-all duration-700"
          />

          {/* Ground Highway Line */}
          <line x1="20" y1="202" x2="580" y2="202" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeDasharray="12 8" className="route-flow" />

          {/* Headlight Beam Effect (Shooting Forward) */}
          <polygon points="120,165 20,140 20,200" fill="url(#headlightBeam)" />

          {/* SEMI-TRUCK VECTOR GEOMETRY */}

          {/* 1. Aerodynamic Class 8 Sleeper Cab (Facing Left) */}
          <path
            d="M 120,190 L 120,140 C 120,132 125,124 135,120 L 165,110 C 175,108 190,108 200,108 L 220,108 L 220,190 Z"
            fill="url(#trailerBody)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />

          {/* Cab Windshield */}
          <path
            d="M 128,138 L 145,123 C 150,120 158,120 165,120 L 175,120 L 175,148 L 128,148 Z"
            fill={isDay ? "rgba(245, 165, 36, 0.4)" : "rgba(56, 189, 248, 0.4)"}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
          />

          {/* LED Headlight Lamp */}
          <rect x="116" y="162" width="8" height="18" rx="3" fill={isDay ? "#f5a524" : "#38bdf8"} />
          <rect x="114" y="165" width="4" height="12" rx="1" fill="#ffffff" />

          {/* 2. 53ft Trailer Body */}
          <rect
            x="216"
            y="72"
            width="320"
            height="118"
            rx="8"
            fill="url(#trailerBody)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />

          {/* Trailer Roof Accent Bar */}
          <rect x="216" y="72" width="320" height="10" rx="4" fill="url(#roofAccent)" />

          {/* Driventa Brand Logo Overlay on Trailer */}
          <g transform="translate(260, 105)">
            <text x="0" y="24" fill="rgba(255,255,255,0.9)" fontFamily="var(--font-display)" fontSize="26" fontWeight="800" letterSpacing="1">
              DRIVENTA
            </text>
            <text x="0" y="40" fill="var(--color-sky)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" letterSpacing="3">
              DISPATCH MANAGEMENT
            </text>
            {/* Decorative Stripe */}
            <rect x="0" y="46" width="180" height="3" rx="1.5" fill="var(--color-accent)" />
          </g>

          {/* Trailer Vertical Panel Lines */}
          <line x1="280" y1="82" x2="280" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="350" y1="82" x2="350" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="420" y1="82" x2="420" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="490" y1="82" x2="490" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

          {/* 3. Wheels & Chrome Rims */}
          {/* Steer Wheel (Front Cab) */}
          <g>
            <circle cx="155" cy="194" r="16" fill="#060c19" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <circle cx="155" cy="194" r="8" fill="var(--color-accent)" />
            <circle cx="155" cy="194" r="3" fill="#ffffff" />
          </g>

          {/* Drive Bogie (Double Wheels under Cab Rear) */}
          <g>
            <circle cx="198" cy="194" r="16" fill="#060c19" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <circle cx="198" cy="194" r="8" fill="var(--color-accent)" />
            <circle cx="198" cy="194" r="3" fill="#ffffff" />
          </g>

          {/* Trailer Tandem Wheels (Rear Trailer) */}
          <g>
            <circle cx="470" cy="194" r="16" fill="#060c19" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <circle cx="470" cy="194" r="8" fill="var(--color-accent)" />
            <circle cx="470" cy="194" r="3" fill="#ffffff" />

            <circle cx="510" cy="194" r="16" fill="#060c19" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <circle cx="510" cy="194" r="8" fill="var(--color-accent)" />
            <circle cx="510" cy="194" r="3" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Live Telemetry Data HUD Footer */}
      <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
          <p className="font-mono text-[10px] uppercase text-white/50">LANE COVERAGE</p>
          <p className="mt-0.5 font-mono text-sm font-bold text-white">ALL 50 STATES</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
          <p className="font-mono text-[10px] uppercase text-white/50">COMMUNICATION</p>
          <p className="mt-0.5 font-mono text-sm font-bold text-positive">24/7 DEDICATED</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
          <p className="font-mono text-[10px] uppercase text-white/50">AVG RESPONSE</p>
          <p className="mt-0.5 font-mono text-sm font-bold text-accent-soft">&lt; 2.8 MINS</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
          <p className="font-mono text-[10px] uppercase text-white/50">STATUS</p>
          <p className="mt-0.5 font-mono text-sm font-bold text-amber">COMMERCIAL ACTIVE</p>
        </div>
      </div>
    </div>
  );
}
