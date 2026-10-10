import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { HandwrittenSignature } from "@/components/sections/HandwrittenSignature";
import { AutumnAtmosphere } from "@/components/effects/AutumnAtmosphere";

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
      className="relative overflow-hidden bg-warm-ivory pt-20 sm:pt-[5.5rem]"
      aria-labelledby="hero-heading"
    >
      <AutumnAtmosphere />

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-5 px-4 pb-7 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-6 lg:px-8 lg:pb-9 lg:pt-1">
        <Reveal className="relative z-[11]">
          <div>
            <span className="inline-flex items-center rounded-full border border-purple-primary/20 bg-lavender/90 px-3 py-1 text-xs font-semibold tracking-wide text-purple-deep shadow-[0_0_24px_-8px_rgba(109,40,217,0.25)]">
              {badge}
            </span>

            <h1
              id="hero-heading"
              className="mt-3 max-w-xl text-[1.75rem] font-extrabold leading-[1.18] tracking-tight text-warm-charcoal sm:text-3xl lg:text-[2.35rem]"
            >
              {title}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={primaryCtaUrl}
                className="cta-glow inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 focus-ring"
              >
                {primaryCtaText}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={secondaryCtaUrl}
                className="inline-flex items-center gap-2 rounded-2xl border border-purple-primary/25 bg-warm-ivory/90 px-5 py-2.5 text-sm font-semibold text-purple-deep backdrop-blur-[2px] transition hover:bg-lavender focus-ring"
              >
                {secondaryCtaText}
              </a>
            </div>

            <div className="mt-5 grid max-w-xl grid-cols-1 gap-2.5 border-t border-soft-border/80 pt-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-soft-border/80">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl sm:rounded-none sm:px-3 first:sm:pl-0 last:sm:pr-0"
                >
                  <div className="text-lg font-extrabold text-purple-deep [text-shadow:0_0_20px_rgba(217,154,85,0.18)] sm:text-xl">
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
          <div className="relative motion-safe:animate-[hero-portrait-float_7s_ease-in-out_infinite]">
            <div
              className="pointer-events-none absolute -right-2 -top-3 h-28 w-40 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.16),transparent_68%)] blur-md motion-safe:animate-[ambient-pulse_8s_ease-in-out_infinite]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-4 -top-5 h-20 w-32 rounded-full bg-[radial-gradient(circle,rgba(217,154,85,0.14),transparent_70%)] blur-md"
              aria-hidden="true"
            />
            <HandwrittenSignature className="relative z-10 -mb-2 ml-0 w-[76%] max-w-[230px] motion-safe:animate-[hero-signature-float_8s_ease-in-out_infinite] sm:ml-1 sm:max-w-[250px]" />

            <div className="purple-glow absolute -inset-5 top-8 -z-10 rounded-full blur-2xl" />
            <div
              className="pointer-events-none absolute -inset-7 top-6 -z-10 rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(217,154,85,0.18),transparent_58%)] blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-4 -left-3 -z-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.2),transparent_70%)] blur-xl"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-purple-primary/35 via-[#ddd6fe]/45 to-[rgba(217,154,85,0.3)] p-px shadow-[0_28px_64px_-34px_rgba(36,21,53,0.45),0_0_40px_-18px_rgba(217,154,85,0.3)]">
              <div className="overflow-hidden rounded-[1.45rem] border border-white/60 bg-gradient-to-br from-warm-ivory/95 via-lavender/80 to-soft-cream/80 p-1.5 backdrop-blur-[1px]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem]">
                  <Image
                    src={founderImageUrl}
                    alt={`${founderName} — ${founderTitle}, NEXUS DEV STUDIO`}
                    fill
                    priority
                    sizes="(max-width: 768px) 280px, 300px"
                    className="object-cover object-top"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[1.2rem] shadow-[inset_0_0_28px_rgba(217,154,85,0.08),inset_0_0_1px_rgba(255,255,255,0.35)]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 border-t border-soft-border/70 bg-lavender/40 backdrop-blur-[2px]">
        <p className="mx-auto max-w-7xl px-4 py-3 text-center text-xs font-semibold tracking-[0.08em] text-purple-deep/80 sm:px-6 lg:px-8">
          {trustLine}
        </p>
      </div>
    </section>
  );
}
