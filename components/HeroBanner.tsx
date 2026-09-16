"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import DitherReveal from "@/components/ui/dither-reveal";
import { usePortfolioAnimations } from "@/lib/animations";

const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_IMAGES = [
  "/hero-cover.jpg",
  "/hero-wanderer.jpg",
  "/hero-joan.jpg",
  "/hero-alexander.jpg",
  "/hero-athens.jpg",
  "/hero-napoleon.png",
] as const;

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
  const [imageIndex, setImageIndex] = useState(0);
  const hitRef = useRef<HTMLDivElement>(null);
  const total = HERO_IMAGES.length;

  const goPrev = () => {
    setImageIndex((current) => (current - 1 + total) % total);
  };

  const goNext = () => {
    setImageIndex((current) => (current + 1) % total);
  };

  return (
    <section className="relative isolate flex h-full min-h-svh w-full items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          if (x < rect.width / 2) goPrev();
          else goNext();
        }}
      >
        <DitherReveal
          image={HERO_IMAGES[imageIndex]}
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
          <div ref={hitRef} data-cursor="grow">
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
        </div>

        <motion.div
          className="flex shrink-0 flex-col gap-8"
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
          <div className="pointer-events-auto flex items-center justify-center gap-5 md:gap-7">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Vorheriges Cover"
              data-cursor="grow"
              className="flex h-12 w-12 items-center justify-center font-mono text-xl text-white/70 transition-colors duration-300 hover:text-white md:h-14 md:w-14 md:text-2xl"
            >
              ←
            </button>
            <span className="min-w-[5.5rem] text-center font-mono text-[11px] uppercase tracking-label text-white/55">
              {String(imageIndex + 1).padStart(2, "0")} /{" "}
              {String(HERO_IMAGES.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="Nächstes Cover"
              data-cursor="grow"
              className="flex h-12 w-12 items-center justify-center font-mono text-xl text-white/70 transition-colors duration-300 hover:text-white md:h-14 md:w-14 md:text-2xl"
            >
              →
            </button>
          </div>

          <div className="flex items-center justify-start gap-6">
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
