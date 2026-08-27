import { cn } from "@/lib/utils";
import { operations } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { RouteMap } from "./route-map";

/**
 * Conceptual dispatch dashboard — a premium dark "screen" showing a single
 * load in motion. Illustrative only (see the disclaimer rendered by the
 * Operations section); not a real financial or accounting dashboard.
 */
export function DispatchPanel({ className }: { className?: string }) {
  const { load } = operations;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-navy-700/95 p-5 shadow-[0_40px_90px_-30px_rgba(2,6,20,0.9)] backdrop-blur-xl sm:p-6",
        className
      )}
    >
      {/* top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />

      {/* header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-full bg-positive" />
          <span className="kicker text-[0.7rem] text-white/60">Active Load</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-positive/15 px-3 py-1 text-xs font-semibold text-positive ring-1 ring-inset ring-positive/30">
          <Icon name="check" size={13} strokeWidth={2.5} />
          {load.status}
        </span>
      </div>
      <p className="relative mt-1 font-mono text-xs text-white/60">{load.reference}</p>

      {/* route */}
      <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-navy-deep/70">
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

      {/* metrics */}
      <div className="relative mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {load.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
          >
            <p className="text-[0.62rem] uppercase tracking-wider text-white/60">{m.label}</p>
            <p
              className={cn(
                "tnum mt-0.5 font-mono text-base font-semibold",
                m.label === "Rate" ? "text-accent-soft" : "text-white"
              )}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* pickup / delivery */}
      <div className="relative mt-4 space-y-2.5">
        {[load.origin, load.destination].map((point) => (
          <div
            key={point.label}
            className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent/15 text-accent-soft">
              <Icon name="map-pin" size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] uppercase tracking-wider text-white/60">{point.label}</p>
              <p className="truncate text-sm font-medium text-white">{point.city}</p>
            </div>
            <p className="shrink-0 font-mono text-xs text-white/55">{point.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
