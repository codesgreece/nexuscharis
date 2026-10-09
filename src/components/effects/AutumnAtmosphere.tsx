"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "@/components/effects/AutumnAtmosphere.module.css";
import { AutumnLeaf, HERO_LEAVES } from "@/components/effects/AutumnLeaves";

const bgLeaves = HERO_LEAVES.filter((l) => l.layer === "bg");
const midLeaves = HERO_LEAVES.filter((l) => l.layer === "mid");
const fgLeaves = HERO_LEAVES.filter((l) => l.layer === "fg");

/**
 * Premium autumn atmosphere for the homepage Hero.
 * Lightweight CSS/SVG leaves + subtle glow/wind; mouse/scroll parallax on desktop only.
 */
export function AutumnAtmosphere({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const [canParallax, setCanParallax] = useState(false);

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

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      const ny = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
      targetRef.current = { x: nx, y: ny };
    };

    const onLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    const tick = () => {
      const cur = currentRef.current;
      const target = targetRef.current;
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;

      // Subtle depth: bg < mid < fg
      el.style.setProperty("--px-bg", `${(cur.x * 6).toFixed(2)}px`);
      el.style.setProperty("--py-bg", `${(cur.y * 4).toFixed(2)}px`);
      el.style.setProperty("--px-mid", `${(cur.x * 14).toFixed(2)}px`);
      el.style.setProperty("--py-mid", `${(cur.y * 9).toFixed(2)}px`);
      el.style.setProperty("--px-fg", `${(cur.x * 24).toFixed(2)}px`);
      el.style.setProperty("--py-fg", `${(cur.y * 16).toFixed(2)}px`);

      rafRef.current = requestAnimationFrame(tick);
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [canParallax]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) {
      el?.style.setProperty("--scroll-y", "0px");
      return;
    }

    const section = el.closest("section") ?? el;

    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const rect = section.getBoundingClientRect();
        // Mild vertical drift while hero is in view
        const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
        el.style.setProperty("--scroll-y", `${(progress * 28).toFixed(2)}px`);
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
      className={cn(styles.root, reduced && styles.isReduced, className)}
      aria-hidden="true"
    >
      <div className={cn(styles.glow, reduced && styles.glowStatic)} />

      <svg className={styles.wind} viewBox="0 0 1200 600" preserveAspectRatio="none">
        <path
          className={styles.windPath}
          d="M40 120 C180 90, 280 150, 420 130 S680 80, 860 120 S1080 170, 1180 140"
        />
        <path
          className={cn(styles.windPath, styles.windPathSlow)}
          d="M20 280 C160 250, 300 320, 460 290 S740 240, 920 280 S1100 330, 1200 300"
        />
        <path
          className={cn(styles.windPath, styles.windPathSoft)}
          d="M60 460 C220 430, 340 500, 520 470 S820 420, 1000 460 S1140 510, 1180 490"
        />
      </svg>

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

      {/* FG above portrait (z-12); left copy uses z-11 so CTAs stay clickable/readable */}
      <div className={cn(styles.layer, styles.layerFg)}>
        {fgLeaves.map((leaf) => (
          <AutumnLeaf key={leaf.id} leaf={leaf} />
        ))}
      </div>
    </div>
  );
}
