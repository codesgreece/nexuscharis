"use client";

import { cn } from "@/lib/utils";
import { NexusBrandMarkInteractive } from "./NexusBrandMarkInteractive";
import styles from "./NexusBrandMark.module.css";

type NexusBrandMarkProps = {
  className?: string;
  href?: string;
};

export function NexusBrandMark({
  className,
  href = "/#home",
}: NexusBrandMarkProps) {
  return (
    <section
      className={cn(styles.section, className)}
      aria-label="NEXUS DEV STUDIO GREECE brand"
    >
      <div className={styles.grid} aria-hidden />
      <div className={styles.ambient} aria-hidden />

      <div className={styles.shell}>
        <NexusBrandMarkInteractive variant="section" href={href} />
      </div>
    </section>
  );
}
