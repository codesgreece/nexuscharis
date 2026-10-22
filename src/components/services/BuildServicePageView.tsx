import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/growth/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import type { BuildServicePage } from "@/content/build-services";
import { servicePath } from "@/content/build-services";
import { formatPhoneDisplay } from "@/lib/utils";

export function BuildServicePageView({
  page,
  phone,
  email,
}: {
  page: BuildServicePage;
  phone: string;
  email: string;
}) {
  return (
    <>
      <section className="surface-ivory section-texture relative overflow-hidden py-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-purple-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-muted-amber/12 blur-3xl" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal immediate>
            <Breadcrumbs
              items={[
                { label: "Αρχική", href: "/" },
                { label: "Υπηρεσίες", href: "/services" },
                { label: page.navLabel, href: servicePath(page.slug) },
              ]}
            />
            <p className="eyebrow mt-6">{page.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-warm-charcoal sm:text-4xl lg:text-[2.7rem] lg:leading-[1.15]">
              {page.h1}
            </h1>
            <div className="mt-5 max-w-3xl space-y-4">
              {page.lead.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="cta-glow inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition motion-safe:hover:-translate-y-0.5 focus-ring"
              >
                {page.contactCta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex min-h-11 items-center rounded-2xl border border-purple-primary/25 bg-warm-ivory/90 px-5 py-3 text-sm font-semibold text-purple-deep transition hover:bg-lavender focus-ring"
              >
                Δες τα έργα στο portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-cream py-12 sm:py-14" aria-labelledby={`${page.slug}-audience`}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <h2 id={`${page.slug}-audience`} className="section-title">
              {page.audienceTitle}
            </h2>
            <p className="section-lead">{page.audienceIntro}</p>
          </Reveal>
          <ul className="grid gap-3">
            {page.audience.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-soft-border bg-warm-ivory px-4 py-3 text-sm leading-relaxed text-warm-charcoal"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-ivory py-12 sm:py-14" aria-labelledby={`${page.slug}-benefits`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id={`${page.slug}-benefits`} className="section-title">
            {page.benefitsTitle}
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {page.benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[1.35rem] border border-soft-border bg-gradient-to-br from-warm-ivory to-soft-cream p-5"
              >
                <h3 className="text-lg font-bold text-warm-charcoal">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-cream py-12 sm:py-14" aria-labelledby={`${page.slug}-features`}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <h2 id={`${page.slug}-features`} className="section-title">
              {page.featuresTitle}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {page.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-2xl border border-soft-border bg-warm-ivory px-4 py-3 text-sm leading-relaxed text-warm-charcoal"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-[1.5rem] border border-purple-primary/20 bg-lavender/60 p-6">
            <h2 className="text-xl font-extrabold text-warm-charcoal">Επόμενο βήμα</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Η τιμή κλειδώνει αφού συμφωνήσουμε το εύρος. Για ιστοσελίδες και e-shop μπορείς να
              δεις και τα{" "}
              <Link
                href="/#packages"
                className="font-semibold text-purple-deep underline-offset-2 hover:underline"
              >
                πακέτα στην αρχική
              </Link>
              .
            </p>
            <Link
              href="/#contact"
              className="cta-glow mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white focus-ring"
            >
              {page.contactCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="font-semibold text-purple-deep underline-offset-2 hover:underline focus-ring rounded"
                >
                  {formatPhoneDisplay(phone)}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="font-semibold text-purple-deep underline-offset-2 hover:underline focus-ring rounded"
                >
                  {email}
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="surface-ivory py-12 sm:py-14" aria-labelledby={`${page.slug}-process`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id={`${page.slug}-process`} className="section-title">
            {page.processTitle}
          </h2>
          <p className="section-lead">{page.processIntro}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {page.process.map((step, index) => (
              <li key={step.title} className="rounded-[1.35rem] border border-soft-border bg-soft-cream/70 p-5">
                <p className="font-mono text-xs font-bold text-purple-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-bold text-warm-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{page.fitNote}</p>
          <p className="mt-3 text-sm">
            <Link
              href="/#process"
              className="font-semibold text-purple-deep underline-offset-2 hover:underline"
            >
              Δες και τη γενική σειρά δουλειάς
            </Link>
          </p>
        </div>
      </section>

      <section className="surface-cream py-12 sm:py-14" aria-labelledby={`${page.slug}-related`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id={`${page.slug}-related`} className="section-title">
            Σχετικές υπηρεσίες
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {page.related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block h-full rounded-[1.35rem] border border-soft-border bg-warm-ivory p-5 transition hover:border-purple-primary/35 focus-ring"
                >
                  <span className="text-base font-bold text-purple-deep">{link.label}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{link.note}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-muted">
            Τα δημοσιευμένα έργα μένουν στο{" "}
            <Link
              href="/#portfolio"
              className="font-semibold text-purple-deep underline-offset-2 hover:underline"
            >
              portfolio της αρχικής
            </Link>
            . Αν θέλεις κάτι αντίστοιχο,{" "}
            <Link
              href="/#contact"
              className="font-semibold text-purple-deep underline-offset-2 hover:underline"
            >
              στείλε μήνυμα με το project σου
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
