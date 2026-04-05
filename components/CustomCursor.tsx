"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const visibleRef = useRef(false);
  const hoveringRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      show();
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
      hoveringRef.current = false;
      setIsHovering(false);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const buttonTarget = target.closest("button,[data-button='true']");
      const hoverTarget = target.closest("[data-cursor='grow']");
      const next = Boolean(hoverTarget && !buttonTarget);

      if (next !== hoveringRef.current) {
        hoveringRef.current = next;
        setIsHovering(next);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) {
    return null;
  }

  const size = isHovering ? 24 : 8;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] block bg-white"
      style={{
        width: size,
        height: size,
        borderRadius: "999px",
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}
