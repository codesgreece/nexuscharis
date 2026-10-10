import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CareersHeroVisual } from "@/components/careers/CareersHeroVisual";
import { JobCard } from "@/components/careers/JobCard";
import { Reveal } from "@/components/ui/Reveal";
import { CAREERS_PAGE, type Job } from "@/content/jobs";

export function CareersPageView({ jobs }: { jobs: Job[] }) {
  return (
    <>
      <section
        className="surface-ivory section-texture relative overflow-hidden py-12 sm:py-16 lg:py-20"
        aria-labelledby="careers-hero-heading"
      >
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-purple-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-muted-amber/12 blur-3xl" />

        <div className="relative z-[1] mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8">
          <Reveal>
            <p className="eyebrow">{CAREERS_PAGE.eyebrow}</p>
            <h1
              id="careers-hero-heading"
              className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-warm-charcoal sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            >
              {CAREERS_PAGE.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {CAREERS_PAGE.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#open-positions"
                className="cta-glow inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
              >
                Δες ανοιχτές θέσεις
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/#contact"
                className="inline-flex min-h-11 items-center rounded-2xl border border-purple-primary/25 bg-warm-ivory/90 px-5 py-3 text-sm font-semibold text-purple-deep transition hover:bg-lavender focus-ring"
              >
                Επικοινωνία
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <CareersHeroVisual />
          </Reveal>
        </div>
      </section>

      <section
        id="open-positions"
        className="surface-cream section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
        aria-labelledby="open-positions-heading"
      >
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow">Open roles</p>
            <h2 id="open-positions-heading" className="section-title mt-3">
              Ανοιχτές Θέσεις
            </h2>
            <p className="section-lead">
              Επίλεξε τη θέση που σου ταιριάζει, δες λεπτομέρειες και κάνε αίτηση με το βιογραφικό
              σου.
            </p>
          </Reveal>

          {jobs.length === 0 ? (
            <Reveal>
              <div className="mt-8 rounded-[1.5rem] border border-soft-border bg-warm-ivory p-8 text-center">
                <p className="text-lg font-bold text-warm-charcoal">
                  Δεν υπάρχουν ανοιχτές θέσεις αυτή τη στιγμή.
                </p>
                <p className="mt-2 text-sm text-muted">
                  Μπορείς να μας στείλεις αυθόρμητη αίτηση μέσω επικοινωνίας.
                </p>
                <Link
                  href="/#contact"
                  className="cta-glow mt-5 inline-flex min-h-11 items-center rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white focus-ring"
                >
                  Επικοινωνία
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job, i) => (
                <Reveal key={job.id} delay={i * 60}>
                  <JobCard job={job} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="surface-deep section-texture relative overflow-hidden py-12 sm:py-14">
        <div className="relative z-[1] mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-amber">
              Culture
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-warm-ivory sm:text-3xl">
              Premium digital work. Human collaboration.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-lavender/70 sm:text-base">
              Η NEXUS DEV STUDIO είναι modern digital studio. Ψάχνουμε ανθρώπους που νοιάζονται για
              ποιότητα, λεπτομέρεια και πραγματικά αποτελέσματα — όχι για υπερβολικά corporate
              διαδικασίες.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
