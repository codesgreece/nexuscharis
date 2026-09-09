"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_VERSION,
  defaultConsent,
  openCookieSettings,
  OPEN_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type ConsentPreferences,
  type ConsentState,
} from "@/lib/consent";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { CookieSettingsModal } from "@/components/legal/CookieSettingsModal";

type ConsentContextValue = {
  consent: ConsentState | null;
  ready: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveConsent: (next: ConsentPreferences) => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

export function useConsentOptional() {
  return useContext(ConsentContext);
}

function toPreferences(state: ConsentState | null): ConsentPreferences {
  return {
    necessary: true,
    analytics: Boolean(state?.analytics),
    functional: Boolean(state?.functional),
    marketing: Boolean(state?.marketing),
  };
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentPreferences>(toPreferences(null));

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setDraft(toPreferences(stored));
    setReady(true);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setDraft(toPreferences(readConsent()));
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  const persist = useCallback((prefs: ConsentPreferences) => {
    const value: ConsentState = {
      necessary: true,
      analytics: Boolean(prefs.analytics),
      functional: Boolean(prefs.functional),
      marketing: Boolean(prefs.marketing),
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    writeConsent(value);
    setConsent(value);
    setDraft(toPreferences(value));
  }, []);

  const acceptAll = useCallback(() => {
    persist({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
    setSettingsOpen(false);
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(defaultConsent());
    setSettingsOpen(false);
  }, [persist]);

  const saveConsent = useCallback(
    (next: ConsentPreferences) => {
      persist(next);
      setSettingsOpen(false);
    },
    [persist],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      acceptAll,
      rejectNonEssential,
      saveConsent,
      openSettings: () => {
        setDraft(toPreferences(consent));
        setSettingsOpen(true);
      },
    }),
    [consent, ready, acceptAll, rejectNonEssential, saveConsent],
  );

  const showBanner = ready && !consent;

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {showBanner ? (
        <CookieBanner
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onOpenSettings={() => {
            setDraft(toPreferences(consent));
            setSettingsOpen(true);
          }}
        />
      ) : null}
      <CookieSettingsModal
        open={settingsOpen}
        draft={draft}
        stored={consent}
        onChange={setDraft}
        onClose={() => setSettingsOpen(false)}
        onSave={() => saveConsent(draft)}
      />
    </ConsentContext.Provider>
  );
}

export { openCookieSettings };
