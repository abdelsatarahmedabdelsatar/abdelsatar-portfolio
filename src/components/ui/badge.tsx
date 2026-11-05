import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200",
        className,
      )}
      {...props}
    />
  );
}
