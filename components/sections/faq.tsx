"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="mist">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, Answered"
        description="Everything you need to know about working with Driventa. Still curious? Reach out and we'll walk you through it."
      />

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <Reveal key={i} delay={i * 50}>
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border bg-paper transition-colors duration-200",
                  isOpen ? "border-accent/40 shadow-soft" : "border-line"
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "rotate-180 border-accent bg-accent text-white"
                          : "border-line-strong text-muted"
                      )}
                    >
                      <Icon name="chevron-down" size={18} />
                    </span>
                  </button>
                </h3>

                <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion-panel" data-open={isOpen}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-muted">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
