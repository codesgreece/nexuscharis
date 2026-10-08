"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import styles from "@/components/sections/FaqNexusGraphic.module.css";

type FaqNexusGraphicProps = {
  active?: boolean;
  className?: string;
};

export function FaqNexusGraphic({ active = false, className }: FaqNexusGraphicProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [canParallax, setCanParallax] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => {
      setCanParallax(!mqReduce.matches && mqFine.matches);
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
        x: Math.max(-1, Math.min(1, nx)) * 10,
        y: Math.max(-1, Math.min(1, ny)) * 8,
      };
    },
    [canParallax],
  );

  const onPointerLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, active && styles.rootIsActive, className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      <div className={styles.stage}>
        <div className={styles.glow} />
        <div className={styles.glass} />

        <svg className={styles.svg} viewBox="0 0 320 320" role="presentation">
          <circle className={`${styles.orbit} ${styles.orbitC}`} cx="160" cy="160" r="128" />
          <circle className={`${styles.orbit} ${styles.orbitA}`} cx="160" cy="160" r="98" />
          <circle className={`${styles.orbit} ${styles.orbitB}`} cx="160" cy="160" r="68" />

          <path className={styles.connector} d="M160 62 L232 102 L232 218 L160 258 L88 218 L88 102 Z" />
          <path className={styles.pulse} d="M160 62 L232 102 L232 218 L160 258 L88 218 L88 102 Z" />

          <g>
            <circle className={styles.node} cx="160" cy="62" r="4.5" />
            <circle className={styles.node} cx="232" cy="102" r="4" />
            <circle className={styles.node} cx="232" cy="218" r="4.5" />
            <circle className={styles.node} cx="160" cy="258" r="4" />
            <circle className={styles.node} cx="88" cy="218" r="4.5" />
            <circle className={styles.node} cx="88" cy="102" r="4" />
          </g>

          <g>
            <circle className={styles.particle} cx="118" cy="86" r="1.6" />
            <circle className={styles.particle} cx="214" cy="148" r="1.4" />
            <circle className={styles.particle} cx="196" cy="236" r="1.5" />
            <circle className={styles.particle} cx="108" cy="196" r="1.3" />
          </g>

          <g className={styles.core}>
            <circle className={styles.coreRing} cx="160" cy="160" r="34" />
            <text className={styles.coreN} x="160" y="174" textAnchor="middle">
              N
            </text>
          </g>
        </svg>

        <div className={styles.labels}>
          <span className={`${styles.label} ${styles.labelTop}`}>Nexus Core</span>
          <span className={`${styles.label} ${styles.labelLeft}`}>Digital System</span>
          <span className={`${styles.label} ${styles.labelBottom}`}>Web Development</span>
        </div>
      </div>
    </div>
  );
}
