import { steps } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="mist" className="py-20 md:py-28">
      <SectionHeading
        eyebrow="How It Works"
        title="From Application to First Load in 24 Hours"
        description="We built our onboarding process so that carriers can get dispatching support the same day they apply — no delays, no confusion."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 80}>
            <div className="group relative h-full rounded-3xl border border-line bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[var(--shadow-card)]">
              {/* Step number — large ghosted background */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-2 select-none font-display text-7xl font-extrabold leading-none text-ink/[0.04]"
              >
                {step.number}
              </span>

              {/* Icon */}
              <span className="relative z-10 grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-strong text-white shadow-[var(--shadow-accent)] transition-transform duration-300 group-hover:scale-110"
                style={{ height: "3.25rem", width: "3.25rem" }}
              >
                <Icon name={step.icon} size={22} />
              </span>

              {/* Step label */}
              <span className="kicker mt-5 block text-[0.62rem] text-accent-strong">
                Step {String(step.number).padStart(2, "0")}
              </span>

              <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-ink sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>

              {/* Connector arrow (desktop, not last) */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper shadow-sm">
                    <Icon name="arrow-right" size={14} className="text-muted" />
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160} className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/apply" size="lg" trailingIcon="arrow-right" className="h-13 px-8">
          {site.cta.apply.label}
        </Button>
        <a
          href={site.phone.href}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-6 py-3 text-sm font-semibold text-navy transition-all hover:border-accent/30 hover:text-accent-strong"
        >
          <Icon name="phone" size={15} />
          Questions? Call Us
        </a>
      </Reveal>
    </Section>
  );
}
