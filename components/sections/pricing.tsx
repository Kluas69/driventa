import { pricing } from "@/lib/content";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <Section id="pricing" tone="mist">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple, Transparent Dispatch Pricing"
        description="One straightforward dispatch service with everything included — no hidden fees and no long-term contracts."
      />

      <Reveal delay={80} className="mx-auto mt-14 max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-paper shadow-[var(--shadow-card)]">
          {/* accent top rule */}
          <div aria-hidden="true" className="h-1.5 w-full bg-gradient-to-r from-accent to-accent-strong" />

          <div className="grid gap-8 p-8 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="kicker text-[0.62rem] text-accent-strong">{pricing.planName}</span>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-display text-5xl font-extrabold tracking-tight text-ink">
                  {pricing.priceLabel}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{pricing.priceCaption}</p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <Button href={site.cta.apply.href} size="lg" trailingIcon="arrow-right">
                {site.cta.apply.label}
              </Button>
              <p className="text-xs text-muted">No long-term contracts</p>
            </div>
          </div>

          <div className="border-t border-line px-8 py-8 sm:px-10">
            <p className="kicker mb-5 text-[0.62rem] text-muted">Everything included</p>
            <ul className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {pricing.features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent-strong">
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-snug text-navy-700">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted">{pricing.priceNote}</p>
      </Reveal>
    </Section>
  );
}
