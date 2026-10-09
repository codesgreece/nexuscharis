/**
 * Central editable config for Grow Your Business services & pricing.
 * Update prices / features here — UI reads from this object only.
 */

export type BillingType = "monthly" | "one-time" | "hybrid";

export type GrowthIconName =
  | "search"
  | "wrench"
  | "shield-check"
  | "headset"
  | "pencil"
  | "zap"
  | "map-pin"
  | "palette"
  | "file-text"
  | "mail"
  | "share-2"
  | "rocket"
  | "sparkles";

export type GrowthPackageTier = {
  id: string;
  title: string;
  price: string;
  features: string[];
};

export type GrowthService = {
  id: string;
  title: string;
  description: string;
  price: string;
  billing: BillingType;
  billingLabel: string;
  features?: string[];
  examples?: string[];
  notes?: string[];
  extraWork?: string;
  badge?: string;
  ctaText: string;
  ctaHref: string;
  icon: GrowthIconName;
  highlighted?: boolean;
  packages?: GrowthPackageTier[];
};

export type ComparisonRow = {
  feature: string;
  care: string;
  carePro: string;
  dedicated: string;
};

export type GrowthFaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export type GrowthPathHint = {
  need: string;
  solution: string;
  href: string;
};

export const GROW_PAGE = {
  path: "/grow-your-business",
  eyebrow: "Grow Your Business",
  title: "Grow Your Business",
  subtitle:
    "Δεν σταματάμε στην κατασκευή της ιστοσελίδας. Βοηθάμε την επιχείρησή σου να παραμένει γρήγορη, ασφαλής, ενημερωμένη και ορατή online.",
  seo: {
    title: "Grow Your Business | SEO, Website Care & Digital Services",
    description:
      "Υπηρεσίες μετά την κατασκευή ιστοσελίδας από τη NEXUS Dev Studio: SEO, Website Care, Speed Boost, Local SEO, Branding και NEXUS Growth. Μηνιαία ή εφάπαξ.",
  },
  oneTimeSubtitle:
    "Χρειάζεσαι μόνο μία συγκεκριμένη αλλαγή; Δεν χρειάζεται μηνιαίο πακέτο.",
  monthlySubtitle:
    "Συνεχής υποστήριξη για επιχειρήσεις που θέλουν το website τους να εξελίσσεται κάθε μήνα.",
  cta: {
    title: "Χρειάζεσαι κάτι που δεν βλέπεις εδώ;",
    body: "Πες μας τι χρειάζεται η επιχείρησή σου και θα σου προτείνουμε την κατάλληλη λύση.",
    button: "Επικοινώνησε με τη NEXUS",
    href: "/#contact",
  },
} as const;

/** Featured bundle — visually more prominent than other packages. */
export const nexusGrowth: GrowthService = {
  id: "nexus-growth",
  title: "NEXUS Growth",
  description: "Το website σου δεν χρειάζεται απλώς να υπάρχει. Χρειάζεται να εξελίσσεται.",
  price: "119€/μήνα",
  billing: "monthly",
  billingLabel: "Μηνιαία συνδρομή",
  badge: "BEST VALUE",
  highlighted: true,
  icon: "rocket",
  features: [
    "SEO",
    "Website maintenance",
    "Content changes",
    "Technical optimization",
    "SEO monitoring",
    "Basic monthly reporting",
    "Priority support",
  ],
  ctaText: "Δες το NEXUS Growth",
  ctaHref: "/nexus-growth",
};

export const monthlyServices: GrowthService[] = [
  {
    id: "seo",
    title: "SEO",
    description: "Κάνε την επιχείρησή σου πιο εύκολη να βρεθεί στη Google.",
    price: "Από 79€/μήνα",
    billing: "monthly",
    billingLabel: "Μηνιαία συνδρομή",
    badge: "Most Popular",
    icon: "search",
    features: [
      "Technical SEO",
      "Google Search Console",
      "Meta Titles",
      "Meta Descriptions",
      "H1 / H2 optimization",
      "Sitemap.xml",
      "Robots.txt",
      "Canonical URLs",
      "Broken Links Check",
      "Keyword optimization",
      "SEO monitoring",
      "Monthly report",
    ],
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/seo",
  },
  {
    id: "website-care",
    title: "Website Care",
    description:
      "Για επιχειρήσεις που χρειάζονται συχνές αλλαγές και συνεχή τεχνική υποστήριξη.",
    price: "59€/μήνα",
    billing: "monthly",
    billingLabel: "Μηνιαία συνδρομή",
    icon: "wrench",
    features: [
      "Έως 2 ώρες εργασίας / μήνα",
      "Αλλαγές κειμένων",
      "Αλλαγές εικόνων",
      "Προσθήκη προϊόντων / υπηρεσιών",
      "Νέα sections",
      "Μικρές αλλαγές design",
      "Technical maintenance",
      "Basic security checks",
      "Priority support",
    ],
    notes: [
      "Χωρίς μακροχρόνια δέσμευση.",
      "Οι ώρες του πακέτου δεν μεταφέρονται στον επόμενο μήνα.",
    ],
    extraWork: "Επιπλέον εργασία: 30€/ώρα",
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/website-care",
  },
  {
    id: "website-care-pro",
    title: "Website Care Pro",
    description:
      "Για επιχειρήσεις που θέλουν συνεχή βελτίωση και υποστήριξη του website τους.",
    price: "99€/μήνα",
    billing: "monthly",
    billingLabel: "Μηνιαία συνδρομή",
    badge: "Recommended",
    icon: "shield-check",
    features: [
      "Έως 4 ώρες εργασίας / μήνα",
      "Συχνές αλλαγές περιεχομένου",
      "Νέα sections",
      "Νέες σελίδες",
      "Προσθήκη προϊόντων",
      "Design modifications",
      "Performance checks",
      "Technical maintenance",
      "Basic SEO monitoring",
      "Priority support",
    ],
    notes: ["Χωρίς μακροχρόνια δέσμευση."],
    extraWork: "Επιπλέον εργασία: 30€/ώρα",
    ctaText: "Επίλεξε Care Pro",
    ctaHref: "/#contact",
  },
  {
    id: "dedicated-support",
    title: "Dedicated Support",
    description: "Ο προσωπικός σου web συνεργάτης για συνεχή ανάπτυξη του website σου.",
    price: "149€/μήνα",
    billing: "monthly",
    billingLabel: "Μηνιαία συνδρομή",
    icon: "headset",
    features: [
      "Έως 7 ώρες εργασίας / μήνα",
      "Website updates",
      "Content changes",
      "Design changes",
      "Νέα sections",
      "Landing pages",
      "Technical fixes",
      "Performance monitoring",
      "SEO maintenance",
      "Priority support",
    ],
    notes: ["Ιδανικό για επιχειρήσεις με συχνές ανάγκες."],
    extraWork: "Επιπλέον εργασία: 30€/ώρα",
    ctaText: "Ξεκίνα Dedicated Support",
    ctaHref: "/#contact",
  },
  {
    id: "seo-content",
    title: "SEO Content",
    description: "SEO άρθρα και περιεχόμενο που βοηθά την επιχείρησή σου να ανεβαίνει στη Google.",
    price: "Από 99€/μήνα",
    billing: "monthly",
    billingLabel: "Μηνιαία συνδρομή",
    icon: "file-text",
    packages: [
      {
        id: "content-pack",
        title: "Content Pack",
        price: "Από 99€/μήνα",
        features: [
          "2 SEO articles / month",
          "Keyword research",
          "SEO titles",
          "Meta descriptions",
          "Internal linking",
          "SEO formatting",
        ],
      },
      {
        id: "content-pro",
        title: "Content Pro",
        price: "179€/μήνα",
        features: [
          "4 SEO articles / month",
          "Keyword research",
          "Internal linking",
          "FAQ sections",
          "Structured data όπου χρειάζεται",
          "Content strategy",
        ],
      },
    ],
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/seo-content",
  },
  {
    id: "social-media",
    title: "Social Media Content",
    description: "Περιεχόμενο για social media που κρατά ενεργή την παρουσία της επιχείρησής σου.",
    price: "Από 99€/μήνα",
    billing: "monthly",
    billingLabel: "Μηνιαία συνδρομή",
    icon: "share-2",
    packages: [
      {
        id: "social-starter",
        title: "Social Starter",
        price: "99€/μήνα",
        features: ["8 posts", "Captions", "Hashtags", "Basic graphics"],
      },
      {
        id: "social-pro",
        title: "Social Pro",
        price: "179€/μήνα",
        features: [
          "12 posts",
          "Graphics",
          "Captions",
          "Content calendar",
          "Reel concepts",
        ],
      },
    ],
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/social-media",
  },
  {
    id: "local-seo-monthly",
    title: "Local SEO",
    description: "Βοήθησε πελάτες της περιοχής σου να βρίσκουν την επιχείρησή σου στη Google.",
    price: "99€ setup + 39€/μήνα",
    billing: "hybrid",
    billingLabel: "Setup εφάπαξ + μηνιαία",
    icon: "map-pin",
    features: [
      "Google Business Profile optimization",
      "Business categories",
      "Business description",
      "Services optimization",
      "Local keywords",
      "Local SEO setup",
      "Website ↔ Google Business optimization",
      "Review strategy",
    ],
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/local-seo",
  },
];

export const oneTimeServices: GrowthService[] = [
  {
    id: "one-time-fix",
    title: "One-Time Fix",
    description: "Μικρές αλλαγές χωρίς μηνιαία συνδρομή.",
    price: "Από 25€",
    billing: "one-time",
    billingLabel: "Εφάπαξ",
    icon: "pencil",
    examples: [
      "Αλλαγή κειμένου",
      "Αλλαγή εικόνας",
      "Αλλαγή τιμής",
      "Προσθήκη section",
      "Μικρές διορθώσεις",
      "Μικρές τεχνικές αλλαγές",
    ],
    notes: [
      "Δεν είναι μηνιαία συνδρομή. Πληρώνεις μόνο για την εργασία που χρειάζεσαι.",
    ],
    ctaText: "Ζήτησε αλλαγή",
    ctaHref: "/#contact",
  },
  {
    id: "speed-boost",
    title: "Speed Boost",
    description: "Κάνε το website σου πιο γρήγορο και βελτίωσε την εμπειρία των επισκεπτών.",
    price: "Από 79€",
    billing: "one-time",
    billingLabel: "Εφάπαξ",
    icon: "zap",
    features: [
      "Core Web Vitals check",
      "Image optimization",
      "Lazy loading",
      "Font optimization",
      "Code optimization",
      "Performance optimization",
      "Mobile performance check",
      "Performance report",
    ],
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/speed-boost",
  },
  {
    id: "branding",
    title: "Branding",
    description: "Δημιούργησε μια πιο επαγγελματική και συνεπή εικόνα για την επιχείρησή σου.",
    price: "Από 50€",
    billing: "one-time",
    billingLabel: "Εφάπαξ",
    icon: "palette",
    packages: [
      {
        id: "logo",
        title: "Logo",
        price: "50€",
        features: ["Professional logo", "Basic logo variations"],
      },
      {
        id: "brand-starter",
        title: "Brand Starter",
        price: "99€",
        features: ["Logo", "Color palette", "Typography", "Basic brand guide"],
      },
      {
        id: "brand-pro",
        title: "Brand Pro",
        price: "199€",
        features: [
          "Logo",
          "Logo variations",
          "Color palette",
          "Typography",
          "Social media profile kit",
          "Business card",
          "Brand guide",
        ],
      },
    ],
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/branding",
  },
  {
    id: "professional-email",
    title: "Professional Email Setup",
    description: "Δημιούργησε επαγγελματική email υποδομή για την επιχείρησή σου.",
    price: "49€ setup",
    billing: "one-time",
    billingLabel: "Εφάπαξ setup",
    icon: "mail",
    features: [
      "Domain email setup",
      "DNS configuration",
      "SPF",
      "DKIM",
      "DMARC",
      "Outlook / Gmail configuration",
      "Email verification",
    ],
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/professional-email",
  },
  {
    id: "local-seo-setup",
    title: "Local SEO Setup",
    description:
      "Αρχική ρύθμιση Google Business Profile και τοπικής SEO παρουσίας — χωρίς μηνιαία δέσμευση για το setup.",
    price: "99€ setup",
    billing: "one-time",
    billingLabel: "Εφάπαξ setup",
    icon: "map-pin",
    features: [
      "Google Business Profile optimization",
      "Business categories",
      "Business description",
      "Services optimization",
      "Local keywords",
      "Local SEO setup",
    ],
    notes: ["Η μηνιαία Local SEO υποστήριξη ξεκινά από 39€/μήνα μετά το setup."],
    ctaText: "Μάθε περισσότερα",
    ctaHref: "/grow-your-business/local-seo",
  },
];

export const careComparison: {
  columns: { key: "care" | "carePro" | "dedicated"; label: string; price: string }[];
  rows: ComparisonRow[];
} = {
  columns: [
    { key: "care", label: "Care", price: "59€" },
    { key: "carePro", label: "Care Pro", price: "99€" },
    { key: "dedicated", label: "Dedicated", price: "149€" },
  ],
  rows: [
    { feature: "Monthly hours", care: "2h", carePro: "4h", dedicated: "7h" },
    { feature: "Content changes", care: "✓", carePro: "✓", dedicated: "✓" },
    { feature: "Design changes", care: "Basic", carePro: "✓", dedicated: "✓" },
    { feature: "New sections", care: "✓", carePro: "✓", dedicated: "✓" },
    { feature: "New pages", care: "—", carePro: "✓", dedicated: "✓" },
    { feature: "SEO monitoring", care: "—", carePro: "✓", dedicated: "✓" },
    { feature: "Performance", care: "Basic", carePro: "✓", dedicated: "✓" },
    { feature: "Priority support", care: "✓", carePro: "✓", dedicated: "✓" },
    { feature: "Price", care: "59€", carePro: "99€", dedicated: "149€" },
  ],
};

export const growthFaqItems: GrowthFaqItem[] = [
  {
    id: "monthly-required",
    question: "Είναι υποχρεωτικό να έχω μηνιαίο πακέτο;",
    answer: ["Όχι. Μπορείς να αγοράσεις μόνο τις υπηρεσίες που χρειάζεσαι."],
  },
  {
    id: "one-change",
    question: "Μπορώ να ζητήσω μία μόνο αλλαγή;",
    answer: ["Ναι. Για μικρές αλλαγές υπάρχει το One-Time Fix από 25€."],
  },
  {
    id: "hours-rollover",
    question: "Οι ώρες του monthly package μεταφέρονται στον επόμενο μήνα;",
    answer: ["Όχι. Οι διαθέσιμες ώρες αφορούν τον συγκεκριμένο μήνα."],
  },
  {
    id: "extra-hours",
    question: "Τι γίνεται αν χρειαστώ περισσότερες ώρες;",
    answer: ["Η επιπλέον εργασία χρεώνεται με 30€/ώρα."],
  },
  {
    id: "contract",
    question: "Υπάρχει συμβόλαιο;",
    answer: [
      "Όχι. Τα monthly support packages λειτουργούν χωρίς μακροχρόνια δέσμευση.",
    ],
  },
  {
    id: "seo-guarantee",
    question: "Το SEO εγγυάται πρώτη θέση στη Google;",
    answer: [
      "Όχι. Κανείς δεν μπορεί να εγγυηθεί συγκεκριμένη θέση στη Google. Η υπηρεσία αφορά συνεχή τεχνική, περιεχομενική και on-page SEO βελτιστοποίηση.",
    ],
  },
];

export const growthPathHints: GrowthPathHint[] = [
  { need: "Χρειάζομαι μία αλλαγή", solution: "One-Time Fix", href: "#one-time-fix" },
  {
    need: "Θέλω συχνές αλλαγές",
    solution: "Website Care",
    href: "/grow-your-business/website-care",
  },
  { need: "Θέλω περισσότερη υποστήριξη", solution: "Care Pro", href: "#website-care-pro" },
  {
    need: "Θέλω η NEXUS να αναλαμβάνει συνεχώς το website",
    solution: "Dedicated Support",
    href: "#dedicated-support",
  },
  { need: "Θέλω να ανέβω στη Google", solution: "SEO", href: "/grow-your-business/seo" },
  {
    need: "Θέλω Google Business / τοπική προβολή",
    solution: "Local SEO",
    href: "/grow-your-business/local-seo",
  },
  {
    need: "Θέλω καλύτερη ταχύτητα",
    solution: "Speed Boost",
    href: "/grow-your-business/speed-boost",
  },
  {
    need: "Θέλω ολοκληρωμένη υποστήριξη + SEO",
    solution: "NEXUS Growth",
    href: "/nexus-growth",
  },
];
