"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import {
  GREECE_MAP_VIEWBOX,
  greeceCities,
  greeceLandPaths,
  greeceRoutes,
  type GreeceCity,
} from "@/content/greece-map";
import { cn } from "@/lib/utils";
import styles from "@/components/sections/GreeceCoverageMap.module.css";

const cityById = Object.fromEntries(greeceCities.map((city) => [city.id, city])) as Record<
  string,
  GreeceCity
>;

export function GreeceCoverageMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [canParallax, setCanParallax] = useState(false);
  const [activeCity, setActiveCity] = useState<GreeceCity | null>(null);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanParallax(!mqReduce.matches && mqFine.matches);
    sync();
    mqReduce.addEventListener("change", sync);
    mqFine.addEventListener("change", sync);
    return () => {
      mqReduce.removeEventListener("change", sync);
      mqFine.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canParallax) {
      const el = rootRef.current;
      if (el) {
        el.style.setProperty("--parallax-x", "0px");
        el.style.setProperty("--parallax-y", "0px");
      }
      return;
    }

    const tick = () => {
      const cur = currentRef.current;
      const target = targetRef.current;
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      const el = rootRef.current;
      if (el) {
        el.style.setProperty("--parallax-x", `${cur.x.toFixed(2)}px`);
        el.style.setProperty("--parallax-y", `${cur.y.toFixed(2)}px`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [canParallax]);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!canParallax) return;
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRef.current = {
        x: Math.max(-1, Math.min(1, nx)) * 7,
        y: Math.max(-1, Math.min(1, ny)) * 5,
      };
    },
    [canParallax],
  );

  const onPointerLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    setActiveCity(null);
  }, []);

  const routePaths = useMemo(
    () =>
      greeceRoutes
        .map(([fromId, toId], index) => {
          const from = cityById[fromId];
          const to = cityById[toId];
          if (!from || !to) return null;
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2 - 18;
          return {
            key: `${fromId}-${toId}`,
            d: `M${from.x} ${from.y} Q${midX} ${midY} ${to.x} ${to.y}`,
            delay: index,
          };
        })
        .filter(Boolean) as Array<{ key: string; d: string; delay: number }>,
    [],
  );

  const athens = cityById.athens;

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        cx: 48 + ((i * 61) % 320),
        cy: 56 + ((i * 47) % 400),
        r: 1.1 + (i % 3) * 0.25,
      })),
    [],
  );

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, ready && styles.rootIsReady)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={styles.stage}>
        <div className={styles.ambient} aria-hidden />

        <svg
          className={styles.svg}
          viewBox={GREECE_MAP_VIEWBOX}
          role="img"
          aria-label="Ενδεικτικές περιοχές εξυπηρέτησης σε όλη την Ελλάδα"
        >
          <title>Περιοχές εξυπηρέτησης στην Ελλάδα</title>
          <desc>
            Διανυσματικός χάρτης Ελλάδας με ενδεικτικές πόλεις εξυπηρέτησης. Δεν πρόκειται για
            φυσικά γραφεία ή τοποθεσίες πελατών.
          </desc>

          <defs>
            <linearGradient id="greeceCoastGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Dot grid */}
          <g className={styles.dotGrid} aria-hidden="true">
            {Array.from({ length: 10 }).map((_, row) =>
              Array.from({ length: 8 }).map((__, col) => (
                <circle
                  key={`g-${row}-${col}`}
                  cx={28 + col * 48}
                  cy={24 + row * 48}
                  r="1.05"
                  fill="#8b5cf6"
                />
              )),
            )}
          </g>

          {/* Water motion */}
          <g aria-hidden="true">
            <path
              className={`${styles.water} ${styles.waterA}`}
              d="M20 120 C80 100, 140 140, 200 118 S320 90, 400 120"
            />
            <path
              className={`${styles.water} ${styles.waterB}`}
              d="M10 250 C90 230, 150 270, 230 248 S340 220, 410 255"
            />
            <path
              className={`${styles.water} ${styles.waterC}`}
              d="M30 390 C110 370, 180 410, 260 392 S360 370, 400 400"
            />
          </g>

          {/* Wind particles */}
          <g aria-hidden="true">
            {particles.map((p) => (
              <circle
                key={p.id}
                className={styles.particle}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
              />
            ))}
          </g>

          {/* Land */}
          <g aria-hidden="true">
            {greeceLandPaths.map((d, index) => (
              <path key={`land-${index}`} className={styles.land} d={d} />
            ))}
            {greeceLandPaths.map((d, index) => (
              <path
                key={`coast-${index}`}
                className={styles.coastDraw}
                d={d}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="1"
              />
            ))}
          </g>

          {/* Routes */}
          <g aria-hidden="true">
            {routePaths.map((route) => (
              <path key={`base-${route.key}`} className={styles.route} d={route.d} />
            ))}
            {routePaths.map((route) => (
              <path key={`pulse-${route.key}`} className={styles.routePulse} d={route.d} />
            ))}
          </g>

          {/* NEXUS core near Athens */}
          {athens && (
            <g aria-hidden="true">
              <circle className={styles.coreGlow} cx={athens.x} cy={athens.y} r="16" />
              <circle className={styles.coreRing} cx={athens.x} cy={athens.y} r="12" />
              <text
                className={styles.coreN}
                x={athens.x}
                y={athens.y + 3}
                textAnchor="middle"
              >
                N
              </text>
            </g>
          )}

          {/* Cities */}
          <g>
            {greeceCities.map((city, index) => (
              <g
                key={city.id}
                className={cn(
                  styles.nodeGroup,
                  activeCity?.id === city.id && styles.nodeGroupIsActive,
                )}
                onPointerEnter={() => setActiveCity(city)}
                onFocus={() => setActiveCity(city)}
                onBlur={() => setActiveCity(null)}
              >
                <circle
                  className={styles.nodePulse}
                  cx={city.x}
                  cy={city.y}
                  r="7"
                  style={{ animationDelay: `${index * 0.35}s` }}
                  aria-hidden="true"
                />
                <circle
                  className={styles.nodeDot}
                  cx={city.x}
                  cy={city.y}
                  r="3.2"
                  aria-hidden="true"
                />
                <text
                  className={styles.nodeLabel}
                  x={city.x}
                  y={city.y - 10}
                  textAnchor="middle"
                >
                  {city.name}
                </text>
                <circle
                  className={styles.nodeHit}
                  cx={city.x}
                  cy={city.y}
                  r="14"
                  tabIndex={0}
                  role="img"
                  aria-label={`${city.name}. ${city.hint}`}
                />
              </g>
            ))}
          </g>
        </svg>

        <div
          className={cn(styles.tooltip, activeCity && styles.tooltipIsVisible)}
          style={
            activeCity
              ? {
                  left: `${(activeCity.x / 420) * 100}%`,
                  top: `${(activeCity.y / 520) * 100}%`,
                }
              : undefined
          }
          aria-hidden={!activeCity}
        >
          {activeCity && (
            <>
              <p className={styles.tooltipTitle}>{activeCity.name}</p>
              <p className={styles.tooltipHint}>{activeCity.hint}</p>
            </>
          )}
        </div>
      </div>

      <p className={styles.caption}>Ενδεικτικές περιοχές εξυπηρέτησης</p>
    </div>
  );
}
