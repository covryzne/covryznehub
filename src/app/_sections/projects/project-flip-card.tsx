"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import TiltedCard, { TiltedCardLayer } from "@/components/TiltedCard";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

const workingLink = (url?: string) => Boolean(url && url !== "#");

export default function ProjectFlipCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const backId = `project-back-${index}`;
  const hasLinks = Object.values(project.links).some(workingLink);
  const flip = (next: boolean) => {
    setFlipped(next);
    requestAnimationFrame(() => {
      (next ? backButton.current : frontButton.current)?.focus({ preventScroll: true });
    });
  };

  return (
    <TiltedCard
      className="project-tilt"
      altText={`${project.title} preview`}
      captionText={project.title}
      showTooltip={false}
      containerHeight="100%"
      containerWidth="100%"
      imageHeight="100%"
      imageWidth="100%"
      rotateAmplitude={12}
      scaleOnHover={1.05}
      glare={0.5}
      shadow={0.5}
      radius={16}
      gyroscope={false}
      intro={false}
      flipOnClick={false}
      flipped={flipped}
      onSurfaceClick={() => flip(!flipped)}
      backContent={
        <div className="project-tilt-back" id={backId}>
          <p className="project-number">PROJECT // {String(index + 1).padStart(2, "0")}</p>
          <h3>{project.title}</h3>
          <div>
            <p className="project-tilt-label">Technologies</p>
            <ul className="project-tilt-tags" aria-label={`Technologies used in ${project.title}`}>
              {project.technologies.map((tech) => <li key={tech}><Badge variant="secondary">{tech}</Badge></li>)}
            </ul>
          </div>
          <div className="project-tilt-sources">
            <p className="project-tilt-label">Explore project</p>
            {workingLink(project.links.github) && <a href={project.links.github} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> Source code <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> for {project.title}</span></a>}
            {workingLink(project.links.preview) && <a href={project.links.preview} target="_blank" rel="noopener noreferrer">Live preview <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> for {project.title}</span></a>}
            {workingLink(project.links.githubApi) && <a href={project.links.githubApi} target="_blank" rel="noopener noreferrer">API source <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> for {project.title}</span></a>}
            {!hasLinks && <p className="project-tilt-unavailable">Source not available</p>}
          </div>
          <button ref={backButton} type="button" className="project-flip-action" onClick={() => flip(false)} aria-label={`Back to ${project.title} overview`}><ArrowLeft size={16} aria-hidden="true" /> Back to project</button>
        </div>
      }
    >
      <TiltedCardLayer depth={0}>
        <div className="project-tilt-front">
          <div className="project-tilt-media">
            {project.video ? (
              <video src={project.video} controls muted playsInline preload="none" poster={project.image} aria-label={`${project.title} preview`} />
            ) : project.image ? (
              <Image src={project.image} alt={`${project.title} preview`} fill sizes="(min-width: 1280px) 588px, (min-width: 768px) 46vw, 90vw" loading="lazy" />
            ) : <div className="project-tilt-placeholder">No preview available</div>}
          </div>
          <div className="project-tilt-content">
            <p className="project-number">PROJECT // {String(index + 1).padStart(2, "0")}</p>
            <h3>{project.title}</h3>
            <p className="project-tilt-summary">{project.description}</p>
            <button ref={frontButton} type="button" className="project-flip-action" onClick={() => flip(true)} aria-controls={backId} aria-label={`Flip for more: ${project.title}`}>Flip for more <ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
      </TiltedCardLayer>
    </TiltedCard>
  );
}
