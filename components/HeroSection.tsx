"use client";

import { motion } from "framer-motion";
import { usePortfolioAnimations } from "@/lib/animations";

const principles = [
  { title: "Persönlich", description: "Starke Identität" },
  { title: "Modern", description: "Klare Ästhetik" },
  { title: "Interaktiv", description: "Fliessende Übergänge" },
  { title: "Professionell", description: "Liebe zum Detail" },
];

const principleTitleClasses = [
  "text-[clamp(2.25rem,5vw,3.75rem)] md:text-[clamp(2.75rem,5.5vw,4.25rem)]",
  "text-[clamp(1.65rem,3.2vw,2.25rem)] md:text-3xl",
  "text-[clamp(1.5rem,3vw,2rem)] md:text-[1.75rem]",
  "text-[clamp(1.35rem,2.6vw,1.75rem)] md:text-2xl",
];

export default function HeroSection() {
  const { fadeUp, stagger } = usePortfolioAnimations();

  return (
    <section
      id="hero"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-20">
        <div className="max-w-2xl">
          <h2 className="max-w-[18ch] font-display text-[clamp(2.75rem,7.5vw,5.5rem)] italic leading-[0.95] md:max-w-[22ch] md:text-[clamp(3.25rem,8.5vw,6rem)]">
            Digitale Produkte mit Persönlichkeit
          </h2>

          <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
            <a
              href="#projekte"
              className="inline-flex min-w-[min(100%,14rem)] justify-center bg-white pl-8 pr-10 py-2.5 text-center font-label text-[11px] uppercase tracking-label text-black transition-colors duration-300 hover:bg-neutral-200 sm:min-w-[16.5rem]"
              data-button="true"
            >
              Projekte ansehen
            </a>
            <a
              href="#kontakt"
              className="inline-flex font-label text-[11px] uppercase tracking-label text-white underline decoration-border decoration-1 underline-offset-[7px] transition-[color,text-decoration-color] duration-300 hover:text-white hover:decoration-white"
              data-button="true"
            >
              Kontaktieren
            </a>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-0 sm:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: "some",
            margin: "0px 0px 600px 0px",
          }}
        >
          {principles.map((principle, index) => {
            const titleClass = principleTitleClasses[index] ?? principleTitleClasses[0];

            const cellClass =
              index === 0
                ? "min-h-[300px] sm:col-span-2 md:min-h-[360px]"
                : index === principles.length - 1
                  ? "min-h-[200px] sm:col-span-2 md:min-h-[240px]"
                  : "min-h-[200px] md:min-h-[220px]";

            return (
              <motion.article
                key={principle.title}
                className={`flex flex-col bg-black p-8 outline outline-1 -outline-offset-1 outline-border md:p-10 ${cellClass}`}
                variants={fadeUp}
                data-cursor="grow"
              >
                <p
                  className={`font-display italic leading-[1.05] text-white ${titleClass}`}
                >
                  {principle.title}
                </p>
                <p className="mt-auto self-start pt-8 font-label text-[10px] uppercase tracking-[0.32em] text-muted">
                  {principle.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
