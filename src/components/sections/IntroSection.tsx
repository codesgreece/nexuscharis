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
    <section className="bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="intro-heading">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="intro-heading"
            className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-[1.05rem]">{body}</p>
          <p className="mt-5 text-base font-bold text-purple-primary sm:text-lg">
            “{highlight}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
