import { finalCta } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white md:py-32">
      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 opacity-35" />
        <div className="glow-accent orb-drift absolute -left-32 top-0 h-[36rem] w-[36rem] opacity-35" />
        <div className="glow-sky orb-drift-slow absolute -right-24 bottom-0 h-[28rem] w-[28rem] opacity-20" />
      </div>

      {/* Gradient line at top */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <Reveal as="div" className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent-soft">
              <span className="pulse-dot-blue h-1.5 w-1.5 rounded-full bg-accent-glow" />
              Start Dispatching Today — No Contract Required
            </span>
          </Reveal>

          <Reveal
            as="h2"
            delay={80}
            className="mt-6 font-display text-[2rem] font-extrabold leading-[1.06] sm:text-4xl md:text-5xl lg:text-[3.5rem]"
          >
            {finalCta.title}
          </Reveal>

          <Reveal as="p" delay={140} className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            {finalCta.description}
          </Reveal>

          {/* CTA buttons */}
          <Reveal delay={200} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/apply"
              className="inline-flex h-14 items-center gap-2 rounded-2xl bg-accent px-8 text-base font-bold text-white shadow-[0_16px_48px_-12px_rgba(37,99,235,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_20px_56px_-12px_rgba(37,99,235,0.65)]"
            >
              {site.cta.apply.label}
              <Icon name="arrow-right" size={18} />
            </a>
            <a
              href={site.phone.href}
              className="inline-flex h-14 items-center gap-2 rounded-2xl border border-white/20 bg-white/[0.07] px-8 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.12] hover:text-white"
            >
              <Icon name="phone" size={17} />
              {site.phone.display}
            </a>
          </Reveal>

          {/* Trust micro-badges */}
          <Reveal delay={280} className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {[
              "US-based dispatch team",
              "No long-term contracts",
              "24/7 support desk",
              "Fast onboarding — same day",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm text-white/50">
                <Icon name="check" size={13} className="text-positive" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </Reveal>
        </div>
      </Container>

      {/* Gradient line at bottom */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
