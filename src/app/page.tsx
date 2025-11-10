"use client";

import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import ExperienceSection from "@/components/experience-section";
import CertificationsSection from "@/components/certifications-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import SectionDivider from "@/components/section-divider";
import { ThemeToggle } from "@/components/theme-toggle";
import { BackToTopButton } from "@/components/back-to-top-button";
import { ChatAssistantButton } from "@/components/chat-assitant";

export default function Home() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 sm:px-0 flex flex flex-col items-center">
        <Header />
        <HeroSection />
        <AboutSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </div>
      {/* Desktop: Theme Toggle */}
      <ThemeToggle className="bg-background hidden sm:fixed sm:bottom-12 sm:right-8 sm-flex" />
      {/* Back To Top Button */}
      <div className="bg-background fixed bottom-2 right-3 sm:bottom-2 sm:right-8 flex">
        <BackToTopButton />
        <ChatAssistantButton />
      </div>
    </>
  );
}
