"use client";

import { site } from "@/lib/site";
import { Icon } from "@/components/ui/icon";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      {/* Safe area + background */}
      <div className="border-t border-line/80 bg-paper/96 px-4 pb-[env(safe-area-inset-bottom)] pt-3 shadow-[0_-4px_24px_rgba(10,19,39,0.12)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {/* Call button */}
          <a
            href={site.phone.href}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-mist text-sm font-semibold text-navy transition-colors active:bg-mist-200"
            aria-label={`Call ${site.phone.display}`}
          >
            <Icon name="phone" size={16} className="text-accent" />
            Call Us
          </a>

          {/* Apply button — primary */}
          <a
            href="/apply"
            className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold text-white shadow-[var(--shadow-accent)] transition-all active:scale-[0.98] active:bg-accent-strong"
            aria-label="Apply as a carrier partner"
          >
            Apply as Carrier
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
