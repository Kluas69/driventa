"use client";

import Image from "next/image";
import { onTheRoad } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useScrollProgress } from "@/lib/hooks/use-scroll-progress";

/**
 * "On the Road" — a dark full-width band that gives the brand's truck a
 * scroll-driven moment. As the band scrolls into view the truck drives in
 * from off-screen-left and decelerates into place (easeOut = braking), a
 * route line draws in beneath it, a soft shadow settles, and it idles with a
 * gentle bob. Reduced-motion → the truck simply rests in its final position
 * (the scroll hook pins progress to 1; .float-slow / .route-flow are already
 * disabled by the reduced-motion block in globals.css).
 *
 * The truck art is the user's own Truck.svg, optimized into /public and drawn
 * as one crisp decorative <img> (it has no separable parts to animate).
 */
export function OnTheRoad() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(0.55);

  // Ease the raw progress so the truck decelerates as it arrives (brakes).
  const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
  const driveIn = (1 - eased) * -120; // % of its own width: off-left → rest
  const appear = Math.min(eased * 1.6, 1); // fade/scale ramp in a touch sooner
  const scale = 0.94 + appear * 0.06;

  return (
    <Section id="on-the-road" tone="navy-deep" className="overflow-hidden">
      {/* Ambient dark-highway backdrop (mirrors the hero's treatment). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
        <div className="glow-accent absolute -left-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-25" />
      </div>

      <div
        ref={ref}
        className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12"
      >
        {/* Truck lane — the scroll-driven drive-in. */}
        <div className="relative order-2 h-[38vw] max-h-64 min-h-40 lg:order-1 lg:h-56">
          {/* Route line drawing in beneath the wheels. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 40"
            className="absolute inset-x-0 bottom-4 z-0 h-auto w-full overflow-visible"
          >
            {/* soft underlay glow */}
            <path
              d="M0 20 H1200"
              pathLength={100}
              className="fill-none stroke-accent/25"
              strokeWidth={9}
              strokeLinecap="round"
              style={{ strokeDasharray: 100, strokeDashoffset: 100 * (1 - eased) }}
            />
            {/* crisp route */}
            <path
              d="M0 20 H1200"
              pathLength={100}
              className="fill-none stroke-sky"
              strokeWidth={2.5}
              strokeLinecap="round"
              style={{ strokeDasharray: 100, strokeDashoffset: 100 * (1 - eased) }}
            />
            {/* flowing lane dashes (continuous; reduced-motion-safe) */}
            <path
              d="M0 20 H1200"
              className="route-flow fill-none stroke-accent-soft/60"
              strokeWidth={2.5}
              strokeDasharray="8 16"
              style={{ opacity: eased }}
            />
          </svg>

          {/* Settling ground shadow. */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-1/2 z-0 h-6 w-[62%] rounded-[50%] bg-black/40 blur-md"
            style={{
              opacity: appear * 0.8,
              transform: `translateX(-50%) scaleX(${0.6 + appear * 0.4})`,
            }}
          />

          {/* Truck: outer wrapper = scroll-linked drive-in, inner = idle bob. */}
          <div
            className="absolute inset-x-0 bottom-2 z-10 will-change-transform"
            style={{
              transform: `translateX(${driveIn}%) scale(${scale})`,
              opacity: appear,
              transformOrigin: "left bottom",
            }}
          >
            <div className="float-slow relative h-full w-full">
              <Image
                src="/driventa.png"
                alt="Driventa truck on the highway"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 460px"
              />
            </div>
          </div>
        </div>

        {/* Copy. */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow={onTheRoad.eyebrow}
            title={onTheRoad.title}
            description={onTheRoad.subtitle}
          />
        </div>
      </div>
    </Section>
  );
}
