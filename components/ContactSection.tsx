"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { usePortfolioAnimations } from "@/lib/animations";

export default function ContactSection() {
  const { fadeUp, stagger } = usePortfolioAnimations();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      id="kontakt"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(3rem,8vw,5rem)] italic leading-[0.95]">
            Kontakt
          </h2>
        </div>

        <motion.div
          className="space-y-12"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: "some",
            margin: "0px 0px 600px 0px",
          }}
        >
          <motion.label className="block" variants={fadeUp}>
            <span className="font-label text-[11px] uppercase tracking-label text-muted">
              Deine Email
            </span>
            <input
              type="email"
              name="email"
              placeholder="hallo@beispiel.de"
              className="mt-5 w-full border-b border-border bg-transparent pb-4 text-base text-white placeholder:text-muted"
            />
          </motion.label>

          <motion.label className="block" variants={fadeUp}>
            <span className="font-label text-[11px] uppercase tracking-label text-muted">
              Nachricht
            </span>
            <textarea
              name="message"
              rows={6}
              placeholder="Erzähl mir von deinem Projekt..."
              className="mt-5 w-full resize-none border-b border-border bg-transparent pb-4 text-base text-white placeholder:text-muted"
            />
          </motion.label>

          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="w-full bg-white px-6 py-5 font-label text-[11px] uppercase tracking-label text-black transition-colors duration-300 hover:bg-neutral-200"
            >
              Nachricht senden
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}