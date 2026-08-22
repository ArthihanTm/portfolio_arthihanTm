import type { ImageAccordionItemData } from "@/types/image-accordion";

/** Streifen in der Projektübersicht — lokale Assets unter `/public/projects`, sonst Unsplash */
export const projectImageAccordionItems: ImageAccordionItemData[] = [
  {
    id: 1,
    title: "PersonalPlaner",
    imageUrl: "/projects/personalplaner-volkshaus.png",
  },
  {
    id: 2,
    title: "Relaunch.ai",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "LuckiiPage",
    imageUrl:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80&auto=format&fit=crop",
  },
];
