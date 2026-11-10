"use client";
import { navLinks } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { useActiveSection } from "./context/active-section-provider";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSection();
  const select = (name: (typeof navLinks)[number]["name"]) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
    setIsOpen(false);
  };
  return (
    <header className="site-header">
      <div className="glass-nav">
        <Link
          href="#home"
          onClick={() => select("Home")}
          className="nav-wordmark"
          aria-label="Shendi - Home"
        >
          <span className="brand-glyph" aria-hidden="true">
            s<span>.</span>
          </span>
          <span className="hidden xl:inline">
            shendi<span className="text-muted-foreground"> / ai</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  onClick={() => select(name)}
                  className="nav-link"
                  aria-current={activeSection === name ? "location" : undefined}
                >
                  {activeSection === name && <span className="nav-dot" aria-hidden="true" />}
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle className="border-0 bg-transparent" />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="lg:hidden" variant="ghost">
                <Menu size={18} aria-hidden="true" />
                Menu
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl bg-card">
              <DialogHeader>
                <p className="eyebrow">PORTFOLIO // INDEX</p>
                <DialogTitle className="font-display text-3xl">Explore the lab.</DialogTitle>
                <DialogDescription>Experience, experiments, and ways to connect.</DialogDescription>
              </DialogHeader>
              <nav aria-label="Mobile navigation">
                <ul>
                  {navLinks.map(({ name, href }, index) => (
                    <li key={name}>
                      <Link
                        href={href}
                        onClick={() => select(name)}
                        aria-current={activeSection === name ? "location" : undefined}
                        className="mobile-nav-link"
                      >
                        <span className="font-mono text-xs text-muted-foreground">0{index}</span>
                        {name}
                        <ArrowUpRight className="ml-auto size-4" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
