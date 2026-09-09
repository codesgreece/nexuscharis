import type { LegalPageKey } from "@prisma/client";

export const LEGAL_ROUTE_BY_KEY: Record<LegalPageKey, string> = {
  PRIVACY: "/privacy",
  COOKIES: "/cookies",
  TERMS: "/terms",
  SERVICES_TERMS: "/services-terms",
  COPYRIGHT: "/copyright",
};

export const LEGAL_META: Record<
  LegalPageKey,
  { path: string; title: string; description: string }
> = {
  PRIVACY: {
    path: "/privacy",
    title: "NEXUS DEV STUDIO | Πολιτική Απορρήτου",
    description:
      "Πολιτική απορρήτου και επεξεργασίας προσωπικών δεδομένων του NEXUS DEV STUDIO GREECE.",
  },
  COOKIES: {
    path: "/cookies",
    title: "NEXUS DEV STUDIO | Πολιτική Cookies",
    description:
      "Πληροφορίες για cookies και τοπική αποθήκευση στο website του NEXUS DEV STUDIO GREECE.",
  },
  TERMS: {
    path: "/terms",
    title: "NEXUS DEV STUDIO | Όροι Χρήσης",
    description: "Όροι χρήσης του website NEXUS DEV STUDIO GREECE.",
  },
  SERVICES_TERMS: {
    path: "/services-terms",
    title: "NEXUS DEV STUDIO | Όροι Υπηρεσιών",
    description:
      "Όροι παροχής υπηρεσιών ανάπτυξης ιστοσελίδων και εφαρμογών του NEXUS DEV STUDIO GREECE.",
  },
  COPYRIGHT: {
    path: "/copyright",
    title: "NEXUS DEV STUDIO | Πνευματικά Δικαιώματα",
    description:
      "Πληροφορίες πνευματικής ιδιοκτησίας για περιεχόμενο, brand και τρίτα assets του NEXUS DEV STUDIO GREECE.",
  },
};
