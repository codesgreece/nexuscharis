/**
 * Careers page copy + shared public job type.
 * Job records are managed in the Admin Panel (database) — not hardcoded here.
 */

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type JobLocation = string;

/** @deprecated Prefer PublicJob from server/services/careers — kept as alias for UI components. */
export type Job = {
  id: string;
  slug: string;
  title: string;
  location: JobLocation;
  type: string;
  category: string;
  shortDescription: string;
  description: string;
  role: string;
  /** Rich HTML */
  responsibilities: string;
  /** Rich HTML */
  requirements: string;
  /** Rich HTML */
  benefits: string;
  whyNexus: string;
  salary?: string | null;
  experience?: string | null;
  coverImage?: string | null;
  /** ISO date string (YYYY-MM-DD) — optional display */
  postedAt?: string;
  status?: "DRAFT" | "ACTIVE" | "CLOSED";
  acceptingApplications?: boolean;
};

export const CAREERS_PAGE = {
  path: "/careers",
  eyebrow: "Careers",
  title: "Χτίζουμε το επόμενο βήμα μαζί.",
  subtitle:
    "Αναζητούμε ανθρώπους με διάθεση να δημιουργήσουν, να εξελιχθούν και να συμμετέχουν στα digital projects της NEXUS DEV STUDIO.",
  seo: {
    title: "Careers | Ανοιχτές θέσεις εργασίας",
    description:
      "Δες τις ανοιχτές θέσεις στη NEXUS DEV STUDIO GREECE και κάνε αίτηση. Modern digital studio — websites, apps και digital growth.",
  },
} as const;

export const JOB_EMPLOYMENT_TYPES: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

export const JOB_CATEGORIES = [
  "Engineering",
  "Operations",
  "Design",
  "Marketing",
  "Sales",
  "Other",
] as const;
