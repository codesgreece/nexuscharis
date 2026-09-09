"use client";

import type { ReactNode } from "react";
import { useConsentOptional } from "@/components/legal/ConsentProvider";
import type { ConsentPreferences } from "@/lib/consent";
import { hasConsent } from "@/lib/consent";

/**
 * Renders children only when the visitor has consented to the given category.
 * Use for future analytics / marketing / functional third-party scripts.
 * Necessary scripts should not use this gate.
 */
export function ConsentScriptGate({
  category,
  children,
  fallback = null,
}: {
  category: Exclude<keyof ConsentPreferences, "necessary">;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const ctx = useConsentOptional();
  if (!ctx?.ready) return fallback;
  if (!hasConsent(ctx.consent, category)) return fallback;
  return <>{children}</>;
}
