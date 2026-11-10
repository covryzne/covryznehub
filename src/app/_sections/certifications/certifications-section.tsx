"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowUpRight } from "lucide-react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { certificationsData } from "@/lib/data";
import SectionHeading from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "sonner";

const FlexCarousel = dynamic(() => import("@/components/FlexCarousel"), { ssr: false });
const certificates = certificationsData.filter(cert => cert.image);
const carouselItems = certificates.map(cert => ({ src: cert.image!, alt: cert.title, title: cert.title, subtitle: cert.issuer }));

export default function CertificationsSection() {
  const { ref } = useSectionInView("Certifications");
  const carouselRef = useRef<HTMLDivElement>(null);
  const nearby = useInView(carouselRef, { once: true, margin: "240px 0px" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedCert, setSelectedCert] = useState<null | (typeof certificationsData)[0]>(null);
  const current = certificates[active] ?? certificates[0];

  const step = (key: "ArrowLeft" | "ArrowRight") => {
    setPaused(true);
    carouselRef.current?.querySelector<HTMLElement>('[aria-roledescription="carousel"]')?.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
  };
  const verify = () => {
    if (current.credentialUrl.includes("digitalent.komdigi.go.id") && current.credentialId) {
      toast.success("Credential ID copied!", {
        description: current.credentialId,
        action: { label: "OK", onClick: () => {
          void navigator.clipboard.writeText(current.credentialId!);
          window.open(current.credentialUrl, "_blank", "noopener,noreferrer");
        } },
        duration: 10000,
      });
    } else window.open(current.credentialUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={ref} id="certifications" className="lab-section">
      <SectionHeading heading="My Certifications" content="Professional certifications that validate my AI and data expertise." />
      <div ref={carouselRef} className="certification-carousel">
        {nearby ? (
          <FlexCarousel
            items={carouselItems}
            preset="liquid"
            intro="spin"
            cardHeight={0.5}
            gap={12}
            squeeze={0.2}
            focusOnClick
            captions
            fit="landscape"
            radius={0}
            lensWidth={0.74}
            lensHeight={1.18}
            tilt={62}
            roundness={1}
            bend={0.34}
            reach={0.38}
            curl="twist"
            dispersion={0.45}
            liquid={0}
            followCursor={false}
            autoplay={!paused && !selectedCert}
            interval={4}
            captureWheel
            onChange={setActive}
          />
        ) : (
          <div className="certification-preview" aria-label="Certification previews">
            {certificates.map(cert => <figure key={cert.title}><Image src={cert.image!} alt={cert.title} width={420} height={300} loading="lazy" /><figcaption>{cert.title}</figcaption></figure>)}
          </div>
        )}
      </div>
      <div className="certification-toolbar">
        <p>Drag to explore <span aria-hidden="true">/</span> Use arrow keys</p>
        <div>
          <Button variant="outline" size="icon" aria-label="Previous certification" onClick={() => step("ArrowLeft")}><ChevronLeft size={18} /></Button>
          <Button variant="outline" size="icon" aria-label={paused ? "Play certification carousel" : "Pause certification carousel"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} /> : <Pause size={16} />}</Button>
          <Button variant="outline" size="icon" aria-label="Next certification" onClick={() => step("ArrowRight")}><ChevronRight size={18} /></Button>
        </div>
      </div>
      <div className="certification-details">
        <div><p className="cert-meta">{current.issuer}{current.issueDate ? ` / ${current.issueDate}` : ""}</p><h3>{current.title}</h3><p className="text-muted-foreground">{current.description}</p></div>
        <div className="certification-actions">
          <Button variant="outline" onClick={() => setSelectedCert(current)}>View certificate</Button>
          <Button onClick={verify}>Verify <ArrowUpRight size={16} aria-hidden="true" /></Button>
        </div>
      </div>
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
