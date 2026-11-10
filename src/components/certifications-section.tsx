"use client";

import { useState } from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { certificationsData } from "@/lib/data";
import LabReveal from "./lab-reveal";
import SectionHeading from "./section-heading";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { toast } from "sonner";

export default function CertificationsSection() {
  const { ref } = useSectionInView("Certifications");
  const [selectedCert, setSelectedCert] = useState<null | (typeof certificationsData)[0]>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <section ref={ref} id="certifications" className="lab-section">
      {/* Section Heading */}
      <SectionHeading
        label="SYS.04 // CERTIFICATIONS"
        heading="My Certifications"
        content="Professional certifications that validate my AI and data expertise."
      />

      <div className="cert-grid">
        {(showAll ? certificationsData : certificationsData.slice(0, 4)).map((cert) => (
          <LabReveal key={cert.title}>
            <article className="lab-card cert-card">
              {/* Thumbnail */}
              {cert.image && (
                <div className="cert-image">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={700}
                    height={400}
                    className="object-contain"
                    loading="lazy"
                    sizes="(min-width: 768px) 42vw, 85vw"
                  />
                </div>
              )}
              <p className="cert-meta">
                <span>{cert.issuer}</span>
                {cert.issueDate && <span>{cert.issueDate}</span>}
              </p>
              <h3>{cert.title}</h3>
              <p className="text-muted-foreground">{cert.description}</p>

              {/* Buttons */}
              <div className="mt-auto pt-4 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => setSelectedCert(cert)}>
                  View
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    if (
                      cert.credentialUrl.includes("digitalent.komdigi.go.id") &&
                      cert.credentialId
                    ) {
                      toast.success("Credential ID copied!", {
                        description: cert.credentialId,
                        action: {
                          label: "OK",
                          onClick: () => {
                            navigator.clipboard.writeText(cert.credentialId!);
                            window.open(cert.credentialUrl, "_blank", "noopener,noreferrer");
                          },
                        },
                        duration: 10000, // biar ga langsung hilang
                      });
                    } else {
                      window.open(cert.credentialUrl, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  Verify
                </Button>
              </div>
            </article>
          </LabReveal>
        ))}
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
        <DialogContent
          aria-describedby={undefined}
          className="w-full max-w-[90vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl p-6 pt-14 overflow-y-auto max-h-[80dvh] bg-card"
        >
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
