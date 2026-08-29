"use client";

import { useState } from "react";
import { pricing } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export default function PricingPage() {
  const [trucks, setTrucks] = useState(1);
  const [weeklyMiles, setWeeklyMiles] = useState(2800);
  const [rpm, setRpm] = useState(2.75);

  const weeklyGross = trucks * weeklyMiles * rpm;
  const monthlyGross = weeklyGross * 4.33;

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-navy-deep page-hero text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-grid-dark absolute inset-0 opacity-35" />
          <div className="glow-accent absolute -right-24 top-0 h-[28rem] w-[28rem] opacity-28" />
          <div className="glow-sky absolute left-0 bottom-0 h-64 w-64 opacity-15" />
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-deep to-transparent" />
        <Container className="relative text-center">
          <span className="kicker inline-flex items-center gap-2.5 text-accent-soft">
            <span className="h-px w-8 bg-accent-soft/50" />
            Transparent Pricing
            <span className="h-px w-8 bg-accent-soft/50" />
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Simple, Carrier-First
            <br />
            <span className="text-shimmer">Pricing Structure</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            No hidden fees. No percentage traps. No long-term lock-in. We only win when your trucks stay loaded and profitable.
          </p>
        </Container>
      </div>

      {/* Calculator + features */}
      <div className="bg-mist py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">

            {/* Revenue calculator */}
            <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-[var(--shadow-lift)] lg:col-span-7">
              <div className="border-b border-line bg-mist/60 px-7 py-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon name="dollar" size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink">Gross Earnings Estimator</h2>
                    <p className="text-xs text-muted">Estimate your weekly gross based on target miles and RPM.</p>
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-9">
                <div className="space-y-7">
                  {/* Trucks slider */}
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-ink">Number of Trucks</span>
                      <span className="font-mono text-sm font-bold text-accent-strong">{trucks} {trucks === 1 ? "truck" : "trucks"}</span>
                    </div>
                    <input type="range" min={1} max={20} step={1} value={trucks}
                      onChange={(e) => setTrucks(Number(e.target.value))}
                      className="mt-3 w-full" />
                    <div className="mt-1 flex justify-between text-[10px] text-muted">
                      <span>1</span><span>20</span>
                    </div>
                  </div>

                  {/* Miles slider */}
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-ink">Weekly Miles (per truck)</span>
                      <span className="font-mono text-sm font-bold text-accent-strong">{weeklyMiles.toLocaleString()} mi</span>
                    </div>
                    <input type="range" min={1000} max={4000} step={100} value={weeklyMiles}
                      onChange={(e) => setWeeklyMiles(Number(e.target.value))}
                      className="mt-3 w-full" />
                    <div className="mt-1 flex justify-between text-[10px] text-muted">
                      <span>1,000 mi</span><span>4,000 mi</span>
                    </div>
                  </div>

                  {/* RPM slider */}
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-ink">Target Rate-Per-Mile</span>
                      <span className="font-mono text-sm font-bold text-accent-strong">${rpm.toFixed(2)}/mi</span>
                    </div>
                    <input type="range" min={1.80} max={4.50} step={0.05} value={rpm}
                      onChange={(e) => setRpm(Number(e.target.value))}
                      className="mt-3 w-full" />
                    <div className="mt-1 flex justify-between text-[10px] text-muted">
                      <span>$1.80</span><span>$4.50</span>
                    </div>
                  </div>
                </div>

                {/* Result card */}
                <div className="mt-8 overflow-hidden rounded-2xl bg-navy-deep">
                  <div className="grid grid-cols-2 divide-x divide-white/10">
                    <div className="px-6 py-6">
                      <p className="text-[10px] font-medium uppercase tracking-widest text-white/45">Weekly Gross</p>
                      <p className="mt-2 stat-value text-2xl font-extrabold text-accent-soft sm:text-3xl">
                        ${Math.round(weeklyGross).toLocaleString()}
                      </p>
                    </div>
                    <div className="px-6 py-6">
                      <p className="text-[10px] font-medium uppercase tracking-widest text-white/45">Monthly Gross</p>
                      <p className="mt-2 stat-value text-2xl font-extrabold text-positive sm:text-3xl">
                        ${Math.round(monthlyGross).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-white/10 px-6 py-3">
                    <p className="text-[10px] text-white/35">
                      *Estimate only. Actual results vary by equipment, market, and lane conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan features */}
            <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-paper shadow-[var(--shadow-lift)] lg:col-span-5">
              {/* Gradient top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-accent via-sky to-accent-strong" />

              <div className="p-7 sm:p-9">
                <span className="kicker text-accent-strong">{pricing.planName}</span>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
                    {pricing.priceLabel}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-muted">{pricing.priceCaption}</p>

                <div className="mt-7 space-y-3 border-t border-line pt-7">
                  <p className="kicker text-[0.62rem] text-muted">Everything Included</p>
                  <ul className="space-y-3">
                    {pricing.features.map((feat) => (
                      <li key={feat.text} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-positive/10 text-positive">
                          <Icon name="check" size={12} strokeWidth={3} />
                        </span>
                        <span className="font-medium text-navy-700">{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <a
                    href="/apply"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold text-white shadow-[var(--shadow-accent)] transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
                  >
                    Get Started Today
                    <Icon name="arrow-right" size={16} />
                  </a>
                  <p className="mt-3 text-center text-[11px] font-mono text-muted">{pricing.priceNote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ row */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { q: "Are there hidden fees?", a: "No. One flat percentage, everything included. No setup fee, no monthly minimums." },
              { q: "Can I cancel anytime?", a: "Yes. No long-term contracts. Cancel with 30 days notice — no questions asked." },
              { q: "How fast is onboarding?", a: "Most carriers are fully onboarded and dispatching within 24 hours of approval." },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-line bg-paper p-6">
                <p className="font-display text-base font-bold text-ink">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
