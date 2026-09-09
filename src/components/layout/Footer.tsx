import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { formatPhoneDisplay } from "@/lib/utils";

const links = [
  { href: "#home", label: "Αρχική" },
  { href: "#about", label: "Σχετικά" },
  { href: "#services", label: "Υπηρεσίες" },
  { href: "#packages", label: "Πακέτα" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Επικοινωνία" },
];

export function Footer({
  siteName,
  tagline,
  phone,
  email,
}: {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft bg-lavender-light">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{tagline}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-purple-primary">
            {siteName}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#171717]">Πλοήγηση</h2>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted transition hover:text-purple-deep focus-ring rounded">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#171717]">Επικοινωνία</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-purple-deep"
              >
                <Phone className="h-4 w-4 text-purple-primary" aria-hidden />
                {formatPhoneDisplay(phone)}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-purple-deep"
              >
                <Mail className="h-4 w-4 text-purple-primary" aria-hidden />
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-soft">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs text-muted">
            © {year} NEXUS DEV STUDIO GREECE. All rights reserved.
          </p>
          <Link
            href="#home"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-primary text-white shadow-lg shadow-purple-primary/25 transition hover:-translate-y-0.5 focus-ring"
            aria-label="Επιστροφή στην κορυφή"
          >
            <ArrowUp className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
