"use client";
import { navLinks } from "@/lib/data";
import Link from "next/link";
import { useState, useId, useEffect } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useActiveSection } from "@/components/context/active-section-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const navId = useId();
  const reducedMotion = useReducedMotion();
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSection();
  const select = (name: (typeof navLinks)[number]["name"]) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
    setIsOpen(false);
  };
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  const menuTransition = { duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const };
  const highlighted = hovered ?? focused ?? activeSection;
  return (
    <header className="site-header">
      <div className="header-row">
        <Link
          href="#home"
          onClick={() => select("Home")}
          className="nav-wordmark"
          aria-label="covryzne. - Home"
        >
          covryzne.
        </Link>
        <LayoutGroup id={navId}>
          <nav
            aria-label="Main navigation"
            className="glass-nav hidden lg:block"
            onMouseLeave={() => setHovered(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setFocused(null);
            }}
          >
            <ul className="flex items-center gap-1">
              {navLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    onClick={() => select(name)}
                    className="nav-link"
                    onMouseEnter={() => {
                      setHovered(name);
                      setFocused(null);
                    }}
                    onFocus={() => {
                      setFocused(name);
                      setHovered(null);
                    }}
                    data-highlighted={highlighted === name ? "true" : undefined}
                    aria-current={activeSection === name ? "location" : undefined}
                  >
                    {highlighted === name && (
                      <motion.span
                        layoutId="nav-pill"
                        className="nav-pill"
                        aria-hidden="true"
                        transition={reducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 36 }}
                      >
                        <span className="nav-dot" />
                      </motion.span>
                    )}
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </LayoutGroup>
        <div className="header-actions">
          <ThemeToggle className="header-circle" />
          <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button className="header-circle lg:hidden" variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </DialogPrimitive.Trigger>
            <AnimatePresence>
              {isOpen && (
                <DialogPrimitive.Portal forceMount>
                  <DialogPrimitive.Overlay forceMount asChild>
                    <motion.div className="mobile-sky-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={menuTransition} />
                  </DialogPrimitive.Overlay>
                  <DialogPrimitive.Content forceMount asChild aria-describedby={undefined}>
                    <motion.div
                      className="mobile-sky-menu"
                      initial={{ opacity: 0, y: reducedMotion ? 0 : -32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
                      transition={menuTransition}
                    >
                      <DialogPrimitive.Title className="sr-only">Site navigation</DialogPrimitive.Title>
                      <div className="menu-stars" aria-hidden="true" />
                      <div className="menu-horizon" aria-hidden="true" />
                      <div className="mobile-menu-header">
                        <Link href="#home" onClick={() => select("Home")} className="nav-wordmark" aria-label="covryzne. - Home">
                          covryzne.
                        </Link>
                        <div className="header-actions">
                          <ThemeToggle className="header-circle" />
                          <DialogPrimitive.Close asChild>
                            <Button className="header-circle" variant="ghost" size="icon" aria-label="Close navigation menu">
                              <X className="size-5" aria-hidden="true" />
                            </Button>
                          </DialogPrimitive.Close>
                        </div>
                      </div>
                      <nav aria-label="Mobile navigation" className="mobile-sky-links">
                        <motion.ul initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.07, delayChildren: reducedMotion ? 0 : 0.12 } } }}>
                          {navLinks.map(({ name, href }) => (
                            <motion.li key={name} variants={{ hidden: { opacity: 0, y: reducedMotion ? 0 : -16 }, visible: { opacity: 1, y: 0, transition: menuTransition } }}>
                              <Link href={href} onClick={() => select(name)} aria-current={activeSection === name ? "location" : undefined} className="mobile-sky-link">
                                {name}
                                {activeSection === name && <span className="mobile-active-dot" aria-hidden="true" />}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </nav>
                    </motion.div>
                  </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
              )}
            </AnimatePresence>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
