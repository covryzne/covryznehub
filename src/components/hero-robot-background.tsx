"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";
import { splineRobotSceneUrl } from "@/lib/spline";

// The Spline runtime is heavy and browser-only: load it lazily, never on
// the server, and only as the hero's background layer.
const SplineScene = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

/**
 * Full-bleed Spline robot rendered behind the hero content.
 *
 * Interaction contract (design lock, Nov 2026):
 * - Desktop: the canvas receives pointer events, so the robot follows the
 *   cursor anywhere in the hero. The hero content layer above it is
 *   `pointer-events: none` except for its interactive elements (links and
 *   buttons re-enable `pointer-events: auto`), so clicks still land.
 * - Mobile: the canvas is `pointer-events: none` at small breakpoints, so
 *   it can never trap touch scrolling; the robot simply idles.
 * - Rendering pauses while the hero is scrolled out of view.
 * - If the scene is missing or fails, the hero keeps its normal
 *   background — this layer renders nothing.
 */
export default function HeroRobotBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const appRef = useRef<Application | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const app = appRef.current as unknown as {
          play?: () => void;
          stop?: () => void;
        } | null;
        if (!app) return;
        try {
          if (entries[0].isIntersecting) {
            app.play?.();
          } else {
            app.stop?.();
          }
        } catch {
          // Runtime without play/stop control: rendering just continues.
        }
      },
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!splineRobotSceneUrl) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden transition-opacity duration-1000 sm:pointer-events-auto ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <SplineScene
        scene={splineRobotSceneUrl}
        onLoad={(app) => {
          appRef.current = app;
          setIsLoaded(true);
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
