'use client';

import type { CSSProperties, ReactNode } from 'react';
import SpotlightCard from '@/components/SpotlightCard';

const surface = {
  '--spotlight-card-surface': 'var(--card)',
  '--spotlight-card-border': 'transparent',
  '--spotlight-card-shadow': 'none',
} as CSSProperties;

export default function AboutSpotlight({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <SpotlightCard
      className={`lab-card about-spotlight ${className}`}
      style={surface}
      theme="dark"
      spotlightColor="#ffffff"
      intensity={0.4}
      spotlightSize={200}
      softness={0.6}
      shape="circle"
      borderGlow={0.5}
      proximity={80}
      smoothing={0.2}
      grain={0}
      ambient
      flare
    >
      {children}
    </SpotlightCard>
  );
}
