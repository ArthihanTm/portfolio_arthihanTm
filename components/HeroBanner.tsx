"use client";

import { motion } from "framer-motion";
import { usePortfolioAnimations } from "@/lib/animations";

export default function HeroBanner() {
  const { letterReveal, stagger, fadeUp } = usePortfolioAnimations();
  const titleWords = ["Arthihan"];

  return (
    <section
      id="startseite"
      className="relative flex min-h-screen items-center justify-center px-6 py-24 md:px-10 lg:px-16"
    >
      <motion.div
        className="mx-auto flex max-w-[960px] flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="mb-6 font-label text-[11px] uppercase tracking-label text-muted"
          variants={fadeUp}
        >
          Portfolio
        </motion.p>

        <motion.h1
          className="select-none font-display text-[clamp(4.5rem,12vw,10rem)] italic leading-[0.88] text-white"
          variants={stagger}
        >
          {titleWords.map((word) => (
            <motion.span
              key={word}
              className="inline-block"
              variants={letterReveal}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-2xl text-base leading-8 text-white/90 md:text-lg"
          variants={fadeUp}
        >
          Design, Entwicklung & KI.
        </motion.p>

        <motion.div className="mt-10 flex items-center gap-6" variants={fadeUp}>
          <a
            href="https://github.com/ArthihanTm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
            data-cursor="grow"
          >
            GitHub
          </a>
          <span aria-hidden="true" className="text-border">|</span>
          <a
            href="https://www.linkedin.com/in/arthihan-thirumal-b93b593b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
            data-cursor="grow"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}
