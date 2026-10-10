import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUp, Mail, Phone } from "lucide-react";
import {
  siDribbble,
  siFacebook,
  siInstagram,
  siX,
  type SimpleIcon,
} from "simple-icons";
import { Logo } from "@/components/layout/Logo";
import { CookieSettingsButton } from "@/components/legal/CookieSettingsButton";
import {
  footerBrandLine,
  footerCta,
  footerLegalLinks,
  footerNavigationLinks,
  footerServiceLinks,
  type FooterNavLink,
  type FooterSocialInput,
} from "@/content/footer";
import { cn, formatPhoneDisplay } from "@/lib/utils";

/** Archived brand mark — LinkedIn removed upstream from simple-icons (trademark policy). */
const linkedinIcon: Pick<SimpleIcon, "path" | "title"> = {
  title: "LinkedIn",
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

type SocialIcon = Pick<SimpleIcon, "path" | "title">;

type SocialItem = {
  href: string;
  label: string;
  icon: SocialIcon;
};

function buildSocialLinks(social: FooterSocialInput | undefined): SocialItem[] {
  if (!social) return [];

  const candidates: Array<{
    key: keyof FooterSocialInput;
    label: string;
    icon: SocialIcon;
  }> = [
    { key: "facebookUrl", label: "Facebook", icon: siFacebook },
    { key: "instagramUrl", label: "Instagram", icon: siInstagram },
    { key: "linkedinUrl", label: "LinkedIn", icon: linkedinIcon },
    { key: "twitterUrl", label: "X (Twitter)", icon: siX },
    { key: "dribbbleUrl", label: "Dribbble", icon: siDribbble },
  ];

  return candidates.flatMap(({ key, label, icon }) => {
    const href = social[key]?.trim();
    if (!href) return [];
    return [{ href, label, icon }];
  });
}

function usesNativeAnchor(href: string) {
  return href === "/" || href.includes("#");
}

function FooterTextLink({ href, label }: FooterNavLink) {
  const className =
    "rounded text-sm text-lavender/65 transition-colors duration-200 hover:text-lavender focus-ring";

  if (usesNativeAnchor(href)) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function SocialIconLinks({
  items,
  className,
}: {
  items: SocialItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/6 text-lavender transition duration-200 hover:-translate-y-0.5 hover:border-muted-amber/35 hover:text-muted-amber focus-ring"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d={item.icon.path} fill="currentColor" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-bold tracking-tight text-warm-ivory">{title}</h2>
      {children}
    </div>
  );
}

export function Footer({
  siteName,
  tagline,
  phone,
  email,
  social,
}: {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  social?: FooterSocialInput;
}) {
  const year = new Date().getFullYear();
  const socialLinks = buildSocialLinks(social);

  return (
    <footer className="surface-deep border-t border-white/8">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 xl:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo href="/" tone="light" />
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-amber">
              NEXUS DEV STUDIO · GREECE
            </p>
            <p className="mt-3 max-w-xs text-sm font-semibold leading-relaxed text-warm-ivory">
              {footerBrandLine}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-lavender/60">{tagline}</p>
            <p className="sr-only">{siteName}</p>
            <SocialIconLinks items={socialLinks} className="mt-5" />
          </div>

          <FooterColumn title="Navigation">
            <ul className="mt-3.5 space-y-2">
              {footerNavigationLinks.map((link) => (
                <li key={link.href}>
                  <FooterTextLink {...link} />
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Services">
            <ul className="mt-3.5 space-y-2">
              {footerServiceLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <FooterTextLink {...link} />
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Company">
            <ul className="mt-3.5 space-y-2">
              <li>
                <FooterTextLink href="/#about" label="Σχετικά" />
              </li>
              <li>
                <FooterTextLink href="/#faq" label="FAQ" />
              </li>
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <FooterTextLink {...link} />
                </li>
              ))}
              <li>
                <CookieSettingsButton className="text-sm text-lavender/65 transition hover:text-lavender focus-ring rounded" />
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <ul className="mt-3.5 space-y-2.5">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-lavender/65 transition-colors duration-200 hover:text-lavender focus-ring"
                >
                  <Phone className="h-4 w-4 shrink-0 text-muted-amber" aria-hidden />
                  <span>{formatPhoneDisplay(phone)}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-lavender/65 transition-colors duration-200 hover:text-lavender focus-ring"
                >
                  <Mail className="h-4 w-4 shrink-0 text-muted-amber" aria-hidden />
                  <span className="break-all">{email}</span>
                </a>
              </li>
            </ul>

            <div className="mt-5 rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm">
              <p className="text-sm font-bold text-warm-ivory">{footerCta.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-lavender/60">{footerCta.body}</p>
              <a
                href={footerCta.href}
                className="cta-glow mt-3.5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 focus-ring"
              >
                {footerCta.button}
              </a>
            </div>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:px-8">
          <p className="text-xs text-lavender/50">
            © {year} NEXUS DEV STUDIO GREECE. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <SocialIconLinks items={socialLinks} className="hidden sm:flex" />
            <Link
              href="/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-primary text-white shadow-lg shadow-purple-primary/25 transition duration-200 hover:-translate-y-0.5 focus-ring"
              aria-label="Επιστροφή στην κορυφή"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
