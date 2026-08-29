"use client";

import { useState } from "react";
import { equipment } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { TruckIllustration } from "@/components/illustrations/truck-illustration";
import { cn } from "@/lib/utils";

export function Equipment() {
  const [activeId, setActiveId] = useState(equipment[0].id);

  const activeItem = equipment.find((e) => e.id === activeId) ?? equipment[0];

  return (
    <Section id="equipment" tone="paper">
      <SectionHeading
        eyebrow="Equipment We Dispatch"
        title="Dispatch Support Built for Your Specific Trailer Setup"
        description="Whatever you pull, you're matched with a dedicated dispatcher who knows the freight rates, specialized lanes, and broker contacts for your setup."
      />

      {/* Interactive Equipment Switcher Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {equipment.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={cn(
              "rounded-2xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 sm:px-5 sm:py-3 sm:text-sm",
              activeId === item.id
                ? "bg-accent text-white shadow-[var(--shadow-accent)]"
                : "bg-paper text-ink hover:bg-paper/80 border border-line hover:border-accent/40"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Active Equipment Highlight Hero Panel */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-paper shadow-[var(--shadow-lift)] transition-all duration-300">
        <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
          {/* Left Illustration */}
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-mist to-mist-200 p-8 lg:col-span-6">
            <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="glow-accent pointer-events-none absolute inset-0 scale-90 opacity-30" aria-hidden="true" />
            <TruckIllustration
              type={activeItem.illustration}
              className="relative max-w-xs transition-transform duration-500 hover:scale-105 sm:max-w-md"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent-strong">
                <Icon name="truck" size={14} />
                Dedicated Freight Matching
              </span>

              <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                {activeItem.name} Dispatch Services
              </h3>

              <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                {activeItem.description}
              </p>

              <div className="mt-6 space-y-2.5 border-t border-line/60 pt-5">
                {[
                  "Dedicated rate negotiator & load sourcing",
                  "Direct broker setups & rate confirmations",
                  "Detention & layover support included",
                ].map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3 text-sm text-ink">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-positive/10 text-positive">
                      <Icon name="check" size={13} strokeWidth={2.5} />
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/apply"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white shadow-[var(--shadow-accent)] transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
              >
                Apply for {activeItem.name}
                <Icon name="arrow-right" size={16} />
              </a>
              <a
                href="/equipment"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-mist/60 px-6 text-sm font-semibold text-ink transition-colors hover:bg-mist"
              >
                View Trailer Specs Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
