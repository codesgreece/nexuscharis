import Image from "next/image";
import { ExternalLink, FolderOpen } from "lucide-react";
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
};

export function PortfolioSection({ projects }: { projects: Project[] }) {
  return (
    <section
      id="portfolio"
      className="bg-lavender-light py-20 sm:py-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Portfolio
          </p>
          <h2
            id="portfolio-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
          >
            Τα έργα μας
          </h2>
        </Reveal>

        {projects.length === 0 ? (
          <Reveal>
            <div className="mt-12 flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-purple-primary/25 bg-white px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lavender-soft text-purple-primary">
                <FolderOpen className="h-8 w-8" aria-hidden />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#171717]">
                Τα επόμενα projects θα εμφανιστούν εδώ.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Δες σύντομα τις τελευταίες ψηφιακές δημιουργίες του NEXUS DEV STUDIO. Μείνε
                συντονισμένος για τα νέα μας έργα!
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 60}>
                <article className="group overflow-hidden rounded-[1.5rem] border border-border-soft bg-white shadow-[0_18px_44px_-32px_rgba(76,29,149,0.35)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(76,29,149,0.45)]">
                  <div className="relative aspect-[16/10] bg-lavender-soft">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        loading="lazy"
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-purple-primary/40">
                        <FolderOpen className="h-10 w-10" />
                      </div>
                    )}
                    {project.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-purple-primary px-2.5 py-1 text-[10px] font-bold text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-primary">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-[#171717]">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {isSafeExternalUrl(project.liveUrl) && (
                        <a
                          href={project.liveUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-purple-primary px-3.5 py-2 text-xs font-semibold text-white hover:bg-purple-bright focus-ring"
                        >
                          Live Project
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      )}
                      {isSafeExternalUrl(project.caseStudyUrl) && (
                        <a
                          href={project.caseStudyUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-xl border border-border-soft px-3.5 py-2 text-xs font-semibold text-purple-deep hover:bg-lavender-soft focus-ring"
                        >
                          Case Study
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
