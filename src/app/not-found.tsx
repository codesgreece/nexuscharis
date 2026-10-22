import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { fallbackSettings } from "@/lib/fallbacks";

export const metadata: Metadata = {
  title: { absolute: "Η σελίδα δεν βρέθηκε | NEXUS DEV STUDIO GREECE" },
  description: "Η σελίδα που ζητήθηκε δεν υπάρχει στο NEXUS DEV STUDIO GREECE.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-warm-ivory px-4 pb-20 pt-32">
        <div className="mx-auto max-w-xl">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-warm-charcoal">
            Η σελίδα δεν βρέθηκε
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Ο σύνδεσμος δεν αντιστοιχεί σε δημόσια σελίδα του NEXUS DEV STUDIO GREECE.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/" className="text-purple-deep underline-offset-2 hover:underline">
              Αρχική
            </Link>
            <Link href="/services" className="text-purple-deep underline-offset-2 hover:underline">
              Υπηρεσίες
            </Link>
            <Link href="/#contact" className="text-purple-deep underline-offset-2 hover:underline">
              Επικοινωνία
            </Link>
          </div>
        </div>
      </main>
      <Footer
        siteName={fallbackSettings.siteName}
        tagline={fallbackSettings.tagline}
        phone={fallbackSettings.phone}
        email={fallbackSettings.email}
      />
    </>
  );
}
