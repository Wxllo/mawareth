// MongoDB-style data models for easy backend migration

export type UserRole = 'heir' | 'investor';
export type EstateStatus = 'disputed' | 'voting' | 'listed' | 'sold';
export type VoteType = 'sell' | 'keep' | 'pending';
export type DealBadge = 'cash-deal' | 'buyout-opportunity';

export interface User {
  _id: string;
  name: string;
  role: UserRole;
  phone: string;
  email?: string;
  nationalId?: string;
}

export interface HeirShare {
  _id: string;
  userId: string;
  userName: string;
  relation: string;
  sharePercentage: number;
  shareValue: number;
  vote: VoteType;
}

export interface Estate {
  _id: string;
  title: string;
  address: string;
  city: string;
  area: number;
  propertyType: 'apartment' | 'villa' | 'land' | 'commercial';
  marketValuation: number;
  solhAskPrice: number;
  status: EstateStatus;
  heirs: HeirShare[];
  images: string[];
  badge?: DealBadge;
  timeLeftDays?: number;
  instantProfit?: number;
  createdAt: string;
  updatedAt: string;
  // Consensus tracking
  consensus?: {
    accepted: number;
    total: number;
  };
}

export interface MarketplaceListing {
  _id: string;
  estateId: string;
  title: string;
  address: string;
  city: string;
  area: number;
  propertyType: string;
  marketValuation: number;
  askPrice: number;
  instantProfit: number;
  profitPercentage: number;
  badge: DealBadge;
  timeLeftDays: number;
  images: string[];
  isLocked: boolean;
  depositRequired: number;
  // Auction data
  hasAuction?: boolean;
  auction?: Auction;
}

export interface RenovationOffer {
  _id: string;
  estateId: string;
  currentValue: number;
  potentialValue: number;
  renovationCost: number;
  valueIncrease: number;
  beforeImage: string;
  afterImage: string;
}

// Auction Types
export interface AuctionBid {
  _id: string;
  investorId: string;
  amount: number;
  timestamp: string;
}

export interface Auction {
  _id: string;
  listingId: string;
  currentHighestBid: number;
  minimumBidIncrement: number;
  bids: AuctionBid[];
  endsAt: string;
  status: 'active' | 'ended';
}

// Financing Types
export interface LeasingCalculation {
  loanAmount: number;
  monthlyInstallment: number;
  estimatedRent: number;
  netPayment: number;
  termMonths: number;
}

export interface FinancingOption {
  type: 'standard' | 'murabaha';
  assetPrice: number;
  rate: number;
  termMonths: number;
  totalRepayment: number;
  monthlyInstallment: number;
}
