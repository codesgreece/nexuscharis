"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { growthFaqItems } from "@/content/growth-services";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function GrowthFaq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14"
      aria-labelledby="growth-faq-heading"
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-purple-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-purple-electric/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            FAQ
          </p>
          <h2
            id="growth-faq-heading"
            className="mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
          >
            Συχνές ερωτήσεις για τις υπηρεσίες growth
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Ξεκάθαρα για μηνιαία πακέτα, εφάπαξ αλλαγές και τι ισχύει με τις ώρες εργασίας.
          </p>
        </Reveal>

        <div className="mt-10 space-y-3 sm:mt-8 sm:space-y-4">
          {growthFaqItems.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `growth-faq-panel-${item.id}`;
            const buttonId = `growth-faq-button-${item.id}`;

            return (
              <Reveal key={item.id} delay={Math.min(index * 40, 240)}>
                <div
                  className={cn(
                    "faq-item overflow-hidden rounded-[1.5rem] border bg-white transition-all duration-300",
                    isOpen
                      ? "border-purple-primary/35 shadow-[0_18px_44px_-28px_rgba(109,40,217,0.55)]"
                      : "border-border-soft shadow-[0_14px_36px_-28px_rgba(76,29,149,0.28)]",
                  )}
                >
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      className="flex w-full items-center gap-4 px-5 py-4 text-left focus-ring sm:gap-5 sm:px-6 sm:py-5"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="flex-1 text-base font-bold leading-snug text-[#171717] sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300",
                          isOpen
                            ? "border-purple-primary/30 bg-lavender-soft text-purple-deep"
                            : "border-border-soft bg-lavender-light text-purple-primary",
                        )}
                        aria-hidden
                      >
                        <Plus
                          className={cn(
                            "h-5 w-5 transition-transform duration-300",
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
                      <div className="space-y-3 border-t border-border-soft/80 px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
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
