import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { GrowthService } from "@/content/growth-services";
import type { GrowthPageDef } from "@/content/growth-pages";
import { growthIconMap } from "@/components/growth/growthIcons";
import { Breadcrumbs } from "@/components/growth/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function GrowthServicePageView({
  page,
  service,
}: {
  page: GrowthPageDef;
  service: GrowthService;
}) {
  const Icon = growthIconMap[service.icon];

  return (
    <>
      <section className="relative overflow-hidden bg-lavender-light pb-10 pt-8 sm:pb-12 sm:pt-10">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Breadcrumbs
              items={[
                { label: "Αρχική", href: "/" },
                { label: "Grow Your Business", href: "/grow-your-business" },
                { label: page.navLabel },
              ]}
            />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              {page.heroEyebrow}
            </p>
            <div className="mt-4 flex flex-wrap items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-purple-primary shadow-sm ring-1 ring-purple-primary/15">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl">
                  {service.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <p className="text-3xl font-extrabold text-purple-deep sm:text-4xl">
                {service.price}
              </p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-purple-deep ring-1 ring-purple-primary/20">
                {service.billingLabel}
              </span>
              {service.badge ? (
                <span className="rounded-full bg-purple-primary px-3 py-1 text-xs font-bold text-white">
                  {service.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-purple-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_-16px_rgba(109,40,217,0.7)] transition hover:-translate-y-0.5 hover:bg-purple-bright focus-ring"
              >
                Ζήτησε Προσφορά
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/grow-your-business"
                className="inline-flex items-center gap-2 rounded-full border border-purple-primary/25 bg-white px-6 py-3.5 text-sm font-semibold text-purple-deep transition hover:bg-lavender-soft focus-ring"
              >
                Όλες οι υπηρεσίες
              </Link>
              <Link
                href="/nexus-growth"
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-3.5 text-sm font-semibold text-purple-deep underline-offset-2 hover:underline focus-ring"
              >
                Δες το NEXUS Growth
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#171717]">
                Τι περιλαμβάνει
              </h2>
              {service.features && service.features.length > 0 ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 rounded-2xl border border-border-soft bg-lavender-light/50 px-4 py-3 text-sm text-[#171717]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-primary" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {service.examples && service.examples.length > 0 ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.examples.map((example) => (
                    <li
                      key={example}
                      className="flex items-start gap-2 rounded-2xl border border-border-soft bg-lavender-light/50 px-4 py-3 text-sm text-[#171717]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-primary" aria-hidden />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {service.packages && service.packages.length > 0 ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {service.packages.map((pkg) => (
                    <article
                      key={pkg.id}
                      className="rounded-[1.25rem] border border-border-soft bg-lavender-light/70 p-5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-bold text-[#171717]">{pkg.title}</h3>
                        <p className="text-sm font-extrabold text-purple-deep">{pkg.price}</p>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {pkg.features.map((feature) => (
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
                    </article>
                  ))}
                </div>
              ) : null}

              {service.notes?.map((note) => (
                <p key={note} className="mt-5 text-sm font-medium text-purple-deep/85">
                  {note}
                </p>
              ))}
              {service.extraWork ? (
                <p className="mt-3 text-sm font-semibold text-muted">{service.extraWork}</p>
              ) : null}
            </Reveal>

            <Reveal delay={80}>
              <aside
                className={cn(
                  "rounded-[1.5rem] border border-purple-primary/20 bg-gradient-to-b from-lavender-soft via-white to-white p-6 shadow-[0_24px_50px_-36px_rgba(109,40,217,0.45)] sm:p-7",
                )}
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-primary">
                  Επόμενο βήμα
                </p>
                <h2 className="mt-3 text-xl font-extrabold text-[#171717]">
                  Θέλεις αυτή την υπηρεσία για την επιχείρησή σου;
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Πες μας τι χρειάζεσαι και θα σου προτείνουμε την κατάλληλη λύση — χωρίς
                  υπερβολικές υποσχέσεις θέσεων στη Google.
                </p>
                <Link
                  href="/#contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-bright focus-ring"
                >
                  {service.ctaText}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/nexus-growth"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-primary/25 px-5 py-3 text-sm font-semibold text-purple-deep transition hover:bg-lavender-soft focus-ring"
                >
                  Ή δες το NEXUS Growth — 119€/μήνα
                </Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
