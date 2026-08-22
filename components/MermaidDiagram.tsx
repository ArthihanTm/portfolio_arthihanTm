"use client";

import { useEffect, useId, useRef, useState } from "react";

type MermaidDiagramProps = {
  chart: string;
  className?: string;
};

export default function MermaidDiagram({
  chart,
  className = "",
}: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/:/g, "");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      if (!containerRef.current) return;

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "inherit",
          flowchart: {
            curve: "basis",
            padding: 12,
            htmlLabels: true,
          },
        });

        const { svg } = await mermaid.render(`mermaid-${reactId}`, chart);
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        setFailed(false);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (failed) {
    return (
      <p className="font-label text-[11px] uppercase tracking-label text-muted">
        Diagramm konnte nicht geladen werden.
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-none [&_svg]:min-w-full ${className}`}
      aria-label="Pipeline-Diagramm"
    />
  );
}
