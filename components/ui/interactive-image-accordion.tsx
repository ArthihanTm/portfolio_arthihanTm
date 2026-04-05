"use client";

import type { SyntheticEvent } from "react";
import { useState } from "react";
import type {
  ImageAccordionItemData,
  InteractiveImageAccordionProps,
} from "@/types/image-accordion";

export type { ImageAccordionItemData, InteractiveImageAccordionProps };

const FALLBACK_SRC =
  "https://placehold.co/400x450/222222/ffffff?text=Bild";

function AccordionItem({
  item,
  isActive,
  onActivate,
}: {
  item: ImageAccordionItemData;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={isActive}
      aria-label={item.title}
      className={[
        "relative h-[min(450px,55vh)] shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border text-left transition-[width] duration-500 ease-out",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white",
        isActive ? "w-[min(100%,400px)]" : "w-14 sm:w-16",
      ].join(" ")}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- externe Unsplash-URLs */}
      <img
        src={item.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e: SyntheticEvent<HTMLImageElement>) => {
          const el = e.currentTarget;
          el.onerror = null;
          el.src = FALLBACK_SRC;
        }}
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <span
        className={[
          "absolute text-white transition-all duration-300 ease-out",
          isActive
            ? "bottom-5 left-1/2 max-w-[90%] -translate-x-1/2 rotate-0 text-center font-display text-lg font-normal italic leading-snug sm:bottom-6 sm:text-xl"
            : "bottom-24 left-1/2 w-max max-w-none -translate-x-1/2 rotate-90 whitespace-nowrap font-display text-[10px] font-normal italic leading-none tracking-[0.04em] sm:text-[11px]",
        ].join(" ")}
      >
        {item.title}
      </span>
    </button>
  );
}

export default function InteractiveImageAccordion({
  items,
  headline = "",
  description,
  ctaLabel,
  ctaHref = "#kontakt",
  initialActiveIndex = 0,
}: InteractiveImageAccordionProps) {
  const safeIndex = Math.min(
    Math.max(0, initialActiveIndex),
    Math.max(0, items.length - 1),
  );
  const [activeIndex, setActiveIndex] = useState(safeIndex);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch gap-10 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
        <div className="w-full text-center md:w-[42%] md:max-w-xl md:text-left">
          {headline ? (
            <h3 className="font-display text-[clamp(1.75rem,4vw,3rem)] italic leading-tight text-white">
              {headline}
            </h3>
          ) : null}
          <p
            className={[
              "text-base leading-8 text-muted md:text-lg",
              headline ? "mt-4" : "",
            ].join(" ")}
          >
            {description}
          </p>
          {ctaLabel ? (
            <div className="mt-8">
              <a
                href={ctaHref}
                className="inline-block bg-white px-8 py-3 font-label text-[11px] uppercase tracking-label text-black transition-colors duration-300 hover:bg-neutral-200"
                data-button="true"
              >
                {ctaLabel}
              </a>
            </div>
          ) : null}
        </div>

        <div className="w-full min-w-0 md:w-[58%]">
          <div
            className="flex flex-row items-stretch justify-center gap-2 overflow-x-auto pb-2 pt-1 sm:gap-3 md:justify-end"
            role="group"
            aria-label="Projekt-Themen"
          >
            {items.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onActivate={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Demo-Default wie im Original-Snippet (englische Copy + Beispiel-Items) */
export function LandingAccordionItem() {
  const demoItems: ImageAccordionItemData[] = [
    {
      id: 1,
      title: "Voice Assistant",
      imageUrl:
        "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "AI Image Generation",
      imageUrl:
        "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "AI Chatbot + Local RAG",
      imageUrl:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "AI Agent",
      imageUrl:
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Visual Understanding",
      imageUrl:
        "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <InteractiveImageAccordion
      items={demoItems}
      headline="Accelerate Gen-AI Tasks on Any Device"
      description="Build high-performance AI apps on-device without the hassle of model compression or edge deployment."
      ctaLabel="Contact Us"
      ctaHref="#kontakt"
      initialActiveIndex={4}
    />
  );
}
