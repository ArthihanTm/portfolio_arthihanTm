"use client";

import { motion } from "framer-motion";
import InteractiveImageAccordion from "@/components/ui/interactive-image-accordion";
import { usePortfolioAnimations } from "@/lib/animations";
import { projectImageAccordionItems } from "@/lib/project-image-accordion";

const projects = [
  {
    category: "WEB APP",
    name: "PersonalPlaner",
    description:
      "Wartet auf eine bessere Beschreibung.",
  },
  {
    category: "WEB APP",
    name: "VeritasNews",
    description:
      "Wartet auf eine bessere Beschreibung.",
  },
  {
    category: "BRANDING",
    name: "LuckiiPage",
    description:
      "Wartet auf eine bessere Beschreibung.",
  },
];

export default function ProjectsSection() {
  const { fadeUp, stagger } = usePortfolioAnimations();

  return (
    <section
      id="projekte"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-label text-[11px] uppercase tracking-label text-muted">
          Portfolio
        </p>

        <h2 className="mt-4 font-display text-[clamp(3rem,8vw,5rem)] italic leading-[0.95]">
          Projektübersicht
        </h2>

        <motion.div
          className="mt-16 border-t border-border pt-12"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: "some",
            margin: "0px 0px 600px 0px",
          }}
        >
          <InteractiveImageAccordion
            items={projectImageAccordionItems}
            description="Mit der Maus über die Streifen fahren oder per Tastatur fokussieren — jedes Feld steht für einen Schwerpunkt. Darunter die Projektliste mit Kurzinfos."
            ctaLabel="Projekt anfragen"
            ctaHref="#kontakt"
            initialActiveIndex={2}
          />
        </motion.div>

        <motion.div
          className="mt-16 border-t border-border"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: "some",
            margin: "0px 0px 600px 0px",
          }}
        >
          {projects.map((project) => (
            <motion.a
              key={project.name}
              href="#kontakt"
              className="grid gap-6 border-b border-border px-0 py-8 transition-colors duration-300 hover:bg-hover md:grid-cols-[180px_minmax(0,1fr)_40px] md:items-center md:px-4"
              variants={fadeUp}
              data-cursor="grow"
            >
              <span
                className="pointer-events-none select-none font-label text-[11px] uppercase tracking-label text-muted invisible"
                aria-hidden="true"
              >
                {project.category ?? "PROJEKT"}
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
      </div>
    </section>
  );
}
