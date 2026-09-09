import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

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
}) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pb-24">
        <Reveal>
          <div>
            <span className="inline-flex items-center rounded-full border border-purple-primary/15 bg-lavender-soft px-3.5 py-1.5 text-xs font-semibold tracking-wide text-purple-deep">
              {badge}
            </span>

            <h1
              id="hero-heading"
              className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[#171717] sm:text-5xl lg:text-[3.25rem]"
            >
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={primaryCtaUrl}
                className="inline-flex items-center gap-2 rounded-2xl bg-purple-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_-14px_rgba(109,40,217,0.75)] transition-all hover:-translate-y-0.5 hover:bg-purple-bright focus-ring"
              >
                {primaryCtaText}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={secondaryCtaUrl}
                className="inline-flex items-center gap-2 rounded-2xl border border-purple-primary/25 bg-white px-6 py-3.5 text-sm font-semibold text-purple-deep transition hover:bg-lavender-soft focus-ring"
              >
                {secondaryCtaText}
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 border-t border-border-soft pt-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border-soft">
              {stats.map((stat) => (
                <div key={stat.label} className="sm:px-4 first:sm:pl-0 last:sm:pr-0">
                  <div className="text-2xl font-extrabold text-purple-deep">{stat.value}</div>
                  <div className="mt-1 text-xs leading-snug text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <div className="purple-glow absolute -inset-8 -z-10 rounded-full blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-purple-primary/15 bg-gradient-to-br from-lavender-soft to-white p-2 shadow-[0_30px_80px_-40px_rgba(76,29,149,0.45)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem]">
                <Image
                  src={founderImageUrl}
                  alt={`${founderName} — Founder & Developer, NEXUS DEV STUDIO`}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="absolute -bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:w-[min(100%,280px)]">
              <div className="glass rounded-2xl p-4 shadow-[0_18px_40px_-24px_rgba(76,29,149,0.45)]">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.svg"
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9"
                  />
                  <p className="text-[11px] font-semibold leading-relaxed text-purple-deep">
                    {trustLine}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative border-t border-border-soft bg-lavender-light/60">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs font-semibold tracking-[0.08em] text-purple-deep/80 sm:px-6 lg:px-8 sm:text-sm">
          {trustLine}
        </p>
      </div>
    </section>
  );
}
