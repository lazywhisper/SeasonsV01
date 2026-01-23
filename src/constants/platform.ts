/**
 * Platform-wide constants for Seasons Dashboard
 * Centralizes all magic numbers and configuration values
 */

export const PLATFORM = {
  /**
   * Node activation requirements
   */
  NODE: {
    ACTIVATION_THRESHOLD: 10000, // Minimum $SEAS tokens required to activate node
    LABEL: '$SEAS REQUIRED',
  },

  /**
   * Fee structures in basis points (BPS)
   * 100 BPS = 1%
   */
  FEES: {
    PLATFORM_BPS: 1000, // 10% platform fee
    SERVICE_BPS: 150,   // 1.5% service fee
  },

  /**
   * Token mint addresses
   */
  TOKENS: {
    SEAS_MINT: '7GdpaeSzvkx1a78rRkU11KstM1x8naMmMmmpWQnQSEAS',
    USDC_MINT: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    SOL_MINT: 'So11111111111111111111111111111111111111112',
  },

  // Legacy aliases for backwards compatibility
  SEAS_TOKEN_ADDRESS: '7GdpaeSzvkx1a78rRkU11KstM1x8naMmMmmpWQnQSEAS',
  USDC_TOKEN_ADDRESS: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',

  /**
   * Portfolio allocation targets (6:3:1 rule)
   */
  ALLOCATION: {
    BLUE_CHIPS: 60,    // 60% in blue chip assets
    UNDERDOGS: 30,     // 30% in underdog assets
    RISING_STARS: 10,  // 10% in rising star assets
  },

  /**
   * UI configuration
   */
  UI: {
    DEFAULT_ITEMS_PER_PAGE: 5,
    ANIMATION_DURATION_MS: 800,
    ANIMATION_STEPS: 30,
    TOAST_DURATION_MS: 3000,
    DEBOUNCE_MS: 300,
  },

  /**
   * Data refresh intervals (milliseconds)
   */
  REFRESH: {
    REALTIME_DATA_MS: 5000,      // 5 seconds for APY, prices
    WALLET_BALANCE_MS: 10000,    // 10 seconds for wallet data
    ACTIVITY_FEED_MS: 15000,     // 15 seconds for activity feed
  },

  /**
   * APY calculation
   */
  APY: {
    ROLLING_PERIOD_DAYS: 30,
    DISCLAIMER: '* Based on 30-day rolling period',
    DISCLAIMER_SHORT: '* Calculated based on 30-day period',
  },

  /**
   * Terminology (avoid "Passive")
   */
  TERMINOLOGY: {
    YIELD_TYPES: ['Alternative yield', 'Onchain yield', 'Onchain rewards'],
    AVOID: ['Passive'], // Never use this word
  },

  /**
   * Color mappings for asset categories
   */
  COLORS: {
    BLUE_CHIP: '#E9C774',
    UNDERDOG: '#B44BCB',
    RISING_STAR: '#4B80CB',
    BRAND_GRADIENT: {
      START: '#E9C774',
      MID1: '#F27783',
      MID2: '#B44BCB',
      END: '#4B80CB',
    },
  },

  /**
   * Rebalance configuration
   */
  REBALANCE: {
    MIN_INTERVAL_HOURS: 24,        // Minimum 24 hours between rebalances
    TOLERANCE_PERCENT: 2,          // ±2% tolerance before flagging imbalance
    COOLDOWN_MESSAGE: 'Available in',
  },

  /**
   * Validation rules
   */
  VALIDATION: {
    MIN_SWAP_AMOUNT: 0.01,
    MAX_SLIPPAGE_BPS: 100,  // 1% max slippage
  },
} as const;

/**
 * Type-safe access to platform constants
 */
export type PlatformConstants = typeof PLATFORM;

/**
 * Helper to check if allocation is balanced
 */
export const isAllocationBalanced = (
  actual: number,
  target: number,
  tolerance = PLATFORM.REBALANCE.TOLERANCE_PERCENT
): boolean => {
  return Math.abs(actual - target) <= tolerance;
};

/**
 * Helper to format cooldown time
 */
export const formatCooldownTime = (remainingMs: number): string => {
  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};