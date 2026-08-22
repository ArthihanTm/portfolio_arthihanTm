"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MermaidDiagram from "@/components/MermaidDiagram";
import Nav from "@/components/Nav";
import { usePortfolioAnimations } from "@/lib/animations";
import type { Project } from "@/lib/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  project: Project;
};

export default function ProjectDetailView({ project }: Props) {
  const { fadeUp, stagger, clipReveal, prefersReducedMotion } =
    usePortfolioAnimations();

  return (
    <>
      <Nav />
      <main className="relative overflow-hidden px-6 pb-28 pt-28 md:px-10 md:pb-36 md:pt-36 lg:px-16">
        {/* Soft atmospheric glow — portfolio black, not purple */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]"
        />

        <motion.div
          className="relative mx-auto max-w-[1100px]"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Top meta */}
          <motion.div
            className="mb-14 flex items-center justify-between gap-6"
            variants={fadeUp}
          >
            <Link
              href="/#projekte"
              data-cursor="grow"
              className="group inline-flex items-center gap-3 font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Zurück
            </Link>
            <span className="font-label text-[10px] uppercase tracking-label text-muted/50">
              {project.category} · {project.year}
            </span>
          </motion.div>

          {/* Hero title */}
          <div className="overflow-hidden">
            <motion.h1
              className="max-w-[16ch] font-display text-[clamp(3.25rem,9vw,6.5rem)] font-black italic leading-[0.9] tracking-tight"
              variants={
                prefersReducedMotion
                  ? fadeUp
                  : {
                      hidden: { opacity: 0, y: 64 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.9, ease: EASE },
                      },
                    }
              }
            >
              {project.name}
            </motion.h1>
          </div>

          <motion.div
            className="mt-6 h-px w-full origin-left bg-border"
            variants={clipReveal}
          />

          {/* Description + side meta */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)] lg:gap-20">
            <motion.p
              className="max-w-2xl text-[1.05rem] font-light leading-8 text-white/80 md:text-lg md:leading-9"
              variants={fadeUp}
            >
              {project.description}
            </motion.p>

            <motion.aside
              className="flex flex-col justify-between gap-10 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
              variants={fadeUp}
            >
              <div>
                <p className="font-label text-[10px] uppercase tracking-label text-muted">
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-label text-white/65 transition-colors duration-300 hover:border-white/40 hover:text-white"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.06, duration: 0.45, ease: EASE }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {project.links?.live || project.links?.github ? (
                <div className="flex flex-col gap-4">
                  <p className="font-label text-[10px] uppercase tracking-label text-muted">
                    Links
                  </p>
                  <div className="flex flex-wrap gap-6">
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="grow"
                        className="group inline-flex items-center gap-3 font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
                      >
                        Live ansehen
                        <span className="font-display text-lg italic transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    ) : null}
                    {project.links.github ? (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="grow"
                        className="group inline-flex items-center gap-3 font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
                      >
                        GitHub
                        <span className="font-display text-lg italic transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </motion.aside>
          </div>

          {/* Details */}
          {project.details?.length ? (
            <motion.section
              className="mt-24 border-t border-border pt-14"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={stagger}
            >
              <motion.p
                className="font-label text-[10px] uppercase tracking-label text-muted"
                variants={fadeUp}
              >
                Überblick
              </motion.p>
              <motion.h2
                className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold italic leading-tight"
                variants={fadeUp}
              >
                Was das Projekt macht.
              </motion.h2>

              <ul className="mt-12 space-y-0">
                {project.details.map((item, index) => (
                  <motion.li
                    key={item}
                    className="group grid grid-cols-[auto_1fr] gap-6 border-b border-border py-8 md:gap-10"
                    variants={fadeUp}
                  >
                    <span className="pt-1 font-label text-[10px] tracking-label text-muted/45 transition-colors duration-300 group-hover:text-white/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-3xl text-base font-light leading-8 text-white/80 transition-colors duration-300 group-hover:text-white md:text-[1.05rem] md:leading-9">
                      {item}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          ) : null}

          {/* Pipeline */}
          {project.mermaid ? (
            <motion.section
              className="mt-24 border-t border-border pt-14"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.p
                className="font-label text-[10px] uppercase tracking-label text-muted"
                variants={fadeUp}
              >
                System
              </motion.p>
              <motion.h2
                className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold italic leading-tight"
                variants={fadeUp}
              >
                Pipeline.
              </motion.h2>
              <motion.p
                className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/55 md:text-base md:leading-8"
                variants={fadeUp}
              >
                Status: pending → enriched → analyzed → generated → deployed →
                mailed. Optionale Schritte und Human Gates sind gestrichelt;
                Fehler stoppen nur die jeweilige Firma.
              </motion.p>

              <motion.div
                className="mt-10 overflow-hidden border border-border bg-white/[0.02] p-4 md:p-8"
                variants={
                  prefersReducedMotion
                    ? fadeUp
                    : {
                        hidden: { opacity: 0, y: 28 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.7, ease: EASE },
                        },
                      }
                }
              >
                <MermaidDiagram chart={project.mermaid} />
              </motion.div>
            </motion.section>
          ) : null}
        </motion.div>
      </main>
    </>
  );
}
