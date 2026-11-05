import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** wa.me links take the international number as digits only. */
export function getWhatsAppUrl(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export function formatDateRange(start: string, end: string | null) {
  return `${start} – ${end ?? "Present"}`;
}
