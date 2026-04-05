export interface ImageAccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
}

export interface InteractiveImageAccordionProps {
  items: ImageAccordionItemData[];
  /** Wenn leer/weg gelassen, wird keine Überschrift in der linken Spalte gerendert (z. B. wenn die Section schon eine H2 hat). */
  headline?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  initialActiveIndex?: number;
}
