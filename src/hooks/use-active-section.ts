"use client";

import { useEffect, useState } from "react";

/** Tracks which section currently crosses the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target;
          if (entry.isIntersecting) setActiveId(id);
          // Clears the highlight when scrolling back up to the hero, which has no nav link.
          else setActiveId((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const id of idsKey.split(",")) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
