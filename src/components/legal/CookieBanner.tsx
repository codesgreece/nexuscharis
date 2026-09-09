"use client";

type CookieBannerProps = {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onOpenSettings: () => void;
};

export function CookieBanner({
  onAcceptAll,
  onRejectNonEssential,
  onOpenSettings,
}: CookieBannerProps) {
  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-purple-deep/20 bg-purple-deep p-4 text-white shadow-2xl shadow-purple-deep/40 sm:p-5">
        <h2 id="cookie-banner-title" className="text-lg font-bold sm:text-xl">
          Ρυθμίσεις cookies
        </h2>
        <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-white/80">
          Χρησιμοποιούμε απαραίτητα cookies για τη λειτουργία του ιστότοπου. Προαιρετικές
          κατηγορίες (αναλύσεις, λειτουργικότητα, marketing) παραμένουν ανενεργές μέχρι να
          επιλέξετε. Μπορείτε να αλλάξετε τις προτιμήσεις σας ανά πάσα στιγμή.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onAcceptAll}
            className="min-h-11 flex-1 rounded-2xl bg-purple-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-bright focus-ring"
          >
            Αποδοχή όλων
          </button>
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="min-h-11 flex-1 rounded-2xl border border-white/35 bg-transparent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-ring"
          >
            Απόρριψη μη απαραίτητων
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            className="min-h-11 flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/95 transition hover:bg-white/15 focus-ring"
          >
            Ρυθμίσεις cookies
          </button>
        </div>
        <p className="mt-3 text-xs text-white/60">
          Περισσότερα:{" "}
          <a href="/cookies" className="underline underline-offset-2 hover:text-white">
            Πολιτική Cookies
          </a>
          {" · "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-white">
            Πολιτική Απορρήτου
          </a>
        </p>
      </div>
    </div>
  );
}
