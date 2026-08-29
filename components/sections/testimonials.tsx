import { testimonials, testimonialsNote } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export function Testimonials() {
  return (
    <Section id="testimonials" tone="paper" className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Carrier Stories"
        title="Trusted by Owner-Operators Across America"
        description="Real relationships built one load at a time. Here's what working with a dedicated dispatch partner actually feels like."
      />

      {/* Cards grid */}
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 80} className="h-full">
            <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[var(--shadow-card)]">
              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-4 select-none font-display text-8xl font-extrabold leading-none text-accent/[0.06]"
              >
                &ldquo;
              </span>

              {/* Stars + verified badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`} role="img">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={s}
                      className={s < t.rating ? "text-amber" : "text-line-strong"}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-positive/20 bg-positive/10 px-2.5 py-0.5 text-[10px] font-bold text-positive">
                  <Icon name="check" size={10} strokeWidth={3} />
                  Verified
                </span>
              </div>

              {/* Quote */}
              <blockquote className="relative mt-4 flex-1 text-[0.9375rem] font-normal leading-relaxed text-ink/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line/60 pt-5">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-600 to-navy-500 font-display text-sm font-extrabold text-white"
                >
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {t.role} · {t.equipment}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* Bottom trust row */}
      <Reveal delay={160} className="mt-10">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-mist px-6 py-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["MR", "SA", "TW"].map((init) => (
                <span
                  key={init}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-mist bg-gradient-to-br from-navy-600 to-accent font-display text-[11px] font-bold text-white"
                >
                  {init}
                </span>
              ))}
            </div>
            <p className="text-sm font-medium text-ink">
              Joined by <span className="text-accent-strong font-bold">840+ carriers</span> nationwide
            </p>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, s) => (
              <svg key={s} className="text-amber" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-semibold text-ink">4.9/5 avg rating</span>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 text-center font-mono text-xs text-muted">{testimonialsNote}</p>
    </Section>
  );
}
