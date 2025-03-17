import api from '@/lib/api';
import { normalizeResponse } from '@/lib/apiUtils';
import { getSafeImageUrl } from '@/lib/imageUtils';

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  parent?: string;
  slug?: string;
  count?: number;
}

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  console.log('Fetching categories');
  try {
    const response = await api.get('/categories/all');
    console.log('Categories response:', response.data);
    
    return normalizeResponse<Category>(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<Category | null> => {
  try {
    const response = await api.get(`/categories/${id}`);
    console.log('Category details response:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
};

// Get all auctions in a category
export const getAuctionsByCategory = async (categoryId: string): Promise<any[]> => {
  try {
    const response = await api.get(`/items/category/${categoryId}`);
    console.log('Category auctions response:', response.data);
    
    return normalizeResponse(response.data);
  } catch (error) {
    console.error(`Error fetching auctions for category ${categoryId}:`, error);
    return [];
  }
};

// Get featured categories (those with most auctions)
export const getFeaturedCategories = async (limit: number = 6): Promise<Category[]> => {
  try {
    const response = await api.get(`/categories/featured?limit=${limit}`);
    console.log('Featured categories response:', response.data);
    
    return normalizeResponse<Category>(response.data);
  } catch (error) {
    console.error('Error fetching featured categories:', error);
    return [];
  }
};