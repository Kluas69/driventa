import { steps } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="paper">
      <SectionHeading
        eyebrow="How It Works"
        title="Getting Started Is Simple"
        description="From onboarding to your next booked load, the process is built to be fast, transparent and light on paperwork."
      />

      <div className="relative mt-16">
        {/* connector line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
        />

        <ol className="grid gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.number}>
              <Reveal delay={i * 90} className="relative flex flex-col">
                {/* faded step number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 right-1 font-display text-6xl font-extrabold text-ink/[0.05]"
                >
                  {step.number}
                </span>

                {/* icon badge — sits on the connector line */}
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-strong text-white shadow-[var(--shadow-accent)]">
                  <Icon name={step.icon} size={24} />
                </span>

                <span className="kicker mt-5 text-[0.62rem] text-accent-strong">Step {step.number}</span>
                <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <Reveal delay={120} className="mt-14 flex justify-center">
        <Button href={site.cta.apply.href} size="lg" trailingIcon="arrow-right">
          {site.cta.apply.label}
        </Button>
      </Reveal>
    </Section>
  );
}
