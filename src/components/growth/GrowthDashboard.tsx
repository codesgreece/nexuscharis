/**
 * Illustrative NEXUS Growth dashboard visual.
 * Values are decorative UI — not real client metrics.
 */
export function GrowthDashboard({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-gradient-to-br from-[#2e1a4a] via-purple-deep to-[#1a0f28] p-5 shadow-[0_28px_60px_-30px_rgba(36,21,53,0.65)] sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-muted-amber/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-purple-electric/25 blur-2xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-amber">
              NEXUS Growth
            </p>
            <p className="mt-1 text-sm font-semibold text-lavender/70">
              Monthly digital care
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-lavender">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-amber motion-safe:animate-pulse" />
            Active
          </span>
        </div>

        <div className="relative mt-5 grid grid-cols-3 gap-2.5">
          {[
            { label: "SEO Score", value: "94%", note: "illustrative" },
            { label: "Performance", value: "98", note: "illustrative" },
            { label: "Visibility", value: "+37%", note: "illustrative" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/6 px-2.5 py-3 text-center backdrop-blur-sm"
            >
              <p className="text-[9px] font-bold uppercase tracking-wide text-lavender/45">
                {stat.label}
              </p>
              <p className="mt-1 text-xl font-extrabold text-warm-ivory sm:text-2xl">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative chart — illustrative */}
        <div className="relative mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-[9px] font-bold uppercase tracking-wide text-lavender/45">
            Monthly pulse
          </p>
          <svg className="mt-2 h-16 w-full" viewBox="0 0 240 64" fill="none">
            <path
              d="M0 48 C30 44, 40 28, 60 32 S90 50, 110 36 S150 10, 170 22 S210 40, 240 18"
              stroke="url(#growthStroke)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M0 48 C30 44, 40 28, 60 32 S90 50, 110 36 S150 10, 170 22 S210 40, 240 18 V64 H0 Z"
              fill="url(#growthFill)"
              opacity="0.35"
            />
            <defs>
              <linearGradient id="growthStroke" x1="0" y1="0" x2="240" y2="0">
                <stop stopColor="#D99A55" />
                <stop offset="0.5" stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#EDE4FF" />
              </linearGradient>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="64">
                <stop stopColor="#6D28D9" stopOpacity="0.45" />
                <stop offset="1" stopColor="#6D28D9" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <ul className="relative mt-4 grid grid-cols-2 gap-2">
          {[
            { label: "SEO", ok: true },
            { label: "Updates", ok: true },
            { label: "Speed", ok: true },
            { label: "Support", ok: true },
          ].map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <span className="text-lavender/80">{item.label}</span>
              <span className="font-bold text-muted-amber">✓</span>
            </li>
          ))}
        </ul>

        <p className="relative mt-3 text-center text-[9px] text-lavender/35">
          Illustrative dashboard — not live client metrics
        </p>
      </div>
    </div>
  );
}
