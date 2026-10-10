/**
 * Careers / open positions — edit this file to add, update, or deactivate jobs.
 * Only jobs with `isActive: true` appear on the public Careers pages.
 */

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type JobLocation = string;

export type Job = {
  id: string;
  slug: string;
  title: string;
  location: JobLocation;
  type: JobType;
  category: string;
  shortDescription: string;
  description: string;
  role: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  whyNexus: string;
  /** ISO date string (YYYY-MM-DD) — optional display */
  postedAt?: string;
  isActive: boolean;
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

/**
 * Add or deactivate positions here. No UI component changes required.
 * Keep benefits honest — avoid inventing compensation details not confirmed.
 */
export const jobs: Job[] = [
  {
    id: "frontend-developer",
    slug: "frontend-developer",
    title: "Frontend Developer",
    location: "Remote / Αθήνα",
    type: "Full-time",
    category: "Engineering",
    shortDescription:
      "Αναζητούμε Frontend Developer με εμπειρία σε modern web technologies για τη δημιουργία premium websites και digital products.",
    description:
      "Στη NEXUS DEV STUDIO σχεδιάζουμε και αναπτύσσουμε websites, landing pages και web εφαρμογές για επιχειρήσεις στην Ελλάδα. Ψάχνουμε Frontend Developer που νοιάζεται για καθαρό UI, απόδοση και καλή συνεργασία.",
    role: "Θα συμμετέχεις στην ανάπτυξη frontend interfaces για client projects — από marketing sites μέχρι πιο σύνθετα product UIs — σε στενή συνεργασία με τον ιδρυτή της NEXUS.",
    responsibilities: [
      "Ανάπτυξη responsive interfaces με σύγχρονα web frameworks",
      "Υλοποίηση UI/UX με προσοχή σε λεπτομέρεια, accessibility και performance",
      "Συνεργασία σε code reviews και βελτίωση ποιότητας κώδικα",
      "Συμμετοχή σε συζητήσεις για τεχνικές επιλογές ανά project",
      "Παράδοση καθαρών, συντηρήσιμων components",
    ],
    requirements: [
      "Εμπειρία με HTML, CSS και σύγχρονο JavaScript/TypeScript",
      "Εξοικείωση με React ή παρόμοιο component-based framework",
      "Κατανόηση responsive design και βασικών performance πρακτικών",
      "Ικανότητα να δουλεύεις αυτόνομα και να επικοινωνείς καθαρά",
      "Portfolio ή δείγματα προηγούμενης δουλειάς",
    ],
    benefits: [
      "Remote / Hybrid συνεργασία",
      "Ευέλικτο περιβάλλον εργασίας",
      "Συμμετοχή σε πραγματικά digital projects",
      "Συνεχής ανάπτυξη δεξιοτήτων σε σύγχρονο stack",
      "Άμεση συνεργασία μέσα σε μικρή, focused ομάδα",
      "Ανταγωνιστική αποζημίωση ανάλογα με εμπειρία (θα συζητηθεί στη συνέντευξη)",
    ],
    whyNexus:
      "Η NEXUS είναι modern digital studio — όχι απρόσωπη εταιρεία. Δουλεύουμε με προσοχή στη λεπτομέρεια, premium αισθητική και πραγματικές επιχειρηματικές ανάγκες. Αν σου αρέσει να χτίζεις πράγματα που φαίνονται και λειτουργούν σωστά, θα ταιριάξεις.",
    postedAt: "2026-10-01",
    isActive: true,
  },
  {
    id: "full-stack-developer",
    slug: "full-stack-developer",
    title: "Full-Stack Developer",
    location: "Remote / Ελλάδα",
    type: "Full-time",
    category: "Engineering",
    shortDescription:
      "Full-Stack Developer για websites, web apps και backend integrations σε client projects της NEXUS.",
    description:
      "Ψάχνουμε Full-Stack Developer που μπορεί να κινείται άνετα μεταξύ frontend και backend, για την ανάπτυξη ολοκληρωμένων digital λύσεων — από content sites μέχρι admin panels και APIs.",
    role: "Θα αναλαμβάνεις end-to-end κομμάτια projects: UI, API endpoints, integrations και deployment support, με έμφαση σε καθαρή αρχιτεκτονική και αξιοπιστία.",
    responsibilities: [
      "Ανάπτυξη frontend και backend features για client projects",
      "Σχεδιασμός και υλοποίηση APIs και data models όπου χρειάζεται",
      "Συμμετοχή σε integrations (forms, email, CMS/admin flows)",
      "Debugging, testing και βελτίωση υπάρχοντος κώδικα",
      "Τεκμηρίωση βασικών τεχνικών αποφάσεων",
    ],
    requirements: [
      "Εμπειρία με TypeScript/JavaScript και τουλάχιστον ένα σύγχρονο framework",
      "Εξοικείωση με Node.js ή αντίστοιχο backend περιβάλλον",
      "Βασική εμπειρία με βάσεις δεδομένων (SQL ή NoSQL)",
      "Κατανόηση REST APIs και ασφαλούς handling δεδομένων",
      "Portfolio / GitHub ή δείγματα προηγούμενης δουλειάς",
    ],
    benefits: [
      "Remote / Hybrid συνεργασία",
      "Ευέλικτο περιβάλλον εργασίας",
      "Συμμετοχή σε πραγματικά digital projects από την αρχή ως το launch",
      "Ευκαιρία να επηρεάζεις τεχνικές επιλογές",
      "Ανάπτυξη δεξιοτήτων σε full product lifecycle",
      "Ανταγωνιστική αποζημίωση ανάλογα με εμπειρία (θα συζητηθεί στη συνέντευξη)",
    ],
    whyNexus:
      "Στη NEXUS δουλεύεις κοντά στο προϊόν και στον πελάτη — χωρίς περιττά layers. Αν σου αρέσει η ευθύνη, η ποιότητα και τα σύγχρονα web stacks, υπάρχει χώρος να εξελιχθείς μαζί μας.",
    postedAt: "2026-10-01",
    isActive: true,
  },
  {
    id: "digital-project-assistant",
    slug: "digital-project-assistant",
    title: "Digital Project Assistant",
    location: "Remote / Hybrid",
    type: "Part-time",
    category: "Operations",
    shortDescription:
      "Υποστήριξη σε project coordination, content updates και client communication για τα digital projects της NEXUS.",
    description:
      "Αναζητούμε Digital Project Assistant για υποστήριξη στην καθημερινή λειτουργία projects — οργάνωση, επικοινωνία και ελαφριές digital tasks σε συνεργασία με την ομάδα ανάπτυξης.",
    role: "Θα βοηθάς στον συντονισμό tasks, στην προετοιμασία υλικού για websites και στην ομαλή επικοινωνία με πελάτες, ώστε τα projects να προχωρούν οργανωμένα.",
    responsibilities: [
      "Οργάνωση tasks και follow-up σε ενεργά projects",
      "Υποστήριξη σε content updates και asset collection",
      "Βασική επικοινωνία με πελάτες για πληροφορίες και παραδοτέα",
      "Έλεγχος ποιότητας σε απλά website updates πριν το handoff",
      "Τήρηση απλών διαδικασιών και checklists",
    ],
    requirements: [
      "Οργανωτικότητα και προσοχή στη λεπτομέρεια",
      "Καλή γραπτή επικοινωνία στα Ελληνικά",
      "Εξοικείωση με εργαλεία όπως Google Docs, Notion ή παρόμοια",
      "Βασική κατανόηση websites / digital products",
      "Διάθεση να μάθεις και να εξελιχθείς σε digital περιβάλλον",
    ],
    benefits: [
      "Remote / Hybrid συνεργασία",
      "Ευέλικτο ωράριο (part-time)",
      "Συμμετοχή σε πραγματικά client projects",
      "Εκμάθηση διαδικασιών digital studio από μέσα",
      "Δυνατότητα εξέλιξης ρόλου με τον χρόνο",
      "Αποζημίωση ανάλογα με εμπειρία και διαθεσιμότητα (θα συζητηθεί στη συνέντευξη)",
    ],
    whyNexus:
      "Αν θέλεις να μπεις σε digital studio περιβάλλον και να μάθεις πώς χτίζονται πραγματικά websites και apps — χωρίς βαριά corporate δομή — αυτή η θέση είναι καλό σημείο εκκίνησης.",
    postedAt: "2026-10-05",
    isActive: true,
  },
];

export function getActiveJobs(): Job[] {
  return jobs.filter((job) => job.isActive);
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug && job.isActive);
}

export function getAllActiveJobSlugs(): string[] {
  return getActiveJobs().map((job) => job.slug);
}
