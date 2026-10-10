import { Reveal } from "@/components/ui/Reveal";

type TimelineItem = { year: string; title: string; description: string };

export function AboutSection({
  title,
  description,
  timeline,
}: {
  title: string;
  description: string;
  timeline: TimelineItem[];
  founderName?: string;
  founderTitle?: string;
}) {
  const paragraphs = description.split("\n").filter(Boolean);

  return (
    <section
      id="about"
      className="surface-cream section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="about-heading"
    >
      <div
        className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-purple-primary/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-muted-amber/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <div>
              <p className="eyebrow">About</p>
              <h2 id="about-heading" className="section-title mt-3">
                {title}
              </h2>
              <div className="mt-6 space-y-4 border-l-2 border-purple-primary/20 pl-5">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
              <a
                href="#services"
                className="cta-glow mt-8 inline-flex items-center rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
              >
                Δες τις υπηρεσίες κατασκευής ιστοσελίδων
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ol className="relative space-y-0">
              {timeline.map((item, idx) => (
                <li key={item.year} className="relative flex gap-4 pb-8 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <span
                      className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-xs font-extrabold ${
                        idx === timeline.length - 1
                          ? "border-purple-primary bg-purple-primary text-white shadow-[0_0_0_4px_rgba(109,40,217,0.15)]"
                          : "border-purple-primary/30 bg-warm-ivory text-purple-deep"
                      }`}
                    >
                      {item.year.slice(0, 2) === "20" ? item.year.slice(2) : item.year.slice(0, 2)}
                    </span>
                    {idx < timeline.length - 1 ? (
                      <span
                        className="mt-1 w-px flex-1 bg-gradient-to-b from-purple-primary/40 via-muted-amber/40 to-purple-primary/20"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1 rounded-[1.15rem] border border-soft-border bg-warm-ivory/80 px-4 py-3.5 shadow-[0_10px_28px_-24px_rgba(65,42,66,0.15)]">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-purple-primary">
                      {item.year}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-warm-charcoal">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
