"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { skillsData } from "@/lib/data";
import { Button } from "./ui/button";
import LogoLoop from "./LogoLoop";

const toolLogos = skillsData.map(({ name, icon }) => ({
  node: <span className="tools-loop-icon" role="img" aria-label={name}>{icon}</span>,
  title: name,
}));

export default function SkillsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label="Technical stack" className="tools-logo-section">
      <LogoLoop
        logos={toolLogos}
        speed={paused ? 0 : 60}
        direction="left"
        logoHeight={44}
        gap={44}
        hoverSpeed={0}
        scaleOnHover={false}
        layout="line"
        bend={0.5}
        magnify={0.8}
        labels="hover"
        muted={0.5}
        focus={0}
        tiltX={0}
        tiltY={0}
        fadeOut
        fadeOutWidth={0.14}
        scrollBoost={0}
        step={false}
        draggable
        intro
        ariaLabel="Technology tools"
        className="skills-logo-loop"
      />
      <Button
        variant="ghost"
        size="icon"
        className="tools-loop-control sr-only focus:not-sr-only"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Play skills animation" : "Pause skills animation"}
        aria-pressed={paused}
      >
        {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
      </Button>
    </section>
  );
}
