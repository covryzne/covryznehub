"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const GlowCursor = dynamic(() => import("./GlowCursor"), { ssr: false });

/** Defer the GlowCursor runtime until mouse use; respect touch/reduced motion. */
export default function SiteCursor() {
  const [active, setActive] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const start = (event: PointerEvent) => {
      if (event.pointerType !== "touch") setActive(true);
    };
    const arm = () => {
      window.removeEventListener("pointermove", start);
      setActive(false);
      if (preference.matches && !document.hidden) {
        window.addEventListener("pointermove", start, { once: true, passive: true });
      }
    };
    arm();
    preference.addEventListener("change", arm);
    document.addEventListener("visibilitychange", arm);
    return () => {
      window.removeEventListener("pointermove", start);
      preference.removeEventListener("change", arm);
      document.removeEventListener("visibilitychange", arm);
    };
  }, []);

  return active ? (
    <GlowCursor
      color="#5f8bff"
      intensity={1.3}
      trailWidth={3}
      linger={1.4}
      glow={1.2}
      clickBurst
      quality="low"
      maxDevicePixelRatio={1}
      theme={resolvedTheme === "light" ? "light" : "dark"}
      style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none" }}
    />
  ) : null;
}
