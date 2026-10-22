"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "@/components/effects/AutumnAtmosphere.module.css";
import { AutumnLeaf, HERO_LEAVES } from "@/components/effects/AutumnLeaves";
import { BotanicalGlyph } from "@/components/effects/botanicals/BotanicalGlyphs";

const bgLeaves = HERO_LEAVES.filter((l) => l.layer === "bg");
const midLeaves = HERO_LEAVES.filter((l) => l.layer === "mid");
const fgLeaves = HERO_LEAVES.filter((l) => l.layer === "fg");

const PARTICLES = [
  { top: "18%", left: "12%", delay: "0s", duration: "11s" },
  { top: "32%", left: "48%", delay: "-3s", duration: "14s" },
  { top: "55%", left: "72%", delay: "-6s", duration: "12s" },
  { top: "70%", left: "28%", delay: "-2s", duration: "15s" },
  { top: "22%", left: "84%", delay: "-8s", duration: "13s" },
  { top: "44%", left: "8%", delay: "-5s", duration: "16s" },
  { top: "78%", left: "58%", delay: "-1s", duration: "12.5s" },
  { top: "12%", left: "62%", delay: "-9s", duration: "14.5s" },
];

const IDLE_EPSILON = 0.004;

/**
 * Art-directed autumn atmosphere for the homepage Hero.
 * Five depth levels: lighting → botanicals → wind/particles → content → foreground.
 */
export function AutumnAtmosphere({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(true);
  const [reduced, setReduced] = useState(false);
  const [canParallax, setCanParallax] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => {
      const isReduced = mqReduce.matches;
      setReduced(isReduced);
      setCanParallax(!isReduced && mqFine.matches);
    };

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        visibleRef.current = visible;
        setInView(visible);
        if (!visible && rafRef.current != null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
          targetRef.current = { x: 0, y: 0 };
          currentRef.current = { x: 0, y: 0 };
          el.style.setProperty("--px-bg", "0px");
          el.style.setProperty("--py-bg", "0px");
          el.style.setProperty("--px-mid", "0px");
          el.style.setProperty("--py-mid", "0px");
          el.style.setProperty("--px-fg", "0px");
          el.style.setProperty("--py-fg", "0px");
        }
      },
      { rootMargin: "15% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !canParallax) {
      if (el) {
        el.style.setProperty("--px-bg", "0px");
        el.style.setProperty("--py-bg", "0px");
        el.style.setProperty("--px-mid", "0px");
        el.style.setProperty("--py-mid", "0px");
        el.style.setProperty("--px-fg", "0px");
        el.style.setProperty("--py-fg", "0px");
      }
      return;
    }

    const section = el.closest("section") ?? el;

    const tick = () => {
      rafRef.current = null;
      if (!visibleRef.current) return;

      const cur = currentRef.current;
      const target = targetRef.current;
      cur.x += (target.x - cur.x) * 0.07;
      cur.y += (target.y - cur.y) * 0.07;

      const dx = Math.abs(target.x - cur.x);
      const dy = Math.abs(target.y - cur.y);

      if (dx <= IDLE_EPSILON && dy <= IDLE_EPSILON) {
        cur.x = target.x;
        cur.y = target.y;
      }

      el.style.setProperty("--px-bg", `${(cur.x * 8).toFixed(2)}px`);
      el.style.setProperty("--py-bg", `${(cur.y * 5).toFixed(2)}px`);
      el.style.setProperty("--px-mid", `${(cur.x * 16).toFixed(2)}px`);
      el.style.setProperty("--py-mid", `${(cur.y * 10).toFixed(2)}px`);
      el.style.setProperty("--px-fg", `${(cur.x * 28).toFixed(2)}px`);
      el.style.setProperty("--py-fg", `${(cur.y * 18).toFixed(2)}px`);

      if (dx > IDLE_EPSILON || dy > IDLE_EPSILON) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!visibleRef.current) return;
      const rect = section.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      const ny = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
      targetRef.current = { x: nx, y: ny };
      schedule();
    };

    const onLeave = () => {
      targetRef.current = { x: 0, y: 0 };
      schedule();
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [canParallax]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) {
      el?.style.setProperty("--scroll-y", "0px");
      return;
    }

    const section = el.closest("section") ?? el;
    let lastScrollY = Number.NaN;

    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        if (!visibleRef.current) return;
        const rect = section.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
        const next = Number((progress * 36).toFixed(2));
        if (next === lastScrollY) return;
        lastScrollY = next;
        el.style.setProperty("--scroll-y", `${next}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current != null) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={cn(
        styles.root,
        reduced && styles.isReduced,
        !inView && styles.isPaused,
        className,
      )}
      aria-hidden="true"
    >
      {/* L1 — lighting + grain */}
      <div className={styles.lighting} />
      <div className={styles.grain} />

      {/* L2 — botanical silhouettes + decorative branch assets */}
      <div className={styles.botanicalLayer}>
        {/* Real SVG botanical assets (public/images/autumn) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/autumn/branch.svg"
          alt=""
          width={340}
          height={186}
          className={styles.branch}
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/autumn/branch.svg"
          alt=""
          width={280}
          height={153}
          className={cn(styles.branch, styles.branchBottom)}
          decoding="async"
        />
        <span className={cn(styles.silhouette, styles.silhouetteA)}>
          <BotanicalGlyph kind="maple" color="#B45309" className={styles.leafSvg} />
        </span>
        <span className={cn(styles.silhouette, styles.silhouetteB)}>
          <BotanicalGlyph kind="oak" color="#D97706" className={styles.leafSvg} />
        </span>
        <span className={cn(styles.silhouette, styles.silhouetteC)}>
          <BotanicalGlyph kind="dried" color="#EA580C" className={styles.leafSvg} />
        </span>
      </div>

      {/* L3 — soft grid + wind + particles */}
      <div className={styles.gridSoft} />
      <svg className={styles.wind} viewBox="0 0 1200 640" preserveAspectRatio="none">
        <path
          className={styles.windPath}
          d="M30 110 C170 78, 270 148, 420 120 S700 70, 880 115 S1080 168, 1180 130"
        />
        <path
          className={cn(styles.windPath, styles.windPathAmber)}
          d="M20 270 C150 238, 310 318, 470 280 S760 230, 940 275 S1110 330, 1200 295"
        />
        <path
          className={cn(styles.windPath, styles.windPathLavender)}
          d="M50 450 C210 415, 340 505, 530 465 S840 410, 1020 455 S1140 515, 1185 490"
        />
      </svg>
      <div className={styles.particles}>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Falling botanicals — bg / mid / fg */}
      <div className={cn(styles.layer, styles.layerBg)}>
        {bgLeaves.map((leaf) => (
          <AutumnLeaf key={leaf.id} leaf={leaf} />
        ))}
      </div>
      <div className={cn(styles.layer, styles.layerMid)}>
        {midLeaves.map((leaf) => (
          <AutumnLeaf key={leaf.id} leaf={leaf} />
        ))}
      </div>
      <div className={cn(styles.layer, styles.layerFg)}>
        {fgLeaves.map((leaf) => (
          <AutumnLeaf key={leaf.id} leaf={leaf} />
        ))}
      </div>
    </div>
  );
}
