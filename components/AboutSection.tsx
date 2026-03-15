"use client";

import { motion } from "framer-motion";
import { usePortfolioAnimations } from "@/lib/animations";

const workflow = [
  "Ideen schnell visualisieren",
  "Design in Komponenten übersetzen",
  "Iterativ mit Feedback verbessern",
];

export default function AboutSection() {
  const { fadeUp, stagger } = usePortfolioAnimations();

  return (
    <section
      id="uber-mich"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <motion.div
        className="mx-auto max-w-[1440px]"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          className="font-label text-[11px] uppercase tracking-label text-muted"
          variants={fadeUp}
        >
          Wer bin ich?
        </motion.p>

        <motion.h2
          className="mt-4 max-w-3xl font-display text-[clamp(3rem,8vw,5rem)] italic leading-[0.95]"
          variants={fadeUp}
        >
          Mehr als nur Code.
        </motion.h2>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-20">
          <motion.div className="space-y-8 text-lg leading-9 text-white/92" variants={stagger}>
            <motion.p variants={fadeUp}>
              Entwicklung, Design und kreative Technik — klar und performant.
            </motion.p>
          </motion.div>

          <motion.ol className="border-t border-border" variants={stagger}>
            {workflow.map((item, index) => (
              <motion.li
                key={item}
                className="flex items-start gap-6 border-b border-border py-7"
                variants={fadeUp}
              >
                <span className="font-label text-[11px] uppercase tracking-label text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-8 text-white">{item}</span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </motion.div>
    </section>
  );
}