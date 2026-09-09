import { Reveal } from "@/components/ui/Reveal";

export function IntroSection({
  title,
  body,
  highlight,
}: {
  title: string;
  body: string;
  highlight: string;
}) {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="intro-heading">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="intro-heading"
            className="text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{body}</p>
          <p className="mt-8 text-lg font-bold text-purple-primary sm:text-xl">
            “{highlight}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
