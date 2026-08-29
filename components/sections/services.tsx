import { services } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <Section id="services" tone="mist" className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Dispatch Services"
        title="Everything You Need to Keep Your Trucks Moving"
        description="A complete dispatch back office — load sourcing, negotiation, broker communication and paperwork — handled by people who treat your operation like their own."
      />

      {/* Bento grid */}
      <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const isFeatured = service.featured;
          return (
            <Reveal
              key={service.id}
              delay={(i % 4) * 60}
              className={cn("h-full", isFeatured && "sm:col-span-2 sm:row-span-2")}
            >
              <a
                href="/services"
                aria-label={`${service.title} — learn more`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all duration-300 sm:p-7",
                  "hover:-translate-y-1",
                  isFeatured
                    ? "bg-gradient-to-br from-navy-700 via-navy-600 to-navy-500 text-white border border-navy-400/50 shadow-[var(--shadow-lift)]"
                    : "border border-line bg-paper hover:border-accent/30 hover:shadow-[var(--shadow-card)]"
                )}
              >
                {/* Background pattern for featured */}
                {isFeatured && (
                  <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
                )}
                {/* Accent glow for featured */}
                {isFeatured && (
                  <div className="glow-accent pointer-events-none absolute -right-12 -top-12 h-48 w-48 opacity-30" aria-hidden="true" />
                )}

                {/* Arrow icon */}
                <Icon
                  name="arrow-up-right"
                  size={18}
                  className={cn(
                    "absolute right-5 top-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    isFeatured ? "text-white/50 group-hover:text-white" : "text-muted group-hover:text-accent"
                  )}
                />

                {/* Icon */}
                <span
                  className={cn(
                    "relative grid place-items-center rounded-2xl transition-all duration-300",
                    isFeatured
                      ? "h-14 w-14 bg-white/[0.12] text-white group-hover:bg-white/20"
                      : "h-12 w-12 bg-accent/10 text-accent-strong group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:shadow-[var(--shadow-accent)]"
                  )}
                >
                  <Icon name={service.icon} size={isFeatured ? 26 : 22} />
                </span>

                {/* Featured tag */}
                {isFeatured && (
                  <span className="relative kicker mt-4 text-[0.62rem] text-white/55">Core service</span>
                )}

                {/* Title */}
                <h3
                  className={cn(
                    "relative font-display font-bold leading-snug",
                    isFeatured
                      ? "mt-2 text-2xl text-white sm:text-3xl"
                      : "mt-4 text-lg text-ink group-hover:text-accent-strong"
                  )}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className={cn(
                    "relative mt-2.5 text-sm leading-relaxed",
                    isFeatured ? "max-w-xs text-white/70" : "text-muted"
                  )}
                >
                  {service.description}
                </p>

                {/* Featured CTA */}
                {isFeatured && (
                  <div className="relative mt-auto pt-6">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-accent)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-accent-strong">
                      Get Started
                      <Icon name="arrow-right" size={15} />
                    </span>
                  </div>
                )}
              </a>
            </Reveal>
          );
        })}
      </div>

      {/* Bottom CTA row */}
      <Reveal delay={200} className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-mist p-5 sm:flex-row sm:p-6">
        <div>
          <p className="font-display text-base font-bold text-ink sm:text-lg">
            All services included in one plan. No à-la-carte fees.
          </p>
          <p className="mt-0.5 text-sm text-muted">Every carrier gets the full Driventa back office from day one.</p>
        </div>
        <a
          href="/services"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-accent/30 bg-accent/5 px-5 py-2.5 text-sm font-bold text-accent-strong transition-all hover:bg-accent hover:text-white"
        >
          View All Services
          <Icon name="arrow-right" size={15} />
        </a>
      </Reveal>
    </Section>
  );
}
