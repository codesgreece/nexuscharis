import { cn } from "@/lib/utils";

type GlyphProps = { className?: string; color?: string };

/** Detailed maple silhouette for autumn composition */
export function MapleGlyph({ className, color = "currentColor" }: GlyphProps) {
  return (
    <svg className={className} viewBox="0 0 64 72" aria-hidden="true" focusable="false">
      <path
        fill={color}
        d="M32 2.5c1.2 5.2 5.1 9.1 10.6 11.1-3.7 1.9-5.9 5.2-6.3 9.1 5.4-.4 10.1 1.5 13.9 5.3-4.7.9-8.1 3.5-9.9 7.5 4.1 2.4 6.3 6.1 6.7 10.8-4.9-2-9.1-2-13.4-.2v12.6h-2.6V46.1c-4.3-1.8-8.5-1.8-13.4.2.4-4.7 2.6-8.4 6.7-10.8-1.8-4-5.2-6.6-9.9-7.5 3.8-3.8 8.5-5.7 13.9-5.3-.4-3.9-2.6-7.2-6.3-9.1C26.9 11.6 30.8 7.7 32 2.5Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.28"
        d="M32 14.2c.4 3.2 2.2 5.6 4.9 7-1.8 1.1-2.9 2.9-3.1 5 2.6-.1 4.8.7 6.6 2.3-2.1.5-3.6 1.8-4.5 3.6 1.7 1.1 2.7 2.8 2.9 4.8-2.1-.7-3.9-.8-5.8-.2v5.4h-1v-5.4c-1.9-.6-3.7-.5-5.8.2.2-2 1.2-3.7 2.9-4.8-.9-1.8-2.4-3.1-4.5-3.6 1.8-1.6 4-2.4 6.6-2.3-.2-2.1-1.3-3.9-3.1-5 2.7-1.4 4.5-3.8 4.9-7Z"
      />
      <path stroke="#7C2D12" strokeOpacity="0.35" strokeWidth="1.1" strokeLinecap="round" d="M32 22v40" />
    </svg>
  );
}

/** Oak leaf silhouette */
export function OakGlyph({ className, color = "currentColor" }: GlyphProps) {
  return (
    <svg className={className} viewBox="0 0 56 72" aria-hidden="true" focusable="false">
      <path
        fill={color}
        d="M28 3c6.2 7.1 12.8 11.2 18.6 12.3-4.9 3.1-7.7 7.5-8.1 12.7 4.6 1.3 8.1 4.1 10.5 8.3-5.3.5-9 2.8-11.2 6.8 2 3.1 2.7 6.4 2.2 9.9-3.7-2.1-7.2-2.8-11.8-1.7V69H26.2V51.3c-4.6-1.1-8.1-.4-11.8 1.7-.5-3.5.2-6.8 2.2-9.9-2.2-4-5.9-6.3-11.2-6.8 2.4-4.2 5.9-7 10.5-8.3-.4-5.2-3.2-9.6-8.1-12.7C15.8 14.2 22.4 10.1 28.6 3H28Z"
      />
      <path stroke="#7C2D12" strokeOpacity="0.32" strokeWidth="1.1" strokeLinecap="round" d="M28 24v40" />
    </svg>
  );
}

/** Narrow dried leaf */
export function DriedGlyph({ className, color = "currentColor" }: GlyphProps) {
  return (
    <svg className={className} viewBox="0 0 40 64" aria-hidden="true" focusable="false">
      <path
        fill={color}
        d="M20 2c8.4 6.8 14.8 17.2 16.2 29.4C34.8 44.8 28.4 54.2 20 62 11.6 54.2 5.2 44.8 3.8 31.4 5.2 19.2 11.6 8.8 20 2Z"
      />
      <path stroke="#92400E" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" d="M20 8v48" />
      <path
        stroke="#92400E"
        strokeOpacity="0.22"
        strokeWidth="0.8"
        strokeLinecap="round"
        d="M20 22c-4 3-7 8-8 14M20 22c4 3 7 8 8 14"
      />
    </svg>
  );
}

/** Small botanical fragment */
export function FragmentGlyph({ className, color = "currentColor" }: GlyphProps) {
  return (
    <svg className={cn(className)} viewBox="0 0 28 36" aria-hidden="true" focusable="false">
      <path
        fill={color}
        d="M14 2c5.6 4.2 9.6 10.4 10.4 17.6C23.6 27 19.6 32.2 14 36 8.4 32.2 4.4 27 3.6 19.6 4.4 12.4 8.4 6.2 14 2Z"
      />
    </svg>
  );
}

export type BotanicalKind = "maple" | "oak" | "dried" | "fragment";

export function BotanicalGlyph({
  kind,
  className,
  color,
}: {
  kind: BotanicalKind;
  className?: string;
  color?: string;
}) {
  switch (kind) {
    case "oak":
      return <OakGlyph className={className} color={color} />;
    case "dried":
      return <DriedGlyph className={className} color={color} />;
    case "fragment":
      return <FragmentGlyph className={className} color={color} />;
    default:
      return <MapleGlyph className={className} color={color} />;
  }
}
