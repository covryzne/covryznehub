"use client";

import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";

const HeroRobotBackground = dynamic(() => import("./hero-robot-background"), {
  ssr: false,
});

/** Let the server-rendered hero and its fonts paint before starting WebGL. */
export default memo(function DeferredHeroRobot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const mount = () => { if (!cancelled) setReady(true); };

    void document.fonts.ready.then(() => {
      if (cancelled) return;
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          if (typeof window.requestIdleCallback === "function") {
            idle = window.requestIdleCallback(mount, { timeout: 2000 });
          } else {
            timer = setTimeout(mount, 0);
          }
        });
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  return ready ? <HeroRobotBackground /> : null;
});
