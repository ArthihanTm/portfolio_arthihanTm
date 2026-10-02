"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";

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
      className="border-t border-border px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28 lg:px-16"
    >
      <motion.div
        className="mb-10 flex items-end justify-between gap-8 sm:mb-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={row}
      >
        <div>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,8vw,4rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em]">
            Projektübersicht
          </h2>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="border-t border-border"
      >
        {projects.map((project, index) => (
          <motion.div key={project.slug} variants={row}>
            <Link
              href={`/projekte/${project.slug}`}
              data-cursor="grow"
              className="group flex items-baseline gap-4 border-b border-border py-7 transition-colors duration-300 hover:bg-white/[0.025] sm:items-center sm:gap-6 sm:py-8 md:gap-10 md:py-10 lg:py-12"
            >
              <span className="w-8 flex-none font-label text-[10px] tracking-label text-muted/40 sm:w-10">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1 break-words font-display text-[clamp(1.55rem,6.5vw,3.75rem)] font-medium uppercase leading-[0.95] tracking-[-0.03em] text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                {project.name}
              </span>

              <span className="flex-none font-label text-[10px] tracking-label text-muted/40">
                {project.year}
              </span>

              <span
                aria-hidden="true"
                className="hidden flex-none -translate-x-3 font-mono text-2xl text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 md:inline"
              >
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
