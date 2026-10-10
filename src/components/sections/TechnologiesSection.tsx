"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import {
  TECHNOLOGIES,
  TECH_FILTERS,
  type TechFilterId,
  type TechItem,
} from "@/content/technologies";
import { cn } from "@/lib/utils";

function TechLogo({ item }: { item: TechItem }) {
  const icon = item.icon;

  if ("kind" in icon && icon.kind === "wordmark") {
    return (
      <span
        className="text-[1.35rem] font-black tracking-tight text-lavender"
        aria-hidden="true"
      >
        SQL
      </span>
    );
  }

  const path = "path" in icon ? icon.path : "";
  const fill = `#${icon.hex}`;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-9 w-9 transition-transform duration-300 ease-out group-hover:scale-110"
      aria-hidden="true"
    >
      <path d={path} fill={fill} />
    </svg>
  );
}

function TechCard({ item }: { item: TechItem }) {
  return (
    <article
      className={cn(
        "tech-card group flex h-full flex-col items-center justify-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/8 px-3 py-5 text-center backdrop-blur-sm",
        "shadow-[0_10px_28px_-24px_rgba(0,0,0,0.35)]",
        "transition duration-300 ease-out",
        "hover:-translate-y-1 hover:border-muted-amber/35 hover:bg-white/12",
        "focus-within:border-lavender/40",
      )}
      aria-label={item.name}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 p-1.5 shadow-sm">
        <TechLogo item={item} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-lavender">{item.name}</h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-lavender/55">
          {item.categoryLabel}
          {item.tier === "core" ? " · Core" : ""}
        </p>
      </div>
    </article>
  );
}

export function TechnologiesSection() {
  const [filter, setFilter] = useState<TechFilterId>("all");
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(() => {
    const base =
      filter === "all"
        ? TECHNOLOGIES
        : TECHNOLOGIES.filter((t) => t.category === filter);

    if (filter === "all" && !showAll) {
      return base.filter((t) => t.tier === "core");
    }
    return base;
  }, [filter, showAll]);

  const hiddenCount =
    filter === "all" && !showAll
      ? TECHNOLOGIES.filter((t) => t.tier === "additional").length
      : 0;

  return (
    <section
      id="technologies"
      className="surface-deep section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="technologies-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30 bg-grid"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(237,228,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,228,255,0.06) 1px, transparent 1px)",
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-muted-amber/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-purple-electric/20 blur-3xl" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-amber">
            Stack
          </p>
          <h2
            id="technologies-heading"
            className="mt-3 text-2xl font-extrabold tracking-tight text-warm-ivory sm:text-3xl"
          >
            Technologies We Use
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-lavender/75 sm:text-lg">
            Σύγχρονες τεχνολογίες και εργαλεία για τη δημιουργία γρήγορων, ασφαλών και
            επεκτάσιμων digital solutions.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-lavender/60 sm:text-base">
            Επιλέγουμε την κατάλληλη τεχνολογία ανάλογα με τις ανάγκες, το είδος και την
            κλίμακα κάθε project — από web development και frameworks μέχρι databases και
            εργαλεία υποδομής.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p
            className="tech-marquee mt-8 text-center text-xs font-bold uppercase tracking-[0.28em] sm:text-sm"
            aria-hidden="true"
          >
            CODE • DESIGN • DEVELOP • DEPLOY
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Φίλτρο κατηγοριών τεχνολογιών"
          >
            {TECH_FILTERS.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="tech-grid"
                  id={`tech-filter-${item.id}`}
                  className={cn(
                    "min-h-10 rounded-full px-3.5 py-2 text-xs font-bold tracking-wide transition duration-300 focus-ring sm:text-sm",
                    active
                      ? "bg-lavender text-purple-deep shadow-[0_0_22px_-6px_rgba(237,228,255,0.55)]"
                      : "border border-white/15 bg-warm-ivory/8 text-lavender/80 hover:border-muted-amber/30 hover:bg-white/10",
                  )}
                  onClick={() => {
                    setFilter(item.id);
                    setShowAll(false);
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="tech-grid"
          role="tabpanel"
          aria-labelledby={`tech-filter-${filter}`}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {visible.map((item, i) => (
            <div
              key={item.id}
              className="tech-card-enter"
              style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}
            >
              <TechCard item={item} />
            </div>
          ))}
        </div>

        {hiddenCount > 0 ? (
          <div className="mt-6 text-center">
            <button
              type="button"
              className="min-h-11 rounded-full border border-white/20 bg-white/6 px-5 py-2.5 text-sm font-semibold text-lavender transition hover:bg-white/12 focus-ring"
              onClick={() => setShowAll(true)}
            >
              Δες +{hiddenCount} additional technologies
            </button>
          </div>
        ) : null}

        <Reveal delay={80}>
          <p className="mt-8 text-center text-sm text-lavender/55">
            <span className="font-semibold text-lavender">Core</span> = συχνές επιλογές
            για σύγχρονα web projects ·{" "}
            <span className="font-semibold text-lavender">Additional</span> = διαθέσιμες
            τεχνολογίες όταν το project το απαιτεί.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
