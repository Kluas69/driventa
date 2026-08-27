import Image from "next/image";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";

const trustPoints = [
  { icon: "clock" as const, label: "24/7 Broker Communication" },
  { icon: "dollar" as const, label: "Better Rate Negotiation" },
  { icon: "route" as const, label: "Nationwide Load Coverage" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-navy-deep text-white sm:min-h-[600px] md:min-h-[700px] lg:min-h-[780px]"
    >
      {/* ── Background image ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/driventa-mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-[65%_center] sm:hidden sm:object-center"
          sizes="(min-width: 640px) 0px, 100vw"
        />
        <Image
          src="/driventa.png"
          alt=""
          fill
          priority
          className="hidden object-center object-cover sm:block"
          sizes="(max-width: 640px) 0px, 100vw"
        />
      </div>

      {/* ── Gradient layers (mobile) ─────────────────────────────────── */}
      {/* Layer 1 — vertical: dense top → transparent mid → dense bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,10,18,0.92) 0%, rgba(5,10,18,0.60) 35%, rgba(5,10,18,0.15) 58%, rgba(5,10,18,0.80) 100%)",
        }}
      />
      {/* Layer 2 — diagonal: stronger left side for headline protection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(115deg, rgba(5,10,18,0.70) 0%, rgba(5,10,18,0.25) 45%, transparent 70%)",
        }}
      />
      {/* Layer 3 — subtle vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 sm:hidden"
        style={{
          background:
            "radial-gradient(ellipse at 70% 65%, transparent 40%, rgba(5,10,18,0.45) 100%)",
        }}
      />

      {/* ── Gradient (desktop) ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent sm:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-navy-deep to-transparent sm:block"
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-[max(3rem,8svh)] pt-28 sm:min-h-[600px] sm:justify-center sm:pb-20 sm:pt-32 md:min-h-[700px] md:pt-36 lg:min-h-[780px] lg:pb-28 lg:pt-40">
        <div className="max-w-xl">
          {/* ── Badge ──────────────────────────────────────────────── */}
          <Reveal
            as="span"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-[5px] text-[0.6875rem] font-medium tracking-wide text-white/75 backdrop-blur-md sm:py-1.5 sm:text-xs"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-glow sm:h-2 sm:w-2" />
            {hero.eyebrow}
          </Reveal>

          {/* ── Headline ───────────────────────────────────────────── */}
          <Reveal
            as="h1"
            delay={80}
            className="mt-4 font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:mt-6 sm:text-[2.5rem] sm:leading-[1.04] md:text-6xl lg:text-[4.25rem]"
          >
            Keep Your Trucks
            <br />
            Moving.
            <br />
            <span className="bg-gradient-to-r from-accent-soft to-sky bg-clip-text text-transparent">
              We&apos;ll Handle
              <br className="sm:hidden" /> the Dispatch.
            </span>
          </Reveal>

          {/* ── Subtitle ───────────────────────────────────────────── */}
          <Reveal
            as="p"
            delay={160}
            className="mt-4 max-w-md text-[0.9375rem] leading-[1.6] text-white/60 sm:mt-6 sm:text-lg"
          >
            {hero.subtitle}
          </Reveal>

          {/* ── CTA ────────────────────────────────────────────────── */}
          <Reveal as="div" delay={240} className="mt-7 sm:mt-9">
            <Button
              href={site.cta.primary.href}
              size="lg"
              trailingIcon="arrow-right"
              className="h-[3.25rem] rounded-2xl px-6 text-[0.9375rem] shadow-[0_16px_40px_-16px_rgba(37,99,235,0.45)] sm:h-14 sm:px-7 sm:text-base"
            >
              {site.cta.primary.label}
            </Button>
            <p className="mt-2.5 text-[0.6875rem] font-medium tracking-wide text-white/40 sm:text-xs">
              No long-term contracts &bull; Fast onboarding
            </p>
          </Reveal>

          {/* ── Benefits glass panel ────────────────────────────────── */}
          <Reveal as="div" delay={300} className="mt-6 sm:mt-8">
            <div className="rounded-2xl border border-white/[0.08] bg-[#070f1c]/[0.58] p-1 backdrop-blur-xl sm:inline-block sm:w-full sm:max-w-md">
              {trustPoints.map((t, i) => (
                <div
                  key={t.label}
                  className={`flex items-center gap-3 px-4 py-3.5 ${
                    i < trustPoints.length - 1
                      ? "border-b border-white/[0.06]"
                      : ""
                  }`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15">
                    <Icon
                      name={t.icon}
                      size={16}
                      className="text-accent-glow"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="text-[0.8125rem] font-medium text-white/85 sm:text-sm">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── See How It Works ────────────────────────────────────── */}
          <Reveal as="div" delay={360} className="mt-5 sm:mt-6">
            <a
              href={site.cta.secondary.href}
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-white/40 transition-colors duration-200 hover:text-white/70 sm:text-sm"
            >
              <Icon name="chevron-down" size={15} strokeWidth={2} />
              See How It Works
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
