import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useActiveSection } from "@/components/context/active-section-provider";
import type { SectionName } from "@/lib/types";

export const useSectionInView = (sectionName: SectionName, threshold = 0) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin: "-112px 0px -55% 0px",
  });

  const { setActiveSection, timeOfLastClick } = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      if (inView && Date.now() - timeOfLastClick > 1000) {
        setActiveSection(sectionName);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inView, sectionName, setActiveSection, timeOfLastClick]);

  return {
    ref,
  };
};
