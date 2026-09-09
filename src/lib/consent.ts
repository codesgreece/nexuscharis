export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
};

export type ConsentState = ConsentPreferences & {
  timestamp: string;
  version: string;
};

export const CONSENT_VERSION = "1.0";
export const CONSENT_STORAGE_KEY = "nexus_cookie_consent";
export const CONSENT_COOKIE_NAME = "nexus_cookie_consent";
export const OPEN_SETTINGS_EVENT = "nexus:open-cookie-settings";

export const defaultConsent = (): ConsentState => ({
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
  timestamp: new Date().toISOString(),
  version: CONSENT_VERSION,
});

export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<ConsentState>;
    if (!data || typeof data !== "object") return null;
    if (data.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: Boolean(data.analytics),
      functional: Boolean(data.functional),
      marketing: Boolean(data.marketing),
      timestamp: typeof data.timestamp === "string" ? data.timestamp : new Date().toISOString(),
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const fromStorage = parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  if (fromStorage) return fromStorage;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return null;
  return parseConsent(decodeURIComponent(match.split("=").slice(1).join("=")));
}

export function writeConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify({ ...consent, necessary: true, version: CONSENT_VERSION });
  window.localStorage.setItem(CONSENT_STORAGE_KEY, payload);
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(payload)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}

export function hasConsent(
  consent: ConsentState | null | undefined,
  category: keyof ConsentPreferences,
): boolean {
  if (category === "necessary") return true;
  return Boolean(consent?.[category]);
}
