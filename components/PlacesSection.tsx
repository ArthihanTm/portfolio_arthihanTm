"use client";

import { useCallback, useEffect, useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { places, type PlacePhoto } from "@/lib/places";
import { usePortfolioAnimations } from "@/lib/animations";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const rowA = places.filter((_, index) => index % 2 === 0);
const rowB = places.filter((_, index) => index % 2 === 1);

function PhotoCard({
  item,
  onOpen,
  className,
}: {
  item: PlacePhoto;
  onOpen: (photo: PlacePhoto) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`${item.place} — Grossansicht`}
      data-cursor="grow"
      className={cn(
        "group relative shrink-0 overflow-hidden p-0 text-left",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local travel photos */}
      <img
        src={item.src}
        alt=""
        className="places-photo h-full w-full object-cover"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-label text-[10px] uppercase tracking-label text-white">
          {item.place}
        </span>
      </span>
    </button>
  );
}

function MarqueeRow({
  items,
  reverse,
  onOpen,
}: {
  items: PlacePhoto[];
  reverse?: boolean;
  onOpen: (photo: PlacePhoto) => void;
}) {
  const loop = [...items, ...items];

  return (
    <div className="flex overflow-hidden">
      <div
        className={`places-track flex w-max gap-3 ${reverse ? "places-track-reverse" : ""}`}
      >
        {loop.map((item, index) => (
          <PhotoCard
            key={`${item.src}-${index}`}
            item={item}
            onOpen={onOpen}
            className="h-[260px] w-[190px] sm:h-[300px] sm:w-[220px] md:h-[340px] md:w-[250px]"
          />
        ))}
      </div>
    </div>
  );
}

const Lightbox = forwardRef<
  HTMLDivElement,
  {
    photo: PlacePhoto;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
  }
>(function Lightbox({ photo, onClose, onPrev, onNext }, ref) {
  const [blurOn, setBlurOn] = useState(false);

  useEffect(() => {
    // Start blur on the next frame so the CSS transition runs from blur(0)
    const id = requestAnimationFrame(() => setBlurOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.place} — Grossansicht`}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <button
        type="button"
        aria-label="Schliessen"
        className={cn(
          "places-lightbox-backdrop absolute inset-0",
          blurOn && "places-lightbox-backdrop-on",
        )}
        onClick={onClose}
      />

      <motion.button
        type="button"
        aria-label="Schliessen"
        onClick={onClose}
        data-cursor="grow"
        className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/40 text-white transition-colors duration-300 hover:border-white/50 hover:bg-black/70 md:right-8 md:top-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, delay: 0.05, ease: EASE }}
      >
        <X size={22} strokeWidth={1.5} />
      </motion.button>

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-[min(92vw,1000px)] flex-col items-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.src}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- lightbox */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="max-h-[min(78vh,820px)] w-auto max-w-full object-contain"
            />
            <p className="mt-6 font-label text-[11px] uppercase tracking-label text-white">
              {photo.place}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-5 flex items-center gap-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: EASE }}
        >
          <button
            type="button"
            onClick={onPrev}
            className="font-label text-[11px] uppercase tracking-label text-white/50 transition-colors duration-300 hover:text-white"
            data-cursor="grow"
          >
            Zurück
          </button>
          <button
            type="button"
            onClick={onNext}
            className="font-label text-[11px] uppercase tracking-label text-white/50 transition-colors duration-300 hover:text-white"
            data-cursor="grow"
          >
            Weiter
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default function PlacesSection() {
  const { fadeUp, stagger, prefersReducedMotion } = usePortfolioAnimations();
  const [active, setActive] = useState<PlacePhoto | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const close = useCallback(() => setActive(null), []);

  const prev = useCallback(() => {
    setActive((current) => {
      if (!current) return current;
      const index = places.findIndex((photo) => photo.src === current.src);
      return places[(index - 1 + places.length) % places.length] ?? current;
    });
  }, []);

  const next = useCallback(() => {
    setActive((current) => {
      if (!current) return current;
      const index = places.findIndex((photo) => photo.src === current.src);
      return places[(index + 1) % places.length] ?? current;
    });
  }, []);

  return (
    <section id="orte" className="border-t border-border py-20 md:py-28">
      <motion.div
        className="mb-16 px-6 md:px-10 lg:px-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={stagger}
      >
        <motion.h2
          className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[0.95]"
          variants={fadeUp}
        >
          Orte.
        </motion.h2>
        <motion.p
          className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg md:leading-9"
          variants={fadeUp}
        >
          Reisen gehört zu den Dingen, die ich am meisten liebe, und diese
          Fotos zeigen einige meiner liebsten Momente unterwegs.
        </motion.p>
      </motion.div>

      {prefersReducedMotion ? (
        <div className="grid grid-cols-2 gap-3 px-6 sm:grid-cols-3 md:grid-cols-4 md:px-10 lg:px-16">
          {places.map((item) => (
            <PhotoCard
              key={item.src}
              item={item}
              onOpen={setActive}
              className="aspect-[3/4] w-full"
            />
          ))}
        </div>
      ) : (
        <div
          className="places-marquee space-y-3"
          data-paused={active ? "" : undefined}
        >
          <MarqueeRow items={rowA} onOpen={setActive} />
          <MarqueeRow items={rowB} reverse onOpen={setActive} />
        </div>
      )}

      {portalReady
        ? createPortal(
            <AnimatePresence mode="wait">
              {active ? (
                <Lightbox
                  key="places-lightbox"
                  photo={active}
                  onClose={close}
                  onPrev={prev}
                  onNext={next}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
