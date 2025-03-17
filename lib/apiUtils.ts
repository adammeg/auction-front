import { AxiosError } from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    // Handle Axios errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const data = error.response.data as any;
      return data.message || data.error || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      return 'No response received from server. Please check your connection.';
    } else {
      // Something happened in setting up the request
      return error.message || 'An error occurred while setting up the request.';
    }
  }
  
  // Handle other types of errors
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred.';
}

export function formatApiResponse<T>(data: any): ApiResponse<T> {
  // If the API already returns in our expected format
  if (data && typeof data === 'object' && ('success' in data)) {
    return data as ApiResponse<T>;
  }
  
  // Otherwise, format it to match our expected structure
  return {
    success: true,
    data: data as T
  };
} 