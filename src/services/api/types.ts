/**
 * API Contract Types for Seasons Platform
 * 
 * These types define the structure of data returned from the backend API.
 * They serve as a contract between frontend and backend.
 */

// ============================================================================
// Portfolio & Assets
// ============================================================================

export type AssetCategory = 'blue-chip' | 'underdog' | 'rising-star';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  allocation: number;
  valueUsd: number;
  change24h: number;
  apy: number;
  logo: string;
  risk: 'low' | 'medium' | 'high';
  protocol?: string;
}

export interface PortfolioComposition {
  assets: Asset[];
  totalValueUsd: number;
  categoryBreakdown: {
    'blue-chip': number;
    'underdog': number;
    'rising-star': number;
  };
  lastUpdated: string; // ISO timestamp
}

// ============================================================================
// Wallet & Balance
// ============================================================================

export interface WalletData {
  address: string;
  seasBalance: number;
  portfolioUsd: number;
  delta24hPct: number;
  isNodeActive: boolean;
}

// ============================================================================
// Yield & Earnings
// ============================================================================

export interface YieldMetrics {
  currentApy: number;
  todaysYieldUsd: number;
  totalEarnedUsd: number;
  aprEstimatePct: number;
  apyRollingPeriodDays: number; // typically 30
}

export interface YieldHistoryPoint {
  timestamp: string; // ISO timestamp
  yieldUsd: number;
  apy: number;
}

export interface YieldHistory {
  points: YieldHistoryPoint[];
  timeframe: '24h' | '7d' | '30d' | '90d' | 'all';
}

// ============================================================================
// Node Status
// ============================================================================

export interface NodeStatus {
  isActive: boolean;
  activationThreshold: number;
  currentBalance: number;
  activatedAt?: string; // ISO timestamp
  nextDistribution?: string; // ISO timestamp
  health: {
    uptime: number; // percentage
    stability: number; // percentage
    velocity: number; // 0-100
  };
}

// ============================================================================
// Activity Feed
// ============================================================================

export type ActivityType = 'distribution' | 'rebalance' | 'deposit' | 'withdrawal';

export interface Activity {
  id: string;
  type: ActivityType;
  user: {
    address: string;
    displayName?: string;
  };
  amountUsd: number;
  timestamp: string; // ISO timestamp
  txHash?: string;
  details?: Record<string, any>;
}

export interface ActivityFeed {
  activities: Activity[];
  hasMore: boolean;
  nextCursor?: string;
}

// ============================================================================
// Platform Metrics
// ============================================================================

export interface PlatformMetrics {
  totalValueLocked: number;
  activeNodes: number;
  totalDistributed: number;
  marketCap: number;
  change24h: number;
  totalTransactions: number;
  nodesEarningNow: number;
}

// ============================================================================
// Governance
// ============================================================================

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  quorum: number;
  endsAt: string; // ISO timestamp
  createdAt: string; // ISO timestamp
}

export interface GovernanceData {
  proposals: GovernanceProposal[];
  userVotingPower: number;
}

// ============================================================================
// Dashboard Data (combined)
// ============================================================================

export interface DashboardData {
  wallet: WalletData;
  yield: YieldMetrics;
  portfolio: PortfolioComposition;
  node: NodeStatus;
  platform: PlatformMetrics;
  recentActivity: ActivityFeed;
}

// ============================================================================
// API Response Wrapper
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: string;
  error?: {
    code: string;
    message: string;
  };
}

// ============================================================================
// API Request Options
// ============================================================================

export interface ApiRequestOptions {
  signal?: AbortSignal;
  timeout?: number;
}
