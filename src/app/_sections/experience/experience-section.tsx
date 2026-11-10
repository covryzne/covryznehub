"use client";
import { useEffect, useState } from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { experiencesData } from "@/lib/data";
import SectionHeading from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import LabReveal, { RevealItem } from "@/components/lab-reveal";
import { useReadingHighlight } from "@/hooks/use-reading-highlight";
import AboutSpotlight from "@/app/_sections/about/about-spotlight";

export default function ExperienceSection() {
  const { ref } = useSectionInView("Experience");
  const [activeIndex, setActiveIndex] = useState(0);
  const readingRef = useReadingHighlight<HTMLOListElement>(".experience-row", setActiveIndex);

  useEffect(() => {
    const list = readingRef.current;
    if (!list) return;
    const updateBranch = () => {
      const activeRow = list.children.item(activeIndex) as HTMLElement | null;
      if (!activeRow) return;
      list.style.setProperty("--experience-branch-progress", `${activeRow.offsetTop + 48}px`);
    };
    updateBranch();
    const observer = new ResizeObserver(updateBranch);
    observer.observe(list);
    Array.from(list.children).forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [activeIndex, readingRef]);
  return (
    <section ref={ref} id="experience" className="lab-section experience-layout">
      <div className="experience-heading">
        <SectionHeading
          heading="My Experience"
          revealTrigger="#experience"
          content="Experience gained through applied machine learning and data science projects."
        />
      </div>
      <LabReveal variant="experience">
        <ol ref={readingRef} className="experience-list">
          {experiencesData.map((data, index) => (
            <li
              key={`${data.title}-${data.company}`}
              data-branch-state={index === activeIndex ? "active" : index < activeIndex ? "passed" : "upcoming"}
            >
              <RevealItem index={index}>
                <article id={`experience-${index + 1}`}>
                  <AboutSpotlight className="experience-row">
                  <span className="experience-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="experience-period">{data.period}</p>
                    <h3>{data.title}</h3>
                    <p className="experience-company">{data.company}</p>
                    <p className="text-muted-foreground mt-5">{data.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                      {data.technologies.map((tech) => (
                        <li key={tech}>
                          <Badge variant="secondary">{tech}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </AboutSpotlight>
                </article>
              </RevealItem>
            </li>
          ))}
        </ol>
      </LabReveal>
    </section>
  );
}
