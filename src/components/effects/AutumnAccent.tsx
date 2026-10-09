import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "@/components/effects/AutumnAtmosphere.module.css";
import { LeafGlyph } from "@/components/effects/AutumnLeaves";

type AccentVariant = "services" | "audience" | "coverage" | "cta";

/**
 * Very subtle autumn accents for non-hero homepage sections.
 * Decorative only — pointer-events none, no layout impact.
 */
export function AutumnAccent({
  variant,
  className,
}: {
  variant: AccentVariant;
  className?: string;
}) {
  return (
    <div className={cn(styles.accentRoot, className)} aria-hidden="true">
      {variant === "audience" && <div className={styles.accentGlowSoft} />}
      {variant === "coverage" && <div className={styles.accentGlowWarm} />}
      {variant === "cta" && <div className={styles.accentGlowCta} />}

      {variant === "services" && (
        <>
          <div className={styles.accentGlowSoft} />
          <span
            className={cn(styles.accentLeaf, styles.accentLeafHideMobile)}
            style={
              {
                top: "18%",
                right: "8%",
                "--leaf-size": "16px",
                "--leaf-opacity": "0.2",
                "--leaf-color": "#D97706",
                "--leaf-delay": "0s",
                color: "#D97706",
              } as CSSProperties
            }
          >
            <LeafGlyph variant={1} className={styles.leafSvg} />
          </span>
          <span
            className={styles.accentLeaf}
            style={
              {
                bottom: "22%",
                left: "6%",
                "--leaf-size": "13px",
                "--leaf-opacity": "0.16",
                "--leaf-color": "#B45309",
                "--leaf-delay": "-4s",
                color: "#B45309",
              } as CSSProperties
            }
          >
            <LeafGlyph variant={0} className={styles.leafSvg} />
          </span>
        </>
      )}
    </div>
  );
}
