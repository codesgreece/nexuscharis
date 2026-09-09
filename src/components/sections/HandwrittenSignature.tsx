"use client";

import { useEffect, useRef, useState } from "react";

type HandwrittenSignatureProps = {
  className?: string;
};

/** Premium handwritten note — full name must stay «Χ. Χαράλαμπος» (not Χριστόπουλος). */
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
        viewBox="0 0 460 250"
        role="img"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="sigGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="signature-phrase" filter="url(#sigGlow)">
          <text x="16" y="48" className="sig-line sig-line-1" pathLength={1}>
            Ιδέες
          </text>
          <text x="16" y="96" className="sig-line sig-line-2" pathLength={1}>
            Τεχνολογία
          </text>
          <text x="16" y="144" className="sig-line sig-line-3" pathLength={1}>
            Πραγματικά Αποτελέσματα
          </text>
        </g>

        <g
          className="signature-sign"
          filter="url(#sigGlow)"
          transform="translate(28 4) rotate(-2.2 300 190)"
        >
          <text x="148" y="186" className="sig-name" pathLength={1}>
            Χ. Χαράλαμπος
          </text>
          <path
            className="sig-flourish"
            d="M158 198 C205 210, 275 212, 355 196"
            pathLength={1}
          />
          <text x="168" y="226" className="sig-role" pathLength={1}>
            Founder &amp; Developer
          </text>
        </g>
      </svg>
    </div>
  );
}
