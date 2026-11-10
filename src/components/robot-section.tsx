"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Loader2, MousePointer } from "lucide-react";
import SectionHeading from "./section-heading";
import { splineRobotAttribution, splineRobotSceneUrl } from "@/lib/spline";

function SceneStatus({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center text-sm text-indigo-200/80">
      <Loader2 className="h-6 w-6 animate-spin" />
      <p>{message}</p>
    </div>
  );
}

function SceneSetupPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="font-heading text-lg font-semibold text-white">
        The robot is not connected yet
      </p>
      <p className="max-w-md text-sm leading-6 text-indigo-200/80">
        Remix the NEXBOT scene into your own Spline account, publish it, and
        paste the scene URL into{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
          src/lib/spline.ts
        </code>
        . Step-by-step:{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
          docs/robot-section-setup.md
        </code>
      </p>
    </div>
  );
}

// The Spline runtime is heavy and browser-only: load it lazily, never on
// the server, and only when this section is rendered.
const SplineScene = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SceneStatus message="Loading the 3D scene…" />,
});

export default function RobotSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasScene = splineRobotSceneUrl.length > 0;

  return (
    <motion.section
      id="playground"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.175 }}
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
    >
      <SectionHeading
        heading="Interactive 3D"
        content="A small experiment with real-time 3D on the web — this robot follows your cursor. Built with Spline."
      />

      <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#070714] shadow-2xl shadow-indigo-950/40">
        {/* Purple stage glow, echoing the reference design */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.45),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(49,46,129,0.5),transparent_60%)]" />

        <div className="relative h-[380px] w-full sm:h-[480px]">
          {hasScene ? (
            <>
              {!isLoaded && (
                <div className="absolute inset-0">
                  <SceneStatus message="Waking the robot up…" />
                </div>
              )}
              <SplineScene
                scene={splineRobotSceneUrl}
                onLoad={() => setIsLoaded(true)}
              />
            </>
          ) : (
            <SceneSetupPlaceholder />
          )}
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs text-indigo-100 backdrop-blur">
          <MousePointer className="h-3.5 w-3.5" />
          Move your cursor — he watches you
        </div>
      </div>

      <p className="mt-4 max-w-xl text-center text-xs leading-5 text-muted-foreground">
        3D model:{" "}
        <a
          href={splineRobotAttribution.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {splineRobotAttribution.work}
        </a>{" "}
        by {splineRobotAttribution.creator} via Spline Community, licensed
        under{" "}
        <a
          href={splineRobotAttribution.licenseUrl}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {splineRobotAttribution.license}
        </a>
        . Rendered with Spline.
      </p>
    </motion.section>
  );
}
