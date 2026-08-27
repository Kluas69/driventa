import Image from "next/image";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[520px] overflow-hidden bg-navy-deep text-white sm:min-h-[600px] md:min-h-[700px] lg:min-h-[780px]">
      {/* Full-bleed background image — shifted to keep the truck visible on mobile crop */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/driventa.png"
          alt=""
          fill
          priority
          className="object-[40%_center] object-cover sm:object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark gradient scrim — heavier on mobile to hide awkward crop, lighter on desktop to reveal truck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/70 to-navy-deep sm:bg-gradient-to-r sm:from-navy-deep sm:via-navy-deep/80 sm:to-transparent"
      />

      {/* Bottom edge fade so the hero blends into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-deep to-transparent sm:h-32"
      />

      {/* Content */}
      <Container className="relative z-10 flex min-h-[520px] flex-col justify-center pb-14 pt-24 sm:min-h-[600px] sm:pb-20 sm:pt-32 md:min-h-[700px] md:pt-36 lg:min-h-[780px] lg:pb-28 lg:pt-40">
        <div className="max-w-2xl">
          <Reveal
            as="span"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-medium text-white/85 backdrop-blur sm:px-3.5 sm:py-1.5 sm:text-xs"
          >
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent-glow sm:h-2 sm:w-2" />
            {hero.eyebrow}
          </Reveal>

          <Reveal
            as="h1"
            delay={80}
            className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight sm:mt-6 sm:text-[2.5rem] sm:leading-[1.04] md:text-6xl lg:text-[4.25rem]"
          >
            Keep Your Trucks Moving.{" "}
            <span className="bg-gradient-to-r from-accent-soft to-sky bg-clip-text text-transparent">
              We&apos;ll Handle the Dispatch.
            </span>
          </Reveal>

          <Reveal as="p" delay={160} className="mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
            {hero.subtitle}
          </Reveal>

          <Reveal as="ul" delay={220} className="mt-4 flex flex-wrap gap-x-4 gap-y-2 sm:mt-6 sm:gap-x-5 sm:gap-y-2.5">
            {hero.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 text-xs font-medium text-white/85 sm:gap-2 sm:text-sm">
                <Icon name="check" size={14} className="text-accent-glow" strokeWidth={2.5} />
                {h}
              </li>
            ))}
          </Reveal>

          <Reveal as="div" delay={280} className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Button href={site.cta.primary.href} size="lg" trailingIcon="arrow-right">
              {site.cta.primary.label}
            </Button>
            <Button href={site.cta.secondary.href} size="lg" variant="onDarkOutline">
              {site.cta.secondary.label}
            </Button>
          </Reveal>

          <Reveal as="p" delay={340} className="kicker mt-6 text-[0.6rem] text-white/60 sm:mt-8 sm:text-[0.68rem]">
            US-based support · 24/7 dispatch · No long-term contracts
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
