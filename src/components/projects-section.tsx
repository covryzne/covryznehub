"use client";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { projectsData } from "@/lib/data";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "./section-heading";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import LabReveal from "./lab-reveal";
import SpotlightCard from "./spotlight-card";

const workingLink = (url?: string) => Boolean(url && url !== "#");
export default function ProjectsSection() {
  const { ref } = useSectionInView("Projects");
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 4);
  return (
    <section ref={ref} id="projects" className="lab-section">
      <SectionHeading
        label="SYS.03 // PROJECTS"
        heading="Projects"
        content="Real-world projects I have worked on, covering AI, Machine Learning, and MLOps solutions."
      />
      <div className="project-grid">
        {visibleProjects.map((data, index) => (
          <LabReveal key={data.title}>
            <SpotlightCard>
              <div className="project-media">
                {data.video ? (
                  <video
                    src={data.video}
                    controls
                    muted
                    playsInline
                    preload="none"
                    poster={data.image}
                    aria-label={`${data.title} preview`}
                  />
                ) : data.image ? (
                  <Image
                    src={data.image}
                    alt={data.title}
                    width={800}
                    height={450}
                    sizes="(min-width: 1280px) 588px, (min-width: 768px) 46vw, 90vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No preview available
                  </div>
                )}
              </div>
              <div className="project-body">
                <p className="project-number">PROJECT // {String(index + 1).padStart(2, "0")}</p>
                <h3>{data.title}</h3>
                <div>
                  <p id={`project-description-${index}`} className="text-muted-foreground">
                    {expanded[index] || data.description.length <= 120
                      ? data.description
                      : data.description.slice(0, 120) + "..."}
                  </p>
                  {data.description.length > 120 && (
                    <button
                      type="button"
                      className="inline-link text-sm"
                      aria-expanded={Boolean(expanded[index])}
                      aria-controls={`project-description-${index}`}
                      onClick={() => setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))}
                    >
                      {expanded[index] ? "Less" : "More"}
                      <span className="sr-only"> about {data.title}</span>
                    </button>
                  )}
                </div>
                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {data.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge variant="secondary">{tech}</Badge>
                    </li>
                  ))}
                </ul>
                <div className="project-links">
                  {workingLink(data.links.github) && (
                    <a
                      className="inline-link text-sm"
                      href={data.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" aria-hidden="true" />
                      Source code<span className="sr-only"> for {data.title}</span>
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                  {workingLink(data.links.preview) && (
                    <a
                      className="inline-link text-sm"
                      href={data.links.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live preview<span className="sr-only"> for {data.title}</span>
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                  {workingLink(data.links.githubApi) && (
                    <a
                      className="inline-link text-sm"
                      href={data.links.githubApi}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      API source<span className="sr-only"> for {data.title}</span>
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </LabReveal>
        ))}
      </div>
      {projectsData.length > 4 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)} aria-expanded={showAll}>
            {showAll ? "Hide" : `Show All (${projectsData.length})`}
          </Button>
        </div>
      )}
    </section>
  );
}
