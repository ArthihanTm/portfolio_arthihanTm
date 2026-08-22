import { relaunchPipelineMermaid } from "@/lib/relaunch-pipeline";

export type Project = {
  slug: string;
  year: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  links?: {
    github?: string;
    live?: string;
  };
  details?: string[];
  /** Optional Mermaid source shown on the detail page */
  mermaid?: string;
};

export const projects: Project[] = [
  {
    slug: "personalplaner",
    year: "2024",
    category: "WEB APP",
    name: "PersonalPlaner",
    description: "Persönlicher Planer mit Kalender, Aufgaben und Notizen.",
    tags: ["Next.js", "Tailwind", "Supabase"],
    links: {
      live: "https://dist-one-lime-39.vercel.app/",
    },
    details: [
      "Kalender- und Aufgaben-Flow mit klarer Struktur.",
      "Fokus auf schnelle Bedienung und saubere UI.",
    ],
  },
  {
    slug: "relaunch-ai",
    year: "2026",
    category: "PIPELINE",
    name: "Relaunch.ai",
    description:
      "Relaunch.ai zieht sich Schweizer Firmen direkt aus dem Handelsregister und baut ihnen unaufgefordert einen neuen Website-Entwurf, bevor sie überhaupt wissen, dass sie kontaktiert werden. Die Pipeline sucht zu jeder Firma aus dem Zefix-Register Website und Mailadresse, crawlt die bestehende Seite, lässt ein LLM ihre Qualität einschätzen und generiert daraus einen Mockup-Relaunch. Statt eines klassischen Kaltakquise-Pitches bekommt die Firma direkt das fertige Ergebnis zugeschickt, live deployed auf Vercel.",
    tags: ["Python", "Firecrawl", "Resend", "Vercel"],
    details: [
      "Pipeline in Python von Datenerfassung bis Mailversand: Zefix-Scraping, Anreicherung über Exa, Crawling mit Firecrawl, Analyse und Generierung per LLM, Deployment und Versand über Resend.",
      "Das alte Next.js/FastAPI-Dashboard wird abgelöst — Steuerung nur noch über eine Terminal-CLI, ohne Frontend das extra gepflegt werden muss.",
    ],
    mermaid: relaunchPipelineMermaid,
  },
  {
    slug: "luckiipage",
    year: "2023",
    category: "BRANDING",
    name: "LuckiiPage",
    description: "Markenpräsenz und Landingpage für ein kreatives Label.",
    tags: ["Next.js", "Figma", "Framer"],
    details: [
      "Landingpage mit starker visueller Sprache.",
      "Komponentenbasiertes Layout für schnelle Iteration.",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

