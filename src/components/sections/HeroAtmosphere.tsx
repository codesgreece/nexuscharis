"use client";

import dynamic from "next/dynamic";

const AutumnAtmosphere = dynamic(
  () =>
    import("@/components/effects/AutumnAtmosphere").then((mod) => mod.AutumnAtmosphere),
  { ssr: false },
);

/** Decorative hero motion. Loaded on the client so it does not block the first paint. */
export function HeroAtmosphere() {
  return <AutumnAtmosphere />;
}
