/**
 * Centralized formatting utilities for Seasons Dashboard
 * Prevents code duplication and ensures consistent number/currency formatting
 */

export const formatters = {
  /**
   * Format currency with specified decimals
   * @example formatters.currency(1234.56, 2) => "1,234.56"
   */
  currency: (value: number, decimals = 2): string =>
    value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),

  /**
   * Format numbers with thousands separator
   * @example formatters.number(1234567, 0) => "1,234,567"
   */
  number: (value: number | undefined, decimals = 0): string => {
    if (value === undefined || value === null || isNaN(value)) return '0';
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  },

  /**
   * Format large numbers with K/M suffixes
   * @example formatters.compactCurrency(1500000) => "$1.5M"
   */
  compactCurrency: (value: number): string => {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  },

  /**
   * Format large numbers without currency symbol
   * @example formatters.compactNumber(1500000) => "1.5M"
   */
  compactNumber: (value: number): string => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toFixed(0);
  },

  /**
   * Format percentage with optional sign
   * @example formatters.percentage(12.5, 1) => "+12.5%"
   */
  percentage: (value: number, decimals = 1, showSign = true): string =>
    `${showSign && value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`,

  /**
   * Format token amount with symbol
   * @example formatters.tokens(10000, 'SEAS') => "10,000 SEAS"
   */
  tokens: (value: number, symbol = '', decimals = 0): string => {
    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return symbol ? `${formatted} ${symbol}` : formatted;
  },

  /**
   * Format APY/APR with asterisk
   * @example formatters.apy(34.5) => "34.5%*"
   */
  apy: (value: number, decimals = 1): string =>
    `${value.toFixed(decimals)}%*`,

  /**
   * Format timestamp to UTC time string
   * @example formatters.utcTime(new Date()) => "14:32 UTC"
   */
  utcTime: (date: Date): string => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} UTC`;
  },

  /**
   * Format timestamp to relative time
   * @example formatters.relativeTime(Date.now() - 3600000) => "1 hour ago"
   */
  relativeTime: (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago (UTC)`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago (UTC)`;
    if (minutes > 0) return `${minutes} min ago (UTC)`;
    return 'Just now (UTC)';
  },

  /**
   * Format wallet address with ellipsis
   * @example formatters.walletAddress("7GdpaeSzvkx1a78rRkU11K...") => "7Gdp...1K"
   */
  walletAddress: (address: string, startChars = 4, endChars = 4): string => {
    if (address.length <= startChars + endChars) return address;
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  },

  /**
   * Format BPS (basis points) to percentage
   * @example formatters.bpsToPercent(1000) => "10.0%"
   */
  bpsToPercent: (bps: number, decimals = 1): string =>
    `${(bps / 100).toFixed(decimals)}%`,
};