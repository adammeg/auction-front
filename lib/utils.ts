import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format time left until a given date
 * @param endTime - The end time as a string or Date object
 * @returns A formatted string representing the time left
 */
export function formatTimeLeft(endTime: string | Date): string {
  const end = new Date(endTime);
  const now = new Date();
  
  // If the end time is in the past, return "Terminé"
  if (end <= now) {
    return "Terminé";
  }
  
  const diffMs = end.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} jour${diffDays > 1 ? 's' : ''} ${diffHours}h`;
  } else if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}min`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  } else {
    return "Moins d'une minute";
  }
}
