import { useState, useEffect, useCallback } from 'react';
import { seasonsAPI, PlatformStats, Portfolio, YieldHistory, Activity } from '../services/api/seasonsBackend';

/**
 * Hook for fetching platform statistics
 */
export function usePlatformStats(autoFetch = true) {
  const [data, setData] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const response = await seasonsAPI.getPlatformStats();
    
    if (response.success && response.data) {
      setData(response.data);
    } else {
      setError(response.error || 'Failed to fetch stats');
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchStats();
    }
  }, [autoFetch, fetchStats]);

  return { data, loading, error, refetch: fetchStats };
}

/**
 * Hook for fetching user portfolio
 */
export function usePortfolio(walletAddress: string | null, autoFetch = true) {
  const [data, setData] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!walletAddress) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    const response = await seasonsAPI.getPortfolio(walletAddress);
    
    if (response.success && response.data) {
      setData(response.data);
    } else {
      setError(response.error || 'Failed to fetch portfolio');
    }
    
    setLoading(false);
  }, [walletAddress]);

  useEffect(() => {
    if (autoFetch && walletAddress) {
      fetchPortfolio();
    }
  }, [autoFetch, walletAddress, fetchPortfolio]);

  return { data, loading, error, refetch: fetchPortfolio };
}

/**
 * Hook for fetching yield history
 */
export function useYieldHistory(walletAddress: string | null, autoFetch = true) {
  const [data, setData] = useState<YieldHistory[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!walletAddress) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    const response = await seasonsAPI.getYieldHistory(walletAddress);
    
    if (response.success && response.data) {
      setData(response.data);
    } else {
      setError(response.error || 'Failed to fetch yield history');
    }
    
    setLoading(false);
  }, [walletAddress]);

  useEffect(() => {
    if (autoFetch && walletAddress) {
      fetchHistory();
    }
  }, [autoFetch, walletAddress, fetchHistory]);

  return { data, loading, error, refetch: fetchHistory };
}

/**
 * Hook for fetching recent activity
 */
export function useRecentActivity(limit = 10, autoFetch = true) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const response = await seasonsAPI.getRecentActivity(limit);
    
    if (response.success && response.data) {
      setData(response.data);
    } else {
      setError(response.error || 'Failed to fetch activity');
    }
    
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    if (autoFetch) {
      fetchActivity();
    }
  }, [autoFetch, fetchActivity]);

  return { data, loading, error, refetch: fetchActivity };
}

/**
 * Hook for health check
 */
export function useHealthCheck(interval?: number) {
  const [health, setHealth] = useState<any>(null);
  const [checking, setChecking] = useState(false);

  const checkHealth = useCallback(async () => {
    setChecking(true);
    const status = await seasonsAPI.healthCheck();
    setHealth(status);
    setChecking(false);
  }, []);

  useEffect(() => {
    checkHealth();

    if (interval) {
      const timer = setInterval(checkHealth, interval);
      return () => clearInterval(timer);
    }
  }, [interval, checkHealth]);

  return { health, checking, checkHealth };
}
