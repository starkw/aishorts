import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(0) + "K";
  }
  return count.toString();
}
