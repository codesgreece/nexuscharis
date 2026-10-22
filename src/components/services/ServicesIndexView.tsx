import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/growth/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import {
  buildServicePages,
  servicesIndex,
  servicePath,
} from "@/content/build-services";

export function ServicesIndexView() {
  return (
    <>
      <section className="surface-ivory section-texture relative overflow-hidden py-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-purple-primary/10 blur-3xl" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal immediate>
            <Breadcrumbs
              items={[
                { label: "Αρχική", href: "/" },
                { label: "Υπηρεσίες", href: servicesIndex.path },
              ]}
            />
            <p className="eyebrow mt-6">{servicesIndex.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-warm-charcoal sm:text-4xl lg:text-[2.7rem] lg:leading-[1.15]">
              {servicesIndex.h1}
            </h1>
            <div className="mt-5 max-w-3xl space-y-4">
              {servicesIndex.lead.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="cta-glow inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white focus-ring"
              >
                Ζήτησε προσφορά
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/#portfolio"
                className="inline-flex min-h-11 items-center rounded-2xl border border-purple-primary/25 bg-warm-ivory px-5 py-3 text-sm font-semibold text-purple-deep focus-ring"
              >
                Portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-cream py-12 sm:py-14" aria-labelledby="service-index-list">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="service-index-list" className="section-title">
            {servicesIndex.scopeTitle}
          </h2>
          <p className="section-lead">{servicesIndex.scopeIntro}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {buildServicePages.map((page) => (
              <li key={page.slug}>
                <article className="flex h-full flex-col rounded-[1.35rem] border border-soft-border bg-warm-ivory p-5">
                  <h3 className="text-xl font-bold text-warm-charcoal">
                    <Link
                      href={servicePath(page.slug)}
                      className="underline-offset-2 hover:underline focus-ring rounded"
                    >
                      {page.footerLabel}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{page.indexBlurb}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-ivory py-12 sm:py-14" aria-labelledby="service-index-start">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="service-index-start" className="section-title">
            {servicesIndex.startTitle}
          </h2>
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {servicesIndex.start.map((step, index) => (
              <li key={step.title} className="rounded-[1.35rem] border border-soft-border bg-soft-cream/80 p-5">
                <p className="font-mono text-xs font-bold text-purple-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-bold text-warm-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
            Μετά την κατασκευή, αν χρειάζεσαι συνεχή δουλειά, δες ξεχωριστά το{" "}
            <Link href="/grow-your-business/seo" className="font-semibold text-purple-deep underline-offset-2 hover:underline">
              SEO
            </Link>
            , το{" "}
            <Link
              href="/grow-your-business/website-care"
              className="font-semibold text-purple-deep underline-offset-2 hover:underline"
            >
              Website Care
            </Link>{" "}
            και το{" "}
            <Link href="/nexus-growth" className="font-semibold text-purple-deep underline-offset-2 hover:underline">
              NEXUS Growth
            </Link>
            . Αυτά δεν αντικαθιστούν την κατασκευή και δεν υπόσχονται θέση στη Google.
          </p>
          <p className="mt-4">
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-purple-deep underline-offset-2 hover:underline focus-ring rounded"
            >
              Πες μας τι χρειάζεσαι
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
