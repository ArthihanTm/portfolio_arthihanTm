"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SmokeCard } from "@/components/ui/smoke-card";
import { usePortfolioAnimations } from "@/lib/animations";

const EASE = [0.22, 1, 0.36, 1] as const;
const SCROLL_IDLE_MS = 300;

export default function HeroBanner() {
  const { prefersReducedMotion } = usePortfolioAnimations();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsScrolling(false), SCROLL_IDLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="relative flex h-full min-h-svh items-center justify-center overflow-hidden px-6 py-24 md:px-10 lg:px-16">
      <SmokeCard
        active={!isScrolling && !isHoveringLink}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-transparent"
      />

      <motion.div
        className="mx-auto grid w-full max-w-[960px] grid-cols-1 justify-items-center text-center [grid-template-areas:'name'_'sub'_'links']"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* Clip-reveal the name from below */}
        <motion.h1
          className="w-full max-w-[960px] select-none font-display text-[clamp(4.5rem,12vw,10rem)] font-black italic leading-[0.88] text-white [grid-area:name]"
          variants={
            prefersReducedMotion
              ? { hidden: {}, show: {} }
              : {
                  hidden: { opacity: 0, y: 50, scale: 0.96 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.9, ease: EASE },
                  },
                }
          }
        >
          Arthihan
        </motion.h1>

        {/* Links fade up after name */}
        <motion.div
          className="mt-10 flex items-center gap-6 [grid-area:links]"
          onMouseEnter={() => setIsHoveringLink(true)}
          onMouseLeave={() => setIsHoveringLink(false)}
          variants={
            prefersReducedMotion
              ? { hidden: {}, show: {} }
              : {
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }
          }
        >
          <a
            href="https://github.com/ArthihanTm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
            data-cursor="grow"
          >
            GitHub
          </a>
          <span aria-hidden="true" className="text-border">
            |
          </span>
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
