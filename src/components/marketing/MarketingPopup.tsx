"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type PopupData = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  triggerDelayMs: number;
  displayFrequency: string;
};

function storageKey(id: string, frequency: string) {
  return `nexus_popup_${frequency}_${id}`;
}

export function MarketingPopup({ popup }: { popup: PopupData | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!popup) return;
    const key = storageKey(popup.id, popup.displayFrequency);
    if (popup.displayFrequency === "ONCE_EVER" && localStorage.getItem(key)) return;
    if (popup.displayFrequency === "ONCE_PER_DAY") {
      const last = localStorage.getItem(key);
      if (last && Date.now() - Number(last) < 24 * 60 * 60 * 1000) return;
    }
    if (popup.displayFrequency === "ONCE_PER_SESSION" && sessionStorage.getItem(key)) return;

    const timer = window.setTimeout(() => setOpen(true), popup.triggerDelayMs || 3000);
    return () => window.clearTimeout(timer);
  }, [popup]);

  function close() {
    if (!popup) return;
    const key = storageKey(popup.id, popup.displayFrequency);
    if (popup.displayFrequency === "ONCE_EVER") localStorage.setItem(key, "1");
    if (popup.displayFrequency === "ONCE_PER_DAY") localStorage.setItem(key, String(Date.now()));
    if (popup.displayFrequency === "ONCE_PER_SESSION") sessionStorage.setItem(key, "1");
    setOpen(false);
  }

  if (!popup || !open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/30 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="w-full max-w-md rounded-[1.5rem] border border-border-soft bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <h2 id="popup-title" className="text-xl font-bold text-[#171717]">
            {popup.title}
          </h2>
          <button type="button" onClick={close} className="rounded-lg p-1 text-muted hover:bg-lavender-soft focus-ring" aria-label="Κλείσιμο">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{popup.content}</p>
        {popup.ctaText && popup.ctaUrl && (
          <a
            href={popup.ctaUrl}
            onClick={close}
            className="mt-5 inline-flex rounded-2xl bg-purple-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-bright focus-ring"
          >
            {popup.ctaText}
          </a>
        )}
      </div>
    </div>
  );
}
