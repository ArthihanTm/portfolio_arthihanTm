export const HERO_IMAGES = [
  "/hero-cover.jpg",
  "/hero-wanderer.jpg",
  "/hero-joan.jpg",
  "/hero-alexander.jpg",
  "/hero-athens.jpg",
  "/hero-napoleon.png",
] as const;

export function preloadHeroImages() {
  return Promise.all(
    HERO_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    ),
  );
}
