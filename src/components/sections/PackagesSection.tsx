"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { packageMonthlyCards } from "@/content/package-monthly";
import { cn } from "@/lib/utils";
import styles from "@/components/sections/PackagesSection.module.css";

type PackageItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  oldPrice: string | null;
  discount: string | null;
  features: unknown;
  ctaText: string;
  ctaUrl: string;
  highlighted: boolean;
};

function asFeatures(features: unknown): string[] {
  if (Array.isArray(features)) return features.map(String);
  return [];
}

function isQuotePrice(price: string) {
  return !/\d/.test(price) || /κατόπιν|προσφορ|συνεννόηση/i.test(price);
}

export function PackagesSection({ packages }: { packages: PackageItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="packages"
      className={cn(styles.section, "py-12 sm:py-14 lg:py-16", ready && styles.rootIsReady)}
      aria-labelledby="packages-heading"
    >
      <div className={styles.backdrop} aria-hidden />
      <div className={styles.gridDots} aria-hidden />
      <div className={styles.sweep} aria-hidden />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Πακέτα & Τιμές
          </p>
          <h2
            id="packages-heading"
            className="mt-2.5 text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
          >
            Πακέτα & Τιμές
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Διάλεξε το πακέτο που σου ταιριάζει. Οι τιμές ενημερώνονται δυναμικά —{" "}
            <a
              href="#contact"
              className="font-semibold text-purple-deep underline-offset-2 hover:underline"
            >
              ζήτησε προσφορά
            </a>{" "}
            για ακριβή κοστολόγηση βάσει των αναγκών σου.
          </p>
        </Reveal>

        <div className={cn(styles.grid, "mt-8")}>
          {packages.map((pkg, i) => {
            const features = asFeatures(pkg.features);
            const quote = isQuotePrice(pkg.price);

            return (
              <Reveal key={pkg.id} delay={i * 65}>
                <article
                  className={cn(styles.card, pkg.highlighted && styles.cardFeatured)}
                >
                  {pkg.highlighted && (
                    <span className={styles.badge}>
                      <span className={styles.badgeDot} aria-hidden />
                      Πιο Δημοφιλές
                    </span>
                  )}

                  <span className={styles.status} aria-hidden>
                    <span className={styles.statusDot} />
                    Package
                  </span>

                  <h3 className="pr-16 text-[1.35rem] font-bold leading-snug tracking-tight text-[#171717] sm:text-[1.4rem]">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.description}</p>

                  <div className="mt-1">
                    {pkg.oldPrice && (
                      <p className="text-sm text-muted line-through">{pkg.oldPrice}</p>
                    )}

                    {quote ? (
                      <a href={pkg.ctaUrl || "#contact"} className={styles.quoteCta}>
                        {pkg.price}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    ) : (
                      <p className={styles.price}>{pkg.price}</p>
                    )}

                    {pkg.discount && (
                      <p className="mt-1 text-xs font-semibold text-purple-primary">
                        {pkg.discount}
                      </p>
                    )}
                  </div>

                  <ul className={styles.features}>
                    {features.map((feature) => (
                      <li key={feature} className={styles.feature}>
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-purple-primary"
                          aria-hidden
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={pkg.ctaUrl || "#contact"}
                    className={cn(
                      styles.cta,
                      "focus-ring",
                      pkg.highlighted ? styles.ctaPrimary : styles.ctaSecondary,
                    )}
                  >
                    {pkg.ctaText}
                    <ArrowRight className={cn("h-4 w-4", styles.ctaArrow)} aria-hidden />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-14">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              Μηνιαίες Υπηρεσίες
            </p>
            <h3 className="mt-2.5 text-xl font-extrabold tracking-tight text-[#171717] sm:text-2xl">
              Υπηρεσίες Συντήρησης
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Για επιχειρήσεις που θέλουν συνεχή υποστήριξη μετά το launch.
            </p>
          </Reveal>

          <div className={cn(styles.monthlyGrid, "mt-6")}>
            {packageMonthlyCards.map((service, i) => (
              <Reveal key={service.id} delay={i * 55}>
                <article className={styles.monthlyCard}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-purple-primary/80">
                    Monthly
                  </p>
                  <h4 className="mt-1.5 text-base font-bold text-[#171717]">{service.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{service.description}</p>

                  <ul className="mt-3 space-y-1.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-[#171717]"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-primary"
                          aria-hidden
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={service.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-purple-deep transition hover:text-purple-primary focus-ring rounded"
                  >
                    {service.price}
                    <ArrowRight className={cn("h-3.5 w-3.5", styles.monthlyArrow)} aria-hidden />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-5 text-center text-xs text-muted">
              Δες αναλυτικά όλες τις growth υπηρεσίες στο{" "}
              <a
                href="/grow-your-business"
                className="font-semibold text-purple-deep underline-offset-2 hover:underline"
              >
                Grow Your Business
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
