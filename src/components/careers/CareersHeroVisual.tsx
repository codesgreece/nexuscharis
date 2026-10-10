/** Abstract “connecting people with digital opportunities” hero visual — SVG/CSS only. */

export function CareersHeroVisual({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <div className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.18),transparent_65%)] blur-2xl motion-safe:animate-[ambient-pulse_8s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -right-4 top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(217,154,85,0.22),transparent_70%)] blur-xl" />

        <svg className="relative h-full w-full" viewBox="0 0 360 360" fill="none">
          <defs>
            <linearGradient id="careersOrbit" x1="0" y1="0" x2="360" y2="360">
              <stop stopColor="#6D28D9" stopOpacity="0.55" />
              <stop offset="0.5" stopColor="#D99A55" stopOpacity="0.45" />
              <stop offset="1" stopColor="#EDE4FF" stopOpacity="0.7" />
            </linearGradient>
            <filter id="careersSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          <circle
            cx="180"
            cy="180"
            r="132"
            stroke="url(#careersOrbit)"
            strokeWidth="1.2"
            strokeDasharray="4 10"
            className="motion-safe:origin-center motion-safe:animate-[spin_48s_linear_infinite]"
            style={{ transformOrigin: "180px 180px" }}
          />
          <circle
            cx="180"
            cy="180"
            r="96"
            stroke="#6D28D9"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <circle cx="180" cy="180" r="42" fill="#EDE4FF" stroke="#6D28D9" strokeWidth="1.4" />
          <text
            x="180"
            y="188"
            textAnchor="middle"
            fill="#241535"
            fontSize="28"
            fontWeight="800"
            fontFamily="Manrope, system-ui, sans-serif"
          >
            N
          </text>

          {/* Connection mesh */}
          <g stroke="#6D28D9" strokeOpacity="0.28" strokeWidth="1.1">
            <path d="M180 48 L268 98" />
            <path d="M268 98 L292 190" />
            <path d="M292 190 L248 278" />
            <path d="M112 98 L180 48" />
            <path d="M68 190 L112 98" />
            <path d="M112 262 L68 190" />
            <path d="M180 138 L248 120" />
            <path d="M180 138 L120 168" />
            <path d="M180 222 L240 210" />
          </g>

          {/* Nodes */}
          <g>
            <circle cx="180" cy="48" r="5" fill="#D99A55" />
            <circle cx="268" cy="98" r="4.5" fill="#6D28D9" />
            <circle cx="292" cy="190" r="5" fill="#D99A55" />
            <circle cx="248" cy="278" r="4" fill="#6D28D9" />
            <circle cx="112" cy="98" r="4.5" fill="#6D28D9" />
            <circle cx="68" cy="190" r="5" fill="#D99A55" />
            <circle cx="112" cy="262" r="4" fill="#6D28D9" />
          </g>

          {/* Mini interface cards */}
          <g filter="url(#careersSoft)">
            <rect
              x="34"
              y="56"
              width="78"
              height="46"
              rx="10"
              fill="#FFFCF7"
              stroke="#6D28D9"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            <rect x="44" y="68" width="36" height="5" rx="2.5" fill="#6D28D9" fillOpacity="0.35" />
            <rect x="44" y="78" width="50" height="4" rx="2" fill="#D99A55" fillOpacity="0.45" />
            <rect x="44" y="86" width="28" height="4" rx="2" fill="#6D28D9" fillOpacity="0.18" />

            <rect
              x="248"
              y="214"
              width="86"
              height="52"
              rx="10"
              fill="#FFFCF7"
              stroke="#6D28D9"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            <rect x="258" y="226" width="40" height="5" rx="2.5" fill="#6D28D9" fillOpacity="0.3" />
            <rect x="258" y="236" width="54" height="4" rx="2" fill="#6D28D9" fillOpacity="0.14" />
            <rect x="258" y="246" width="24" height="8" rx="4" fill="#D99A55" fillOpacity="0.7" />
          </g>
        </svg>
      </div>
    </div>
  );
}
