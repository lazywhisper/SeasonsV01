export interface PlatformStats {
  currentAPY: number;
  tvl: number;
  activeNodes: number;
  totalDistributed: number;
  distributionCount: number;
  marketCap: number;
  liquidity: number;
  tokenPrice: number;
  priceChange24h: number;
  transactions24h: number;
  transactionsTotal: number;
}

export interface LiveReward {
  address: string;
  amount: number;
  timeAgo: string;
}

export interface ProjectMetricsProps {
  stats: PlatformStats;
}

export interface MarketStatsProps {
  stats: PlatformStats;
}

export interface LiveRewardsFeedProps {
  stats: PlatformStats;
  liveRewards: LiveReward[];
}

export interface CTASectionProps {
  stats: PlatformStats;
  onConnectWallet: () => void;
}