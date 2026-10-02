"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import DitherReveal from "@/components/ui/dither-reveal";
import { usePortfolioAnimations } from "@/lib/animations";
import { HERO_IMAGES } from "@/lib/hero-images";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  const [isCompact, setIsCompact] = useState(false);
  const hitRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const total = HERO_IMAGES.length;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const goPrev = () => {
    setImageIndex((current) => (current - 1 + total) % total);
  };

  const goNext = () => {
    setImageIndex((current) => (current + 1) % total);
  };

  return (
    <section className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          if (x < rect.width / 2) goPrev();
          else goNext();
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          touchStartX.current = null;
          if (startX == null) return;
          const endX = event.changedTouches[0]?.clientX;
          if (endX == null) return;
          const delta = endX - startX;
          if (Math.abs(delta) < 48) return;
          if (delta > 0) goPrev();
          else goNext();
        }}
      >
        <DitherReveal
          image={HERO_IMAGES[imageIndex]}
          fit="cover"
          focusY={isCompact ? 38 : 42}
          ditherStyle="bayer8"
          dotSize={isCompact ? 5 : 7}
          brightness={95}
          contrast={140}
          revealRadius={isCompact ? 120 : 220}
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
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/60 to-transparent sm:h-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent sm:h-48"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col px-5 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 md:px-10 md:pb-12 lg:px-16"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="flex flex-1 flex-col items-start justify-center">
          <div ref={hitRef} data-cursor="grow" className="max-w-full">
            <h1 className="select-none break-words font-display text-[clamp(2.35rem,14vw,11rem)] font-bold uppercase leading-[0.84] tracking-[-0.045em] text-white">
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
          className="flex shrink-0 flex-col gap-5 sm:gap-8"
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
          <div className="pointer-events-auto flex items-center justify-between gap-4 sm:justify-center sm:gap-5 md:gap-7">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Vorheriges Cover"
              data-cursor="grow"
              className="flex h-11 w-11 items-center justify-center font-mono text-xl text-white/70 transition-colors duration-300 hover:text-white sm:h-12 sm:w-12 md:h-14 md:w-14 md:text-2xl"
            >
              ←
            </button>
            <span className="min-w-[5.5rem] text-center font-mono text-[10px] uppercase tracking-label text-white/55 sm:text-[11px]">
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
              className="flex h-11 w-11 items-center justify-center font-mono text-xl text-white/70 transition-colors duration-300 hover:text-white sm:h-12 sm:w-12 md:h-14 md:w-14 md:text-2xl"
            >
              →
            </button>
          </div>

          <div className="pointer-events-auto flex items-center justify-start gap-5 sm:gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
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
