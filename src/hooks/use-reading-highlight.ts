"use client";

import { useEffect, useRef } from "react";

/** Highlight the nearest intersecting row; no scroll listener or frame loop. */
export function useReadingHighlight<T extends HTMLElement>(selector: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>(selector));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visible = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const reset = () => {
      delete list.dataset.reading;
      rows.forEach((row) => delete row.dataset.readingActive);
    };
    const configure = () => {
      observer?.disconnect();
      visible.clear();
      reset();
      if (preference.matches) return;

      // Pixel margins keep the band centered on both portrait and wide screens.
      const margin = Math.round(window.innerHeight * 0.4);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
            else visible.delete(entry.target as HTMLElement);
          }
          const center = window.innerHeight / 2;
          const nearest = Array.from(visible).sort((a, b) => {
            const distance = (row: HTMLElement) => {
              const rect = row.getBoundingClientRect();
              return Math.abs(rect.top + rect.height / 2 - center);
            };
            return distance(a) - distance(b);
          })[0];
          if (!nearest) {
            reset();
            return;
          }
          list.dataset.reading = "active";
          rows.forEach((row) => {
            row.dataset.readingActive = String(row === nearest);
          });
        },
        {
          rootMargin: `-${margin}px 0px -${margin}px 0px`,
          threshold: [0, 0.1, 0.25, 0.5, 1],
        },
      );
      rows.forEach((row) => observer?.observe(row));
    };
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(configure, 100);
    };
    configure();
    preference.addEventListener("change", configure);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      observer?.disconnect();
      clearTimeout(resizeTimer);
      preference.removeEventListener("change", configure);
      window.removeEventListener("resize", resize);
      reset();
    };
  }, [selector]);

  return ref;
}
