"use client";

import { useEffect, useId, useRef } from "react";
import type { ConsentPreferences, ConsentState } from "@/lib/consent";

type CookieSettingsModalProps = {
  open: boolean;
  draft: ConsentPreferences;
  onChange: (next: ConsentPreferences) => void;
  onClose: () => void;
  onSave: () => void;
  stored?: ConsentState | null;
};

const categories: Array<{
  key: keyof ConsentPreferences;
  title: string;
  description: string;
  locked?: boolean;
}> = [
  {
    key: "necessary",
    title: "Απαραίτητα",
    description:
      "Απαιτούνται για βασική λειτουργία (π.χ. ασφαλή σύνδεση διαχειριστή, αποθήκευση επιλογής consent). Πάντα ενεργά.",
    locked: true,
  },
  {
    key: "analytics",
    title: "Αναλύσεις",
    description:
      "Μετρήσεις επισκεψιμότητας. Προς το παρόν δεν φορτώνεται analytics script· η κατηγορία υπάρχει για μελλοντική χρήση με συγκατάθεση.",
  },
  {
    key: "functional",
    title: "Λειτουργικότητα",
    description:
      "Προαιρετικές βελτιώσεις εμπειρίας (π.χ. απομνημόνευση συχνότητας popup). Μη απαραίτητα λειτουργικά cookies δεν αποθηκεύονται χωρίς συγκατάθεση.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Διαφημιστικά / remarketing scripts τρίτων. Δεν φορτώνονται χωρίς ρητή συγκατάθεση.",
  },
];

export function CookieSettingsModal({
  open,
  draft,
  onChange,
  onClose,
  onSave,
  stored,
}: CookieSettingsModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel || !focusable?.length) return;
      const items = Array.from(focusable);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Κλείσιμο ρυθμίσεων cookies"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border-soft bg-white text-[#171717] shadow-2xl sm:rounded-2xl"
      >
        <div className="border-b border-border-soft px-5 py-4">
          <h2 id={titleId} className="text-xl font-bold text-purple-deep">
            Ρυθμίσεις cookies
          </h2>
          <p className="mt-1 text-sm text-muted">
            Επιλέξτε ποιες κατηγορίες επιτρέπετε. Τα απαραίτητα παραμένουν πάντα ενεργά.
          </p>
          {stored ? (
            <p className="mt-2 text-xs text-muted">
              Τελευταία αποθήκευση: {new Date(stored.timestamp).toLocaleString("el-GR")} ·
              έκδοση {stored.version}
            </p>
          ) : null}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {categories.map((category) => {
            const checked = draft[category.key];
            const inputId = `cookie-cat-${category.key}`;
            return (
              <div
                key={category.key}
                className="rounded-2xl border border-border-soft bg-lavender-light p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <label htmlFor={inputId} className="font-semibold text-[#171717]">
                      {category.title}
                    </label>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
                    <button
                      id={inputId}
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      aria-disabled={category.locked || undefined}
                      disabled={category.locked}
                      onClick={() => {
                        if (category.locked) return;
                        onChange({ ...draft, [category.key]: !checked });
                      }}
                      className={`relative h-7 w-12 rounded-full transition focus-ring disabled:cursor-not-allowed disabled:opacity-80 ${
                        checked ? "bg-purple-primary" : "bg-[#d4d0e0]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
                          checked ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="text-[11px] text-muted">
                      {checked ? "Ενεργό" : "Ανενεργό"}
                      {category.locked ? " (υποχρεωτικό)" : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 border-t border-border-soft p-4 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 rounded-2xl border border-border-soft px-4 py-2.5 text-sm font-semibold text-purple-deep hover:bg-lavender-soft focus-ring"
          >
            Ακύρωση
          </button>
          <button
            type="button"
            onClick={onSave}
            className="min-h-11 flex-1 rounded-2xl bg-purple-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-bright focus-ring"
          >
            Αποθήκευση επιλογών
          </button>
        </div>
      </div>
    </div>
  );
}
