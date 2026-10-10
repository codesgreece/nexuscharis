"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FaqNexusGraphic } from "@/components/sections/FaqNexusGraphic";
import { faqItems } from "@/content/faq";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="surface-ivory section-texture relative overflow-hidden py-10 sm:py-12 lg:py-14"
      aria-labelledby="faq-heading"
    >
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-purple-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-24 h-72 w-72 rounded-full bg-muted-amber/10 blur-3xl" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <Reveal>
              <p className="eyebrow">FAQ</p>
              <h2
                id="faq-heading"
                className="section-title mt-2 max-w-xl"
              >
                Συχνές ερωτήσεις
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Απαντήσεις σε όσα ρωτάνε συχνότερα οι συνεργάτες μας πριν ξεκινήσουν ένα
                project. Αν δεν βρίσκεις αυτό που ψάχνεις,{" "}
                <a
                  href="#contact"
                  className="font-semibold text-purple-deep underline-offset-2 hover:underline"
                >
                  επικοινώνησε μαζί μας
                </a>
                .
              </p>
            </Reveal>

            <div className="mt-4 max-w-2xl space-y-2 sm:mt-5 sm:space-y-2.5">
              {faqItems.map((item, index) => {
                const isOpen = openId === item.id;
                const panelId = `faq-panel-${item.id}`;
                const buttonId = `faq-button-${item.id}`;

                return (
                  <Reveal key={item.id} delay={Math.min(index * 24, 160)}>
                    <div
                      className={cn(
                        "faq-item overflow-hidden rounded-[1rem] border bg-warm-ivory/95 transition-[border-color,box-shadow,background-color] duration-300",
                        isOpen
                          ? "border-purple-primary/40 bg-lavender/30 shadow-[0_10px_28px_-20px_rgba(109,40,217,0.35)]"
                          : "border-soft-border shadow-[0_4px_14px_-12px_rgba(65,42,66,0.12)] hover:border-purple-primary/30 hover:bg-soft-cream/50",
                      )}
                    >
                      <h3 className="m-0">
                        <button
                          id={buttonId}
                          type="button"
                          className="flex min-h-[52px] w-full items-center gap-3 px-4 py-3.5 text-left focus-ring sm:min-h-[56px] sm:gap-4 sm:px-5"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggle(item.id)}
                        >
                          <span className="min-w-0 flex-1 text-[0.95rem] font-semibold leading-snug text-warm-charcoal sm:text-base">
                            {item.question}
                          </span>
                          <span
                            className={cn(
                              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-9 sm:w-9",
                              isOpen
                                ? "border-purple-primary/35 bg-lavender text-purple-deep shadow-[0_0_0_3px_rgba(109,40,217,0.08)]"
                                : "border-soft-border bg-soft-cream text-purple-primary",
                            )}
                            aria-hidden
                          >
                            <Plus
                              className={cn(
                                "h-4 w-4 transition-transform duration-300 ease-out",
                                isOpen && "rotate-45",
                              )}
                            />
                          </span>
                        </button>
                      </h3>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={cn("faq-panel", isOpen && "is-open")}
                      >
                        <div className="faq-panel-inner">
                          <div
                            className={cn(
                              "space-y-2 border-t border-soft-border/70 px-4 pb-3.5 pt-2.5 sm:px-5 sm:pb-4",
                              "transition-transform duration-300 ease-out",
                              isOpen ? "translate-y-0" : "-translate-y-1",
                            )}
                          >
                            {item.answer.map((paragraph, i) => (
                              <p
                                key={`${item.id}-${i}`}
                                className="text-sm leading-relaxed text-muted"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal
            delay={80}
            className="mx-auto w-full max-w-[18rem] lg:sticky lg:top-28 lg:mx-0 lg:max-w-none lg:self-start"
          >
            <div className="rounded-[1.5rem] border border-purple-primary/10 bg-gradient-to-b from-lavender/70 via-warm-ivory to-soft-cream p-4 sm:p-5 lg:p-6">
              <FaqNexusGraphic active={Boolean(openId)} />
              <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-purple-deep/55">
                NEXUS Digital System
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
