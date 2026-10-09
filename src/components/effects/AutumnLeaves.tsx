import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "@/components/effects/AutumnAtmosphere.module.css";

export type AutumnLeafLayer = "bg" | "mid" | "fg";

export type AutumnLeafConfig = {
  id: string;
  layer: AutumnLeafLayer;
  variant: 0 | 1 | 2;
  left: string;
  size: number;
  opacity: number;
  color: string;
  blur: string;
  rot: string;
  scale: number;
  duration: string;
  delay: string;
  drift: string;
  spin: string;
  staticTop: string;
  hideOnMobile?: boolean;
};

/** Maple-like and abstract autumn silhouettes (inline SVG — no image assets). */
export function LeafGlyph({ variant, className }: { variant: 0 | 1 | 2; className?: string }) {
  if (variant === 1) {
    return (
      <svg className={className} viewBox="0 0 24 28" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12 1.2c.5 2.4 2.2 4.2 4.6 5.1-1.6.9-2.6 2.4-2.8 4.2 2.4-.2 4.5.7 6.2 2.4-2.1.4-3.6 1.6-4.4 3.4 1.8 1.1 2.8 2.8 3 4.9-2.2-.9-4.1-.9-6-.1v5.8h-1.2V21c-1.9-.8-3.8-.8-6 .1.2-2.1 1.2-3.8 3-4.9-.8-1.8-2.3-3-4.4-3.4 1.7-1.7 3.8-2.6 6.2-2.4-.2-1.8-1.2-3.3-2.8-4.2C9.8 5.4 11.5 3.6 12 1.2Z"
        />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg className={className} viewBox="0 0 20 26" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M10 1c2.8 3.2 5.8 5.1 8.4 5.6-2.2 1.4-3.5 3.4-3.7 5.8 2.1.6 3.7 1.9 4.8 3.8-2.4.2-4.1 1.3-5.1 3.1.9 1.4 1.2 2.9 1 4.5-1.7-1-3.3-1.3-5.4-.8V26H9.2v-2.9c-2.1-.5-3.7-.2-5.4.8-.2-1.6.1-3.1 1-4.5-1-1.8-2.7-2.9-5.1-3.1 1.1-1.9 2.7-3.2 4.8-3.8C4.3 10 3 8 0.8 6.6 3.4 6.1 6.4 4.2 9.2 1h.8Z"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 18 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M9 1.5c1.6 2.6 3.8 4.2 6.2 4.8-1.8 1.2-2.8 2.9-2.9 4.9 1.9.3 3.4 1.3 4.5 2.9-2 .3-3.4 1.3-4.2 2.9.8 1.2 1.1 2.5.9 3.9-1.5-.7-2.9-.8-4.5-.2V23H8.2v-2.3c-1.6-.6-3-.5-4.5.2-.2-1.4.1-2.7.9-3.9-.8-1.6-2.2-2.6-4.2-2.9 1.1-1.6 2.6-2.6 4.5-2.9C4.8 9.2 3.8 7.5 2 6.3 4.4 5.7 6.6 4.1 8.2 1.5H9Z"
      />
    </svg>
  );
}

export const HERO_LEAVES: AutumnLeafConfig[] = [
  // Background — soft, blurred
  {
    id: "b1",
    layer: "bg",
    variant: 0,
    left: "6%",
    size: 22,
    opacity: 0.1,
    color: "#B45309",
    blur: "2.2px",
    rot: "-18deg",
    scale: 0.9,
    duration: "17s",
    delay: "0s",
    drift: "28px",
    spin: "48deg",
    staticTop: "12%",
  },
  {
    id: "b2",
    layer: "bg",
    variant: 1,
    left: "22%",
    size: 28,
    opacity: 0.08,
    color: "#D97706",
    blur: "2.8px",
    rot: "12deg",
    scale: 1.05,
    duration: "15s",
    delay: "-4s",
    drift: "-36px",
    spin: "-55deg",
    staticTop: "38%",
    hideOnMobile: true,
  },
  {
    id: "b3",
    layer: "bg",
    variant: 2,
    left: "48%",
    size: 20,
    opacity: 0.12,
    color: "#EA580C",
    blur: "2px",
    rot: "28deg",
    scale: 0.85,
    duration: "18s",
    delay: "-8s",
    drift: "42px",
    spin: "62deg",
    staticTop: "22%",
  },
  {
    id: "b4",
    layer: "bg",
    variant: 0,
    left: "68%",
    size: 26,
    opacity: 0.09,
    color: "#F59E0B",
    blur: "3px",
    rot: "-8deg",
    scale: 1,
    duration: "16s",
    delay: "-2s",
    drift: "-24px",
    spin: "40deg",
    staticTop: "55%",
    hideOnMobile: true,
  },
  {
    id: "b5",
    layer: "bg",
    variant: 1,
    left: "86%",
    size: 18,
    opacity: 0.11,
    color: "#B45309",
    blur: "2.4px",
    rot: "35deg",
    scale: 0.8,
    duration: "14s",
    delay: "-6s",
    drift: "18px",
    spin: "-42deg",
    staticTop: "70%",
  },
  {
    id: "b6",
    layer: "bg",
    variant: 2,
    left: "34%",
    size: 24,
    opacity: 0.07,
    color: "#D97706",
    blur: "3.2px",
    rot: "-32deg",
    scale: 1.1,
    duration: "19s",
    delay: "-11s",
    drift: "-30px",
    spin: "70deg",
    staticTop: "8%",
    hideOnMobile: true,
  },

  // Middle
  {
    id: "m1",
    layer: "mid",
    variant: 1,
    left: "12%",
    size: 16,
    opacity: 0.28,
    color: "#EA580C",
    blur: "0.4px",
    rot: "8deg",
    scale: 0.95,
    duration: "12s",
    delay: "-1s",
    drift: "34px",
    spin: "58deg",
    staticTop: "28%",
  },
  {
    id: "m2",
    layer: "mid",
    variant: 0,
    left: "28%",
    size: 14,
    opacity: 0.34,
    color: "#F59E0B",
    blur: "0.2px",
    rot: "-22deg",
    scale: 0.88,
    duration: "13.5s",
    delay: "-5s",
    drift: "-28px",
    spin: "-46deg",
    staticTop: "48%",
    hideOnMobile: true,
  },
  {
    id: "m3",
    layer: "mid",
    variant: 2,
    left: "44%",
    size: 18,
    opacity: 0.24,
    color: "#D97706",
    blur: "0.5px",
    rot: "18deg",
    scale: 1,
    duration: "11s",
    delay: "-9s",
    drift: "22px",
    spin: "52deg",
    staticTop: "16%",
  },
  {
    id: "m4",
    layer: "mid",
    variant: 1,
    left: "58%",
    size: 15,
    opacity: 0.38,
    color: "#B45309",
    blur: "0.3px",
    rot: "-14deg",
    scale: 0.92,
    duration: "14.5s",
    delay: "-3s",
    drift: "-40px",
    spin: "64deg",
    staticTop: "62%",
  },
  {
    id: "m5",
    layer: "mid",
    variant: 0,
    left: "74%",
    size: 17,
    opacity: 0.3,
    color: "#EA580C",
    blur: "0.35px",
    rot: "26deg",
    scale: 1.05,
    duration: "12.8s",
    delay: "-7s",
    drift: "26px",
    spin: "-50deg",
    staticTop: "34%",
    hideOnMobile: true,
  },
  {
    id: "m6",
    layer: "mid",
    variant: 2,
    left: "88%",
    size: 13,
    opacity: 0.42,
    color: "#F59E0B",
    blur: "0.15px",
    rot: "-6deg",
    scale: 0.86,
    duration: "10.5s",
    delay: "-12s",
    drift: "-18px",
    spin: "38deg",
    staticTop: "74%",
  },
  {
    id: "m7",
    layer: "mid",
    variant: 1,
    left: "3%",
    size: 12,
    opacity: 0.22,
    color: "#D97706",
    blur: "0.6px",
    rot: "40deg",
    scale: 0.8,
    duration: "15.5s",
    delay: "-10s",
    drift: "16px",
    spin: "-60deg",
    staticTop: "82%",
    hideOnMobile: true,
  },

  // Foreground — right side so they can drift over the hero portrait
  {
    id: "f1",
    layer: "fg",
    variant: 1,
    left: "62%",
    size: 26,
    opacity: 0.52,
    color: "#D97706",
    blur: "0px",
    rot: "-10deg",
    scale: 1.08,
    duration: "11.5s",
    delay: "-2.5s",
    drift: "20px",
    spin: "44deg",
    staticTop: "42%",
  },
  {
    id: "f2",
    layer: "fg",
    variant: 0,
    left: "78%",
    size: 22,
    opacity: 0.58,
    color: "#EA580C",
    blur: "0px",
    rot: "16deg",
    scale: 1,
    duration: "13s",
    delay: "-6.5s",
    drift: "-32px",
    spin: "-56deg",
    staticTop: "18%",
  },
  {
    id: "f3",
    layer: "fg",
    variant: 2,
    left: "91%",
    size: 30,
    opacity: 0.48,
    color: "#B45309",
    blur: "0.2px",
    rot: "22deg",
    scale: 1.12,
    duration: "9.5s",
    delay: "-0.8s",
    drift: "14px",
    spin: "70deg",
    staticTop: "58%",
    hideOnMobile: true,
  },
  {
    id: "f4",
    layer: "fg",
    variant: 1,
    left: "70%",
    size: 19,
    opacity: 0.62,
    color: "#F59E0B",
    blur: "0px",
    rot: "-28deg",
    scale: 0.94,
    duration: "12.2s",
    delay: "-8.5s",
    drift: "-22px",
    spin: "48deg",
    staticTop: "78%",
  },
];

export function AutumnLeaf({
  leaf,
  className,
}: {
  leaf: AutumnLeafConfig;
  className?: string;
}) {
  return (
    <span
      className={cn(styles.leaf, leaf.hideOnMobile && styles.leafMobileHide, className)}
      style={
        {
          "--leaf-left": leaf.left,
          "--leaf-size": `${leaf.size}px`,
          "--leaf-opacity": String(leaf.opacity),
          "--leaf-color": leaf.color,
          "--leaf-blur": leaf.blur,
          "--leaf-rot": leaf.rot,
          "--leaf-scale": String(leaf.scale),
          "--leaf-duration": leaf.duration,
          "--leaf-delay": leaf.delay,
          "--leaf-drift": leaf.drift,
          "--leaf-spin": leaf.spin,
          "--leaf-static-top": leaf.staticTop,
          color: leaf.color,
        } as CSSProperties
      }
    >
      <LeafGlyph variant={leaf.variant} className={styles.leafSvg} />
    </span>
  );
}
