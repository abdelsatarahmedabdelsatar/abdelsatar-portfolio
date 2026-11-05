"use client";

import type { ComponentProps, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** Card with a soft highlight that follows the pointer. Updates CSS variables, so it never re-renders. */
export function SpotlightCard({ className, children, ...props }: ComponentProps<"div">) {
  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty("--spot-x", `${clientX - rect.left}px`);
    currentTarget.style.setProperty("--spot-y", `${clientY - rect.top}px`);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group spotlight-card relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
