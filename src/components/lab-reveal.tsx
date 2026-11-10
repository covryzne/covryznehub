"use client";
import { useEffect, useRef, type ReactNode } from "react";
/** Content is visible without JS; only off-screen content gets a one-shot reveal. */
export default function LabReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || preference.matches || node.getBoundingClientRect().top < window.innerHeight)
      return;
    node.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(node);
    const show = () => {
      if (preference.matches) node.dataset.reveal = "visible";
    };
    preference.addEventListener("change", show);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", show);
    };
  }, []);
  return (
    <div ref={ref} className={`lab-reveal ${className}`}>
      {children}
    </div>
  );
}
