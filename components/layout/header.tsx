"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";
import { site } from "@/lib/site";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function Header() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const solid = scrolled || open;

  const closeMenu = useCallback(() => setOpen(false), []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {open && (
        <div
          className="nav-overlay lg:hidden"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-line/80 bg-paper/92 shadow-[0_1px_0_rgba(10,19,39,0.04),0_8px_28px_-20px_rgba(10,19,39,0.45)] backdrop-blur-2xl"
            : "border-b border-white/[0.07] bg-navy-deep/30 backdrop-blur-sm"
        )}
      >
        <Container>
          <div className="flex h-[72px] items-center justify-between gap-4 lg:h-[76px]">

            {/* Brand */}
            <a
              href="/"
              aria-label={`${site.name} home`}
              className="shrink-0 rounded-lg"
              onClick={closeMenu}
            >
              <Logo variant={solid ? "default" : "light"} markSize={34} />
            </a>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
              {nav.map((item) =>
                item.menu ? (
                  <MegaMenu key={item.label} item={item} solid={solid} active={isActive(item.href)} />
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      solid
                        ? isActive(item.href)
                          ? "text-accent-strong"
                          : "text-navy/75 hover:text-ink"
                        : isActive(item.href)
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-accent" />
                    )}
                  </a>
                )
              )}
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <a
                href={site.phone.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5",
                  solid
                    ? "border-line bg-mist text-ink hover:border-line-strong hover:bg-mist-200"
                    : "border-white/15 bg-white/[0.07] text-white/90 hover:bg-white/[0.12] hover:text-white"
                )}
              >
                <Icon name="phone" size={14} />
                {site.phone.display}
              </a>
              <Button href="/apply" size="sm" trailingIcon="arrow-right">
                Apply Now
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 lg:hidden active:scale-95",
                solid
                  ? "border-line bg-mist text-navy hover:border-line-strong hover:bg-mist-200"
                  : "border-white/15 bg-white/[0.07] text-white backdrop-blur-sm hover:bg-white/[0.12]"
              )}
            >
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
              {/* Animated hamburger → X */}
              <span className="relative h-5 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-[5px] h-[2px] w-full rounded-full transition-all duration-300",
                    solid ? "bg-navy" : "bg-white",
                    open ? "top-[9px] rotate-45" : ""
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[9px] h-[2px] w-full rounded-full transition-all duration-300",
                    solid ? "bg-navy" : "bg-white",
                    open ? "opacity-0 translate-x-2" : ""
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[13px] h-[2px] w-full rounded-full transition-all duration-300",
                    solid ? "bg-navy" : "bg-white",
                    open ? "top-[9px] -rotate-45" : ""
                  )}
                />
              </span>
            </button>
          </div>
        </Container>

        {/* Mobile drawer */}
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={cn(
            "absolute inset-x-0 top-full border-t bg-paper shadow-[0_24px_48px_-12px_rgba(10,19,39,0.22)] transition-all duration-350 lg:hidden",
            open
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-2 opacity-0 pointer-events-none"
          )}
        >
          <Container className="py-4">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b border-line/60 py-4 text-base font-semibold transition-colors last:border-0",
                    isActive(item.href) ? "text-accent-strong" : "text-navy hover:text-accent"
                  )}
                >
                  <span className="flex items-center gap-3">
                    {isActive(item.href) && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                    {item.label}
                  </span>
                  <Icon name="arrow-up-right" size={17} className="text-muted" />
                </a>
              ))}
            </nav>

            {/* Mobile CTA buttons inside drawer */}
            <div className="mt-5 flex flex-col gap-3 pb-2">
              <Button
                href="/apply"
                fullWidth
                trailingIcon="arrow-right"
                onClick={closeMenu}
                className="h-12 text-base"
              >
                Apply as a Carrier
              </Button>
              <a
                href={site.phone.href}
                onClick={closeMenu}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-mist text-sm font-semibold text-navy transition-colors hover:bg-mist-200"
              >
                <Icon name="phone" size={16} />
                {site.phone.display}
              </a>
            </div>

            {/* Trust micro-badge */}
            <p className="mt-3 pb-4 text-center text-xs text-muted">
              🟢 24/7 Dispatch Support · No long-term contracts
            </p>
          </Container>
        </div>
      </header>
    </>
  );
}

/** Desktop mega-menu — CSS hover driven */
function MegaMenu({
  item,
  solid,
  active,
}: {
  item: (typeof nav)[number];
  solid: boolean;
  active: boolean;
}) {
  if (!item.menu) return null;
  return (
    <div className="group relative">
      <a
        href={item.href}
        aria-haspopup="menu"
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
          solid
            ? active ? "text-accent-strong" : "text-navy/75 hover:text-ink"
            : active ? "text-white" : "text-white/75 hover:text-white"
        )}
      >
        {item.label}
        <Icon
          name="chevron-down"
          size={14}
          className="mt-px transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
        />
        {active && (
          <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-accent" />
        )}
      </a>

      {/* Dropdown */}
      <div className="invisible absolute left-1/2 top-full z-20 w-[36rem] max-w-[94vw] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-lift)]">
          <div className="border-b border-line bg-mist px-5 py-4">
            <p className="font-display text-sm font-bold text-ink">{item.menu.heading}</p>
            <p className="mt-0.5 text-xs text-muted">{item.menu.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 p-2">
            {item.menu.items.map((sub) => (
              <a
                key={sub.label}
                href={sub.href}
                className="group/sub flex items-start gap-3 rounded-xl p-3.5 transition-colors hover:bg-mist"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition-all duration-200 group-hover/sub:bg-accent group-hover/sub:text-white group-hover/sub:shadow-[var(--shadow-accent)]">
                  <Icon name={sub.icon} size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{sub.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{sub.description}</span>
                </span>
              </a>
            ))}
          </div>
          <div className="border-t border-line bg-mist/50 px-5 py-3">
            <a
              href={item.href}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-strong hover:underline"
            >
              View all {item.label.toLowerCase()}
              <Icon name="arrow-right" size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
