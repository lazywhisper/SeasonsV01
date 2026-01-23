/**
 * useDashboardData Hook
 * 
 * Custom hook for fetching and managing dashboard data.
 * Handles loading states, errors, and automatic refetching.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { dataService } from '../services/dataService';
import type { DashboardData } from '../services/api/types';

interface UseDashboardDataOptions {
  walletAddress?: string;
  enabled?: boolean; // Whether to fetch data automatically
  refetchInterval?: number; // Auto-refetch interval in ms (0 = disabled)
  onError?: (error: Error) => void;
}

interface UseDashboardDataReturn {
  data: DashboardData | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isRefetching: boolean;
}

export function useDashboardData(
  options: UseDashboardDataOptions = {}
): UseDashboardDataReturn {
  const {
    walletAddress,
    enabled = true,
    refetchInterval = 0,
    onError,
  } = options;

  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const refetchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Fetch dashboard data
   */
  const fetchData = useCallback(
    async (isRefetch: boolean = false) => {
      if (!walletAddress || !enabled) return;

      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        if (isRefetch) {
          setIsRefetching(true);
        } else {
          setIsLoading(true);
        }
        setIsError(false);
        setError(null);

        const dashboardData = await dataService.getDashboardData(walletAddress, {
          signal: abortController.signal,
        });

        // Only update state if request wasn't aborted
        if (!abortController.signal.aborted) {
          setData(dashboardData);
        }
      } catch (err) {
        // Only handle error if request wasn't aborted
        if (!abortController.signal.aborted) {
          const errorObj = err instanceof Error ? err : new Error('Failed to fetch dashboard data');
          setIsError(true);
          setError(errorObj);
          onError?.(errorObj);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
          setIsRefetching(false);
        }
      }
    },
    [walletAddress, enabled, onError]
  );

  /**
   * Manual refetch function
   */
  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  /**
   * Initial fetch and auto-refetch setup
   */
  useEffect(() => {
    // Initial fetch
    fetchData(false);

    // Setup auto-refetch if interval is specified
    if (refetchInterval > 0) {
      refetchIntervalRef.current = setInterval(() => {
        fetchData(true);
      }, refetchInterval);
    }

    // Cleanup function
    return () => {
      // Cancel ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Clear interval
      if (refetchIntervalRef.current) {
        clearInterval(refetchIntervalRef.current);
      }
    };
  }, [fetchData, refetchInterval]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
}

/**
 * Hook for checking if data service is using mock data
 */
export function useIsMockData(): boolean {
  return dataService.isUsingMockData();
}
