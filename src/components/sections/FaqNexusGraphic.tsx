"use client";

import { useEffect, useRef, useState } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { cn } from "@/lib/utils";
import styles from "@/components/sections/FaqNexusGraphic.module.css";

type FaqNexusGraphicProps = {
  active?: boolean;
  className?: string;
};

export function FaqNexusGraphic({ active = false, className }: FaqNexusGraphicProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [canParallax, setCanParallax] = useState(false);
  const [inView, setInView] = useState(true);

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
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "12% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { onPointerMove, onPointerLeave } = usePointerParallax({
    enabled: canParallax,
    rootRef,
    maxX: 10,
    maxY: 8,
  });

  return (
    <div
      ref={rootRef}
      className={cn(
        styles.root,
        active && styles.rootIsActive,
        !inView && styles.rootIsPaused,
        className,
      )}
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
