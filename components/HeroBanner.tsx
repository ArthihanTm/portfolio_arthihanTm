"use client";

import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";
import { SmokeCard } from "@/components/ui/smoke-card";
import { usePortfolioAnimations } from "@/lib/animations";

const fadeEase = [0.22, 1, 0.36, 1] as const;

function fadeUpWithDelay(base: Variants, delay: number): Variants {
  const show = base.show;
  const fallback: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: fadeEase, delay },
    },
  };

  if (typeof show === "object" && show !== null && !Array.isArray(show)) {
    const hasMotionValues =
      "opacity" in show || "y" in show || "x" in show || "scale" in show;
    if (hasMotionValues) {
      const t = show.transition;
      return {
        hidden: base.hidden,
        show: {
          ...show,
          transition:
            typeof t === "object" && t !== null && !Array.isArray(t)
              ? { ...t, delay }
              : { delay },
        },
      };
    }
  }

  return fallback;
}

export default function HeroBanner() {
  const { fadeUp } = usePortfolioAnimations();

  const variantsSub = useMemo(() => fadeUpWithDelay(fadeUp, 0.1), [fadeUp]);
  const variantsLinks = useMemo(() => fadeUpWithDelay(fadeUp, 0.2), [fadeUp]);

  return (
    <section className="relative flex h-full min-h-svh items-center justify-center overflow-hidden px-6 py-24 md:px-10 lg:px-16">
      <SmokeCard className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-transparent" />

      <div className="mx-auto grid w-full max-w-[960px] grid-cols-1 justify-items-center text-center [grid-template-areas:'name'_'sub'_'links']">
        <h1 className="w-full max-w-[960px] select-none font-display text-[clamp(4.5rem,12vw,10rem)] italic leading-[0.88] text-white [grid-area:name]">
          Arthihan
        </h1>

        <motion.p
          className="mt-8 max-w-2xl text-base leading-8 text-white/90 md:text-lg [grid-area:sub]"
          variants={variantsSub}
          initial={false}
          animate="show"
        >
          Design und Entwicklung
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-6 [grid-area:links]"
          variants={variantsLinks}
          initial={false}
          animate="show"
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
      </div>
    </section>
  );
}
