"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SiteCursor from "./site-cursor";

const SESSION_KEY = "covryzne:intro-seen:v1";

export default function SiteExperience({ children }: { children: ReactNode }) {
  // Server content remains accessible when JavaScript is unavailable.
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("Menyiapkan halaman");
  const skip = useRef<HTMLButtonElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch { /* Storage is optional. */ }
    let cancelled = false;
    let finished = false;
    let observer: MutationObserver | undefined;
    let loadListener: (() => void) | undefined;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const previousOverflow = document.body.style.overflow;
    const started = performance.now();
    const delay = (ms: number) => new Promise<void>(resolve => {
      const timer = setTimeout(() => { timers.delete(timer); resolve(); }, ms);
      timers.add(timer);
    });
    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      observer?.disconnect();
      if (loadListener) window.removeEventListener("load", loadListener);
      timers.forEach(clearTimeout);
      timers.clear();
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* Keep the page usable. */ }
      document.body.style.overflow = previousOverflow;
      setLoading(false);
      requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true }));
    };
    finishRef.current = finish;
    setLoading(true);
    setProgress(12);
    document.body.style.overflow = "hidden";
    // A slow or failed decorative asset must never trap the visitor.
    const deadline = setTimeout(() => {
      setProgress(100);
      setStage("Halaman siap");
      const exitTimer = setTimeout(finish, reducedMotion ? 0 : 450);
      timers.add(exitTimer);
    }, 6500);
    timers.add(deadline);

    void (async () => {
      await delay(100);
      if (cancelled || finished) return;
      skip.current?.focus({ preventScroll: true });
      setProgress(30);
      setStage("Menyiapkan Tipografi");
      await document.fonts.ready;
      if (cancelled || finished) return;
      setProgress(55);
      setStage("Memuat tampilan utama");
      if (document.readyState !== "complete") {
        await new Promise<void>(resolve => {
          loadListener = () => resolve();
          window.addEventListener("load", loadListener, { once: true });
        });
      }
      if (cancelled || finished) return;
      setProgress(78);
      setStage("Menyiapkan Konten");
      const robotReady = () => Boolean(document.querySelector("#home > .opacity-100"));
      if (!robotReady()) {
        await Promise.race([
          new Promise<void>(resolve => {
            observer = new MutationObserver(() => { if (robotReady()) resolve(); });
            const hero = document.getElementById("home");
            if (hero) observer.observe(hero, { attributes: true, childList: true, subtree: true });
            else resolve();
          }),
          delay(4000),
        ]);
      }
      observer?.disconnect();
      if (cancelled || finished) return;
      setProgress(94);
      setStage("Hampir siap");
      // Let the first-visit intro breathe; this is presentation, not byte progress.
      await delay(Math.max(0, 1100 - (performance.now() - started)));
      if (cancelled || finished) return;
      setProgress(100);
      setStage("Siap dijelajahi");
      await delay(reducedMotion ? 0 : 450);
      finish();
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (loadListener) window.removeEventListener("load", loadListener);
      timers.forEach(clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [reducedMotion]);

  return (
    <>
      <div inert={loading} className="site-experience-content">{children}</div>
      <AnimatePresence>
        {loading && (
          <motion.div className="site-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.4 }}>
            <div className="menu-stars" aria-hidden="true" />
            <div className="menu-horizon" aria-hidden="true" />
            <div className="site-loader-content">
              <p className="site-loader-brand">covryzne.</p>
              <p className="site-loader-stage" role="status">{stage}</p>
              <div className="site-loader-track" role="progressbar" aria-label="Kesiapan halaman" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                <div className="site-loader-fill" style={{ transform: `scaleX(${progress / 100})` }} />
              </div>
              <button ref={skip} type="button" className="site-loader-skip" onClick={() => finishRef.current()}>Masuk sekarang</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && <SiteCursor />}
    </>
  );
}
