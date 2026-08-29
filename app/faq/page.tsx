"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-navy-deep py-20 text-white md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-grid-dark absolute inset-0 opacity-40" />
          <div className="glow-accent absolute -left-20 top-0 h-96 w-96 opacity-30" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kicker inline-flex items-center gap-2 text-accent-soft">
              <span className="h-px w-6 bg-accent-soft/60" />
              Help & Resources
              <span className="h-px w-6 bg-accent-soft/60" />
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Find answers to common questions about Driventa dispatch services, rate negotiations, equipment setups, and onboarding.
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Search questions (e.g. rate, equipment, paperwork)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white/10 px-11 py-3.5 text-sm text-white placeholder:text-white/50 backdrop-blur-md transition-colors focus:border-accent-soft focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-accent-soft/20"
                />
                <Icon
                  name="search"
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <Icon name="close" size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Accordion FAQ Section */}
      <Section tone="mist" className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-display text-lg font-bold text-ink pr-4">
                      {faq.question}
                    </span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-mist text-muted transition-transform duration-200">
                      <Icon
                        name="chevron-down"
                        size={18}
                        className={isOpen ? "rotate-180 text-accent-strong" : ""}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-line/60 px-6 py-5 text-sm leading-relaxed text-muted bg-mist/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-muted">No questions found matching &quot;{searchQuery}&quot;.</p>
              </div>
            )}

            {/* Still have questions fallback */}
            <div className="mt-12 rounded-3xl border border-line bg-paper p-8 text-center shadow-[var(--shadow-card)]">
              <h3 className="font-display text-xl font-bold text-ink">Have a question not listed here?</h3>
              <p className="mt-2 text-sm text-muted">Chat live with our dispatch team or send us a message.</p>
              <div className="mt-6 flex justify-center gap-4">
                <Button href="/apply" trailingIcon="arrow-right">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
