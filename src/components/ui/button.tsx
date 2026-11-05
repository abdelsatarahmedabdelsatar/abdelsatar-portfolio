import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:opacity-85",
        outline: "border border-border bg-card/60 hover:border-accent hover:text-accent",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonVariants) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
