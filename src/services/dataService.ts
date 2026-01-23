/**
 * Data Service - Abstraction Layer
 * 
 * This service provides a unified interface for data fetching.
 * It can switch between mock data (for development) and real API (for production).
 * 
 * Usage:
 * - Set VITE_USE_MOCK_DATA=true in .env for development
 * - Set VITE_USE_MOCK_DATA=false in .env for production
 */

import { seasonsApi } from './api/seasonsApi';
import type {
  DashboardData,
  WalletData,
  YieldMetrics,
  YieldHistory,
  PortfolioComposition,
  NodeStatus,
  ActivityFeed,
  PlatformMetrics,
  GovernanceData,
  ApiRequestOptions,
} from './api/types';

// Import mock data
import {
  mockPortfolioAssets,
  mockRecentActivity,
  mockGovernanceProposals,
  type PortfolioAsset,
} from '../lib/mockData';

// ============================================================================
// Configuration
// ============================================================================

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'; // Default to true for development

// ============================================================================
// Mock Data Adapters
// ============================================================================

/**
 * Convert mock portfolio assets to API format
 */
function adaptMockPortfolio(
  assets: PortfolioAsset[],
  walletAddress: string
): PortfolioComposition {
  const totalValueUsd = assets.reduce((sum, asset) => sum + asset.valueUsd, 0);

  const categoryBreakdown = assets.reduce(
    (acc, asset) => {
      acc[asset.category] += (asset.valueUsd / totalValueUsd) * 100;
      return acc;
    },
    { 'blue-chip': 0, 'underdog': 0, 'rising-star': 0 }
  );

  return {
    assets: assets.map((asset) => ({
      id: asset.id,
      symbol: asset.symbol,
      name: asset.name,
      category: asset.category,
      allocation: asset.allocation,
      valueUsd: asset.valueUsd,
      change24h: asset.change24h,
      apy: asset.apy,
      logo: asset.logo,
      risk: asset.riskLevel,
      protocol: asset.protocol,
    })),
    totalValueUsd,
    categoryBreakdown,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Convert mock activity to API format
 */
function adaptMockActivity(limit: number = 20, cursor?: string): ActivityFeed {
  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const activities = mockRecentActivity.slice(startIndex, startIndex + limit);

  return {
    activities: activities.map((activity) => ({
      id: activity.id,
      type: activity.type,
      user: {
        address: activity.user,
        displayName: activity.user.substring(0, 4) + '...' + activity.user.slice(-4),
      },
      amountUsd: activity.amount,
      timestamp: activity.timestamp,
      txHash: activity.txHash,
      details: {},
    })),
    hasMore: startIndex + limit < mockRecentActivity.length,
    nextCursor: startIndex + limit < mockRecentActivity.length ? String(startIndex + limit) : undefined,
  };
}

/**
 * Generate mock wallet data
 */
function generateMockWalletData(walletAddress: string): WalletData {
  return {
    address: walletAddress,
    seasBalance: 12547,
    portfolioUsd: 8942.67,
    delta24hPct: 2.34,
    isNodeActive: true,
  };
}

/**
 * Generate mock yield metrics
 */
function generateMockYieldMetrics(): YieldMetrics {
  return {
    currentApy: 34.5,
    todaysYieldUsd: 12.34,
    totalEarnedUsd: 892.61,
    aprEstimatePct: 32.1,
    apyRollingPeriodDays: 30,
  };
}

/**
 * Generate mock node status
 */
function generateMockNodeStatus(seasBalance: number): NodeStatus {
  return {
    isActive: seasBalance >= 10000,
    activationThreshold: 10000,
    currentBalance: seasBalance,
    activatedAt: seasBalance >= 10000 ? new Date(Date.now() - 86400000 * 15).toISOString() : undefined,
    nextDistribution: new Date(Date.now() + 3600000 * 2).toISOString(),
    health: {
      uptime: 99.8,
      stability: 98.5,
      velocity: 87,
    },
  };
}

/**
 * Generate mock platform metrics
 */
function generateMockPlatformMetrics(): PlatformMetrics {
  return {
    totalValueLocked: 172000000,
    activeNodes: 2458,
    totalDistributed: 982610,
    marketCap: 250000000,
    change24h: 2.6,
    totalTransactions: 12068,
    nodesEarningNow: 239,
  };
}

/**
 * Generate mock yield history
 */
function generateMockYieldHistory(timeframe: string): YieldHistory {
  const points: YieldHistory['points'] = [];
  const now = Date.now();
  
  let numPoints = 30;
  let intervalMs = 86400000; // 1 day
  
  if (timeframe === '24h') {
    numPoints = 24;
    intervalMs = 3600000; // 1 hour
  } else if (timeframe === '7d') {
    numPoints = 7;
  } else if (timeframe === '90d') {
    numPoints = 90;
  }

  for (let i = numPoints - 1; i >= 0; i--) {
    points.push({
      timestamp: new Date(now - i * intervalMs).toISOString(),
      yieldUsd: 10 + Math.random() * 15,
      apy: 30 + Math.random() * 10,
    });
  }

  return {
    points,
    timeframe: timeframe as any,
  };
}

/**
 * Generate mock governance data
 */
function generateMockGovernanceData(walletAddress?: string): GovernanceData {
  return {
    proposals: mockGovernanceProposals.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      status: p.status,
      votesFor: p.votesFor,
      votesAgainst: p.votesAgainst,
      quorum: p.quorum,
      endsAt: p.endsAt,
      createdAt: p.createdAt,
    })),
    userVotingPower: walletAddress ? 12547 : 0,
  };
}

// ============================================================================
// Data Service Class
// ============================================================================

class DataService {
  private useMockData: boolean;

  constructor(useMockData: boolean) {
    this.useMockData = useMockData;
  }

  /**
   * Toggle between mock and real data
   */
  setUseMockData(useMock: boolean) {
    this.useMockData = useMock;
    console.log(`[DataService] Switched to ${useMock ? 'MOCK' : 'REAL'} data mode`);
  }

  /**
   * Check if using mock data
   */
  isUsingMockData(): boolean {
    return this.useMockData;
  }

  // ==========================================================================
  // Dashboard Data
  // ==========================================================================

  async getDashboardData(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<DashboardData> {
    if (this.useMockData) {
      // Return mock data
      const wallet = generateMockWalletData(walletAddress);
      const yieldMetrics = generateMockYieldMetrics();
      const portfolio = adaptMockPortfolio(mockPortfolioAssets, walletAddress);
      const node = generateMockNodeStatus(wallet.seasBalance);
      const platform = generateMockPlatformMetrics();
      const recentActivity = adaptMockActivity(10);

      return {
        wallet,
        yield: yieldMetrics,
        portfolio,
        node,
        platform,
        recentActivity,
      };
    }

    // Return real API data
    return seasonsApi.getDashboardData(walletAddress, options);
  }

  // ==========================================================================
  // Wallet
  // ==========================================================================

  async getWalletData(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<WalletData> {
    if (this.useMockData) {
      return generateMockWalletData(walletAddress);
    }

    return seasonsApi.getWalletData(walletAddress, options);
  }

  // ==========================================================================
  // Yield & Earnings
  // ==========================================================================

  async getYieldMetrics(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<YieldMetrics> {
    if (this.useMockData) {
      return generateMockYieldMetrics();
    }

    return seasonsApi.getYieldMetrics(walletAddress, options);
  }

  async getYieldHistory(
    walletAddress: string,
    timeframe: '24h' | '7d' | '30d' | '90d' | 'all' = '30d',
    options?: ApiRequestOptions
  ): Promise<YieldHistory> {
    if (this.useMockData) {
      return generateMockYieldHistory(timeframe);
    }

    return seasonsApi.getYieldHistory(walletAddress, timeframe, options);
  }

  // ==========================================================================
  // Portfolio
  // ==========================================================================

  async getPortfolio(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<PortfolioComposition> {
    if (this.useMockData) {
      return adaptMockPortfolio(mockPortfolioAssets, walletAddress);
    }

    return seasonsApi.getPortfolio(walletAddress, options);
  }

  // ==========================================================================
  // Node Status
  // ==========================================================================

  async getNodeStatus(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<NodeStatus> {
    if (this.useMockData) {
      const wallet = generateMockWalletData(walletAddress);
      return generateMockNodeStatus(wallet.seasBalance);
    }

    return seasonsApi.getNodeStatus(walletAddress, options);
  }

  // ==========================================================================
  // Activity Feed
  // ==========================================================================

  async getActivityFeed(
    limit: number = 20,
    cursor?: string,
    options?: ApiRequestOptions
  ): Promise<ActivityFeed> {
    if (this.useMockData) {
      return adaptMockActivity(limit, cursor);
    }

    return seasonsApi.getActivityFeed(limit, cursor, options);
  }

  async getUserActivity(
    walletAddress: string,
    limit: number = 20,
    cursor?: string,
    options?: ApiRequestOptions
  ): Promise<ActivityFeed> {
    if (this.useMockData) {
      // For mock, just return same activity feed
      return adaptMockActivity(limit, cursor);
    }

    return seasonsApi.getUserActivity(walletAddress, limit, cursor, options);
  }

  // ==========================================================================
  // Platform Metrics
  // ==========================================================================

  async getPlatformMetrics(options?: ApiRequestOptions): Promise<PlatformMetrics> {
    if (this.useMockData) {
      return generateMockPlatformMetrics();
    }

    return seasonsApi.getPlatformMetrics(options);
  }

  // ==========================================================================
  // Governance
  // ==========================================================================

  async getGovernanceData(
    walletAddress?: string,
    options?: ApiRequestOptions
  ): Promise<GovernanceData> {
    if (this.useMockData) {
      return generateMockGovernanceData(walletAddress);
    }

    return seasonsApi.getGovernanceData(walletAddress, options);
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const dataService = new DataService(USE_MOCK_DATA);

// Log current mode on initialization
console.log(`[DataService] Initialized in ${USE_MOCK_DATA ? 'MOCK' : 'REAL'} data mode`);
