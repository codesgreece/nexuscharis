"use client";

import { useEffect, useRef, useState } from "react";

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
        viewBox="0 0 420 230"
        role="img"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="sigGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Phrase — three handwritten lines */}
        <g className="signature-phrase" filter="url(#sigGlow)">
          <text x="18" y="46" className="sig-line sig-line-1">
            Ιδέες
          </text>
          <text x="18" y="88" className="sig-line sig-line-2">
            Τεχνολογία
          </text>
          <text x="18" y="130" className="sig-line sig-line-3">
            Πραγματικά Αποτελέσματα
          </text>
        </g>

        {/* Signature — offset lower-right like a personal note */}
        <g
          className="signature-sign"
          filter="url(#sigGlow)"
          transform="translate(42 8) rotate(-2 280 180)"
        >
          <text x="148" y="176" className="sig-name">
            Χ. Χαράλαμπος
          </text>
          <path
            className="sig-flourish"
            d="M168 188 C198 196, 248 194, 312 184"
          />
          <text x="178" y="214" className="sig-role">
            Founder &amp; Developer
          </text>
        </g>
      </svg>
    </div>
  );
}
