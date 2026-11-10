"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls, useReducedMotion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type RevealProps = { children: ReactNode; className?: string };

/** SSR stays visible. Only off-screen content is armed after hydration. */
export default function LabReveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    // MotionConfig suppresses transforms, but does not suppress opacity fades.
    if (reducedMotion) {
      controls.set("visible");
    } else if (node && node.getBoundingClientRect().top >= window.innerHeight) {
      controls.set("hidden");
    }
  }, [controls, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      className={`lab-reveal ${className}`}
      initial={false}
      animate={controls}
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

/** Inherits the nearest LabReveal trigger and its stagger order. */
export function RevealItem({ children, className = "" }: RevealProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
