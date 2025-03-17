import api from '@/lib/api';

export interface Auction {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  condition: string;
  images: string[];
  startingBid: number;
  currentBid: number;
  bids: number;
  seller: {
    _id: string;
    username: string;
  };
  endTime: string;
  status: 'active' | 'ended' | 'cancelled';
  featured: boolean;
  createdAt: string;
}

// Get featured auctions
export const getFeaturedAuctions = async (): Promise<Auction[]> => {
  console.log('Fetching featured auctions');
  try {
    const response = await api.get('/items/featured');
    console.log('Featured auctions response:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching featured auctions:', error);
    return [];
  }
};

// Search auctions
export const searchAuctions = async ({
  query = '',
  sort = 'relevance',
  category = '',
  minPrice,
  maxPrice,
  page = 1,
  limit = 12
}: {
  query?: string;
  sort?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}): Promise<any> => {
  console.log('Searching auctions with query:', query);
  
  // Build query parameters
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (sort) params.append('sort', sort);
  if (category) params.append('category', category);
  if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
  if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  
  try {
    const response = await api.get(`/items/search?${params.toString()}`);
    console.log('Search results:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data;
    }
    
    if (Array.isArray(response.data)) {
      return { data: response.data, total: response.data.length };
    }
    
    return { data: [], total: 0 };
  } catch (error) {
    console.error('Error searching auctions:', error);
    throw error;
  }
};

// Get all active auctions
export const getActiveAuctions = async (): Promise<Auction[]> => {
  console.log('Fetching active auctions');
  try {
    const response = await api.get('/items/active');
    console.log('Active auctions response:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching active auctions:', error);
    throw error;
  }
};

// Get auction by ID
export const getAuctionById = async (id: string): Promise<Auction | null> => {
  console.log('Fetching auction details for ID:', id);
  try {
    const response = await api.get(`/items/${id}`);
    console.log('Auction details response:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching auction ${id}:`, error);
    return null;
  }
};

// Get auctions by category
export const getAuctionsByCategory = async (categoryId: string): Promise<Auction[]> => {
  const response = await api.get(`/api/items/category/${categoryId}`);
  return response.data;
};

// Get user listings
export const getUserListings = async (): Promise<any> => {
  console.log('Fetching user listings');
  try {
    const response = await api.get('/items/my-items');
    console.log('User listings response:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data;
    }
    
    if (Array.isArray(response.data)) {
      return { data: response.data, count: response.data.length };
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user listings:', error);
    throw error;
  }
};

// Create new auction - fix validation issues
export const createAuction = async (auctionData: FormData): Promise<Auction> => {
  // Map field names to match backend expectations
  const condition = auctionData.get('condition');
  const startBid = auctionData.get('startingBid');
  
  // Updated condition mapping to match backend's exact enum values
  const conditionMapping: {[key: string]: string} = {
    'new': 'new',
    'like_new': 'likeNew',         // Changed from 'like_new' to 'likeNew'
    'excellent': 'excellent',      // Keep as is - it's valid in the backend
    'very_good': 'veryGood',       // Changed from 'very_good' to 'veryGood'
    'good': 'good',                // This should be valid
    'fair': 'fair',
    'poor': 'poor',
    'for_parts': 'forParts'        // Changed from 'for_parts' to 'forParts'
  };
  
  // Get mapped condition or fallback to 'new'
  const mappedCondition = condition 
    ? (conditionMapping[condition.toString()] || 'new') 
    : 'new';
  
  // Add required fields with correct values
  auctionData.append('itemCondition', mappedCondition);
  auctionData.append('startBid', startBid ? startBid.toString() : '0');
  
  // Set minimum bid if not provided
  if (!auctionData.has('minBid')) {
    const startingValue = Number(startBid || 0);
    auctionData.append('minBid', Math.max(1, Math.round(startingValue * 0.05)).toString());
  }
  
  // Set auction duration if not provided
  if (!auctionData.has('auctionDuration')) {
    auctionData.append('auctionDuration', '7'); // Default 7 days
  }
  
  // Calculate and ensure end date is set properly
  const auctionDuration = Number(auctionData.get('auctionDuration') || 7);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + auctionDuration);
  
  // Remove any existing endDate to avoid duplicates
  if (auctionData.has('endDate')) {
    auctionData.delete('endDate');
  }
  
  // Add the endDate in ISO format
  const endDateString = endDate.toISOString();
  auctionData.append('endDate', endDateString);
  
  // Log what we're sending to help debug
  console.log('Sending auction data:');
  console.log('- endDate:', endDateString);
  console.log('- itemCondition:', mappedCondition);
  console.log('- startBid:', auctionData.get('startBid'));
  console.log('- minBid:', auctionData.get('minBid'));
  console.log('- auctionDuration:', auctionData.get('auctionDuration'));
  
  // Create a new FormData to ensure proper data structure
  const apiFormData = new FormData();
  
  // Copy all fields from the original FormData
  for (const [key, value] of auctionData.entries()) {
    apiFormData.append(key, value);
  }
  
  try {
    const response = await api.post('/items/create', apiFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating auction:', error);
    
    // Log detailed error info if available
    if (error instanceof Error) {
      // For standard Error objects
      const errorWithResponse = error as any;
      if (errorWithResponse.response && errorWithResponse.response.data) {
        console.error('Error details:', JSON.stringify(errorWithResponse.response.data, null, 2));
      }
    }
    
    throw error;
  }
};

// Place bid on auction
export const placeBid = async (itemId: string, amount: number): Promise<any> => {
  const response = await api.post('/bids/place-bid', { itemId, amount });
  return response.data;
};

// Get bids for an item
export const getBidsForItem = async (itemId: string): Promise<any> => {
  console.log('Fetching bids for item:', itemId);
  const response = await api.get(`/bids/item/${itemId}`);
  console.log('Bids response:', response.data);
  return response.data;
};

// Get user watchlist
export const getUserWatchlist = async (itemIds: string[]): Promise<any> => {
    console.log('Fetching watchlist items:', itemIds);
    if (itemIds.length === 0) return { data: [] };
    
    // Convert array to comma-separated string
    const itemIdsParam = itemIds.join(',');
    const response = await api.get(`/items/by-ids?ids=${itemIdsParam}`);
    console.log('Watchlist items response:', response.data);
    return response.data;
  };
  
  // Remove from watchlist (if needed in the future)
  export const removeFromWatchlist = async (itemId: string): Promise<any> => {
    console.log('Removing item from watchlist:', itemId);
    // This is handled client-side with localStorage for now
    return { success: true };
  };

// Get related auctions
export const getRelatedAuctions = async (
  categoryId: string, 
  currentAuctionId: string, 
  limit: number = 4
): Promise<any> => {
  console.log('Fetching related auctions for category:', categoryId);
  const response = await api.get(`/items/related/${categoryId}?exclude=${currentAuctionId}&limit=${limit}`);
  console.log('Related auctions response:', response.data);
  return response.data;
};

// Get user dashboard stats
export const getUserDashboardStats = async (): Promise<any> => {
  console.log('Fetching user dashboard stats');
  try {
    console.log('Making API request to /users/dashboard-stats');
    const response = await api.get('/users/dashboard-stats');
    console.log('Dashboard stats response status:', response.status);
    console.log('Dashboard stats response data:', JSON.stringify(response.data, null, 2));
    
    // Handle different response formats
    if (response.data && response.data.data) {
      console.log('Returning nested data.data property');
      return response.data.data;
    }
    
    console.log('Returning direct response data');
    return response.data;
  } catch (error) {
    console.error('Error fetching user dashboard stats:', error);
    
    // Return default stats as fallback
    return {
      activeAuctions: 0,
      completedAuctions: 0,
      totalBids: 0,
      watchlistCount: 0,
      recentActivity: []
    };
  }
};

// Get user bids
export const getUserBids = async (): Promise<any> => {
  console.log('Fetching user bids');
  try {
    const response = await api.get('/bids/my-bids'); // Changed from '/bids/user' to '/bids/my-bids'
    console.log('User bids response:', response.data);
    
    // Handle different response formats
    if (response.data && response.data.data) {
      return response.data;
    }
    
    if (Array.isArray(response.data)) {
      return { data: response.data, count: response.data.length };
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user bids:', error);
    throw error;
  }
};