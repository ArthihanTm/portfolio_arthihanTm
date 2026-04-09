"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skillBlocks = [
  {
    index: "01",
    category: "BACKEND",
    title: "Backend",
    description: "Saubere Logik, stabile Schnittstellen und Datenflüsse.",
    tags: ["Java", "Python"],
  },
  {
    index: "02",
    category: "FRONTEND",
    title: "Webentwicklung",
    description: "Modernes Frontend und robuste Umsetzung.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    index: "03",
    category: "UI/UX",
    title: "UI/UX Design",
    description: "Klare Interfaces mit starker visueller Sprache.",
    tags: ["Figma", "Prototyp", "Systeme"],
  },
  {
    index: "04",
    category: "TOOLING",
    title: "Entwicklungs-Tools",
    description: "Schnelle Iteration mit modernen Werkzeugen.",
    tags: ["Git", "Vercel"],
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      const dist = Math.max(
        0,
        track.scrollWidth - document.documentElement.clientWidth
      );
      container.style.height = `calc(100vh + ${dist}px)`;
    };

    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (p) => {
    const track = trackRef.current;
    if (!track) return 0;
    return (
      -p *
      Math.max(0, track.scrollWidth - document.documentElement.clientWidth)
    );
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div id="kompetenzen" ref={containerRef}>
      <section className="sticky top-0 h-screen overflow-hidden border-t border-border flex flex-col">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 md:px-10 lg:px-16 flex-none">
          <p className="font-label text-[11px] uppercase tracking-label text-muted">
            Was kann ich?
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] italic leading-[0.95]">
            Kompetenzen
          </h2>
        </div>

        {/* Track */}
        <div className="flex-1 min-h-0">
          <motion.div
            ref={trackRef}
            className="flex h-full gap-px px-6 md:px-10 lg:px-16"
            style={{ x, width: "max-content" }}
          >
            {skillBlocks.map((block, i) => (
              <motion.article
                key={block.title}
                data-cursor="grow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
                className="group relative flex-none border border-border bg-black flex flex-col overflow-hidden"
                style={{ width: "clamp(260px, 32vw, 480px)" }}
              >
                {/* Faint background index */}
                <div
                  className="absolute bottom-0 right-2 leading-none select-none pointer-events-none"
                  aria-hidden
                >
                  <span className="font-display italic leading-[0.75] text-[20rem] text-white/[0.03]">
                    {block.index}
                  </span>
                </div>

                {/* Top bar */}
                <div className="flex items-start justify-between border-b border-border/40 px-7 py-5">
                  <span className="font-label text-[10px] uppercase tracking-label text-muted">
                    {block.category}
                  </span>
                  <span className="font-label text-[10px] tracking-label text-muted">
                    {block.index}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col px-7 pb-10 pt-8">
                  <p className="font-display text-[clamp(2rem,3.5vw,3.25rem)] italic leading-[0.95] text-white transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    {block.title}
                  </p>
                  <p className="mt-6 max-w-[30ch] text-sm leading-7 text-white/50">
                    {block.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {block.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-label text-white/60 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}

            {/* End spacer */}
            <div
              className="flex-none"
              style={{ width: "clamp(48px, 6vw, 80px)" }}
            />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="flex-none px-6 pb-6 pt-3 md:px-10 lg:px-16"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="font-label text-[10px] uppercase tracking-label text-muted/60">
              Scrollen →
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
