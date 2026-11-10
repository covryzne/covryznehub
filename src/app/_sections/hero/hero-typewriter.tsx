"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const typewriterWords = [
  'AI Engineer',
  'Code Reviewer',
  'Data Enthusiast',
  'Long Life Learner',
];

function useTypewriter(words: string[], speed = 80, pause = 1200, running = true) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(words[0].length);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    if (!running) return;
    if (forward && subIndex === words[wordIndex].length) {
      const timeout = setTimeout(() => setForward(false), pause);
      return () => clearTimeout(timeout);
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
  }, [subIndex, forward, wordIndex, words, speed, pause, running]);

  return { text: words[wordIndex].substring(0, subIndex), wordIndex };
}

/** Keep timer-driven renders inside the animated text, not the whole hero. */
export default function HeroTypewriter() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const { text: typewriterText, wordIndex } = useTypewriter(
    typewriterWords, 100, 1200, inView && pageVisible && !reducedMotion,
  );

  return (
    <h1 ref={ref} className="hero-title">
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
  );
}
