'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'framer-motion';
import { Pause, Play, ArrowUpRight } from 'lucide-react';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { certificationsData } from '@/lib/data';
import SectionHeading from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { toast } from 'sonner';

const DriftWall = dynamic(() => import('@/components/DriftWall'), {
  ssr: false,
});
const certificates = certificationsData.filter((cert) => cert.image);
const wallItems = certificates.map((cert) => ({
  image: cert.image!,
  title: cert.title,
  transparentBackground: cert.transparentBackground,
}));

export default function CertificationsSection() {
  const { ref } = useSectionInView('Certifications');
  const wallRef = useRef<HTMLDivElement>(null);
  const nearby = useInView(wallRef, { once: true, margin: '240px 0px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedCert, setSelectedCert] = useState<
    null | (typeof certificationsData)[0]
  >(null);
  const [columns, setColumns] = useState(4);
  const [tileWidth, setTileWidth] = useState(320);
  const visible = useInView(wallRef);
  const current = certificates[active] ?? certificates[0];

  useEffect(() => {
    const element = wallRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const count = width < 600 ? 2 : 4;
      setColumns(count);
      setTileWidth(Math.min(320, Math.max(100, width / (count * 1.18) - 6)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const verify = (certificate: (typeof certificationsData)[number]) => {
    window.open(certificate.credentialUrl, '_blank', 'noopener,noreferrer');

    const id = certificate.credentialId;
    if (!certificate.credentialUrl.includes('digitalent.komdigi.go.id') || !id) return;

    const showId = () => toast.message('Credential ID', { description: id, duration: 10000 });
    if (!navigator.clipboard?.writeText) {
      showId();
      return;
    }
    void navigator.clipboard.writeText(id).then(
      () => toast.success('Credential ID copied!', { description: id, duration: 10000 }),
      showId,
    );
  };

  return (
    <section ref={ref} id="certifications" className="lab-section">
      <SectionHeading
        heading="My Certifications"
        content="Professional certifications that validate my AI and data expertise."
      />
      <div ref={wallRef} className="certification-wall">
        {nearby ? (
          <DriftWall
            items={wallItems}
            columns={columns}
            tileWidth={tileWidth}
            tileHeight={tileWidth * (158 / 212)}
            gap={6}
            tilt={16}
            turn={0}
            perspective={1500}
            depth={100}
            speed={28}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={52}
            fade={0}
            dim={0.97}
            overlayColor="#060010"
            radius={14}
            roll={0}
            pauseOnHover={false}
            grayscale={false}
            paused={paused || !!selectedCert || !visible}
            onItemClick={(item: { title: string }) => {
              const index = certificates.findIndex(
                (cert) => cert.title === item.title,
              );
              if (index < 0) return;
              setActive(index);
              setSelectedCert(certificates[index]);
            }}
          />
        ) : (
          <div
            className="certification-preview"
            aria-label="Certification previews"
          >
            {certificates.map((cert) => (
              <figure key={cert.title}>
                <Image
                  src={cert.image!}
                  alt={cert.title}
                  width={420}
                  height={300}
                  loading="lazy"
                />
                <figcaption>{cert.title}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
      <div className="certification-toolbar">
        <p>Click a certificate to view details</p>
        <div>
          <label htmlFor="certification-select" className="sr-only">
            Choose a certification
          </label>
          <select
            id="certification-select"
            className="certification-select"
            value={active}
            onChange={(event) => setActive(Number(event.target.value))}
          >
            {certificates.map((cert, index) => (
              <option key={cert.title} value={index}>
                {cert.title}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="icon"
            aria-label={
              paused ? 'Play certification wall' : 'Pause certification wall'
            }
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </Button>
        </div>
      </div>
      <div className="certification-details">
        <div>
          <p className="cert-meta">
            {current.issuer}
            {current.issueDate ? ` / ${current.issueDate}` : ''}
          </p>
          <h3>{current.title}</h3>
          <p className="text-muted-foreground">{current.description}</p>
        </div>
        <div className="certification-actions">
          <Button variant="outline" onClick={() => setSelectedCert(current)}>
            View certificate
          </Button>
          <Button onClick={() => verify(current)}>
            Verify <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
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
              <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 bg-card pb-4">
                <DialogTitle>{selectedCert.title}</DialogTitle>
                <Button onClick={() => verify(selectedCert)}>
                  Verify <ArrowUpRight size={16} aria-hidden="true" />
                </Button>
              </div>
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
