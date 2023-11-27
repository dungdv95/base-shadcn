import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withErrorCatching(fn: Function) {
  return async function (...args: any[]) {
    try {
      return {
        response: await fn(...args)
      };
    } catch (error) {
      try {
        await error;
      } catch (error) {
        return { error: error?.toString() };
      }
    }
  };
}
