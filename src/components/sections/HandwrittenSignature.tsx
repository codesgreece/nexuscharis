"use client";

import { useEffect, useRef, useState } from "react";
import { signaturePaths } from "@/components/sections/signaturePaths";

type HandwrittenSignatureProps = {
  className?: string;
};

export function HandwrittenSignature({ className = "" }: HandwrittenSignatureProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setActive(true);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`signature-root ${active ? "is-drawn" : ""} ${className}`}
      aria-label="Ιδέες, Τεχνολογία, Πραγματικά Αποτελέσματα. Υπογραφή Χ. Χαράλαμπος, Founder και Developer"
    >
      <svg
        className="signature-svg"
        viewBox="0 0 440 240"
        role="img"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="sigGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="1.15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="signature-phrase" filter="url(#sigGlow)">
          {signaturePaths.phrase.map((line) => (
            <path
              key={line.id}
              className={`sig-line sig-line-${line.id}`}
              d={line.d}
              pathLength={1}
            />
          ))}
        </g>

        <g
          className="signature-sign"
          filter="url(#sigGlow)"
          transform="translate(36 6) rotate(-2.5 280 180)"
        >
          <path className="sig-name" d={signaturePaths.name} pathLength={1} />
          <path className="sig-flourish" d={signaturePaths.flourish} pathLength={1} />
          <path className="sig-role" d={signaturePaths.role} pathLength={1} />
        </g>
      </svg>
    </div>
  );
}
