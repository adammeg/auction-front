// Enhanced Auction interface
export interface Auction {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
  } | string; // Handle both object and string ID
  condition: string;
  images: string[];
  startingBid: number;
  currentBid?: number;
  bids?: number;
  seller: {
    _id: string;
    username: string;
  } | string; // Handle both object and string ID
  endDate?: string; // Support both endDate and endTime
  endTime?: string;
  status: 'active' | 'ended' | 'cancelled' | 'draft';
  featured?: boolean;
  createdAt: string;
  minBid?: number;
  reservePrice?: number;
  highestBidder?: {
    _id: string;
    username: string;
  } | string;
}

// Bid interface
export interface Bid {
  _id: string;
  item: Auction | string;
  bidder: {
    _id: string;
    username: string;
  } | string;
  amount: number;
  createdAt: string;
}