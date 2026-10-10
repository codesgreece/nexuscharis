import { ArrowUpRight, FolderOpen } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { isSafeExternalUrl } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string | null;
  logoUrl: string | null;
  liveUrl: string | null;
  caseStudyUrl: string | null;
  featured: boolean;
  technologies?: string[] | null;
};

function formatProjectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function getProjectTags(project: Project): string[] {
  const techs = project.technologies?.map((t) => t.trim()).filter(Boolean);
  if (techs && techs.length > 0) return techs;
  const category = project.category?.trim();
  return category ? [category] : [];
}

function PortfolioCardDecor() {
  return (
    <svg
      className="portfolio-card-decor"
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line x1="40" y1="48" x2="140" y2="48" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="48" x2="40" y2="120" stroke="currentColor" strokeWidth="1" />
      <line x1="280" y1="260" x2="360" y2="260" stroke="currentColor" strokeWidth="1" />
      <line x1="360" y1="180" x2="360" y2="260" stroke="currentColor" strokeWidth="1" />
      <circle cx="72" cy="168" r="2.5" fill="currentColor" />
      <circle cx="318" cy="88" r="2" fill="currentColor" />
      <circle cx="210" cy="280" r="1.5" fill="currentColor" />
      <circle cx="340" cy="200" r="1.5" fill="currentColor" />
    </svg>
  );
}

function BrowserChrome({
  title,
  tabs,
}: {
  title: string;
  /** Optional extra tab labels — kept compact so many can fit */
  tabs?: string[];
}) {
  const tabLabels = (tabs?.length ? tabs : [title]).slice(0, 6);

  return (
    <div className="mb-3 overflow-hidden rounded-lg border border-soft-border bg-soft-cream/80">
      <div className="flex items-center gap-1 border-b border-soft-border px-1.5 py-0.5">
        <span className="h-1 w-1 shrink-0 rounded-full bg-muted-amber/70" />
        <span className="h-1 w-1 shrink-0 rounded-full bg-purple-primary/35" />
        <span className="h-1 w-1 shrink-0 rounded-full bg-purple-primary/20" />
        <div className="ml-1 flex min-w-0 flex-1 items-center gap-0.5 overflow-hidden">
          {tabLabels.map((label, index) => (
            <span
              key={`${label}-${index}`}
              className={
                index === 0
                  ? "max-w-[2.5rem] shrink-0 truncate rounded bg-warm-ivory px-1 py-px text-[7px] font-medium leading-none text-warm-charcoal ring-1 ring-soft-border sm:max-w-[3rem] sm:text-[8px]"
                  : "max-w-[2.25rem] shrink-0 truncate rounded bg-warm-ivory/45 px-1 py-px text-[7px] font-medium leading-none text-muted sm:max-w-[2.75rem] sm:text-[8px]"
              }
              title={label}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="relative flex h-14 items-end justify-center bg-gradient-to-br from-lavender/50 via-warm-ivory to-soft-cream px-3 pb-2 sm:h-16">
        <div className="w-full max-w-[7.5rem] rounded-md border border-purple-primary/15 bg-warm-ivory/90 p-1.5 shadow-[0_6px_14px_-12px_rgba(65,42,66,0.25)]">
          <div className="h-1.5 w-2/3 rounded bg-purple-primary/25" />
          <div className="mt-1 h-1 w-full rounded bg-soft-border" />
          <div className="mt-0.5 h-1 w-4/5 rounded bg-soft-border" />
          <div className="mt-1.5 h-3.5 w-12 rounded bg-muted-amber/50" />
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection({ projects }: { projects: Project[] }) {
  return (
    <section
      id="portfolio"
      className="surface-cream section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="portfolio-heading"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Portfolio</p>
          <h2 id="portfolio-heading" className="section-title mt-3">
            Τα έργα μας
          </h2>
        </Reveal>

        {projects.length === 0 ? (
          <Reveal>
            <div className="mt-8 flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-purple-primary/25 bg-warm-ivory px-6 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lavender text-purple-primary">
                <FolderOpen className="h-8 w-8" aria-hidden />
              </div>
              <h3 className="mt-6 text-xl font-bold text-warm-charcoal">
                Τα επόμενα projects θα εμφανιστούν εδώ.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Δες σύντομα τις τελευταίες ψηφιακές δημιουργίες του NEXUS DEV STUDIO. Μείνε
                συντονισμένος για τα νέα μας έργα!
              </p>
              <a
                href="#contact"
                className="cta-glow mt-6 inline-flex rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
              >
                Επικοινώνησε για νέο project
              </a>
            </div>
          </Reveal>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {projects.map((project, i) => {
              const number = formatProjectNumber(i);
              const tags = getProjectTags(project);
              const hasLive = isSafeExternalUrl(project.liveUrl);
              const hasCaseStudy = isSafeExternalUrl(project.caseStudyUrl);

              return (
                <Reveal key={project.id} delay={i * 60}>
                  <article className="portfolio-card group">
                    <div className="portfolio-card-glow" aria-hidden />
                    <PortfolioCardDecor />
                    <span className="portfolio-card-number" aria-hidden>
                      {number}
                    </span>

                    <div className="relative z-10 flex h-full min-h-0 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="portfolio-card-index">{number}</span>
                        <span className="portfolio-card-category">{project.category}</span>
                      </div>

                      <div className="mt-3 flex-1">
                        <BrowserChrome title={project.title} />
                        <h3 className="portfolio-card-title">{project.title}</h3>
                        {project.description?.trim() ? (
                          <p className="portfolio-card-desc">{project.description}</p>
                        ) : null}
                      </div>

                      {tags.length > 0 ? (
                        <ul className="portfolio-card-tags" aria-label="Project tags">
                          {tags.map((tag) => (
                            <li key={tag} className="portfolio-card-tag">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-4 flex flex-col gap-2">
                        {hasLive ? (
                          <a
                            href={project.liveUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-card-cta focus-ring"
                          >
                            <span>View Live Project</span>
                            <ArrowUpRight
                              className="portfolio-card-cta-arrow h-3.5 w-3.5 shrink-0"
                              aria-hidden
                            />
                          </a>
                        ) : null}
                        {hasCaseStudy ? (
                          <a
                            href={project.caseStudyUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-card-secondary focus-ring"
                          >
                            Case Study
                            <ArrowUpRight className="h-3 w-3" aria-hidden />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
