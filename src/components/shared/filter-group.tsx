"use client";

import { cn } from "@/lib/utils";

interface FilterGroupProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}

export function FilterGroup<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: FilterGroupProps<T>) {
  return (
    <div role="group" aria-label={label} className="mb-8 flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={selected === option.value}
          onClick={() => onSelect(option.value)}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200",
            selected === option.value
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-accent hover:text-accent",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
