/**
 * Seasons Platform API Client
 * 
 * This module provides typed methods for interacting with the Seasons backend API.
 * It handles request/response formatting, error handling, and type safety.
 */

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
  ApiResponse,
  ApiRequestOptions,
} from './types';

// ============================================================================
// Configuration
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.seasons.xyz';
const API_TIMEOUT = 30000; // 30 seconds

// ============================================================================
// HTTP Client
// ============================================================================

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl: string, timeout: number) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
  }

  /**
   * Generic request method with timeout support
   */
  private async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { signal, timeout = this.defaultTimeout } = options;

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        signal: signal || controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }

      throw new Error('Unknown error occurred');
    }
  }

  // ==========================================================================
  // Dashboard Data
  // ==========================================================================

  /**
   * Get complete dashboard data for a wallet
   */
  async getDashboardData(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<DashboardData> {
    const response = await this.request<DashboardData>(
      `/v1/dashboard/${walletAddress}`,
      options
    );
    return response.data;
  }

  // ==========================================================================
  // Wallet
  // ==========================================================================

  /**
   * Get wallet balance and basic info
   */
  async getWalletData(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<WalletData> {
    const response = await this.request<WalletData>(
      `/v1/wallet/${walletAddress}`,
      options
    );
    return response.data;
  }

  // ==========================================================================
  // Yield & Earnings
  // ==========================================================================

  /**
   * Get current yield metrics
   */
  async getYieldMetrics(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<YieldMetrics> {
    const response = await this.request<YieldMetrics>(
      `/v1/yield/${walletAddress}`,
      options
    );
    return response.data;
  }

  /**
   * Get yield history for a specific timeframe
   */
  async getYieldHistory(
    walletAddress: string,
    timeframe: '24h' | '7d' | '30d' | '90d' | 'all' = '30d',
    options?: ApiRequestOptions
  ): Promise<YieldHistory> {
    const response = await this.request<YieldHistory>(
      `/v1/yield/${walletAddress}/history?timeframe=${timeframe}`,
      options
    );
    return response.data;
  }

  // ==========================================================================
  // Portfolio
  // ==========================================================================

  /**
   * Get portfolio composition and asset breakdown
   */
  async getPortfolio(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<PortfolioComposition> {
    const response = await this.request<PortfolioComposition>(
      `/v1/portfolio/${walletAddress}`,
      options
    );
    return response.data;
  }

  // ==========================================================================
  // Node Status
  // ==========================================================================

  /**
   * Get node status and health metrics
   */
  async getNodeStatus(
    walletAddress: string,
    options?: ApiRequestOptions
  ): Promise<NodeStatus> {
    const response = await this.request<NodeStatus>(
      `/v1/node/${walletAddress}`,
      options
    );
    return response.data;
  }

  // ==========================================================================
  // Activity Feed
  // ==========================================================================

  /**
   * Get recent activity feed
   */
  async getActivityFeed(
    limit: number = 20,
    cursor?: string,
    options?: ApiRequestOptions
  ): Promise<ActivityFeed> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (cursor) params.append('cursor', cursor);

    const response = await this.request<ActivityFeed>(
      `/v1/activity?${params.toString()}`,
      options
    );
    return response.data;
  }

  /**
   * Get user-specific activity
   */
  async getUserActivity(
    walletAddress: string,
    limit: number = 20,
    cursor?: string,
    options?: ApiRequestOptions
  ): Promise<ActivityFeed> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (cursor) params.append('cursor', cursor);

    const response = await this.request<ActivityFeed>(
      `/v1/activity/${walletAddress}?${params.toString()}`,
      options
    );
    return response.data;
  }

  // ==========================================================================
  // Platform Metrics
  // ==========================================================================

  /**
   * Get platform-wide metrics
   */
  async getPlatformMetrics(options?: ApiRequestOptions): Promise<PlatformMetrics> {
    const response = await this.request<PlatformMetrics>('/v1/platform/metrics', options);
    return response.data;
  }

  // ==========================================================================
  // Governance
  // ==========================================================================

  /**
   * Get governance proposals and voting data
   */
  async getGovernanceData(
    walletAddress?: string,
    options?: ApiRequestOptions
  ): Promise<GovernanceData> {
    const endpoint = walletAddress
      ? `/v1/governance?wallet=${walletAddress}`
      : '/v1/governance';

    const response = await this.request<GovernanceData>(endpoint, options);
    return response.data;
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const seasonsApi = new ApiClient(API_BASE_URL, API_TIMEOUT);
