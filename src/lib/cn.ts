import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn — combine class names safely, deduping conflicting Tailwind utilities.
 * Last class in a conflict group wins. Example: cn('p-2', 'p-4') → 'p-4'.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
