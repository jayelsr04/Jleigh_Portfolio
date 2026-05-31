"use client";

import { useEffect, useRef } from "react";

export default function BubbleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bubbles: HTMLDivElement[] = [];

    for (let i = 0; i < 18; i++) {
      const bubble = document.createElement("div");
      const size = Math.random() * 60 + 10;
      bubble.className = "bubble";
      bubble.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: -${size}px;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${Math.random() * 0.3 + 0.05};
      `;
      container.appendChild(bubble);
      bubbles.push(bubble);
    }

    return () => {
      bubbles.forEach((b) => b.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
