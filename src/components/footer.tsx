"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const footer = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = footer.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // One calm sweep, paused off-screen. No permanent animation loop.
        if (entry.isIntersecting) node.dataset.entered = "true";
        node.style.setProperty("--beam-play-state", entry.isIntersecting ? "running" : "paused");
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footer} className="footer-finale" aria-label="Portfolio footer">
      <div className="footer-stars" aria-hidden="true" />
      <div className="footer-beam" aria-hidden="true" />
      <div className="site-container lab-footer">
        <div>
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-foreground">{siteConfig.creator}</span>
          </p>
        </div>
        <a href="#home" className="footer-wordmark" aria-label="Back to Home">
          shendi<span>.</span>
        </a>
      </div>
      <div className="footer-display-wordmark" aria-hidden="true">
        COVRYZNE
      </div>
      <div className="footer-horizon" aria-hidden="true" />
    </footer>
  );
}
