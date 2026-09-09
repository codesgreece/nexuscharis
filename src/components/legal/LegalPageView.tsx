import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { LegalPageContent } from "@/content/legal/defaults";
import { REAL_COOKIE_INVENTORY } from "@/content/legal/defaults";
import type { LegalPageKey } from "@prisma/client";

const LEGAL_NAV: Array<{ href: string; label: string; key: LegalPageKey }> = [
  { href: "/privacy", label: "Απόρρητο", key: "PRIVACY" },
  { href: "/cookies", label: "Cookies", key: "COOKIES" },
  { href: "/terms", label: "Όροι χρήσης", key: "TERMS" },
  { href: "/services-terms", label: "Όροι υπηρεσιών", key: "SERVICES_TERMS" },
  { href: "/copyright", label: "Πνευματικά", key: "COPYRIGHT" },
];

export function LegalPageView({
  page,
  siteName,
  tagline,
  phone,
  email,
  showCookieInventory = false,
}: {
  page: LegalPageContent;
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  showCookieInventory?: boolean;
}) {
  return (
    <>
      <Header />
      <main className="bg-lavender-light pt-[72px]">
        <div className="border-b border-border-soft bg-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-primary">
              Legal &amp; Compliance
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-3 text-sm text-muted">
              Τελευταία ενημέρωση: {page.lastUpdated} · Έκδοση {page.version}
            </p>
            <nav
              aria-label="Νομικές σελίδες"
              className="mt-6 flex flex-wrap gap-2"
            >
              {LEGAL_NAV.map((item) => {
                const active = item.key === page.pageKey;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition focus-ring ${
                      active
                        ? "bg-purple-primary text-white"
                        : "bg-lavender-soft text-purple-deep hover:bg-purple-primary/10"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8 rounded-[1.5rem] border border-border-soft bg-white p-6 shadow-[0_24px_60px_-36px_rgba(76,29,149,0.25)] sm:p-8">
            {page.sections.map((section) => (
              <section key={section.heading} aria-labelledby={`legal-${section.heading}`}>
                <h2
                  id={`legal-${section.heading}`}
                  className="text-lg font-bold text-purple-deep sm:text-xl"
                >
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#333] sm:text-[15px]">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            {showCookieInventory ? (
              <section aria-labelledby="cookie-inventory-heading">
                <h2 id="cookie-inventory-heading" className="text-lg font-bold text-purple-deep sm:text-xl">
                  Αναλυτικός πίνακας cookies / αποθήκευσης
                </h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border-soft text-xs uppercase tracking-wide text-muted">
                        <th className="py-2 pr-3 font-semibold">Όνομα</th>
                        <th className="py-2 pr-3 font-semibold">Κατηγορία</th>
                        <th className="py-2 pr-3 font-semibold">Διάρκεια</th>
                        <th className="py-2 font-semibold">Σκοπός</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REAL_COOKIE_INVENTORY.map((cookie) => (
                        <tr key={cookie.name} className="border-b border-border-soft/70 align-top">
                          <td className="py-3 pr-3 font-medium text-[#171717]">{cookie.name}</td>
                          <td className="py-3 pr-3 text-muted">{cookie.category}</td>
                          <td className="py-3 pr-3 text-muted">{cookie.duration}</td>
                          <td className="py-3 text-muted">{cookie.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            <p className="rounded-2xl bg-lavender-light px-4 py-3 text-xs leading-relaxed text-muted">
              Το παρόν κείμενο παρέχει οργανωτική / τεχνική πληροφόρηση και δεν αποτελεί νομική
              εγγύηση συμμόρφωσης με τον ΓΚΠΔ. Συνιστάται έλεγχος από δικηγόρο ή DPO όπου απαιτείται.
            </p>
          </div>
        </article>
      </main>
      <Footer siteName={siteName} tagline={tagline} phone={phone} email={email} />
    </>
  );
}
