import api from '@/lib/api';

export interface Category {
  _id: string;
  name: string;
  description?: string;
  parent?: string;
  slug?: string;
  count?: number;
}

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  console.log('Fetching categories');
  try {
    const response = await api.get('/api/categories/all');
    console.log('Categories response:', response.data);
    
    // Check if the response has a data property
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    // If not, return the response data directly (assuming it's the array)
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await api.get(`/api/categories/${id}`);
    
    // Check if the response has a data property
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};