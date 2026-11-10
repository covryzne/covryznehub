"use client";
import { useState } from "react";
import { Pause, Play, Asterisk } from "lucide-react";
import { skillsData } from "@/lib/data";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
export default function SkillsMarquee() {
  const [paused, setPaused] = useState(false);
  const band = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = band.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.style.setProperty("--marquee-state", entry.isIntersecting ? "running" : "paused");
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={band} aria-label="Technical stack" className="skills-band">
      <div className="site-container flex items-center gap-4">
        <span className="eyebrow shrink-0 hidden md:block">TOOLS OF THE TRADE</span>
        <div className={`marquee-window ${paused ? "is-paused" : ""}`}>
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee-list" aria-hidden={copy === 1 ? true : undefined}>
                {skillsData.map(({ name }) => (
                  <li key={name}>
                    <Asterisk className="size-4 text-link" aria-hidden="true" />
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="marquee-control shrink-0"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Play skills animation" : "Pause skills animation"}
          aria-pressed={paused}
        >
          {paused ? (
            <Play className="size-4" aria-hidden="true" />
          ) : (
            <Pause className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    </section>
  );
}
