import { equipment } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { TruckIllustration } from "@/components/illustrations/truck-illustration";
import { cn } from "@/lib/utils";

export function Equipment() {
  return (
    <Section id="equipment" tone="mist">
      <SectionHeading
        eyebrow="Equipment We Dispatch"
        title="Dispatch Support for Your Equipment"
        description="Whatever you pull, you're matched with a dispatcher who knows the freight, the lanes and the requirements for your setup."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {equipment.map((item, i) => {
          const featured = i === 0;
          return (
            <Reveal
              key={item.id}
              delay={(i % 4) * 70}
              className={cn("h-full", featured && "sm:col-span-2")}
            >
              <a
                href="#contact"
                aria-label={`${item.name} dispatch — get started`}
                className={cn(
                  "group flex h-full overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-card)]",
                  featured ? "flex-col lg:flex-row" : "flex-col"
                )}
              >
                {/* Illustration */}
                <div
                  className={cn(
                    "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-mist-200 p-6",
                    featured ? "lg:w-1/2" : ""
                  )}
                >
                  <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
                  <div className="glow-accent pointer-events-none absolute inset-0 scale-90 opacity-0 transition-opacity duration-500 group-hover:opacity-40" aria-hidden="true" />
                  <TruckIllustration
                    type={item.illustration}
                    className={cn(
                      "relative transition-transform duration-500 group-hover:scale-[1.03]",
                      featured ? "max-w-sm" : "max-w-[15rem]"
                    )}
                  />
                </div>

                {/* Content */}
                <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-8")}>
                  {featured && (
                    <span className="kicker mb-2 text-[0.62rem] text-accent-strong">Most requested</span>
                  )}
                  <h3 className={cn("font-display font-bold text-ink", featured ? "text-2xl" : "text-lg")}>
                    {item.name}
                  </h3>
                  <p className={cn("mt-2 leading-relaxed text-muted", featured ? "text-base" : "text-sm")}>
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
                    Get dispatched
                    <Icon
                      name="arrow-right"
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
