"use client";

import { openCookieSettings } from "@/lib/consent";

export function CookieSettingsButton({
  className = "text-sm text-muted transition hover:text-purple-deep focus-ring rounded",
}: {
  className?: string;
}) {
  return (
    <button type="button" onClick={() => openCookieSettings()} className={className}>
      Ρυθμίσεις Cookies
    </button>
  );
}
