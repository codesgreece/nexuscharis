"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
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
      className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="faq-heading"
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-purple-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-purple-electric/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
          >
            Συχνές ερωτήσεις
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Απαντήσεις σε όσα ρωτάνε συχνότερα οι συνεργάτες μας πριν ξεκινήσουν ένα project.
            Αν δεν βρίσκεις αυτό που ψάχνεις,{" "}
            <a
              href="#contact"
              className="font-semibold text-purple-deep underline-offset-2 hover:underline"
            >
              επικοινώνησε μαζί μας
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-6 space-y-2.5 sm:space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <Reveal key={item.id} delay={Math.min(index * 30, 200)}>
                <div
                  className={cn(
                    "faq-item overflow-hidden rounded-[1.125rem] border bg-white transition-[border-color,box-shadow] duration-300 sm:rounded-[1.25rem]",
                    isOpen
                      ? "border-purple-primary/40 shadow-[0_10px_28px_-20px_rgba(109,40,217,0.45)]"
                      : "border-border-soft shadow-[0_6px_18px_-16px_rgba(76,29,149,0.22)] hover:border-purple-primary/35 hover:shadow-[0_10px_26px_-18px_rgba(109,40,217,0.35)]",
                  )}
                >
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      className="flex min-h-[58px] w-full items-center gap-3 px-[18px] py-3.5 text-left focus-ring sm:min-h-[68px] sm:gap-4 sm:px-7 sm:py-4"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="min-w-0 flex-1 text-base font-semibold leading-snug text-[#171717] sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10",
                          isOpen
                            ? "border-purple-primary/35 bg-lavender-soft text-purple-deep"
                            : "border-border-soft bg-lavender-light text-purple-primary",
                        )}
                        aria-hidden
                      >
                        <Plus
                          className={cn(
                            "h-4 w-4 transition-transform duration-300 ease-out sm:h-[18px] sm:w-[18px]",
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
                          "space-y-2.5 border-t border-border-soft/70 px-[18px] pb-4 pt-3 sm:px-7 sm:pb-4",
                          "transition-transform duration-300 ease-out",
                          isOpen ? "translate-y-0" : "-translate-y-1",
                        )}
                      >
                        {item.answer.map((paragraph, i) => (
                          <p
                            key={`${item.id}-${i}`}
                            className="text-sm leading-relaxed text-muted sm:text-[15px]"
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
    </section>
  );
}
