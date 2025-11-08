"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { siteConfig } from "@/lib/site-config";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "./section-heading";
import Skills from "./skills";

export default function AboutSection() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
    >
      <SectionHeading heading="About Me" />
      <div className="-mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4">
          Fresh Graduate in Informatics Engineering specializing in Artificial
          Intelligence, Machine Learning, and Data Science. Currently working as
          an External Code Reviewer at Dicoding Indonesia, reviewing and
          improving ML and Data Science projects.
        </p>
        <p>
          Experienced in end-to-end AI development, MLOps, and data-driven
          systems through programs like Laskar AI x NVIDIA, Kampus Merdeka, and
          DBS Foundation Coding Camp. Passionate about turning data into
          meaningful insights and scalable AI solutions.{" "}
          <Link
            className="underline-offset-4 hover:underline"
            href={siteConfig.links.contactForm}
          >
            Contact
          </Link>{" "}
          Me.
        </p>
      </div>
      <Skills />
    </motion.section>
  );
}
