"use client";

import { motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/contact";
import { usePortfolioAnimations } from "@/lib/animations";
import { cn } from "@/lib/utils";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "JavaScript", level: "good" },
      { name: "React", level: "good" },
      { name: "Next.js", level: "good" },
      { name: "HTML & CSS", level: "good" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Python & Flask", level: "good" },
      { name: "MySQL", level: "intermediate" },
      { name: "MongoDB", level: "intermediate" },
      { name: "Java", level: "basic" },
    ],
  },
];

const levelStyles = {
  good: "bg-white",
  intermediate: "bg-white/50",
  basic: "border border-white/60",
};

export default function AboutSection({
  className,
}: {
  className?: string;
}) {
  const { fadeUp, slideInLeft, slideInRight, stagger } =
    usePortfolioAnimations();

  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden border-t border-border px-6 py-16 md:px-10 md:py-20 lg:px-16",
        className,
      )}
    >
      <motion.div
        className="mx-auto flex h-full w-full min-h-0 max-w-[1440px] flex-col"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.h2
          className="shrink-0 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold italic leading-[0.95]"
          variants={fadeUp}
        >
          Über mich.
        </motion.h2>

        <div className="mt-10 grid min-h-0 flex-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
          <motion.div
            className="space-y-6 text-base leading-8 text-white/92 md:text-lg md:leading-9"
            variants={slideInLeft}
          >
            <p>
              Ich bin neugierig darauf, wie Dinge unter der Oberfläche
              funktionieren, und das treibt mich seit meiner Schulzeit an.
              Besonders faszinierend finde ich, wie rasant sich die
              Softwareentwicklung gerade durch KI verändert, und ich bin
              gespannt, was diese Entwicklung als Nächstes ermöglicht.
            </p>
            <p className="text-white/80">
              Aus dieser Neugier sind eigene Projekte entstanden, an denen ich
              selbstständig arbeite und bei denen mir sauberer Code genauso
              wichtig ist wie ein durchdachtes Design. Ich lerne aktuell an
              der Informatikmittelschule (IMS) und nehme mir dabei genauso
              viel Zeit für Struktur und Wartbarkeit wie fürs Design selbst.
              Ausserhalb von Code beschäftigen mich Sport und Geige, beides
              Dinge, bei denen Übung und Präzision zählen, genau wie beim
              Programmieren.
            </p>
          </motion.div>

          <motion.div
            id="kompetenzen"
            className="flex min-h-0 flex-col"
            variants={slideInRight}
          >
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-label text-[11px] uppercase tracking-label text-muted">
                Kompetenzen
              </h3>
              <div className="hidden flex-wrap gap-x-4 gap-y-1 font-label text-[8px] uppercase tracking-[0.16em] text-muted sm:flex">
                <span className="flex items-center gap-1.5">
                  <i className="h-1.5 w-1.5 rounded-full bg-white" /> Gut
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-1.5 w-1.5 rounded-full bg-white/50" /> Solide
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-1.5 w-1.5 rounded-full border border-white/60" />{" "}
                  Basis
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-8">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="font-label text-[10px] uppercase tracking-label text-muted">
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 flex-none rounded-full ${
                            levelStyles[skill.level as keyof typeof levelStyles]
                          }`}
                        />
                        <span className="text-base text-white/90">
                          {skill.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 shrink-0 border-t border-border py-5">
              <p className="font-label text-[11px] uppercase tracking-label text-muted">
                Kontakt
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 inline-block text-base text-white/90 underline decoration-border decoration-1 underline-offset-[7px] transition-[color,text-decoration-color] duration-300 hover:text-white hover:decoration-white"
                data-cursor="grow"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
