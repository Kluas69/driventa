import type { Metadata } from "next";
import { about } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us | Driventa Dispatch Services",
  description:
    "Learn about Driventa's mission to empower owner-operators and small fleets with dedicated dispatch, rate negotiation, and carrier-first support.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
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
              {about.eyebrow}
              <span className="h-px w-6 bg-accent-soft/60" />
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              {about.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              We provide owner-operators and small carriers with dedicated dispatch support to eliminate paperwork, negotiate higher rates, and maximize uptime.
            </p>
          </div>
        </Container>
      </div>

      {/* Content & Pillars */}
      <Section tone="mist" className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="rounded-3xl border border-line bg-paper p-8 shadow-[var(--shadow-card)] sm:p-12">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Our Mission</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
                {about.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Pillars */}
            <div className="grid gap-6 sm:grid-cols-3">
              {about.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-line bg-paper p-6 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent-strong">
                    <Icon name="shield-check" size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-3xl bg-navy-deep p-8 text-center text-white sm:p-12">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">Ready to work with a team that puts carriers first?</h3>
              <p className="mt-3 text-white/70">Get started today — onboarding takes less than 10 minutes.</p>
              <div className="mt-6 flex justify-center">
                <Button href="/apply" size="lg" trailingIcon="arrow-right">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
