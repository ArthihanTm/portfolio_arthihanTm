"use client";

import { motion } from "framer-motion";
import { usePortfolioAnimations } from "@/lib/animations";

const skillBlocks = [
  {
    category: "WEB APP",
    title: "Webentwicklung",
    description: "Modernes Frontend und robustes Backend.",
    tags: ["React", "Tailwind", "Next.js"],
  },
  {
    category: "UI/UX",
    title: "UI/UX Design",
    description: "Klare Interfaces mit starker visueller Sprache.",
    tags: ["Figma", "Prototyp", "Systeme"],
  },
];

export default function SkillsSection() {
  const { fadeUp, stagger } = usePortfolioAnimations();

  return (
    <section
      id="kompetenzen"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-label text-[11px] uppercase tracking-label text-muted">
          Was kann ich?
        </p>

        <motion.div
          className="mt-16 grid gap-12 md:grid-cols-2 md:gap-0"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: "some",
            margin: "0px 0px 600px 0px",
          }}
        >
          {skillBlocks.map((block, index) => (
            <motion.article
              key={block.title}
              className={[
                "flex min-h-[320px] flex-col justify-between border-border py-2",
                index === 0 ? "md:border-r md:pr-10 lg:pr-16" : "md:pl-10 lg:pl-16",
              ].join(" ")}
              variants={fadeUp}
              data-cursor="grow"
            >
              <div>
                <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] italic leading-[0.95]">
                  {block.title}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-9 text-white/92">
                  {block.description}
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                {block.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border px-4 py-2 font-label text-[10px] uppercase tracking-label text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}