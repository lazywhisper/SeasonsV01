import { projectId, publicAnonKey } from '../../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-025e2792/api`;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

interface PlatformStats {
  currentAPY: number;
  totalDistributed: number;
  distributionCount: number;
  activeSeasHolders: number;
}

interface Portfolio {
  seasBalance: number;
  assets: any[];
  totalValue: number;
}

interface YieldHistory {
  id: string;
  amount: number;
  timestamp: string;
  type: string;
}

interface Activity {
  id: string;
  type: string;
  amount: number;
  timestamp: string;
  walletAddress?: string;
}

class SeasonsBackendAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`[SeasonsAPI] Error fetching ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Get platform statistics
   */
  async getPlatformStats(): Promise<ApiResponse<PlatformStats>> {
    return this.request<PlatformStats>('/stats');
  }

  /**
   * Get user portfolio by wallet address
   */
  async getPortfolio(walletAddress: string): Promise<ApiResponse<Portfolio>> {
    return this.request<Portfolio>(`/portfolio/${walletAddress}`);
  }

  /**
   * Get yield history for wallet
   */
  async getYieldHistory(walletAddress: string): Promise<ApiResponse<YieldHistory[]>> {
    return this.request<YieldHistory[]>(`/yield/${walletAddress}`);
  }

  /**
   * Get recent activity feed
   */
  async getRecentActivity(limit: number = 10): Promise<ApiResponse<Activity[]>> {
    return this.request<Activity[]>(`/activity?limit=${limit}`);
  }

  /**
   * Update platform statistics (admin)
   */
  async updatePlatformStats(stats: PlatformStats): Promise<ApiResponse<any>> {
    return this.request<any>('/stats', {
      method: 'POST',
      body: JSON.stringify(stats),
    });
  }

  /**
   * Subscribe to notifications
   */
  async subscribeToNotifications(
    walletAddress: string,
    preferences: {
      emailNotifications?: boolean;
      pushNotifications?: boolean;
      yieldAlerts?: boolean;
      governanceAlerts?: boolean;
    }
  ): Promise<ApiResponse<any>> {
    return this.request<any>('/notifications/subscribe', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, preferences }),
    });
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{
    status: string;
    timestamp: string;
    services: {
      api: string;
      database: string;
      kv_store: string;
    };
    version: string;
  }> {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-025e2792/health`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      }
    );
    return response.json();
  }
}

// Export singleton instance
export const seasonsAPI = new SeasonsBackendAPI();

// Export types
export type {
  ApiResponse,
  PlatformStats,
  Portfolio,
  YieldHistory,
  Activity,
};
