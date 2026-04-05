"use client";

import { useMemo } from "react";
import { useReducedMotion, type Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerVariant: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const emptyVariant: Variants = {
  hidden: {},
  show: {},
};

export function usePortfolioAnimations() {
  const prefersReducedMotion = useReducedMotion();

  return useMemo(
    () => ({
      fadeUp: prefersReducedMotion ? emptyVariant : fadeUpVariant,
      stagger: prefersReducedMotion ? emptyVariant : staggerVariant,
      prefersReducedMotion,
    }),
    [prefersReducedMotion],
  );
}