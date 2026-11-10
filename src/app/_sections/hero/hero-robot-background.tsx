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
 * Camera zoom per breakpoint. The scene was framed for a wide stage; in
 * the full-viewport hero (especially portrait phones) the robot renders
 * oversized and collides with the hero text. Zooming the scene camera
 * out via the runtime API keeps the robot in the lower half.
 */
function zoomForWidth(width: number): number {
  if (width < 640) return 0.45;
  if (width < 1024) return 0.6;
  return 0.75;
}

function applyZoom(app: Application | null) {
  if (!app) return;
  const target = app as unknown as { setZoom?: (z: number) => void };
  try {
    target.setZoom?.(zoomForWidth(window.innerWidth));
  } catch {
    // Older runtime without setZoom: scene keeps its authored framing.
  }
}

/**
 * Full-bleed Spline robot rendered behind the hero content.
 *
 * Interaction contract (design lock, Nov 2026):
 * - The canvas receives pointer events, so the robot follows the cursor
 *   anywhere in the hero. The hero content layer above it is
 *   `pointer-events: none` except for its interactive elements (links
 *   and buttons re-enable `pointer-events: auto`), so clicks still land.
 * - Touch: the canvas uses `touch-action: pan-y`, so vertical drags
 *   scroll the page natively while taps and horizontal drags reach the
 *   scene — the robot turns toward where the visitor taps/drags.
 * - Rendering pauses while the hero is scrolled out of view.
 * - If the scene is missing or fails, the hero keeps its normal
 *   background — this layer renders nothing.
 */
export default function HeroRobotBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const appRef = useRef<Application | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Pause rendering while the hero is off-screen.
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

  // Keep the camera zoom matched to the viewport size.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => applyZoom(appRef.current), 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!splineRobotSceneUrl) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={`absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Soft violet halo: separates the black robot from dark-mode
          backgrounds and echoes the site's accent colour. */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_60%_at_50%_65%,rgba(139,92,246,0.22),transparent_70%)]" />
      {/* Canvas shifted down so the robot stands in the lower hero;
          `touch-action: pan-y` keeps vertical page scroll native on
          touch devices while taps/drags still reach the scene. */}
      <div className="h-full w-full translate-y-[14%] sm:translate-y-[10%] [&_canvas]:[touch-action:pan-y]">
        <SplineScene
          scene={splineRobotSceneUrl}
          onLoad={(app) => {
            appRef.current = app;
            applyZoom(app);
            setIsLoaded(true);
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
