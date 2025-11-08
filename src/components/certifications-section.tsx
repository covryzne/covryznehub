"use client";

import { useState } from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { certificationsData } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "./section-heading";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * index },
  }),
};

export default function CertificationsSection() {
  const { ref } = useSectionInView("Certifications");
  const [selectedCert, setSelectedCert] = useState<
    null | (typeof certificationsData)[0]
  >(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      ref={ref}
      id="certifications"
      className="my-10 scroll-mt-28 md:mb-20"
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading="My Certifications"
          content="Professional certifications that validate my AI and data expertise."
        />
      </motion.div>

      {/* Certification Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {(showAll ? certificationsData : certificationsData.slice(0, 4)).map(
          (cert, index) => (
            <motion.div
              key={cert.title}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
              className="flex flex-col rounded border p-4"
            >
              {/* Thumbnail */}
              {cert.image && (
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={700}
                    height={400}
                    className="h-60 w-60 w-full object-cover object-center"
                  />
                </div>
              )}
              <h3 className="mt-4 text-xl font-medium">{cert.title}</h3>
              <p className="text-muted-foreground mb-4 mt-1">
                {cert.description}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setSelectedCert(cert)}>
                  View
                </Button>
                <Link
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default">Verify</Button>
                </Link>
              </div>
            </motion.div>
          )
        )}
      </div>
      {/* Load All / Hide Button */}
      {certificationsData.length > 4 && (
        <div className="flex justify-center mt-6">
          {!showAll ? (
            <Button variant="default" onClick={() => setShowAll(true)}>
              {`Show All (${certificationsData.length})`}
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setShowAll(false)}>
              Hide
            </Button>
          )}
        </div>
      )}

      {/* Modal */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl p-4 overflow-y-auto max-h-[80vh]">
          {selectedCert && (
            <div className="flex flex-col gap-4">
              <DialogTitle>{selectedCert.title}</DialogTitle>
              {/* Show all details images if available */}
              {selectedCert.details && selectedCert.details.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {selectedCert.details.map((img, idx) => (
                    <Image
                      key={img}
                      src={img}
                      alt={`${selectedCert.title} detail ${idx + 1}`}
                      width={1200}
                      height={800}
                      className="rounded-lg w-full h-auto object-contain"
                    />
                  ))}
                </div>
              ) : (
                selectedCert.image && (
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    width={1200}
                    height={800}
                    className="rounded-lg w-full h-auto object-contain"
                  />
                )
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
