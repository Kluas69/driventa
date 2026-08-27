import { about } from "@/lib/content";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import type { IconName } from "@/lib/types";

const pillarIcons: IconName[] = ["target", "headset", "handshake"];

export function About() {
  return (
    <Section id="about" tone="paper">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Story */}
        <div>
          <Reveal as="span" className="kicker mb-4 inline-flex items-center gap-2 text-accent-strong">
            <span className="h-px w-6 bg-accent/60" />
            {about.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            delay={60}
            className="text-balance text-3xl leading-[1.08] text-ink sm:text-4xl md:text-[2.85rem]"
          >
            {about.title}
          </Reveal>

          <div className="mt-6 space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={120 + i * 60} className="leading-relaxed text-muted">
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal delay={320} className="mt-8">
            <Button href={site.cta.primary.href} trailingIcon="arrow-right">
              {site.cta.primary.label}
            </Button>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {about.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 90} className="h-full">
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-mist p-6 transition-colors hover:border-accent/40 lg:items-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-strong">
                  <Icon name={pillarIcons[i] ?? "shield-check"} size={24} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{pillar.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
