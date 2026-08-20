"use client";

import React, { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  initialSize: number;

  constructor(x: number, y: number, dirX = 0, dirY = -1) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2;
    this.speedX = dirX * (0.5 + Math.random() * 1.4) + (Math.random() * 0.8 - 0.4);
    this.speedY = dirY * (0.4 + Math.random()) - Math.random() * 1.6;
    this.life = 90 + Math.random() * 30;
    this.initialSize = this.size;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 1;
    this.size = Math.max(0, this.initialSize * (this.life / 120));
  }
}

const SmokeCard = ({
  className,
  active = true,
  scrollProgress,
}: {
  className?: string;
  active?: boolean;
  scrollProgress?: MotionValue<number>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const lastProgressRef = useRef<number | null>(null);
  const activeRef = useRef(active);
  const scrollProgressRef = useRef(scrollProgress);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    activeRef.current = active;
    if (!active) {
      mousePosRef.current = { x: 0, y: 0 };
      lastMouseRef.current = null;
    }
  }, [active]);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }

    const spawnAlongLine = (
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
    ) => {
      const dx = toX - fromX;
      const dy = toY - fromY;
      const distance = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(distance / 5));
      const dirX = distance > 0 ? dx / distance : 0;
      const dirY = distance > 0 ? dy / distance : -1;

      for (let index = 0; index <= steps; index += 1) {
        const t = index / steps;
        particlesRef.current.push(
          new Particle(
            fromX + dx * t + (Math.random() * 8 - 4),
            fromY + dy * t + (Math.random() * 8 - 4),
            dirX,
            dirY,
          ),
        );
      }

      if (particlesRef.current.length > 420) {
        particlesRef.current.splice(0, particlesRef.current.length - 420);
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const progress = scrollProgressRef.current?.get() ?? 0;
      const reachedAbout = progress >= 0.98;
      const mouse = mousePosRef.current;

      if (!activeRef.current || reachedAbout) {
        lastMouseRef.current = null;
        lastProgressRef.current = progress;
      } else if (mouse.x !== 0 && mouse.y !== 0) {
        const lastMouse = lastMouseRef.current;
        const lastProgress = lastProgressRef.current;
        const contentDeltaX =
          lastProgress == null ? 0 : -(progress - lastProgress) * rect.width;
        const mouseDeltaX = lastMouse ? mouse.x - lastMouse.x : 0;
        const mouseDeltaY = lastMouse ? mouse.y - lastMouse.y : 0;
        const moved =
          Math.hypot(mouseDeltaX, mouseDeltaY) > 1.2 ||
          Math.abs(contentDeltaX) > 1.2;

        if (lastMouse && moved) {
          spawnAlongLine(
            lastMouse.x + contentDeltaX,
            lastMouse.y,
            mouse.x,
            mouse.y,
          );
        }

        lastMouseRef.current = { x: mouse.x, y: mouse.y };
        lastProgressRef.current = progress;
      } else {
        lastMouseRef.current = null;
        lastProgressRef.current = progress;
      }

      particlesRef.current = particlesRef.current
        .filter((particle) => particle.life > 0 && particle.size > 0)
        .map((particle) => {
          particle.update();

          if (particle.size > 0) {
            const opacity = Math.min(1, particle.life / 100);
            ctx.fillStyle = `rgba(160, 160, 160, ${opacity})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          }

          return particle;
        });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        mousePosRef.current = { x: 0, y: 0 };
        lastMouseRef.current = null;
        return;
      }

      mousePosRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onPointerLeave = () => {
      mousePosRef.current = { x: 0, y: 0 };
      lastMouseRef.current = null;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
      />
    </div>
  );
};

export { SmokeCard };
