"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#startseite", label: "Startseite" },
  { href: "#uber-mich", label: "Über Mich" },
  { href: "#projekte", label: "Projekte" },
];

const HIDE_DELAY = 2500;
const SCROLL_TIMER_THROTTLE_MS = 120;

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimerBumpRef = useRef(0);

  const resetTimer = useCallback(() => {
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), HIDE_DELAY);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const y = window.scrollY;
        const scrolled = y > 24;
        setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));

        const now = performance.now();
        if (now - lastTimerBumpRef.current >= SCROLL_TIMER_THROTTLE_MS) {
          lastTimerBumpRef.current = now;
          resetTimer();
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [resetTimer]);

  useEffect(() => {
    timerRef.current = setTimeout(() => setVisible(false), HIDE_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const show = visible || hovered;

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 bg-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -20 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        resetTimer();
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center gap-3 px-6 py-5 md:gap-4 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-label text-muted md:gap-4">
          {navLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-3 md:gap-4">
              <a
                href={link.href}
                className="font-label transition-colors duration-300 hover:text-white"
                data-cursor="grow"
              >
                {link.label}
              </a>
              {index < navLinks.length - 1 ? (
                <span aria-hidden="true" className="text-border">
                  |
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={[
          "h-px w-full bg-border transition-opacity duration-300",
          isScrolled ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </motion.nav>
  );
}
