import { services } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <Section id="services" tone="paper">
      <SectionHeading
        eyebrow="Dispatch Services"
        title="Everything You Need to Keep Your Truck Moving"
        description="A complete dispatch back office — load sourcing, negotiation, communication and paperwork — handled by people who treat your truck like their own."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={(i % 4) * 70} className="h-full">
            <a
              href="#contact"
              aria-label={`${service.title} — get started`}
              className={cn(
                "group relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1",
                service.featured
                  ? "border border-accent bg-gradient-to-br from-accent to-accent-strong text-white shadow-[var(--shadow-accent)]"
                  : "border border-line bg-paper hover:border-accent/40 hover:shadow-[var(--shadow-card)]"
              )}
            >
              <Icon
                name="arrow-up-right"
                size={18}
                className={cn(
                  "absolute right-5 top-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                  service.featured ? "text-white/70 group-hover:text-white" : "text-muted group-hover:text-accent"
                )}
              />

              <span
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-xl transition-colors",
                  service.featured
                    ? "bg-white/15 text-white"
                    : "bg-accent/10 text-accent-strong group-hover:bg-accent group-hover:text-white"
                )}
              >
                <Icon name={service.icon} size={24} />
              </span>

              {service.featured && (
                <span className="kicker mt-5 text-[0.62rem] text-white/75">Core service</span>
              )}

              <h3
                className={cn(
                  "font-display text-lg font-bold",
                  service.featured ? "mt-1 text-white" : "mt-5 text-ink"
                )}
              >
                {service.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  service.featured ? "text-white/85" : "text-muted"
                )}
              >
                {service.description}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
