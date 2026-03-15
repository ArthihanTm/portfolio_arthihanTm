"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "arthihan-portfolio-loader-seen";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem(SESSION_KEY);

    if (hasSeenLoader) {
      return;
    }

    setIsVisible(true);
    sessionStorage.setItem(SESSION_KEY, "true");

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, 600);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
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
      className={[
        "pointer-events-none fixed inset-0 z-[80] bg-black transition-opacity duration-500",
        isLeaving ? "opacity-0" : "opacity-100",
      ].join(" ")}
    />
  );
}