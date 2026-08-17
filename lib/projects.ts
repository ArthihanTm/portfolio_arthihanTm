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
    slug: "veritasnews",
    year: "2024",
    category: "WEB APP",
    name: "VeritasNews",
    description: "Nachrichtenplattform mit kuratiertem Content-Feed.",
    tags: ["React", "TypeScript", "API"],
    details: [
      "Content-Feed mit Fokus auf Lesbarkeit.",
      "Saubere Datenanbindung über API-Schicht.",
    ],
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

