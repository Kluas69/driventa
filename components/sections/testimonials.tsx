import { testimonials, testimonialsNote } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export function Testimonials() {
  return (
    <Section id="testimonials" tone="paper">
      <SectionHeading
        eyebrow="What Carriers Say"
        title="Trusted by Owner-Operators & Small Fleets"
        description="Real relationships, built one load at a time. Here's what working with a dedicated dispatch partner feels like."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 90} className="h-full">
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 shadow-soft transition-shadow duration-300 hover:shadow-[var(--shadow-card)]">
              <Icon name="quote" size={30} className="text-accent/25" />

              {/* rating */}
              <div className="mt-4 flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Icon
                    key={s}
                    name="star"
                    size={16}
                    className={s < t.rating ? "text-amber" : "text-line-strong"}
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-navy-700">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent-strong"
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.role} · {t.equipment}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted">{testimonialsNote}</p>
    </Section>
  );
}
