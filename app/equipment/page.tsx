"use client";

import { useState } from "react";
import { equipment } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const equipmentSpecs: Record<string, { weight: string; length: string; lanes: string; cargo: string }> = {
  "dry-van": { weight: "Up to 45,000 lbs", length: "53 ft", lanes: "Midwest ↔ Southeast, Texas ↔ West Coast", cargo: "General freight, boxed goods, retail, dry food products" },
  reefer: { weight: "Up to 43,500 lbs", length: "53 ft", lanes: "California ↔ East Coast, Florida ↔ Midwest", cargo: "Produce, frozen foods, pharmaceuticals, temp-sensitive freight" },
  flatbed: { weight: "Up to 48,000 lbs", length: "48 ft - 53 ft", lanes: "Southeast ↔ Texas, Midwest ↔ Mountain West", cargo: "Lumber, steel coils, machinery, construction materials" },
  "step-deck": { weight: "Up to 48,000 lbs", length: "53 ft", lanes: "Midwest ↔ Gulf Coast, Coast to Coast", cargo: "Over-height machinery, tractors, industrial equipment" },
  "box-truck": { weight: "Up to 10,000 lbs", length: "26 ft", lanes: "Regional & Metropolitan corridors", cargo: "Expedited LTL, final-mile, high-value electronics" },
  hotshot: { weight: "Up to 16,500 lbs", length: "40 ft Gooseneck", lanes: "Oilfield corridors, Texas, Southeast", cargo: "Urgent machinery parts, pipes, automotive freight" },
  "power-only": { weight: "Variable", length: "Tractor only", lanes: "National drop-and-hook networks", cargo: "Broker trailers, fleet overflow, leased equipment" },
};

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState(equipment[0].id);

  const selectedItem = equipment.find((e) => e.id === activeTab) ?? equipment[0];
  const selectedSpec = equipmentSpecs[selectedItem.id] ?? equipmentSpecs["dry-van"];

  return (
    <>
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-navy-deep py-20 text-white md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-grid-dark absolute inset-0 opacity-40" />
          <div className="glow-accent absolute -left-40 top-0 h-96 w-96 opacity-30" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kicker inline-flex items-center gap-2 text-accent-soft">
              <span className="h-px w-6 bg-accent-soft/60" />
              Tailored Equipment Dispatch
              <span className="h-px w-6 bg-accent-soft/60" />
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Dedicated Freight Sourcing for Every Setup
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Whether you run a 53ft Reefer, a Flatbed, or a 26ft Box Truck, our dispatchers understand the specific load boards, rates, and permit requirements for your rig.
            </p>
          </div>
        </Container>
      </div>

      {/* Interactive Trailer Showcase */}
      <Section tone="mist" className="py-16 md:py-24">
        <Container>
          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-line pb-8">
            {equipment.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200",
                  activeTab === item.id
                    ? "bg-accent text-white shadow-[var(--shadow-accent)]"
                    : "bg-paper text-ink hover:bg-paper/80 border border-line"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Active Equipment Card Detail */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-paper shadow-[var(--shadow-lift)]">
            <div className="grid gap-8 p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent-strong">
                    <Icon name="truck" size={14} />
                    Equipment Details
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-extrabold text-ink md:text-4xl">
                    {selectedItem.name} Dispatch
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    {selectedItem.description}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-mist/50 p-4">
                      <p className="text-xs uppercase tracking-wider text-muted font-mono">Payload Capacity</p>
                      <p className="mt-1 font-display text-lg font-bold text-ink">{selectedSpec.weight}</p>
                    </div>
                    <div className="rounded-2xl border border-line bg-mist/50 p-4">
                      <p className="text-xs uppercase tracking-wider text-muted font-mono">Standard Length</p>
                      <p className="mt-1 font-display text-lg font-bold text-ink">{selectedSpec.length}</p>
                    </div>
                    <div className="rounded-2xl border border-line bg-mist/50 p-4 sm:col-span-2">
                      <p className="text-xs uppercase tracking-wider text-muted font-mono">Recommended Lanes</p>
                      <p className="mt-1 font-display text-base font-semibold text-accent-strong">{selectedSpec.lanes}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-line">
                  <Button href="/apply" size="lg" trailingIcon="arrow-right">
                    Apply for {selectedItem.name} Dispatch
                  </Button>
                </div>
              </div>

              {/* Right Info Box */}
              <div className="flex flex-col justify-center rounded-2xl bg-navy-deep p-8 text-white lg:col-span-5">
                <h3 className="font-display text-xl font-bold text-white">
                  Common Cargo Handled
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {selectedSpec.cargo}
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {[
                    "Dedicated rate negotiator for this equipment",
                    "Direct broker contacts & contract loads",
                    "Setup packets & detention support included",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-xs text-white/80">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-positive/20 text-positive">
                        <Icon name="check" size={12} strokeWidth={3} />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
