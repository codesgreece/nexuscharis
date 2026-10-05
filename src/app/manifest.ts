import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXUS DEV STUDIO GREECE",
    short_name: "NEXUS",
    description:
      "NEXUS DEV STUDIO GREECE — ιστοσελίδες, e-shop και digital solutions για επιχειρήσεις σε όλη την Ελλάδα.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6D28D9",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
