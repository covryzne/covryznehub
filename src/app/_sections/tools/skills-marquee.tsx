'use client';

import { useState, useSyncExternalStore } from 'react';
import { Pause, Play } from 'lucide-react';
import { skillsData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import LogoLoop from '@/components/LogoLoop';
import { RevealItem } from '@/components/lab-reveal';

const toolLogos = skillsData.map(({ name, icon }) => ({
  node: (
    <span className="tools-loop-icon" role="img" aria-label={name}>
      {icon}
    </span>
  ),
  title: name,
}));

const MOBILE_QUERY = '(max-width: 767px)';
const subscribeToViewport = (onChange: () => void) => {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getMobileSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getServerSnapshot = () => false;
const mobileRows = [toolLogos.slice(0, 7), toolLogos.slice(7)];

export default function SkillsMarquee() {
  const [paused, setPaused] = useState(false);
  const mobile = useSyncExternalStore(subscribeToViewport, getMobileSnapshot, getServerSnapshot);
  const rows = mobile ? mobileRows : [toolLogos];

  return (
    <section aria-label="Technical stack" className="tools-logo-section">
      {/* <p className="tools-loop-heading">Most I Used</p> */}
      <RevealItem variant="tools" className="tools-loop-rows w-full min-w-0">
        {rows.map((logos, index) => (
          <LogoLoop
              key={mobile ? `mobile-${index}` : "desktop"}
              logos={logos}
              speed={paused ? 0 : mobile ? 40 : 60}
              direction={index === 1 ? "right" : "left"}
              logoHeight={mobile ? 36 : 60}
              gap={mobile ? 28 : 44}
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
              ariaLabel={mobile ? `Technology tools, row ${index + 1}` : "Technology tools"}
              className="skills-logo-loop"
          />
        ))}
      </RevealItem>
      <Button
        variant="ghost"
        size="icon"
        className="tools-loop-control sr-only focus:not-sr-only"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Play skills animation' : 'Pause skills animation'}
        aria-pressed={paused}
      >
        {paused ? (
          <Play className="size-4" aria-hidden="true" />
        ) : (
          <Pause className="size-4" aria-hidden="true" />
        )}
      </Button>
    </section>
  );
}
