"use client";

import { useEffect, useState } from "react";
import { preloadHeroImages } from "@/lib/hero-images";

const SESSION_KEY = "arthihan-portfolio-loader-seen";
const MIN_VISIBLE_MS = 600;
const MAX_WAIT_MS = 2500;

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    let hasSeenLoader = false;
    try {
      hasSeenLoader = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      hasSeenLoader = false;
    }

    const preload = preloadHeroImages();

    if (hasSeenLoader) {
      setIsVisible(false);
      void preload;
      return;
    }

    setIsVisible(true);
    let leaveTimer = 0;
    let hideTimer = 0;
    let cancelled = false;
    let finished = false;
    const startedAt = performance.now();

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      window.clearTimeout(timeout);
      const elapsed = performance.now() - startedAt;
      const waitMore = Math.max(0, MIN_VISIBLE_MS - elapsed);

      leaveTimer = window.setTimeout(() => {
        if (cancelled) return;
        setIsLeaving(true);
        hideTimer = window.setTimeout(() => {
          if (cancelled) return;
          setIsVisible(false);
          try {
            sessionStorage.setItem(SESSION_KEY, "true");
          } catch {
            // Ignore unavailable storage (private mode, embedded preview).
          }
        }, 500);
      }, waitMore);
    };

    const timeout = window.setTimeout(finish, MAX_WAIT_MS);
    void preload.finally(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] bg-black"
      style={{
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? "scaleY(0.98)" : "scaleY(1)",
        transformOrigin: "top",
        transition:
          "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}
