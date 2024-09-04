import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (fn: Function, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}