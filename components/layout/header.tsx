"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { site } from "@/lib/site";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function Header() {
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid
          ? "border-b border-line bg-paper/85 shadow-[0_1px_0_rgba(10,19,39,0.04),0_10px_30px_-24px_rgba(10,19,39,0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between transition-[height] duration-300",
            scrolled ? "h-16" : "h-20"
          )}
        >
          {/* Brand */}
          <a
            href="#top"
            aria-label={`${site.name} home`}
            className="rounded-lg"
            onClick={() => setOpen(false)}
          >
            <Logo variant={solid ? "default" : "light"} markSize={scrolled ? 34 : 38} />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.menu ? (
                <MegaMenu key={item.label} item={item} solid={solid} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    solid
                      ? "text-navy/80 hover:text-accent-strong"
                      : "text-white/85 hover:text-white"
                  )}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.phone.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors",
                solid ? "text-navy hover:text-accent-strong" : "text-white/90 hover:text-white"
              )}
            >
              <Icon name="phone" size={16} />
              {site.phone.display}
            </a>
            <Button href={site.cta.primary.href} size="sm" trailingIcon="arrow-right">
              {site.cta.primary.label}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors lg:hidden",
              solid
                ? "border-line text-navy hover:bg-mist"
                : "border-white/20 text-white hover:bg-white/10"
            )}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t bg-paper transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[85vh] border-line opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <Container className="py-5">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line/70 py-3.5 text-base font-medium text-navy last:border-0"
              >
                {item.label}
                <Icon name="arrow-up-right" size={18} className="text-muted" />
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Button href={site.cta.primary.href} fullWidth trailingIcon="arrow-right" onClick={() => setOpen(false)}>
              {site.cta.primary.label}
            </Button>
            <Button href={site.phone.href} variant="secondary" fullWidth leadingIcon="phone">
              {site.phone.display}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}

/** Desktop mega-menu: revealed on hover and keyboard focus (CSS-driven). */
function MegaMenu({
  item,
  solid,
}: {
  item: (typeof nav)[number];
  solid: boolean;
}) {
  if (!item.menu) return null;
  return (
    <div className="group relative">
      <a
        href={item.href}
        aria-haspopup="menu"
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          solid
            ? "text-navy/80 hover:text-accent-strong"
            : "text-white/85 hover:text-white"
        )}
      >
        {item.label}
        <Icon
          name="chevron-down"
          size={15}
          className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </a>

      <div className="invisible absolute left-1/2 top-full z-10 w-[34rem] max-w-[92vw] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-[opacity,transform] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-lift)]">
          <div className="border-b border-line bg-mist px-5 py-3.5">
            <p className="font-display text-sm font-bold text-ink">{item.menu.heading}</p>
            <p className="mt-0.5 text-xs text-muted">{item.menu.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 p-2">
            {item.menu.items.map((sub) => (
              <a
                key={sub.label}
                href={sub.href}
                className="group/sub flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-mist"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent-strong transition-colors group-hover/sub:bg-accent group-hover/sub:text-white">
                  <Icon name={sub.icon} size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{sub.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{sub.description}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
