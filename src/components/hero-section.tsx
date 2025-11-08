"use client";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { GridPattern } from "./ui/grid-pattern";
import { useEffect, useState } from "react";

const typewriterWords = ["AI Engineer", "Code Reviewer", "Long Life Learner"];

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
      forward ? speed : 40
    );
    return () => clearTimeout(timeout);
  }, [subIndex, forward, wordIndex, words, speed, pause]);

  return { text: words[wordIndex].substring(0, subIndex), wordIndex };
}

export default function HeroSection() {
  const { ref } = useSectionInView("Home");
  const { text: typewriterText, wordIndex } = useTypewriter(
    typewriterWords,
    100,
    1200
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative my-10 mb-60 flex scroll-mt-96 flex-col items-center gap-5 text-center sm:mt-28"
    >
      <GridPattern
        width={80}
        height={120}
        squares={[
          [0, 3],
          [3, 1],
          [2, 0],
          [7, 2],
          [8, 3],
          [2, 4],
          [6, 4],
        ]}
        strokeDasharray={"4"}
        className={cn(
          "absolute inset-0",
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "opacity-70"
        )}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "tween",
          duration: 0.2,
        }}
      >
        <Link
          href={siteConfig.links.contactForm}
          className="flex items-center gap-3 rounded border px-3 py-1"
        >
          <span className="relative flex size-2">
            <span className="absolute flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative flex size-2 rounded-full bg-green-400"></span>
          </span>
          <span className="text-sm">Available for work!</span>
        </Link>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading max-w-3xl text-4xl font-extrabold md:text-6xl mb-2"
      >
        <span className="text-black dark:text-white">
          {typewriterText}
          <span
            className={
              `inline-block w-2 h-16 bg-black dark:bg-white ml-1 align-middle` +
              (typewriterText.length === typewriterWords[wordIndex].length
                ? " animate-blink"
                : "")
            }
          />
        </span>
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading max-w-3xl text-3xl font-bold md:text-4xl mb-2"
      >
        Hey, I’m Shendi Teuku Maulana Efendi
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="text-muted-foreground max-w-xl"
      >
        I vibe with data, play with models, and ship AI systems that make an
        impact.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="flex flex-col sm:flex-row gap-2 items-center"
      >
        <Button asChild size="lg">
          <Link href={siteConfig.links.contactForm}>
            Get in touch <Icons.arrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href={siteConfig.links.cvPdf} download>
            Download CV <Icons.download className="ml-2 size-4" />
          </a>
        </Button>
        <div className="flex flex-row gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link
              href={siteConfig.links.linkedin}
              aria-label="Linkedin"
              target="_blank"
            >
              <Icons.linkedin className="size-5" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link
              href={siteConfig.links.github}
              aria-label="Github"
              target="_blank"
            >
              <Icons.github className="size-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
