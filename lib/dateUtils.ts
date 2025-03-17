import { format, formatDistance, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDateSafe(date: string | Date | null | undefined, formatStr: string = 'PP'): string {
  if (!date) return 'Date inconnue';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!isValid(dateObj)) {
    console.warn('Invalid date:', date);
    return 'Date invalide';
  }
  
  try {
    return format(dateObj, formatStr, { locale: fr });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Erreur de format';
  }
}

export function timeFromNow(date: string | Date | null | undefined): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!isValid(dateObj)) {
    return '';
  }
  
  try {
    return formatDistance(dateObj, new Date(), { 
      addSuffix: true,
      locale: fr 
    });
  } catch (error) {
    return '';
  }
} 