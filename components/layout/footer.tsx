import { footerColumns } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/types";

const year = 2026; // static build year — safe for SSR/edge caching

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <Container className="relative">
        {/* Brand row */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/60">{site.tagline}</p>
          </div>
          <div className="flex items-center gap-3">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                <Icon name={s.icon as IconName} size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="kicker text-[0.7rem] text-white/60">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
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
            <h3 className="kicker text-[0.7rem] text-white/60">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={site.phone.href} className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
                  <Icon name="phone" size={15} className="text-accent-soft" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
                  <Icon name="mail" size={15} className="text-accent-soft" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/70">
                <Icon name="clock" size={15} className="text-accent-soft" />
                {site.supportHours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
