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
import { SmokeCard } from "@/components/ui/smoke-card";

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
    const reached = latest >= 0.98;
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
        <SmokeCard
          active={!hasReachedAbout}
          scrollProgress={scrollYProgress}
          className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-transparent"
        />
        <motion.div
          className="flex h-full w-[200vw] will-change-transform"
          style={{ x }}
        >
          <div className="h-full w-screen shrink-0 overflow-hidden">
            <HeroBanner showSmoke={false} />
          </div>
          <div
            ref={aboutPanelRef}
            className="h-full w-screen shrink-0 overflow-hidden"
          >
            <AboutSection className="h-full min-h-0 border-l border-t-0" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
