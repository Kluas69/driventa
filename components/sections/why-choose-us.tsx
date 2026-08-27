import { benefits } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export function WhyChooseUs() {
  return (
    <Section id="why" tone="navy-deep">
      {/* backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
        <div className="glow-accent absolute -right-32 top-0 h-[30rem] w-[30rem] opacity-30" />
      </div>

      <div className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Why Carriers Choose Driventa"
          title="A Dispatch Partner That Works Like It's Your Own Truck"
          description="We combine experienced negotiators, real communication and a carrier-first mindset to keep your operation profitable and moving."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={(i % 4) * 70} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.07]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent-soft transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon name={benefit.icon} size={24} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
