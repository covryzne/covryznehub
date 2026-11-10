'use client';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';

import { Icons } from './icons';
import { Button } from './ui/button';
import HeroRobotBackground from './hero-robot-background';
import { useEffect, useState } from 'react';

const typewriterWords = [
  'AI Engineer',
  'Code Reviewer',
  'Data Enthusiast',
  'Long Life Learner',
];

function useTypewriter(words: string[], speed = 80, pause = 1200) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    if (forward && subIndex === words[wordIndex].length) {
      setTimeout(() => setForward(false), pause);
      return;
    }
    if (!forward && subIndex === 0) {
      setForward(true);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (forward ? 1 : -1));
      },
      forward ? speed : 40,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, forward, wordIndex, words, speed, pause]);

  return { text: words[wordIndex].substring(0, subIndex), wordIndex };
}

export default function HeroSection() {
  const { ref } = useSectionInView('Home');
  const { text: typewriterText, wordIndex } = useTypewriter(
    typewriterWords,
    100,
    1200,
  );

  return (
    <section ref={ref} id="home" className="hero-lab">
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <HeroRobotBackground />
      <div className="hero-content">
        <Link href={siteConfig.links.contactForm} className="availability">
          <span className="availability-dot" aria-hidden="true" />
          Available for work!
        </Link>
        <h1 className="hero-title">
          <span className="sr-only">{typewriterWords.join(' / ')}</span>
          <span className="typewriter-visual" aria-hidden="true">
            {typewriterText}
            <span
              className={
                'typewriter-caret' +
                (typewriterText.length === typewriterWords[wordIndex].length
                  ? ' animate-blink'
                  : '')
              }
            />
          </span>
          <span className="typewriter-static" aria-hidden="true">
            AI Engineer
          </span>
        </h1>
        <p className="hero-name text-outline-hero">
          Hey, I'm Shendi Teuku Maulana Efendi
        </p>
        <p className="hero-tagline text-outline-hero">
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
          <div className="flex gap-2">
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
