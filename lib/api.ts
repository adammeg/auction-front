import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://auction-back-cx4m.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Also include x-auth-token for compatibility with the backend
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Create a more user-friendly error message
    let errorMessage = "Une erreur s'est produite";
    
    if (error.response) {
      // The request was made and the server responded with a status code
      const status = error.response.status;
      
      if (status === 401) {
        // Handle 401 Unauthorized errors
        Cookies.remove('token');
        localStorage.removeItem('user');
        
        // Redirect to login page if not already there
        if (typeof window !== 'undefined' && window.location.pathname !== '/auth/login') {
          window.location.href = `/auth/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
        }
        
        errorMessage = "Session expirée. Veuillez vous reconnecter.";
      } else if (status === 403) {
        errorMessage = "Vous n'avez pas les permissions nécessaires.";
      } else if (status === 404) {
        errorMessage = "La ressource demandée n'existe pas.";
      } else if (status === 422) {
        errorMessage = "Données invalides. Veuillez vérifier vos entrées.";
      } else if (status >= 500) {
        errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
      } else {
        // Try to get error message from response
        errorMessage = error.response.data?.message || 
                       error.response.data?.error || 
                       `Erreur ${status}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "Aucune réponse du serveur. Vérifiez votre connexion.";
    } else {
      // Something happened in setting up the request
      errorMessage = error.message || "Erreur de requête.";
    }
    
    // Attach a user-friendly message to the error
    error.displayMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

export default api;