"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Sticky bottom CTA for mobile. Appears once the user scrolls past the hero
 * and hides again while the contact section (where the CTA is redundant) is
 * on screen.
 */
export function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    let contactVisible = false;

    const observer = contact
      ? new IntersectionObserver(
          ([entry]) => {
            contactVisible = entry.isIntersecting;
            update();
          },
          { threshold: 0.05 }
        )
      : null;
    observer?.observe(contact!);

    const update = () => setShow(window.scrollY > 620 && !contactVisible);

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 backdrop-blur-xl transition-transform duration-300 lg:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container-page flex items-center gap-3">
        <Button href={site.cta.call.href} variant="secondary" size="md" leadingIcon="phone" className="flex-1">
          Call
        </Button>
        <Button href={site.cta.primary.href} size="md" trailingIcon="arrow-right" className="flex-[1.4]">
          {site.cta.primary.label}
        </Button>
      </div>
    </div>
  );
}
