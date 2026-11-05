export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Runs before first paint so the page never flashes the wrong theme. */
export const themeInitScript = `(function(){var s=null;try{s=localStorage.getItem("${STORAGE_KEY}")}catch(e){}var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"})()`;

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the theme still applies for this page view.
  }
}
