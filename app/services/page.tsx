"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter((s) => {
    const q = searchTerm.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
  });

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-navy-deep page-hero text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-grid-dark absolute inset-0 opacity-35" />
          <div className="glow-accent absolute -left-40 top-0 h-[32rem] w-[32rem] opacity-28" />
          <div className="glow-sky absolute -right-20 bottom-0 h-64 w-64 opacity-18" />
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-deep to-transparent" />

        <Container className="relative text-center">
          <span className="kicker inline-flex items-center gap-2.5 text-accent-soft">
            <span className="h-px w-8 bg-accent-soft/50" />
            Full-Service Dispatch
            <span className="h-px w-8 bg-accent-soft/50" />
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Professional Dispatch Solutions
            <br className="hidden sm:block" />
            <span className="text-shimmer"> Built for Carriers</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
            From load sourcing to rate negotiation and broker paperwork, we act as your dedicated back office — so your trucks stay loaded and profitable every week.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-10 max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services — e.g. rate negotiation, paperwork…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-white/10 px-12 py-4 text-sm text-white placeholder:text-white/45 backdrop-blur-md transition-all focus:border-accent-soft/60 focus:bg-white/[0.14] focus:outline-none focus:ring-4 focus:ring-accent-soft/15"
              />
              <Icon name="search" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
                  aria-label="Clear search"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Services grid */}
      <div className="bg-mist py-16 md:py-24">
        <Container>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
              {searchTerm ? `Results for "${searchTerm}"` : "All Dispatch Services"}
              <span className="ml-2 text-base font-normal text-muted">({filteredServices.length})</span>
            </h2>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-paper p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]",
                    service.featured
                      ? "border-accent/30 shadow-sm ring-1 ring-accent/15"
                      : "border-line hover:border-accent/25"
                  )}
                >
                  {service.featured && (
                    <span className="absolute right-5 top-5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent-strong">
                      Core Service
                    </span>
                  )}
                  <div>
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:shadow-[var(--shadow-accent)]">
                      <Icon name={service.icon} size={26} />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold text-ink transition-colors group-hover:text-accent-strong">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
                  </div>
                  <div className="mt-7 border-t border-line/60 pt-5">
                    <a
                      href="/apply"
                      className="inline-flex items-center gap-2 text-sm font-bold text-accent-strong transition-all duration-200 group-hover:gap-3"
                    >
                      Get started with this service
                      <Icon name="arrow-right" size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-mist-200">
                <Icon name="search" size={28} className="text-muted" />
              </div>
              <p className="text-lg text-muted">No services found for &ldquo;{searchTerm}&rdquo;</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-sm font-bold text-accent-strong hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </Container>
      </div>

      {/* CTA Band */}
      <div className="relative overflow-hidden bg-navy-deep py-16 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-grid-dark absolute inset-0 opacity-30" />
        </div>
        <Container className="relative">
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                Ready to optimize your truck dispatch?
              </h2>
              <p className="mt-2 text-base text-white/65">
                Submit a carrier application in 2 minutes and start getting higher-paying loads.
              </p>
            </div>
            <a
              href="/apply"
              className="inline-flex shrink-0 h-13 items-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-bold text-white shadow-[var(--shadow-accent)] transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
              style={{ height: "3.25rem" }}
            >
              Apply Now
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
