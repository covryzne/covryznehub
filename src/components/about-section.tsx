"use client";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { siteConfig } from "@/lib/site-config";
import { experiencesData, projectsData } from "@/lib/data";
import { ArrowUpRight, Cpu, Layers3 } from "lucide-react";
import Link from "next/link";
import SectionHeading from "./section-heading";
import Skills from "./skills";
import LabReveal from "./lab-reveal";
export default function AboutSection() {
  const { ref } = useSectionInView("About");
  return (
    <section ref={ref} id="about" className="lab-section">
      <SectionHeading label="SYS.01 // ABOUT" heading="About Me" />
      <LabReveal className="about-grid">
        <div className="lab-card bracket-card about-intro">
          <span className="card-symbol">
            <Cpu aria-hidden="true" />
          </span>
          <p className="about-lead">
            Fresh Graduate in Informatics Engineering specializing in Artificial Intelligence,
            Machine Learning, and Data Science.
          </p>
          <p className="text-muted-foreground">
            Currently working as an External Code Reviewer at Dicoding Indonesia, reviewing and
            improving ML and Data Science projects.
          </p>
          <p className="text-muted-foreground">
            Experienced in end-to-end AI development, MLOps, and data-driven systems through
            programs like Laskar AI x NVIDIA, Kampus Merdeka, and DBS Foundation Coding Camp.
            Passionate about turning data into meaningful insights and scalable AI solutions.
          </p>
          <Link href={siteConfig.links.contactForm} className="inline-link">
            Contact Me <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="about-side">
          <div className="lab-card flex-1">
            <p className="eyebrow">
              <Layers3 size={14} aria-hidden="true" />
              EXPERIENCE & EXPLORATION
            </p>
            <div className="about-numbers">
              <div>
                <span>{String(experiencesData.length).padStart(2, "0")}</span>
                <p>Experiences</p>
              </div>
              <div>
                <span>{String(projectsData.length).padStart(2, "0")}</span>
                <p>Projects</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Artificial Intelligence / Machine Learning / MLOps
            </p>
          </div>
          <div className="lab-card about-stack">
            <p className="eyebrow">THE TOOLKIT</p>
            <Skills />
          </div>
        </div>
      </LabReveal>
    </section>
  );
}
