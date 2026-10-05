import type { SimpleIcon } from "simple-icons";
import {
  siAngular,
  siC,
  siCplusplus,
  siDart,
  siDjango,
  siDocker,
  siDotnet,
  siExpress,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJson,
  siKotlin,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSqlite,
  siSwift,
  siTypescript,
  siVercel,
  siVuedotjs,
} from "simple-icons";

/** Official brand marks archived from Simple Icons (removed upstream for trademark policy). */
const csharpIcon = {
  title: "C#",
  slug: "csharp",
  hex: "512BD4",
  path: "M1.194 7.543v8.913c0 1.103.588 2.122 1.544 2.674l7.718 4.456a3.086 3.086 0 0 0 3.088 0l7.718-4.456a3.087 3.087 0 0 0 1.544-2.674V7.543a3.084 3.084 0 0 0-1.544-2.673L13.544.414a3.086 3.086 0 0 0-3.088 0L2.738 4.87a3.085 3.085 0 0 0-1.544 2.673Zm5.403 2.914v3.087a.77.77 0 0 0 .772.772.773.773 0 0 0 .772-.772.773.773 0 0 1 1.317-.546.775.775 0 0 1 .226.546 2.314 2.314 0 1 1-4.631 0v-3.087c0-.615.244-1.203.679-1.637a2.312 2.312 0 0 1 3.274 0c.434.434.678 1.023.678 1.637a.769.769 0 0 1-.226.545.767.767 0 0 1-1.091 0 .77.77 0 0 1-.226-.545.77.77 0 0 0-.772-.772.771.771 0 0 0-.772.772Zm12.35 3.087a.77.77 0 0 1-.772.772h-.772v.772a.773.773 0 0 1-1.544 0v-.772h-1.544v.772a.773.773 0 0 1-1.317.546.775.775 0 0 1-.226-.546v-.772H12a.771.771 0 1 1 0-1.544h.772v-1.543H12a.77.77 0 1 1 0-1.544h.772v-.772a.773.773 0 0 1 1.317-.546.775.775 0 0 1 .226.546v.772h1.544v-.772a.773.773 0 0 1 1.544 0v.772h.772a.772.772 0 0 1 0 1.544h-.772v1.543h.772a.776.776 0 0 1 .772.772Zm-3.088-2.315h-1.544v1.543h1.544v-1.543Z",
} as const;

const css3Icon = {
  title: "CSS3",
  slug: "css3",
  hex: "1572B6",
  path: "M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z",
} as const;

/**
 * SQL has no official brand logo (ISO language standard).
 * Typographic mark — letters only, not a fake brand mark in a circle.
 */
const sqlWordmark = {
  title: "SQL",
  slug: "sql",
  hex: "336791",
  kind: "wordmark" as const,
};

export type TechCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "tools";

export type TechTier = "core" | "additional";

export type TechItem = {
  id: string;
  name: string;
  category: TechCategory;
  categoryLabel: string;
  tier: TechTier;
  icon:
    | Pick<SimpleIcon, "title" | "hex" | "path">
    | typeof csharpIcon
    | typeof css3Icon
    | typeof sqlWordmark;
};

export const TECH_FILTERS = [
  { id: "all", label: "ALL" },
  { id: "languages", label: "LANGUAGES" },
  { id: "frontend", label: "FRONTEND" },
  { id: "backend", label: "BACKEND" },
  { id: "databases", label: "DATABASES" },
  { id: "tools", label: "TOOLS" },
] as const;

export type TechFilterId = (typeof TECH_FILTERS)[number]["id"];

function tech(
  name: string,
  category: TechCategory,
  categoryLabel: string,
  tier: TechTier,
  icon: TechItem["icon"],
  id?: string,
): TechItem {
  return {
    id: id ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    category,
    categoryLabel,
    tier,
    icon,
  };
}

/** Technologies available depending on project needs — not a claim of daily use of every item. */
export const TECHNOLOGIES: TechItem[] = [
  // Languages
  tech("HTML5", "languages", "Languages", "core", siHtml5),
  tech("CSS3", "languages", "Languages", "core", css3Icon),
  tech("JavaScript", "languages", "Languages", "core", siJavascript),
  tech("TypeScript", "languages", "Languages", "core", siTypescript),
  tech("Python", "languages", "Languages", "additional", siPython),
  tech("Java", "languages", "Languages", "additional", siOpenjdk, "java"),
  tech("C", "languages", "Languages", "additional", siC),
  tech("C++", "languages", "Languages", "additional", siCplusplus, "cpp"),
  tech("C#", "languages", "Languages", "additional", csharpIcon, "csharp"),
  tech("PHP", "languages", "Languages", "additional", siPhp),
  tech("SQL", "languages", "Languages", "core", sqlWordmark),
  tech("Dart", "languages", "Languages", "additional", siDart),
  tech("Kotlin", "languages", "Languages", "additional", siKotlin),
  tech("Swift", "languages", "Languages", "additional", siSwift),

  // Frontend & frameworks
  tech("React", "frontend", "Frontend", "core", siReact),
  tech("Next.js", "frontend", "Frontend", "core", siNextdotjs, "nextjs"),
  tech("Vue.js", "frontend", "Frontend", "additional", siVuedotjs, "vue"),
  tech("Angular", "frontend", "Frontend", "additional", siAngular),
  tech("Flutter", "frontend", "Frontend", "additional", siFlutter),

  // Backend
  tech("Node.js", "backend", "Backend", "core", siNodedotjs, "nodejs"),
  tech("Express", "backend", "Backend", "core", siExpress),
  tech(".NET", "backend", "Backend", "additional", siDotnet, "dotnet"),
  tech("Django", "backend", "Backend", "additional", siDjango),
  tech("Laravel", "backend", "Backend", "additional", siLaravel),

  // Databases
  tech("PostgreSQL", "databases", "Databases", "core", siPostgresql),
  tech("MySQL", "databases", "Databases", "additional", siMysql),
  tech("SQLite", "databases", "Databases", "additional", siSqlite),
  tech("MongoDB", "databases", "Databases", "additional", siMongodb),
  tech("Redis", "databases", "Databases", "additional", siRedis),

  // Tools & infrastructure
  tech("Git", "tools", "Tools", "core", siGit),
  tech("GitHub", "tools", "Tools", "core", siGithub),
  tech("Vercel", "tools", "Tools", "core", siVercel),
  tech("Docker", "tools", "Tools", "additional", siDocker),
  tech("REST API", "tools", "Tools", "core", siOpenapiinitiative, "rest-api"),
  tech("JSON", "tools", "Tools", "core", siJson),
];
