"use client";

import { motion } from "framer-motion";
import DitherReveal from "@/components/ui/dither-reveal";
import { usePortfolioAnimations } from "@/lib/animations";

const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_IMAGE = "/hero-cover.jpg";

const titleLines = ["Arthihan", "Thirumal"];

const links = [
  { label: "GitHub", href: "https://github.com/ArthihanTm" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arthihan-thirumal-b93b593b6/",
  },
];

export default function HeroBanner() {
  const { prefersReducedMotion } = usePortfolioAnimations();

  return (
    <section className="relative isolate flex h-full min-h-svh w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <DitherReveal
          image={HERO_IMAGE}
          fit="cover"
          focusY={42}
          ditherStyle="bayer8"
          dotSize={7}
          brightness={95}
          contrast={140}
          revealRadius={220}
          revealSoftness={60}
          wave={!prefersReducedMotion}
          waveSpeed={70}
          waveDensity={22}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col px-6 pb-10 pt-10 md:px-10 md:pb-12 lg:px-16"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="select-none font-display text-[clamp(3rem,13vw,11rem)] font-bold uppercase leading-[0.84] tracking-[-0.045em] text-white">
            {titleLines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={
                    prefersReducedMotion
                      ? { hidden: {}, show: {} }
                      : {
                          hidden: { y: "110%" },
                          show: {
                            y: "0%",
                            transition: { duration: 1, ease: EASE },
                          },
                        }
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          className="flex shrink-0 items-end justify-start"
          variants={
            prefersReducedMotion
              ? { hidden: {}, show: {} }
              : {
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: EASE },
                  },
                }
          }
        >
          <div className="pointer-events-auto flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-label text-white/70 transition-colors duration-300 hover:text-white"
                data-cursor="grow"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
