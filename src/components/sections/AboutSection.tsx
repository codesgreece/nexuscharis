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
    <section id="about" className="bg-lavender-light py-20 sm:py-24" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <Reveal>
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

          <Reveal delay={120}>
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
