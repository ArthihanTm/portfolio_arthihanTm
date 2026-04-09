"use client";

import { motion, type Variants } from "framer-motion";

const projects = [
  {
    index: "01",
    year: "2024",
    category: "WEB APP",
    name: "PersonalPlaner",
    description: "Persönlicher Planer mit Kalender, Aufgaben und Notizen.",
    tags: ["Next.js", "Tailwind", "Supabase"],
  },
  {
    index: "02",
    year: "2024",
    category: "WEB APP",
    name: "VeritasNews",
    description: "Nachrichtenplattform mit kuratiertem Content-Feed.",
    tags: ["React", "TypeScript", "API"],
  },
  {
    index: "03",
    year: "2023",
    category: "BRANDING",
    name: "LuckiiPage",
    description: "Markenpräsenz und Landingpage für ein kreatives Label.",
    tags: ["Next.js", "Figma", "Framer"],
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ProjectsSection() {
  return (
    <section
      id="projekte"
      className="border-t border-border px-6 py-20 md:px-10 md:py-28 lg:px-16"
    >
      {/* Header */}
      <div className="mb-16 flex items-end justify-between gap-8">
        <div>
          <p className="font-label text-[11px] uppercase tracking-label text-muted">
            Portfolio
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] italic leading-[0.95]">
            Projektübersicht
          </h2>
        </div>
        <a
          href="#kontakt"
          data-button="true"
          className="hidden sm:inline-flex flex-none items-center gap-3 font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
        >
          Projekt anfragen
          <span className="font-display italic text-lg">→</span>
        </a>
      </div>

      {/* List */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="border-t border-border"
      >
        {projects.map((project) => (
          <motion.a
            key={project.name}
            href="#kontakt"
            variants={row}
            data-cursor="grow"
            className="group relative flex items-center gap-6 border-b border-border py-8 transition-colors duration-300 hover:bg-white/[0.025] md:gap-10 md:py-10 lg:py-12"
          >
            {/* Index */}
            <span className="hidden w-10 flex-none font-label text-[10px] tracking-label text-muted/40 md:block">
              {project.index}
            </span>

            {/* Name + description */}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="font-display text-[clamp(2rem,4.5vw,3.75rem)] italic leading-[0.95] text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                {project.name}
              </p>
              <p className="font-label text-[10px] uppercase tracking-label text-muted/50 transition-colors duration-300 group-hover:text-muted sm:hidden">
                {project.year}
              </p>
            </div>

            {/* Tags */}
            <div className="hidden flex-none gap-2 lg:flex">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-label text-white/40 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Category + year */}
            <div className="hidden flex-none text-right sm:block">
              <p className="mt-1 font-label text-[10px] tracking-label text-muted/40">
                {project.year}
              </p>
            </div>

            {/* Arrow */}
            <span className="flex-none -translate-x-2 font-display text-2xl italic text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              →
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
