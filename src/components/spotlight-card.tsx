"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export default function SpotlightCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );
  const move = (event: PointerEvent<HTMLElement>) => {
    if (
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--x", `${x}px`);
      ref.current?.style.setProperty("--y", `${y}px`);
      frame.current = null;
    });
  };
  return (
    <article
      ref={ref}
      className="lab-card project-card"
      onPointerMove={move}
      onPointerLeave={() => {
        if (frame.current !== null) cancelAnimationFrame(frame.current);
        frame.current = null;
        ref.current?.style.removeProperty("--x");
        ref.current?.style.removeProperty("--y");
      }}
    >
      {children}
      <div className="project-spotlight" aria-hidden="true" />
    </article>
  );
}
