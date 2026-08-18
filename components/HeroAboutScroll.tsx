"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import AboutSection from "@/components/AboutSection";
import HeroBanner from "@/components/HeroBanner";

export default function HeroAboutScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const [hasReachedAbout, setHasReachedAbout] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const syncAboutLock = (latest: number) => {
    const reached = latest >= 0.99;
    setHasReachedAbout(reached);

    if (!reached && aboutPanelRef.current) {
      aboutPanelRef.current.scrollTop = 0;
    }
  };

  useMotionValueEvent(scrollYProgress, "change", syncAboutLock);

  useEffect(() => {
    syncAboutLock(scrollYProgress.get());
  }, [scrollYProgress]);

  if (prefersReducedMotion) {
    return (
      <>
        <div id="startseite">
          <HeroBanner />
        </div>
        <div id="uber-mich">
          <AboutSection />
        </div>
      </>
    );
  }

  return (
    <div ref={trackRef} className="relative h-[200svh]">
      <div
        id="startseite"
        className="pointer-events-none absolute top-0 h-px w-px"
      />
      <div
        id="uber-mich"
        className="pointer-events-none absolute bottom-0 h-px w-px"
      />

      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          className="flex h-full w-[200vw] will-change-transform"
          style={{ x }}
        >
          <div className="h-full w-screen shrink-0 overflow-hidden">
            <HeroBanner />
          </div>
          <div
            ref={aboutPanelRef}
            className={
              hasReachedAbout
                ? "h-full w-screen shrink-0 overflow-y-auto overscroll-y-auto"
                : "h-full w-screen shrink-0 overflow-hidden"
            }
          >
            <AboutSection className="min-h-full border-l border-t-0" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
