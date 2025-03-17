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
  endTime?: string;
  endDate?: string;
  status: 'active' | 'ended' | 'cancelled' | 'draft';
  featured: boolean;
  createdAt: string;
} 