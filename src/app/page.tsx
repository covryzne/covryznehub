"use client";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import ExperienceSection from "@/components/experience-section";
import CertificationsSection from "@/components/certifications-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import SkillsMarquee from "@/components/skills-marquee";
import { BackToTopButton } from "@/components/back-to-top-button";
import { ChatAssistantButton } from "@/components/chat-assitant";
import { MotionConfig } from "framer-motion";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <SkillsMarquee />
        <div className="site-container">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
          <Footer />
        </div>
      </main>
      <BackToTopButton />
      <ChatAssistantButton />
    </MotionConfig>
  );
}
