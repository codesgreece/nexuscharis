import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { HandwrittenSignature } from "@/components/sections/HandwrittenSignature";

type HeroStat = { value: string; label: string };

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryCtaText,
  primaryCtaUrl,
  secondaryCtaText,
  secondaryCtaUrl,
  trustLine,
  stats,
  founderImageUrl,
  founderName,
  founderTitle = "Founder & Developer",
}: {
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  trustLine: string;
  stats: HeroStat[];
  founderImageUrl: string;
  founderName: string;
  founderTitle?: string;
}) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-20 sm:pt-[5.5rem]"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="pointer-events-none absolute -right-20 top-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-5 px-4 pb-7 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-6 lg:px-8 lg:pb-9 lg:pt-1">
        <Reveal>
          <div>
            <span className="inline-flex items-center rounded-full border border-purple-primary/15 bg-lavender-soft px-3 py-1 text-xs font-semibold tracking-wide text-purple-deep">
              {badge}
            </span>

            <h1
              id="hero-heading"
              className="mt-3 max-w-xl text-[1.75rem] font-extrabold leading-[1.18] tracking-tight text-[#171717] sm:text-3xl lg:text-[2.35rem]"
            >
              {title}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={primaryCtaUrl}
                className="inline-flex items-center gap-2 rounded-2xl bg-purple-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_-14px_rgba(109,40,217,0.75)] transition-all hover:-translate-y-0.5 hover:bg-purple-bright focus-ring"
              >
                {primaryCtaText}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={secondaryCtaUrl}
                className="inline-flex items-center gap-2 rounded-2xl border border-purple-primary/25 bg-white px-5 py-2.5 text-sm font-semibold text-purple-deep transition hover:bg-lavender-soft focus-ring"
              >
                {secondaryCtaText}
              </a>
            </div>

            <div className="mt-5 grid max-w-xl grid-cols-1 gap-2.5 border-t border-border-soft pt-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border-soft">
              {stats.map((stat) => (
                <div key={stat.label} className="sm:px-3 first:sm:pl-0 last:sm:pr-0">
                  <div className="text-lg font-extrabold text-purple-deep sm:text-xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-muted sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:ml-auto lg:mr-4 lg:max-w-[300px]"
        >
          <div className="relative">
            <HandwrittenSignature className="relative z-10 -mb-2 ml-0 w-[76%] max-w-[230px] sm:ml-1 sm:max-w-[250px]" />

            <div className="purple-glow absolute -inset-5 top-8 -z-10 rounded-full blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-purple-primary/15 bg-gradient-to-br from-lavender-soft to-white p-1.5 shadow-[0_24px_60px_-36px_rgba(76,29,149,0.45)]">
              {/* Width-capped portrait keeps 4:5 ratio without driving ~2 viewport heights */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem]">
                <Image
                  src={founderImageUrl}
                  alt={`${founderName} — ${founderTitle}, NEXUS DEV STUDIO`}
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, 300px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative border-t border-border-soft bg-lavender-light/60">
        <p className="mx-auto max-w-7xl px-4 py-3 text-center text-xs font-semibold tracking-[0.08em] text-purple-deep/80 sm:px-6 lg:px-8">
          {trustLine}
        </p>
      </div>
    </section>
  );
}
