import { operations } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { DispatchPanel } from "@/components/illustrations/dispatch-panel";

const highlights = [
  { icon: "activity" as const, title: "Real-time load status", description: "Booked, in transit or delivered — always current." },
  { icon: "dollar" as const, title: "Rate & RPM at a glance", description: "See the numbers behind every load before it's confirmed." },
  { icon: "map-pin" as const, title: "Pickup & delivery windows", description: "Clear appointments so nothing gets missed on the road." },
];

export function Operations() {
  return (
    <Section id="operations" tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <Reveal
            as="span"
            className="kicker mb-4 inline-flex items-center gap-2 text-accent-strong"
          >
            <span className="h-px w-6 bg-accent/60" />
            {operations.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            delay={60}
            className="text-balance text-3xl leading-[1.08] text-ink sm:text-4xl md:text-[2.85rem]"
          >
            {operations.title}
          </Reveal>
          <Reveal as="p" delay={120} className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {operations.description}
          </Reveal>

          <ul className="mt-8 space-y-4">
            {highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={160 + i * 70} className="flex gap-4">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-strong">
                  <Icon name={h.icon} size={20} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{h.title}</p>
                  <p className="text-sm leading-relaxed text-muted">{h.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Panel */}
        <Reveal delay={140} className="relative">
          <div className="glow-accent pointer-events-none absolute inset-0 scale-110 opacity-30" aria-hidden="true" />
          <div className="relative">
            <DispatchPanel />
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-muted">{operations.note}</p>
        </Reveal>
      </div>
    </Section>
  );
}
