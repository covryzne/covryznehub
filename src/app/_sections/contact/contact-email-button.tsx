"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { toast } from "sonner";

export default function ContactEmailButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy email", { description: siteConfig.contact.email });
    }
  };

  return (
    <motion.button
      type="button"
      layout
      className="connect-copy"
      onClick={copy}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-label={`Copy email: ${siteConfig.contact.email}`}
      transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
    >
      {copied ? <Check size={16} aria-hidden="true" /> : open ? <Copy size={16} aria-hidden="true" /> : <Mail size={16} aria-hidden="true" />}
      <AnimatePresence initial={false} mode="wait">
        <motion.span key={copied ? "copied" : open ? "email" : "contact"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
          {copied ? "Email copied!" : open ? siteConfig.contact.email : "Contact"}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" role="status">{copied ? "Email copied to clipboard" : ""}</span>
    </motion.button>
  );
}
