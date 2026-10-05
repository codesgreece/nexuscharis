"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./NexusBrandMark.module.css";

const MAX_ROTATE_Y = 8;
const MAX_ROTATE_X = 6;

export type NexusBrandMarkVariant = "section" | "header";

type NexusBrandMarkInteractiveProps = {
  variant?: NexusBrandMarkVariant;
  className?: string;
  href?: string;
  showText?: boolean;
};

export function NexusBrandMarkInteractive({
  variant = "section",
  className,
  href = "/#home",
  showText = true,
}: NexusBrandMarkInteractiveProps) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);

  const particleCount = variant === "header" ? 3 : 5;

  const tickTilt = useRef(() => {
    const tilt = tiltRef.current;
    if (!tilt) {
      rafRef.current = null;
      return;
    }

    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.12;
    current.y += (target.y - current.y) * 0.12;

    tilt.style.transform = `rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg)`;

    if (
      Math.abs(target.x - current.x) > 0.05 ||
      Math.abs(target.y - current.y) > 0.05
    ) {
      rafRef.current = requestAnimationFrame(() => tickTilt.current());
    } else {
      current.x = target.x;
      current.y = target.y;
      tilt.style.transform = `rotateX(${current.x}deg) rotateY(${current.y}deg)`;
      rafRef.current = null;
    }
  });

  const scheduleTilt = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => tickTilt.current());
  }, []);

  const updateTiltFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      if (reduceMotion) return;
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;

      targetRef.current = {
        x: Math.max(-MAX_ROTATE_X, Math.min(MAX_ROTATE_X, -py * MAX_ROTATE_X * 2)),
        y: Math.max(-MAX_ROTATE_Y, Math.min(MAX_ROTATE_Y, px * MAX_ROTATE_Y * 2)),
      };
      scheduleTilt();
    },
    [reduceMotion, scheduleTilt],
  );

  const resetTilt = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    scheduleTilt();
  }, [scheduleTilt]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onPointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    updateTiltFromPoint(event.clientX, event.clientY);
  };

  const onMouseMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    updateTiltFromPoint(event.clientX, event.clientY);
  };

  const motionReady = entered || Boolean(reduceMotion);

  const titleDelay = variant === "header" ? 0.15 : 0.4;
  const subtitleDelay = variant === "header" ? 0.25 : 0.7;

  return (
    <Link
      href={href}
      className={cn(
        styles.root,
        variant === "header" && styles.rootHeader,
        !visible && styles.isPaused,
        reduceMotion && styles.reduceMotion,
        className,
      )}
      aria-label="NEXUS DEV STUDIO GREECE — επιστροφή στην αρχική"
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      onMouseMove={onMouseMove}
      onMouseLeave={resetTilt}
    >
      <div
        ref={stageRef}
        className={cn(styles.stage, variant === "header" && styles.stageHeader)}
      >
        {!reduceMotion &&
          Array.from({ length: particleCount }, (_, i) => (
            <div key={i} className={styles.particle} aria-hidden />
          ))}

        <motion.div
          className={styles.entrance}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={
            motionReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
          }
          transition={
            reduceMotion
              ? { duration: 0.35 }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <div
            className={cn(
              styles.float,
              variant === "header" && styles.floatHeader,
            )}
          >
            <div ref={tiltRef} className={styles.tilt}>
              <motion.div
                className={styles.glow}
                aria-hidden
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={motionReady ? { opacity: 0.55 } : { opacity: 0 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : 0.25,
                }}
              />

              <div
                className={cn(
                  styles.mark,
                  variant === "header" && styles.markHeader,
                )}
              >
                {!reduceMotion && <div className={styles.sweep} aria-hidden />}
                <motion.svg
                  className={styles.letter}
                  viewBox="0 0 48 48"
                  role="img"
                  aria-hidden
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={motionReady ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : 0.35,
                    ease: "easeOut",
                  }}
                >
                  <title>N</title>
                  <path d="M14 34V14h4.2l11.2 13.6V14H34v20h-4.2L18.6 20.4V34H14z" />
                </motion.svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {showText && (
        <div className={styles.copy}>
          <motion.p
            className={cn(
              styles.title,
              variant === "header" && styles.titleHeader,
            )}
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={
              motionReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
            }
            transition={{
              duration: reduceMotion ? 0.35 : 0.7,
              delay: reduceMotion ? 0 : titleDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            NEXUS DEV STUDIO
          </motion.p>
          <motion.p
            className={cn(
              styles.subtitle,
              variant === "header" && styles.subtitleHeader,
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={
              motionReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
            }
            transition={{
              duration: reduceMotion ? 0.35 : 0.6,
              delay: reduceMotion ? 0.05 : subtitleDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Greece
          </motion.p>
        </div>
      )}
    </Link>
  );
}
