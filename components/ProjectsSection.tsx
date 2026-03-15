"use client";

import { motion } from "framer-motion";
import { usePortfolioAnimations } from "@/lib/animations";

const projects = [
  {
    category: "WEB APP",
    name: "Projekt Alpha",
    description:
      "Ein modernes digitales Erlebnis mit Fokus auf Interaktion.",
  },
  {
    category: "UI/UX",
    name: "Projekt Beta",
    description:
      "Ein klares System für konsistentes und skalierbares Design.",
  },
  {
    category: "BRANDING",
    name: "Projekt Gamma",
    description:
      "Identitäts- und Bewegungsansatz für Produkt-Storytelling.",
  },
];

export default function ProjectsSection() {
  const { fadeUp, stagger } = usePortfolioAnimations();

  return (
    <section
      id="projekte"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <motion.div
        className="mx-auto max-w-[1440px]"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.p
          className="font-label text-[11px] uppercase tracking-label text-muted"
          variants={fadeUp}
        >
          Portfolio
        </motion.p>

        <motion.h2
          className="mt-4 font-display text-[clamp(3rem,8vw,5rem)] italic leading-[0.95]"
          variants={fadeUp}
        >
          Projektübersicht
        </motion.h2>

        <motion.div className="mt-16 border-t border-border" variants={stagger}>
          {projects.map((project) => (
            <motion.a
              key={project.name}
              href="#kontakt"
              className="grid gap-6 border-b border-border px-0 py-8 transition-colors duration-300 hover:bg-hover md:grid-cols-[180px_minmax(0,1fr)_40px] md:items-center md:px-4"
              variants={fadeUp}
              data-cursor="grow"
            >
              <span className="font-label text-[11px] uppercase tracking-label text-muted">
                {project.category}
              </span>
              <span>
                <span className="block font-display text-4xl italic leading-tight text-white md:text-[2.75rem]">
                  {project.name}
                </span>
                <span className="mt-3 block max-w-3xl text-base leading-8 text-white/88">
                  {project.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="font-display text-3xl italic leading-none text-white"
              >
                {"\u2192"}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}