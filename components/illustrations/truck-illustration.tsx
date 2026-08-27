import { cn } from "@/lib/utils";
import type { Equipment } from "@/lib/types";

/**
 * ============================================================================
 * Original side-profile truck illustrations (one per equipment type).
 * Consistent geometric line + duotone style, drawn on a 300×150 canvas.
 * Colors: `currentColor` (set to ink) for structure, accent for rims/details.
 * No external images — fully self-contained and crisp at any size.
 * ============================================================================
 */

const CY = 116; // wheel centre-line
const R = 15;

function Wheel({ cx, r = R }: { cx: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={CY} r={r} fill="var(--color-navy)" />
      <circle cx={cx} cy={CY} r={r * 0.52} fill="var(--color-accent)" />
      <circle cx={cx} cy={CY} r={r * 0.18} fill="#fff" />
    </g>
  );
}

/** Two closely-spaced wheels (a trailer/drive bogie). */
function Bogie({ cx }: { cx: number }) {
  return (
    <>
      <Wheel cx={cx - 15} />
      <Wheel cx={cx + 15} />
    </>
  );
}

const body = {
  fill: "#ffffff",
  stroke: "var(--color-ink)",
  strokeWidth: 2,
  strokeLinejoin: "round" as const,
};
const glass = "var(--color-accent-soft)";

function DryVanBits() {
  return (
    <>
      {/* trailer box */}
      <rect x={96} y={34} width={192} height={74} rx={5} {...body} />
      {/* door + side rail detail */}
      <path d="M270 40v62M255 40v62M104 74h150" stroke="var(--color-ink)" strokeWidth={1.4} opacity={0.5} />
      <rect x={96} y={34} width={192} height={9} rx={4} fill="var(--color-accent)" opacity={0.9} />
      <Bogie cx={244} />
    </>
  );
}

function illustrationFor(type: Equipment["illustration"]) {
  switch (type) {
    case "dry-van":
      return (
        <>
          <DryVanBits />
          <TractorSleeper />
        </>
      );

    case "reefer":
      return (
        <>
          <rect x={96} y={34} width={192} height={74} rx={5} {...body} />
          <path d="M270 40v62M104 74h158" stroke="var(--color-ink)" strokeWidth={1.4} opacity={0.5} />
          {/* reefer unit on the nose */}
          <rect x={86} y={40} width={16} height={30} rx={3} {...body} />
          <path d="M89 47h10M89 52h10M89 57h10" stroke="var(--color-ink)" strokeWidth={1.3} opacity={0.6} />
          {/* snowflake accent */}
          <g stroke="var(--color-accent)" strokeWidth={1.8} strokeLinecap="round">
            <path d="M250 60v20M241 65l18 10M259 65l-18 10" />
          </g>
          <rect x={96} y={34} width={192} height={9} rx={4} fill="var(--color-accent)" opacity={0.9} />
          <Bogie cx={244} />
          <TractorSleeper />
        </>
      );

    case "flatbed":
      return (
        <>
          {/* frame + deck */}
          <path d="M92 100h196v8H92z" {...body} />
          <path d="M118 108v8M270 108v8" stroke="var(--color-ink)" strokeWidth={2} />
          {/* secured load */}
          <rect x={150} y={72} width={104} height={28} rx={3} {...body} />
          <path d="M170 70v32M210 70v32M240 70v32" stroke="var(--color-accent)" strokeWidth={2} />
          <Bogie cx={244} />
          <TractorSleeper />
        </>
      );

    case "step-deck":
      return (
        <>
          {/* upper deck near kingpin, then step down */}
          <path d="M96 88h56v8H96zM152 96v-8h4l0 12M152 104h136v8H152z" {...body} />
          <path d="M120 96v8" stroke="var(--color-ink)" strokeWidth={2} />
          {/* load on lower deck */}
          <rect x={176} y={78} width={96} height={26} rx={3} {...body} />
          <path d="M198 76v30M236 76v30" stroke="var(--color-accent)" strokeWidth={2} />
          <Bogie cx={248} />
          <TractorSleeper />
        </>
      );

    case "box-truck":
      return (
        <>
          {/* single-unit straight truck: box body */}
          <rect x={92} y={40} width={168} height={68} rx={5} {...body} />
          <path d="M244 46v58" stroke="var(--color-ink)" strokeWidth={1.4} opacity={0.5} />
          <rect x={92} y={40} width={168} height={9} rx={4} fill="var(--color-accent)" opacity={0.9} />
          {/* cab */}
          <path d="M40 66c0-4 3-7 7-7h30c4 0 6 2 8 5l7 12v32H40z" {...body} />
          <path d="M62 64h20l6 12H62z" fill={glass} stroke="var(--color-ink)" strokeWidth={1.6} />
          <Wheel cx={62} />
          <Bogie cx={224} />
        </>
      );

    case "hotshot":
      return (
        <>
          {/* gooseneck flatbed trailer */}
          <path d="M120 104h158v7H120zM120 104V86h8v18" {...body} />
          <rect x={168} y={82} width={86} height={22} rx={3} {...body} />
          <path d="M190 80v26M226 80v26" stroke="var(--color-accent)" strokeWidth={2} />
          {/* dually pickup */}
          <path d="M30 74c0-4 3-6 7-6h34c3 0 5 1 7 4l9 14v22H30z" {...body} />
          <path d="M74 108h34v-6l-6-8H74z" {...body} />
          <path d="M50 72h20v14H46z" fill={glass} stroke="var(--color-ink)" strokeWidth={1.6} />
          <Wheel cx={50} r={13} />
          <Bogie cx={96} />
        </>
      );

    case "power-only":
      return (
        <>
          {/* just the tractor with an exposed fifth wheel */}
          <TractorSleeper wide />
          {/* fifth-wheel plate highlight */}
          <path d="M150 92h34v6h-34z" fill="var(--color-accent)" />
          <path d="M158 92v-4M170 92v-4" stroke="var(--color-accent)" strokeWidth={2} />
        </>
      );
  }
}

/** Shared modern sleeper tractor (used by the trailer combos). */
function TractorSleeper({ wide = false }: { wide?: boolean }) {
  const rear = wide ? 150 : 92;
  return (
    <>
      {/* sleeper + cab body */}
      <path
        d={`M22 52c0-4 3-7 7-7h${rear - 52}c5 0 8 3 8 8v55H22z`}
        {...body}
      />
      {/* windshield + side window */}
      <path d="M28 54h26v22H28z" fill={glass} stroke="var(--color-ink)" strokeWidth={1.6} />
      {/* exhaust stack */}
      <path d="M20 40v18" stroke="var(--color-ink)" strokeWidth={3} strokeLinecap="round" />
      {/* accent beltline */}
      <path d={`M22 84h${rear - 22}`} stroke="var(--color-accent)" strokeWidth={2} />
      <Wheel cx={42} />
      <Wheel cx={wide ? 118 : 78} />
    </>
  );
}

export function TruckIllustration({
  type,
  className,
}: {
  type: Equipment["illustration"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 150"
      fill="none"
      role="img"
      aria-hidden="true"
      className={cn("h-auto w-full text-ink", className)}
    >
      {/* soft ground shadow */}
      <ellipse cx={158} cy={134} rx={140} ry={6} fill="var(--color-ink)" opacity={0.07} />
      {illustrationFor(type)}
    </svg>
  );
}
