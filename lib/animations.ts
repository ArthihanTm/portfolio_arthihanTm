"use client";

import { useMemo } from "react";
import { useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const staggerVariant: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const slideInRightVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const clipRevealVariant: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const emptyVariant: Variants = {
  hidden: {},
  show: {},
};

export function usePortfolioAnimations() {
  const prefersReducedMotion = useReducedMotion();

  return useMemo(() => {
    const pick = (v: Variants) => (prefersReducedMotion ? emptyVariant : v);
    return {
      fadeUp: pick(fadeUpVariant),
      stagger: pick(staggerVariant),
      scaleIn: pick(scaleInVariant),
      slideInLeft: pick(slideInLeftVariant),
      slideInRight: pick(slideInRightVariant),
      clipReveal: pick(clipRevealVariant),
      prefersReducedMotion,
    };
  }, [prefersReducedMotion]);
}