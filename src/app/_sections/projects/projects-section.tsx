"use client";

import { useState } from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { projectsData } from "@/lib/data";
import SectionHeading from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import LabReveal, { RevealItem } from "@/components/lab-reveal";
import ProjectFlipCard from "./project-flip-card";

export default function ProjectsSection() {
  const { ref } = useSectionInView("Projects");
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 4);

  return (
    <section ref={ref} id="projects" className="lab-section">
      <SectionHeading
        heading="Projects"
        content="Real-world projects I have worked on, covering AI, Machine Learning, and MLOps solutions."
      />
      <LabReveal variant="projects" className="project-grid">
        {visibleProjects.map((project, index) => (
          <RevealItem key={project.title} index={index}>
            <ProjectFlipCard project={project} index={index} />
          </RevealItem>
        ))}
      </LabReveal>
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
