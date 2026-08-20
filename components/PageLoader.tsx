"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "arthihan-portfolio-loader-seen";

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

    if (hasSeenLoader) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, 600);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Ignore unavailable storage (private mode, embedded preview).
      }
    }, 1100);

    return () => {
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
          "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}