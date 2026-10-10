import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { Reveal } from "@/components/ui/Reveal";
import type { Job } from "@/content/jobs";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-primary shadow-[0_0_0_3px_rgba(109,40,217,0.12)]"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function JobDetailView({ job }: { job: Job }) {
  return (
    <div className="surface-ivory section-texture relative overflow-hidden pb-16 pt-8 sm:pt-10">
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-purple-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-40 h-64 w-64 rounded-full bg-muted-amber/10 blur-3xl" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/careers"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg text-sm font-semibold text-purple-deep transition hover:text-purple-primary focus-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Careers
          </Link>
        </Reveal>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div className="min-w-0">
            <Reveal>
              <p className="eyebrow">Careers</p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-warm-charcoal sm:text-4xl">
                {job.title}
              </h1>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-purple-primary" aria-hidden />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-muted-amber" aria-hidden />
                  {job.type}
                </span>
                <span className="inline-flex rounded-full bg-lavender px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-purple-deep">
                  {job.category}
                </span>
              </div>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                {job.description}
              </p>
            </Reveal>

            <div className="mt-10 space-y-8">
              <Reveal>
                <section aria-labelledby="role-heading">
                  <h2 id="role-heading" className="text-lg font-extrabold text-warm-charcoal">
                    Ο ρόλος
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{job.role}</p>
                </section>
              </Reveal>

              <Reveal>
                <section aria-labelledby="responsibilities-heading">
                  <h2
                    id="responsibilities-heading"
                    className="text-lg font-extrabold text-warm-charcoal"
                  >
                    Αρμοδιότητες
                  </h2>
                  <BulletList items={job.responsibilities} />
                </section>
              </Reveal>

              <Reveal>
                <section aria-labelledby="requirements-heading">
                  <h2 id="requirements-heading" className="text-lg font-extrabold text-warm-charcoal">
                    Τι ζητάμε
                  </h2>
                  <BulletList items={job.requirements} />
                </section>
              </Reveal>

              <Reveal>
                <section aria-labelledby="benefits-heading">
                  <h2 id="benefits-heading" className="text-lg font-extrabold text-warm-charcoal">
                    Τι προσφέρουμε
                  </h2>
                  <BulletList items={job.benefits} />
                </section>
              </Reveal>

              <Reveal>
                <section
                  aria-labelledby="why-nexus-heading"
                  className="rounded-[1.35rem] border border-purple-primary/15 bg-lavender/40 p-5 sm:p-6"
                >
                  <h2 id="why-nexus-heading" className="text-lg font-extrabold text-warm-charcoal">
                    Γιατί NEXUS
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {job.whyNexus}
                  </p>
                </section>
              </Reveal>
            </div>

            <div className="mt-12 lg:mt-14">
              <Reveal>
                <ApplicationForm job={job} />
              </Reveal>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <Reveal delay={80}>
              <div className="rounded-[1.5rem] border border-soft-border bg-warm-ivory/95 p-5 shadow-[0_18px_44px_-30px_rgba(65,42,66,0.22)] backdrop-blur-sm sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-purple-primary">
                  Position
                </p>
                <p className="mt-2 text-lg font-extrabold text-warm-charcoal">{job.title}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-muted/70">
                      Location
                    </dt>
                    <dd className="mt-0.5 font-semibold text-warm-charcoal">{job.location}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-muted/70">
                      Type
                    </dt>
                    <dd className="mt-0.5 font-semibold text-warm-charcoal">{job.type}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-muted/70">
                      Category
                    </dt>
                    <dd className="mt-0.5 font-semibold text-warm-charcoal">{job.category}</dd>
                  </div>
                </dl>
                <a
                  href="#apply"
                  className="cta-glow mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
                >
                  Κάνε Αίτηση
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </div>
  );
}
