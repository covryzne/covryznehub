"use client";

import GlassSurface from "@/components/GlassSurface";

export default function LiquidGlassLayer({ variant }: { variant: "nav" | "control" | "card" }) {
  const radius = variant === "nav" ? 38 : variant === "control" ? 22 : 32;
  const distortion = variant === "card" ? -90 : -130;

  return (
    <div className={`liquid-glass-layer liquid-glass-layer--${variant}`} aria-hidden="true">
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={radius}
        distortionScale={distortion}
        displace={0.5}
        backgroundOpacity={0.1}
      />
    </div>
  );
}
