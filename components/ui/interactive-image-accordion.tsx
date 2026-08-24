"use client";

import type { CSSProperties, SyntheticEvent } from "react";
import { useState } from "react";
import type {
  ImageAccordionItemData,
  InteractiveImageAccordionProps,
} from "@/types/image-accordion";
import { CONTACT_EMAIL } from "@/lib/contact";

export type { ImageAccordionItemData, InteractiveImageAccordionProps };

const FALLBACK_SRC =
  "https://placehold.co/400x450/222222/ffffff?text=Bild";

const LABEL_FADE_IN_MS = 200;
const LABEL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Streifen-Breiten beim Wechsel — wie früher (500 ms, gleicher Ease wie fadeUp) */
const ACCORDION_COLUMN_MS = 500;
const ACCORDION_COLUMN_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function AccordionItem({
  item,
  isActive,
  onActivate,
}: {
  item: ImageAccordionItemData;
  isActive: boolean;
  onActivate: () => void;
}) {
  const [labelVisible, setLabelVisible] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={isActive}
      aria-label={item.title}
      className={[
        "relative h-[min(450px,55vh)] min-w-0 w-full cursor-pointer overflow-hidden rounded-xl border border-border text-left",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white",
      ].join(" ")}
      onMouseEnter={() => {
        onActivate();
        setLabelVisible(true);
      }}
      onMouseLeave={() => setLabelVisible(false)}
      onFocus={() => {
        onActivate();
        setLabelVisible(true);
      }}
      onBlur={() => setLabelVisible(false)}
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
          "pointer-events-none absolute z-10 text-white",
          isActive
            ? "bottom-5 left-1/2 max-w-[90%] -translate-x-1/2 rotate-0 text-center font-display text-lg font-normal leading-snug sm:bottom-6 sm:text-xl"
            : "bottom-24 left-1/2 w-max max-w-none -translate-x-1/2 rotate-90 whitespace-nowrap font-display text-[10px] font-normal leading-none tracking-[0.04em] sm:text-[11px]",
        ].join(" ")}
        style={
          labelVisible
            ? ({
                opacity: 1,
                visibility: "visible",
                transition: `opacity ${LABEL_FADE_IN_MS}ms ${LABEL_EASE}`,
              } satisfies CSSProperties)
            : ({
                opacity: 0,
                visibility: "hidden",
                transition: "none",
              } satisfies CSSProperties)
        }
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
  ctaHref = `mailto:${CONTACT_EMAIL}`,
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

  const activeFr = 2.35;
  const inactiveFr = 1;
  const gridTemplateColumns = items
    .map((_, index) =>
      index === activeIndex
        ? `minmax(0,${activeFr}fr)`
        : `minmax(0,${inactiveFr}fr)`,
    )
    .join(" ");

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch gap-10 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
        <div className="w-full text-center md:w-[42%] md:max-w-xl md:text-left">
          {headline ? (
            <h3 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight text-white">
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
            className="grid w-full gap-2 pb-2 pt-1 sm:gap-3"
            style={{
              gridTemplateColumns,
              transitionProperty: "grid-template-columns",
              transitionDuration: `${ACCORDION_COLUMN_MS}ms`,
              transitionTimingFunction: ACCORDION_COLUMN_EASE,
            }}
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
      ctaHref={`mailto:${CONTACT_EMAIL}`}
      initialActiveIndex={4}
    />
  );
}
