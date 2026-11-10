'use client';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { siteConfig } from '@/lib/site-config';
import { experiencesData, projectsData } from '@/lib/data';
import { ArrowUpRight, Cpu, Layers3 } from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/section-heading';
import ReviewerStats from './reviewer-stats';
import AboutCounter from './about-counter';
import LabReveal, { RevealItem } from '@/components/lab-reveal';
export default function AboutSection() {
  const { ref } = useSectionInView('About');
  return (
    <section ref={ref} id="about" className="lab-section">
      <SectionHeading heading="About Me" />
      <LabReveal className="about-grid">
        <RevealItem className="lab-card bracket-card about-intro">
          <span className="card-symbol">
            <Cpu aria-hidden="true" />
          </span>
          <p className="about-lead">
            Informatics Engineering graduate specializing in Artificial
            Intelligence, Machine Learning, and Data Science.
          </p>
          <p className="text-muted-foreground">
            Currently working as an External Code Reviewer at Dicoding
            Indonesia, reviewing and improving ML and Data Science projects.
          </p>
          <p className="text-muted-foreground">
            Experienced in end-to-end AI development, MLOps, and data-driven
            systems through programs like Laskar AI x NVIDIA, Kampus Merdeka,
            and DBS Foundation Coding Camp. Passionate about turning data into
            meaningful insights and scalable AI solutions.
          </p>
          <Link href={siteConfig.links.contactForm} className="inline-link">
            Contact Me <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </RevealItem>
        <div className="about-side">
          <RevealItem className="lab-card flex-1">
            <p className="eyebrow">
              <Layers3 size={14} aria-hidden="true" />
              EXPERIENCE & EXPLORATION
            </p>
            <div className="about-numbers">
              <div>
                <AboutCounter value={experiencesData.length} minDigits={2} />
                <p>Experiences</p>
              </div>
              <div>
                <AboutCounter value={projectsData.length} minDigits={2} />
                <p>Projects</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Artificial Intelligence / Machine Learning / MLOps
            </p>
          </RevealItem>
          <RevealItem className="lab-card about-stack reviewer-card">
            <ReviewerStats />
          </RevealItem>
        </div>
      </LabReveal>
    </section>
  );
}
