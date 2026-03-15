"use client";

import { motion } from "framer-motion";
import { usePortfolioAnimations } from "@/lib/animations";

const principles = [
  { title: "Persönlich", description: "Starke Identität" },
  { title: "Modern", description: "Klare Ästhetik" },
  { title: "Interaktiv", description: "Fliessende Übergänge" },
  { title: "Professionell", description: "Liebe zum Detail" },
];

export default function HeroSection() {
  const { fadeUp, stagger } = usePortfolioAnimations();

  return (
    <section
      id="hero"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <motion.div
        className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-20"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-2xl">
          <motion.p
            className="font-label text-[11px] uppercase tracking-label text-muted"
            variants={fadeUp}
          >
            Hallo, ich bin
          </motion.p>

          <motion.h2
            className="mt-4 font-display text-[clamp(3.75rem,10vw,7rem)] italic leading-[0.92]"
            variants={fadeUp}
          >
            Arthihan
          </motion.h2>

          <motion.p
            className="mt-4 font-label text-[11px] uppercase tracking-label text-muted"
            variants={fadeUp}
          >
            IMS-Schüler & Entwickler
          </motion.p>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-9 text-white/92"
            variants={fadeUp}
          >
            Digitale Erlebnisse, die Technik und Design verbinden.
          </motion.p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projekte"
              className="bg-white px-6 py-4 text-center font-label text-[11px] uppercase tracking-label text-black transition-colors duration-300 hover:bg-neutral-200"
              data-button="true"
            >
              Projekte ansehen
            </a>
            <a
              href="#kontakt"
              className="border border-white px-6 py-4 text-center font-label text-[11px] uppercase tracking-label text-white transition-colors duration-300 hover:bg-white hover:text-black"
              data-button="true"
            >
              Kontaktieren
            </a>
          </div>
        </div>

        <motion.div
          className="grid gap-px bg-border sm:grid-cols-2"
          variants={stagger}
        >
          {principles.map((principle) => (
            <motion.article
              key={principle.title}
              className="min-h-[220px] bg-black p-8 md:p-10"
              variants={fadeUp}
              data-cursor="grow"
            >
              <p className="font-display text-3xl italic leading-tight text-white">
                {principle.title}
              </p>
              <p className="mt-6 max-w-xs text-sm leading-7 text-muted">
                {principle.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}