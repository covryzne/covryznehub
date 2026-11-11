'use client';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import DeferredHeroRobot from './deferred-hero-robot';
import HeroTypewriter from './hero-typewriter';
import HeroName from './hero-name';

export default function HeroSection() {
  const { ref } = useSectionInView('Home');

  return (
    <section ref={ref} id="home" className="hero-lab">
      <div className="hero-sky" aria-hidden="true" />
      <div className="sky-stars hero-stars" aria-hidden="true" />
      <div className="hero-robot-stage">
        <DeferredHeroRobot />
      </div>
      <div className="hero-content">
        <Link href={siteConfig.links.contactForm} className="availability">
          <span className="availability-dot" aria-hidden="true" />
          Available for work!
        </Link>
        <HeroTypewriter />
        <p className="hero-introduction">Hey, I'm</p>
        <HeroName />
        <p className="hero-tagline">
          I vibe with data, play with models, and ship AI systems that make an
          impact.
        </p>
        <div className="hero-actions">
          <Button asChild size="lg">
            <Link href={siteConfig.links.contactForm}>
              Get in touch
              <Icons.arrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="hero-cv" asChild>
            <a href={siteConfig.links.cvPdf} download>
              Download CV
              <Icons.download className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <div className="hero-socials">
            <Button variant="outline" size="icon" asChild>
              <Link
                href={siteConfig.links.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.linkedin className="size-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link
                href={siteConfig.links.github}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.github className="size-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span />
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}
