"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { applyTheme, getStoredTheme, storeTheme } from "@/lib/theme";

export function ThemeToggle() {
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    // Strict Mode's dev remount clears what the inline script set on <html>. No-op in production.
    applyTheme(getStoredTheme() ?? (query.matches ? "dark" : "light"));

    // Follow OS theme changes until the visitor picks a theme themselves.
    const handleChange = (event: MediaQueryListEvent) => {
      if (!getStoredTheme()) applyTheme(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  function toggleTheme() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle color theme">
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
}
