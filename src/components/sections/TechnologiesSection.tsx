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
        className="text-[1.35rem] font-black tracking-tight"
        style={{ color: `#${icon.hex}` }}
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
        "tech-card group flex h-full flex-col items-center justify-center gap-3 rounded-[1.15rem] border border-border-soft bg-white px-3 py-5 text-center",
        "shadow-[0_10px_28px_-24px_rgba(76,29,149,0.35)]",
        "transition duration-300 ease-out",
        "hover:-translate-y-1 hover:border-purple-primary/30",
        "hover:shadow-[0_18px_40px_-24px_rgba(109,40,217,0.45)]",
        "focus-within:border-purple-primary/40",
      )}
      aria-label={item.name}
    >
      <div className="flex h-12 w-12 items-center justify-center">
        <TechLogo item={item} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#171717]">{item.name}</h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          {item.categoryLabel}
          {item.tier === "core" ? " · Core" : ""}
        </p>
      </div>
    </article>
  );
}

export function TechnologiesSection() {
  const [filter, setFilter] = useState<TechFilterId>("all");

  const visible = useMemo(() => {
    if (filter === "all") return TECHNOLOGIES;
    return TECHNOLOGIES.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <section
      id="technologies"
      className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="technologies-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Stack
          </p>
          <h2
            id="technologies-heading"
            className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
          >
            Technologies We Use
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Σύγχρονες τεχνολογίες και εργαλεία για τη δημιουργία γρήγορων, ασφαλών και
            επεκτάσιμων digital solutions.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Επιλέγουμε την κατάλληλη τεχνολογία ανάλογα με τις ανάγκες, το είδος και την
            κλίμακα κάθε project — από web development και frameworks μέχρι databases και
            εργαλεία υποδομής.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p
            className="tech-marquee mt-8 text-center text-xs font-bold uppercase tracking-[0.28em] text-purple-deep/70 sm:text-sm"
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
                    "rounded-xl px-3.5 py-2 text-xs font-bold tracking-wide transition duration-300 focus-ring sm:text-sm",
                    active
                      ? "bg-purple-primary text-white shadow-[0_10px_24px_-14px_rgba(109,40,217,0.7)]"
                      : "border border-border-soft bg-lavender-light text-purple-deep hover:border-purple-primary/30 hover:bg-lavender-soft",
                  )}
                  onClick={() => setFilter(item.id)}
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
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
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

        <Reveal delay={80}>
          <p className="mt-8 text-center text-sm text-muted">
            <span className="font-semibold text-purple-deep">Core</span> = συχνές επιλογές
            για σύγχρονα web projects ·{" "}
            <span className="font-semibold text-purple-deep">Additional</span> = διαθέσιμες
            τεχνολογίες όταν το project το απαιτεί.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
