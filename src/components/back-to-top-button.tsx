"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <Button
      className="fixed bottom-8 sm:bottom-24 right-3 sm:right-8 z-[9999] pointer-events-auto rounded-full shadow-lg transition-opacity duration-300 opacity-100 hover:opacity-80"
      variant="default"
      size="icon"
      aria-label="Back to top"
      style={{
        pointerEvents: show ? "auto" : "none",
        opacity: show ? 1 : 0,
        zIndex: 9999,
      }}
      onClick={() =>
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <Icons.arrowUp className="size-5" />
    </Button>
  );
}
