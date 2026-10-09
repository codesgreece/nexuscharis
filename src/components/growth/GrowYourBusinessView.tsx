import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  GROW_PAGE,
  growthPathHints,
  monthlyServices,
  nexusGrowth,
  oneTimeServices,
} from "@/content/growth-services";
import { CareComparisonTable } from "@/components/growth/CareComparisonTable";
import { GrowthFaq } from "@/components/growth/GrowthFaq";
import { ServicePackageCard } from "@/components/growth/ServicePackageCard";
import { Reveal } from "@/components/ui/Reveal";

export function GrowYourBusinessView() {
  const supportMonthly = monthlyServices.filter((s) =>
    ["seo", "website-care", "website-care-pro", "dedicated-support"].includes(s.id),
  );
  const extraMonthly = monthlyServices.filter((s) =>
    ["seo-content", "social-media", "local-seo-monthly"].includes(s.id),
  );

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-lavender-light pb-10 pt-8 sm:pb-12 sm:pt-10"
        aria-labelledby="grow-heading"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-purple-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-purple-electric/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              {GROW_PAGE.eyebrow}
            </p>
            <h1
              id="grow-heading"
              className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
            >
              {GROW_PAGE.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {GROW_PAGE.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/nexus-growth"
                className="inline-flex items-center gap-2 rounded-full bg-purple-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(109,40,217,0.65)] transition hover:-translate-y-0.5 hover:bg-purple-bright focus-ring"
              >
                NEXUS Growth — 119€/μήνα
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="#monthly-services"
                className="inline-flex items-center gap-2 rounded-full border border-purple-primary/25 bg-white px-5 py-3 text-sm font-semibold text-purple-deep transition hover:bg-lavender-soft focus-ring"
              >
                Δες τις υπηρεσίες
              </a>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {growthPathHints.map((hint, i) => (
              <Reveal key={hint.solution} delay={i * 40}>
                <a
                  href={hint.href}
                  className="group flex h-full flex-col rounded-[1.25rem] border border-border-soft bg-white/90 p-4 shadow-[0_12px_32px_-28px_rgba(76,29,149,0.35)] transition hover:-translate-y-0.5 hover:border-purple-primary/30 focus-ring"
                >
                  <span className="text-xs leading-snug text-muted">{hint.need}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-purple-deep">
                    {hint.solution}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEXUS Growth highlight */}
      <section
        className="bg-white py-10 sm:py-12 lg:py-14"
        aria-labelledby="nexus-growth-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              Best Value Bundle
            </p>
            <h2
              id="nexus-growth-heading"
              className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
            >
              NEXUS Growth
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Το ολοκληρωμένο μηνιαίο πακέτο για επιχειρήσεις που θέλουν SEO και συνεχή
              υποστήριξη του website τους.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mx-auto mt-10 max-w-2xl">
              <ServicePackageCard service={nexusGrowth} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Monthly support */}
      <section
        id="monthly-services"
        className="bg-lavender-light py-10 sm:py-12 lg:py-14"
        aria-labelledby="monthly-services-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              Monthly
            </p>
            <h2
              id="monthly-services-heading"
              className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
            >
              Μηνιαίες υπηρεσίες
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{GROW_PAGE.monthlySubtitle}</p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {supportMonthly.map((service, i) => (
              <Reveal key={service.id} delay={i * 60}>
                <ServicePackageCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CareComparisonTable />

      {/* One-time */}
      <section
        id="one-time-services"
        className="bg-white py-10 sm:py-12 lg:py-14"
        aria-labelledby="one-time-services-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              One-Time Services
            </p>
            <h2
              id="one-time-services-heading"
              className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
            >
              One-Time Services
            </h2>
            <p className="mt-4 max-w-2xl text-muted">{GROW_PAGE.oneTimeSubtitle}</p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {oneTimeServices.map((service, i) => (
              <Reveal key={service.id} delay={i * 50}>
                <ServicePackageCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Extra monthly: content, social, local */}
      <section
        className="bg-lavender-light py-10 sm:py-12 lg:py-14"
        aria-labelledby="extra-monthly-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              Content & Visibility
            </p>
            <h2
              id="extra-monthly-heading"
              className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
            >
              Περιεχόμενο, Social & Local SEO
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Προαιρετικές μηνιαίες υπηρεσίες για περιεχόμενο, social media και τοπική
              προβολή.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {extraMonthly.map((service, i) => (
              <Reveal key={service.id} delay={i * 60}>
                <ServicePackageCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GrowthFaq />

      {/* Final CTA */}
      <section className="bg-lavender-light pb-12 pt-2 sm:pb-14" aria-labelledby="growth-cta-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-purple-primary/15 bg-gradient-to-br from-white via-lavender-soft to-white px-5 py-6 shadow-[0_20px_50px_-36px_rgba(109,40,217,0.45)] sm:flex-row sm:items-center sm:px-8 sm:py-7">
              <div className="max-w-xl">
                <h2
                  id="growth-cta-heading"
                  className="text-xl font-extrabold tracking-tight text-[#171717] sm:text-2xl"
                >
                  {GROW_PAGE.cta.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {GROW_PAGE.cta.body}
                </p>
              </div>
              <a
                href={GROW_PAGE.cta.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-purple-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_-16px_rgba(109,40,217,0.7)] transition hover:-translate-y-0.5 hover:bg-purple-bright focus-ring"
              >
                {GROW_PAGE.cta.button}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
