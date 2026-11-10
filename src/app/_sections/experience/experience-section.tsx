"use client";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { experiencesData } from "@/lib/data";
import SectionHeading from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import LabReveal, { RevealItem } from "@/components/lab-reveal";
import { useReadingHighlight } from "@/hooks/use-reading-highlight";
export default function ExperienceSection() {
  const { ref } = useSectionInView("Experience");
  const readingRef = useReadingHighlight<HTMLOListElement>(".experience-row");
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
            <li key={`${data.title}-${data.company}`}>
              <RevealItem index={index}>
                <article className="experience-row">
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
                </article>
              </RevealItem>
            </li>
          ))}
        </ol>
      </LabReveal>
    </section>
  );
}
