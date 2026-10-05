import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXUS DEV STUDIO GREECE",
    short_name: "NEXUS",
    description:
      "Το NEXUS DEV STUDIO GREECE δημιουργεί επαγγελματικές ιστοσελίδες, landing pages, e-shops, web εφαρμογές και custom digital solutions για επιχειρήσεις και επαγγελματίες σε όλη την Ελλάδα.",
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
