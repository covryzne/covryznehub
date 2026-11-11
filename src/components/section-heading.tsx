import { RevealItem } from "./lab-reveal";
import { ReactNode } from "react";
type Props = { heading: string; content?: ReactNode; label?: string; revealTrigger?: string };
export default function SectionHeading({ heading, content, label, revealTrigger }: Props) {
  return (
    <RevealItem className="section-heading" variant="heading" triggerElement={revealTrigger}>
      {label && (
        <p className="eyebrow">
          <span className="label-mark" aria-hidden="true" />
          {label}
        </p>
      )}
      <h2>
        {heading}
        <span className="text-link" aria-hidden="true">
          .
        </span>
      </h2>
      {content && <p className="section-description">{content}</p>}
    </RevealItem>
  );
}
