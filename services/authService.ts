import api from '@/lib/api';
import Cookies from 'js-cookie';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Login user
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('Login attempt with:', { email, password });
    
    // Make sure we're sending email and password as separate parameters, not as an object
    const response = await api.post('/users/login', { 
      email: email, 
      password: password 
    });
    
    const data = response.data;
    console.log('Login response:', data);
    
    // Store token in cookie
    Cookies.set('token', data.token, { expires: 1 }); // 1 day expiry
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

// Register user
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/users/register', userData);
    const data = response.data;
    
    // Store token in cookie
    Cookies.set('token', data.token, { expires: 1 }); // 1 day expiry
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
};

// Logout user
export const logout = (): void => {
  // Remove token from cookie
  Cookies.remove('token');
  
  // Remove user from localStorage
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!Cookies.get('token');
}; 