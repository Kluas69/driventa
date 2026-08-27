import { finalCta } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 text-white md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
        <div className="glow-accent absolute -left-24 top-0 h-[28rem] w-[28rem] opacity-40" />
        <div className="glow-accent absolute -bottom-32 right-0 h-[26rem] w-[26rem] opacity-25" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal
            as="h2"
            className="text-balance text-3xl font-extrabold leading-[1.06] sm:text-4xl md:text-5xl"
          >
            {finalCta.title}
          </Reveal>
          <Reveal as="p" delay={80} className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            {finalCta.description}
          </Reveal>

          <Reveal delay={160} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.cta.apply.href} size="lg" trailingIcon="arrow-right">
              {site.cta.apply.label}
            </Button>
            <Button href={site.cta.call.href} size="lg" variant="onDarkOutline" leadingIcon="phone">
              {site.phone.display}
            </Button>
          </Reveal>

          <Reveal delay={220} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/55">
            <span className="inline-flex items-center gap-2">
              <Icon name="check" size={15} className="text-accent-glow" strokeWidth={2.5} />
              US-based dispatch team
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="check" size={15} className="text-accent-glow" strokeWidth={2.5} />
              No long-term contracts
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="check" size={15} className="text-accent-glow" strokeWidth={2.5} />
              24/7 support
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
