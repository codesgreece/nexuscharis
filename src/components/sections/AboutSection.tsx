import { Reveal } from "@/components/ui/Reveal";

type TimelineItem = { year: string; title: string; description: string };

export function AboutSection({
  title,
  description,
  timeline,
  founderName,
  founderTitle,
}: {
  title: string;
  description: string;
  timeline: TimelineItem[];
  founderName: string;
  founderTitle: string;
}) {
  const paragraphs = description.split("\n").filter(Boolean);

  return (
    <section id="about" className="bg-lavender-light py-20 sm:py-24" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.2fr_0.95fr] lg:gap-12">
          <Reveal>
            <div className="mx-auto flex max-w-sm flex-col justify-center rounded-[1.5rem] border border-purple-primary/15 bg-white px-6 py-10 text-center shadow-[0_24px_60px_-36px_rgba(76,29,149,0.4)] lg:mx-0 lg:min-h-[280px] lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-purple-primary">
                {founderTitle}
              </p>
              <p className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-3xl">
                {founderName}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
                About
              </p>
              <h2
                id="about-heading"
                className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
              >
                {title}
              </h2>
              <div className="mt-6 space-y-4">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
              <a
                href="#vision"
                className="mt-8 inline-flex items-center rounded-2xl bg-purple-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-bright focus-ring"
              >
                Γνώρισε περισσότερα
              </a>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ol className="relative space-y-6 border-l-2 border-purple-primary/20 pl-6">
              {timeline.map((item, idx) => (
                <li key={item.year} className="relative">
                  <span
                    className={`absolute -left-[1.95rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                      idx === timeline.length - 1
                        ? "bg-purple-primary shadow-[0_0_0_4px_rgba(109,40,217,0.18)]"
                        : "bg-purple-electric"
                    }`}
                  />
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-purple-primary">
                    {item.year}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#171717]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
