import { footerColumns } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/types";

const year = 2026;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      {/* Background decoration */}
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="glow-accent pointer-events-none absolute -left-64 bottom-0 h-[500px] w-[500px] opacity-20" aria-hidden="true" />
      <div className="glow-sky pointer-events-none absolute -right-64 top-0 h-[400px] w-[400px] opacity-15" aria-hidden="true" />

      <Container className="relative">

        {/* ── Top CTA band ── */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-white/10 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-[0.7rem] font-mono font-medium tracking-widest uppercase text-white/40 mb-1">
              Ready to grow your fleet revenue?
            </p>
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              Start dispatching smarter with Driventa.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/apply"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-white shadow-[var(--shadow-accent)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-strong"
            >
              Apply as a Carrier
              <Icon name="arrow-right" size={16} />
            </a>
            <a
              href={site.phone.href}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 text-sm font-semibold text-white/90 transition-all duration-200 hover:bg-white/[0.12] hover:text-white"
            >
              <Icon name="phone" size={14} />
              {site.phone.display}
            </a>
          </div>
        </div>

        {/* ── Brand + links grid ── */}
        <div className="grid gap-10 border-b border-white/10 py-12 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {site.tagline}
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 text-xs text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-positive pulse-dot shrink-0" />
                US-Based Dispatch Team — All 48 States
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-white/45">
                <span className="shrink-0 text-positive">✓</span>
                No Long-Term Contracts Required
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-white/45">
                <span className="shrink-0 text-accent-soft">✓</span>
                24/7 Dispatch Support Desk
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-white/50 transition-all duration-200 hover:border-accent/50 hover:bg-accent hover:text-white hover:-translate-y-0.5"
                >
                  <Icon name={s.icon as IconName} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="kicker text-[0.65rem] text-white/40">{col.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div>
              <h3 className="kicker text-[0.65rem] text-white/40">Contact</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href={site.phone.href}
                    className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                  >
                    <Icon name="phone" size={13} className="shrink-0 text-accent-soft" />
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                  >
                    <Icon name="mail" size={13} className="shrink-0 text-accent-soft" />
                    {site.email}
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-white/60">
                  <Icon name="clock" size={13} className="shrink-0 text-accent-soft" />
                  {site.supportHours}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-4 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name} · {site.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-white/70">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white/70">Terms of Service</a>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-positive" />
              All systems operational
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
