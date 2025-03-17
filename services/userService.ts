import api from '@/lib/api';

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  role: string;
}

// Get user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  console.log('Fetching user details for ID:', id);
  try {
    const response = await api.get(`/users/${id}`);
    console.log('User details response:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
};

// Get user listings by user ID
export const getUserListingsById = async (userId: string): Promise<any> => {
  console.log('Fetching listings for user:', userId);
  try {
    const response = await api.get(`/items/user/${userId}`);
    console.log('User listings response:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching listings for user ${userId}:`, error);
    return [];
  }
};

// Get user statistics
export const getUserStats = async (userId: string): Promise<any> => {
  console.log('Fetching stats for user:', userId);
  try {
    const response = await api.get(`/users/${userId}/stats`);
    console.log('User stats response:', response.data);
    
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for user ${userId}:`, error);
    return {
      totalListings: 0,
      activeBids: 0,
      completedSales: 0,
      memberSince: new Date().toISOString()
    };
  }
}; 