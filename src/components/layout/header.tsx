"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Container } from "@/components/shared/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface HeaderProps {
  initials: string;
  homeLabel: string;
  links: { id: string; label: string }[];
}

export function Header({ initials, homeLabel, links }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(links.map((link) => link.id));
  const pendingSectionId = useRef<string | null>(null);

  // A smooth scroll started while the menu animates closed gets cancelled by the browser,
  // so mobile links wait for the exit animation before navigating.
  function handleMobileLinkClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    pendingSectionId.current = id;
    setMenuOpen(false);
  }

  function scrollToPendingSection() {
    const id = pendingSectionId.current;
    pendingSectionId.current = null;
    const section = id && document.getElementById(id);
    if (!section) return;
    window.history.pushState(null, "", `#${id}`);
    section.scrollIntoView();
    section.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#top"
          aria-label={homeLabel}
          className="font-display text-xl font-semibold transition-colors hover:text-accent"
        >
          {initials}
        </a>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={activeId === id ? "location" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm transition-colors duration-200",
                      activeId === id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </Container>

      <AnimatePresence initial={false} onExitComplete={scrollToPendingSection}>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full overflow-hidden border-b border-border/60 bg-background md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Container>
              <ul className="py-3">
                {links.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(event) => handleMobileLinkClick(event, id)}
                      aria-current={activeId === id ? "location" : undefined}
                      className={cn(
                        "block rounded-lg px-3 py-3 text-base transition-colors",
                        activeId === id ? "bg-muted text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
