"use client";

import { createContext, useContext, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import type { AnimatedContentProps } from "./AnimatedContent";

const AnimatedContent = dynamic(() => import("./AnimatedContent"));

type RevealVariant = "rise" | "about" | "experience" | "projects" | "certifications" | "contact" | "heading" | "tools";
type RevealProps = { children: ReactNode; className?: string; variant?: RevealVariant; index?: number; triggerElement?: string };
const RevealContext = createContext<RevealVariant>("rise");

/** Layout containers stay untransformed, including the sticky Experience ancestor. */
export default function LabReveal({ children, className = "", variant = "rise" }: RevealProps) {
  return (
    <RevealContext.Provider value={variant}>
      <div className={`lab-reveal ${className}`}>{children}</div>
    </RevealContext.Provider>
  );
}

function preset(variant: RevealVariant, index: number): Partial<AnimatedContentProps> {
  switch (variant) {
    case "about": return { direction: "horizontal", distance: 16, reverse: index === 0 };
    case "experience": return { direction: "horizontal", distance: 28, reverse: true };
    case "projects": return { distance: index % 2 ? 38 : 24, scale: 0.98 };
    case "certifications": return { distance: 18, scale: 0.97 };
    case "contact": return { direction: "horizontal", distance: 20, reverse: index % 2 === 0 };
    case "heading": return { distance: 12, duration: 0.5 };
    case "tools": return { distance: 0, duration: 0.7 };
    default: return { distance: 20 };
  }
}

/** Each item enters independently, so long lists don't animate below the viewport. */
export function RevealItem({ children, className = "", variant, index = 0, triggerElement }: RevealProps) {
  const inheritedVariant = useContext(RevealContext);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <AnimatedContent
      className={className}
      triggerElement={triggerElement}
      duration={0.7}
      ease="power3.out"
      threshold={0.12}
      delay={Math.min(index % 3, 2) * 0.08}
      once={false}
      {...preset(variant ?? inheritedVariant, index)}
    >
      {children}
    </AnimatedContent>
  );
}
