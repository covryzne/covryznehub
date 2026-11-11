"use client";
import AboutSection from "@/app/_sections/about/about-section";
import ContactSection from "@/app/_sections/contact/contact-section";
import ExperienceSection from "@/app/_sections/experience/experience-section";
import CertificationsSection from "@/app/_sections/certifications/certifications-section";
import ClosingSky from "@/app/_components/closing-sky";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import HeroSection from "@/app/_sections/hero/hero-section";
import ProjectsSection from "@/app/_sections/projects/projects-section";
import SkillsMarquee from "@/app/_sections/tools/skills-marquee";
import { BackToTopButton } from "@/components/back-to-top-button";
import { ChatAssistantButton } from "@/components/chat-assitant";
import { MotionConfig } from "framer-motion";
import SiteExperience from "@/components/site-experience";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteExperience>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          <HeroSection />
          <div className="content-sheet">
            <div className="site-container">
              <AboutSection />
              <SkillsMarquee />
              <ExperienceSection />
              <ProjectsSection />
            </div>
          </div>
          <ClosingSky>
            <div className="site-container certification-container">
              <CertificationsSection />
            </div>
            <ContactSection />
            <Footer />
          </ClosingSky>
        </main>
        <BackToTopButton />
        <ChatAssistantButton />
      </SiteExperience>
    </MotionConfig>
  );
}
