import type { ReactNode } from "react";

/** One continuous sky behind Certifications and Get in Touch. */
export default function ClosingSky({ children }: { children: ReactNode }) {
  return (
    <div className="closing-sky">
      <div className="contact-sky" aria-hidden="true">
        <div className="contact-stars" />
        <div className="contact-horizon" />
      </div>
      <div className="closing-sky-content">{children}</div>
    </div>
  );
}
