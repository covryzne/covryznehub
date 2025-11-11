"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { projectsData } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "./section-heading";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

export default function ProjectsSection() {
  const { ref } = useSectionInView("Projects");
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  // Tampilkan 4 project saja jika belum showAll
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 4);

  // Helper untuk memotong deskripsi
  const getShortDesc = (desc: string, max = 120) =>
    desc.length > max ? desc.slice(0, max) + "..." : desc;

  return (
    <section ref={ref} id="projects" className="my-10 scroll-mt-28 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading="My Projects"
          content="Projects I worked on. Each of them containing its own case study."
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visibleProjects.map((data, index) => (
          <motion.div
            key={data.title}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            className="flex flex-col rounded border p-4 cursor-pointer"
          >
            <Link
              href={data.links.github ?? "#"}
              aria-label={data.title}
              target="_blank"
              className="overflow-hidden rounded"
            >
              {data.video ? (
                <video
                  src={data.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none mx-auto h-50 w-full object-cover object-top"
                />
              ) : data.image ? (
                <Image
                  src={data.image}
                  alt={data.title}
                  width={800}
                  height={400}
                  className="mx-auto h-50 w-full object-cover object-top"
                  style={{ width: "100%", height: "200px" }}
                  priority={index < 2}
                />
              ) : (
                <div className="flex h-50 w-full items-center justify-center bg-gray-100 text-gray-500">
                  No preview available
                </div>
              )}
            </Link>

            <h3 className="mt-4 text-xl font-medium">{data.title}</h3>
            <p className="text-muted-foreground mb-4 mt-1">
              {expanded[index] || data.description.length <= 120
                ? data.description
                : getShortDesc(data.description)}
              {data.description.length > 120 && (
                <button
                  className="ml-2 text-xs underline text-primary hover:text-primary/80"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
                  }
                >
                  {expanded[index] ? "Less" : "More"}
                </button>
              )}
            </p>

            <div className="flex flex-wrap gap-2">
              {data.technologies.map((tech) => (
                <Badge key={tech} variant="outline" size="lg">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Load All / Hide Button */}
      {projectsData.length > 4 && (
        <div className="flex justify-center mt-6">
          {!showAll ? (
            <Button variant="default" onClick={() => setShowAll(true)}>
              {`Show All (${projectsData.length})`}
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setShowAll(false)}>
              Hide
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
