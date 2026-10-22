"use client";

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from "react";

const IDLE_EPSILON = 0.05;

type ParallaxPoint = { x: number; y: number };

type UsePointerParallaxOptions = {
  enabled: boolean;
  rootRef: RefObject<HTMLElement | null>;
  /** Max translate in px at the edges of the root. */
  maxX: number;
  maxY: number;
  /** Lerp factor per frame (0–1). */
  lerp?: number;
  xVar?: string;
  yVar?: string;
  /** When false, skip IntersectionObserver and keep listening while mounted. */
  pauseWhenOffscreen?: boolean;
};

/**
 * Idle-gated pointer parallax via CSS custom properties.
 * Schedules requestAnimationFrame only while the lerp has not converged,
 * and pauses entirely while the root is off-screen.
 */
export function usePointerParallax({
  enabled,
  rootRef,
  maxX,
  maxY,
  lerp = 0.12,
  xVar = "--parallax-x",
  yVar = "--parallax-y",
  pauseWhenOffscreen = true,
}: UsePointerParallaxOptions) {
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<ParallaxPoint>({ x: 0, y: 0 });
  const currentRef = useRef<ParallaxPoint>({ x: 0, y: 0 });
  const visibleRef = useRef(true);
  const enabledRef = useRef(enabled);
  const maxRef = useRef({ x: maxX, y: maxY });
  const lerpRef = useRef(lerp);
  const varsRef = useRef({ xVar, yVar });

  useEffect(() => {
    enabledRef.current = enabled;
    maxRef.current = { x: maxX, y: maxY };
    lerpRef.current = lerp;
    varsRef.current = { xVar, yVar };
  }, [enabled, maxX, maxY, lerp, xVar, yVar]);

  const cancelRaf = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const writeVars = useCallback(
    (x: number, y: number) => {
      const el = rootRef.current;
      if (!el) return;
      const { xVar: xName, yVar: yName } = varsRef.current;
      el.style.setProperty(xName, `${x.toFixed(2)}px`);
      el.style.setProperty(yName, `${y.toFixed(2)}px`);
    },
    [rootRef],
  );

  const scheduleRef = useRef<() => void>(() => {});

  useEffect(() => {
    const tick = () => {
      rafRef.current = null;
      if (!visibleRef.current || !enabledRef.current) return;

      const cur = currentRef.current;
      const target = targetRef.current;
      const factor = lerpRef.current;
      cur.x += (target.x - cur.x) * factor;
      cur.y += (target.y - cur.y) * factor;

      const dx = Math.abs(target.x - cur.x);
      const dy = Math.abs(target.y - cur.y);

      if (dx <= IDLE_EPSILON && dy <= IDLE_EPSILON) {
        cur.x = target.x;
        cur.y = target.y;
        writeVars(cur.x, cur.y);
        return;
      }

      writeVars(cur.x, cur.y);
      rafRef.current = requestAnimationFrame(tick);
    };

    scheduleRef.current = () => {
      if (!enabledRef.current || !visibleRef.current) return;
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    return () => {
      cancelRaf();
      scheduleRef.current = () => {};
    };
  }, [cancelRaf, writeVars]);

  useEffect(() => {
    if (!enabled) {
      cancelRaf();
      targetRef.current = { x: 0, y: 0 };
      currentRef.current = { x: 0, y: 0 };
      writeVars(0, 0);
      return;
    }

    if (!pauseWhenOffscreen) {
      visibleRef.current = true;
      return () => cancelRaf();
    }

    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          cancelRaf();
          targetRef.current = { x: 0, y: 0 };
          currentRef.current = { x: 0, y: 0 };
          writeVars(0, 0);
        }
      },
      { rootMargin: "10% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelRaf();
    };
  }, [cancelRaf, enabled, pauseWhenOffscreen, rootRef, writeVars]);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!enabledRef.current || !visibleRef.current) return;
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      const nx = ((event.clientX - rect.left) / width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / height - 0.5) * 2;
      const max = maxRef.current;
      targetRef.current = {
        x: Math.max(-1, Math.min(1, nx)) * max.x,
        y: Math.max(-1, Math.min(1, ny)) * max.y,
      };
      scheduleRef.current();
    },
    [rootRef],
  );

  const onPointerLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    scheduleRef.current();
  }, []);

  return { onPointerMove, onPointerLeave };
}
