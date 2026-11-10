import { ReactNode } from "react";
type Props = { heading: string; content?: ReactNode; label?: string };
export default function SectionHeading({ heading, content, label }: Props) {
  return (
    <div className="section-heading">
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
    </div>
  );
}
