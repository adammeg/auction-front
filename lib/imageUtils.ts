const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://auction-back-cx4m.onrender.com';

export function getSafeImageUrl(path: string | undefined | null): string {
  if (!path) return '/placeholder.svg';
  
  // If already a complete URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If it's just a path starting with slash, append to API URL
  if (path.startsWith('/')) {
    return `${API_URL}${path}`;
  }
  
  // Otherwise, assume it's a relative path
  return `${API_URL}/${path}`;
} 