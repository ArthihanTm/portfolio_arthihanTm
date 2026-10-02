"use client";

import { motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/contact";
import { usePortfolioAnimations } from "@/lib/animations";
import { cn } from "@/lib/utils";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["JavaScript", "React", "Next.js", "HTML & CSS"],
  },
  {
    title: "Backend",
    skills: ["Python & Flask", "MySQL", "MongoDB", "Java"],
  },
];

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
        "flex min-h-0 flex-col border-t border-border px-5 py-14 sm:px-6 sm:py-16 md:min-h-[100svh] md:px-10 md:py-20 lg:px-16",
        className,
      )}
    >
      <motion.div
        className="mx-auto flex w-full min-h-0 max-w-[1440px] flex-1 flex-col"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.h2
          className="shrink-0 font-display text-[clamp(2.25rem,8vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em]"
          variants={fadeUp}
        >
          Über mich
        </motion.h2>

        <div className="mt-8 grid min-h-0 flex-1 gap-10 sm:mt-10 md:grid-cols-2 md:gap-16 lg:gap-20">
          <motion.div
            className="space-y-5 text-[0.98rem] leading-7 text-white/92 sm:space-y-6 sm:text-base sm:leading-8 md:text-lg md:leading-9"
            variants={slideInLeft}
          >
            <p>
              Ich bin neugierig darauf, wie Dinge unter der Oberfläche
              funktionieren, und das treibt mich schon seit der Schulzeit an.
              Wenn ich an etwas Schwierigem dran bin, lasse ich es nicht halb
              fertig liegen. Ich bin eher der Typ, der eine Sache zuerst
              richtig abschliesst, bevor er sich der nächsten widmet. Das
              nervt mich manchmal selbst, aber ändern kann ich daran nichts.
            </p>
            <p className="text-white/80">
              Seit zehn Jahren spiele ich Geige. Damit schalte ich den Kopf
              ab, wenn Schule oder Code zu viel Platz einnehmen. Seit etwa
              einem Jahr trainiere ich ausserdem regelmässig im Gym. Das hat
              mir vor allem Disziplin beigebracht. Nebenbei lerne ich an der
              Informatikmittelschule (IMS), aber wer ich bin, zeigt sich eher
              in solchen Dingen als in meinem Stundenplan.
            </p>
          </motion.div>

          <motion.div
            id="kompetenzen"
            className="flex min-h-0 flex-col"
            variants={slideInRight}
          >
            <h3 className="font-mono text-[11px] uppercase tracking-label text-muted">
              Kompetenzen
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-6 sm:gap-x-8">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="font-mono text-[10px] uppercase tracking-label text-muted">
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="text-base text-white/90">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 shrink-0 border-t border-border py-5">
              <p className="font-mono text-[11px] uppercase tracking-label text-muted">
                Kontakt
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 inline-block break-all text-base text-white/90 underline decoration-border decoration-1 underline-offset-[7px] transition-[color,text-decoration-color] duration-300 hover:text-white hover:decoration-white sm:break-normal"
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
