// Mock data for Seasons dashboard
import bonkLogo from 'figma:asset/cabe639e074a7696ad20c8b76102cc7130648803.png';
import wifLogo from 'figma:asset/695464c4e114211df8930e790b5f1354e020512b.png';
import bomeLogo from 'figma:asset/20c435324588bbe92e12f44c7c4d551976978e97.png';
import penguLogo from 'figma:asset/11dd47e096a75ab72a7e500bcdba8d0d4772e45b.png';
import pumpLogo from 'figma:asset/ddd88100b8deee6a95274199e1863ad145297565.png';
import fartcoinLogo from 'figma:asset/501ffda46bf5d1c0917ca63d14c5b266867ac2e7.png';
import wojakLogo from 'figma:asset/4473a63568169da525a90ec8727cf26b6ee11add.png';
import jbmbLogo from 'figma:asset/5f7d06d332fd284477eac1ceb01e315d9b508091.png';

// Platform-wide statistics (PUBLIC - visible without wallet)
export interface PlatformStats {
  marketCap: number;
  priceChange24h: number;
  liquidity: number;
  totalHolders: number;
  activeNodes: number; // Holders with 10k+ SEAS
  transactions24h: number;
  transactionsTotal: number;
  totalDistributed: number;
  distributionCount: number;
  currentAPY: number;
  tvl: number;
}

// User node status (PRIVATE - visible when wallet connected)
export interface UserNode {
  seasBalance: number; // User's $SEAS balance
  nodeStatus: 'no-tokens' | 'insufficient' | 'active';
  earnedToday: number;
  earnedTotal: number;
  shareOfPool: number; // Percentage of total pool
  activationDate?: string; // Date when node was activated (ISO format)
  yieldHistory?: YieldHistoryEntry[];
}

// Yield history entry
export interface YieldHistoryEntry {
  date: string; // ISO date
  amount: number; // USD value
  txHash: string;
}

// Live rewards feed for Overview page (creates FOMO)
export interface LiveReward {
  address: string; // Truncated wallet address
  amount: number;
  timestamp: string; // "2 min ago"
}

export interface WalletSummary {
  portfolioUsd: number;
  todaysYieldUsd: number;
  totalEarnedUsd: number;
  aprEstimatePct: number;
  liquidityPct: number;
  stabilityPct: number;
  distributionUptimePct: number;
  yieldBreakdown: {
    feesPct: number;
    inclusionPct: number;
    treasuryPct: number;
    feesWeeklyDelta: number;
    inclusionWeeklyDelta: number;
    treasuryWeeklyDelta: number;
  };
  delta24hPct: number;
  platformVolume24hM: number;
  velocity: number;
  nextRebalance: string;
  sparklineData: number[];
}

export interface Asset {
  symbol: string;
  name: string;
  weightPct: number;
  change24hPct: number;
  aprRange: string;
  rewards7dUsd: number;
  logo?: string;
  category: 'blue' | 'under' | 'rising';
}

export interface TimelinePoint {
  tsISO: string;
  rewardsUsd: number;
  sourceSplit: {
    fees: number;
    inclusion: number;
    treasury: number;
  };
}

export interface ActivityEvent {
  type: 'reward' | 'buy' | 'sell' | 'transfer';
  primary: string;
  amountUsd: number;
  tx: string;
  ts: string;
}

export interface Inclusion {
  symbol: string;
  name: string;
  status: 'Active' | 'Rotating';
  aprImpactRange: string;
  note: string;
  tag: string;
}

export interface Proposal {
  id: number;
  title: string;
  endsIn: string;
  forPct: number;
  againstPct: number;
  abstainPct: number;
  canVote: boolean;
}

export interface SystemHealth {
  distribution: { status: string; meta: string };
  feesFlow: { status: string; meta: string };
  rebalancing: { status: string; meta: string };
}

export interface Alert {
  severity: 'warning' | 'error';
  text: string;
  ts: string;
}

export interface Notification {
  id: string;
  type: 'reward' | 'governance' | 'inclusion' | 'system' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

export interface Referral {
  address: string;
  status: 'Completed' | 'Pending' | 'Verified';
  purchased: number;
  rewarded: number;
  tx: string;
  timestamp: string;
}

export const mockWalletSummary: WalletSummary = {
  portfolioUsd: 4709.37, // $SEAS value (15,420 × $0.28 = $4,317.60) + accumulated yields ($391.77)
  todaysYieldUsd: 4.08, // Daily yield at 34.5% APR
  totalEarnedUsd: 391.77, // Total earned over 96 days (Oct 15 - Jan 19)
  aprEstimatePct: 34.5,
  liquidityPct: 87,
  stabilityPct: 94,
  distributionUptimePct: 99.98,
  yieldBreakdown: {
    feesPct: 88.5, // Direct holder distribution
    inclusionPct: 10, // Yield Pool (DEX deployment)
    treasuryPct: 1.5, // LP Fee
    feesWeeklyDelta: 2.1,
    inclusionWeeklyDelta: -0.8,
    treasuryWeeklyDelta: 0.3,
  },
  delta24hPct: 2.8,
  platformVolume24hM: 3.27,
  velocity: 1.42,
  nextRebalance: '4h 23m',
  sparklineData: [4450, 4520, 4480, 4610, 4590, 4630, 4680, 4650, 4709],
};

// Synchronized with assetsData.ts — 11 assets following 6:3:1 allocation
// Portfolio value: $4,709 | Target APR: ~8-10% | Weekly rewards: ~$7-9
export const mockAssets: Asset[] = [
  // Blue Chips (60% allocation) - 6 assets at ~10% each
  {
    symbol: 'BONK',
    name: 'Bonk',
    weightPct: 10.0,
    change24hPct: 5.2,
    aprRange: '8–14%',
    rewards7dUsd: 0.82, // $471/52 weeks * 10% weight * 9% avg APR
    logo: bonkLogo,
    category: 'blue',
  },
  {
    symbol: 'WIF',
    name: 'dogwifhat',
    weightPct: 10.0,
    change24hPct: 3.1,
    aprRange: '9–15%',
    rewards7dUsd: 1.09, // $471/52 * 10% * 12% APR
    logo: wifLogo,
    category: 'blue',
  },
  {
    symbol: 'POPCAT',
    name: 'Popcat',
    weightPct: 10.0,
    change24hPct: -2.3,
    aprRange: '10–16%',
    rewards7dUsd: 1.18, // $471/52 * 10% * 13% APR
    logo: bomeLogo,
    category: 'blue',
  },
  {
    symbol: 'MEW',
    name: 'Cat in a dogs world',
    weightPct: 10.0,
    change24hPct: 4.7,
    aprRange: '11–17%',
    rewards7dUsd: 1.27, // $471/52 * 10% * 14% APR
    logo: penguLogo,
    category: 'blue',
  },
  {
    symbol: 'MYRO',
    name: 'Myro',
    weightPct: 10.0,
    change24hPct: 1.2,
    aprRange: '12–18%',
    rewards7dUsd: 1.36, // $471/52 * 10% * 15% APR
    logo: pumpLogo,
    category: 'blue',
  },
  {
    symbol: 'PONKE',
    name: 'Ponke',
    weightPct: 10.0,
    change24hPct: -1.5,
    aprRange: '14–22%',
    rewards7dUsd: 1.64, // $471/52 * 10% * 18% APR
    logo: wojakLogo,
    category: 'blue',
  },

  // Underdogs (30% allocation) - 3 assets at ~10% each
  {
    symbol: 'SAMO',
    name: 'Samoyedcoin',
    weightPct: 10.0,
    change24hPct: 6.8,
    aprRange: '18–26%',
    rewards7dUsd: 2.00, // $471/52 * 10% * 22% APR
    logo: bonkLogo,
    category: 'under',
  },
  {
    symbol: 'COPE',
    name: 'Cope',
    weightPct: 10.0,
    change24hPct: -3.2,
    aprRange: '16–24%',
    rewards7dUsd: 1.82, // $471/52 * 10% * 20% APR
    logo: wifLogo,
    category: 'under',
  },
  {
    symbol: 'SLERF',
    name: 'Slerf',
    weightPct: 10.0,
    change24hPct: 8.1,
    aprRange: '15–21%',
    rewards7dUsd: 1.64, // $471/52 * 10% * 18% APR
    logo: bomeLogo,
    category: 'under',
  },

  // Rising Stars (10% allocation) - 2 assets at ~5% each
  {
    symbol: 'FART',
    name: 'Fartcoin',
    weightPct: 5.0,
    change24hPct: 12.5,
    aprRange: '28–38%',
    rewards7dUsd: 1.55, // $471/52 * 5% * 34% APR
    logo: fartcoinLogo,
    category: 'rising',
  },
  {
    symbol: 'JBMB',
    name: 'Just Be More Bullish',
    weightPct: 5.0,
    change24hPct: 18.7,
    aprRange: '23–31%',
    rewards7dUsd: 1.23, // $471/52 * 5% * 27% APR
    logo: jbmbLogo,
    category: 'rising',
  },
];

export const mockTimeline: TimelinePoint[] = Array.from({ length: 96 }, (_, i) => {
  const date = new Date('2025-10-15'); // Start from activation date
  date.setDate(date.getDate() + i); // Add days from activation
  
  // Create realistic daily rewards around $4.08 with variance
  const baseReward = 4.08; // Average daily reward at 34.5% APR
  const variance = Math.sin(i * 0.2) * 0.3; // Small cyclical variance
  const randomNoise = (Math.random() - 0.5) * 0.4; // Random daily fluctuations ±$0.20
  const weekendEffect = (date.getDay() === 0 || date.getDay() === 6) ? -0.15 : 0.05; // Slightly lower on weekends
  
  const rewardsUsd = Math.max(3.5, baseReward + variance + randomNoise + weekendEffect); // Min $3.50
  
  return {
    tsISO: date.toISOString(),
    rewardsUsd: parseFloat(rewardsUsd.toFixed(2)),
    sourceSplit: {
      fees: 88.5,
      inclusion: 10,
      treasury: 1.5,
    },
  };
});

export const mockActivity: ActivityEvent[] = [
  {
    type: 'reward',
    primary: 'Reward received — BONK • $0.92',
    amountUsd: 0.92,
    tx: '9h3...aKp',
    ts: '2026-01-19 09:22',
  },
  {
    type: 'reward',
    primary: 'Reward received — WIF • $1.38',
    amountUsd: 1.38,
    tx: '7k2...bNm',
    ts: '2026-01-19 06:15',
  },
  {
    type: 'reward',
    primary: 'Reward received — PUMP • $0.54',
    amountUsd: 0.54,
    tx: '3p7...dSt',
    ts: '2026-01-18 11:30',
  },
  {
    type: 'reward',
    primary: 'Reward received — FARTCOIN • $0.71',
    amountUsd: 0.71,
    tx: '1n4...eUv',
    ts: '2026-01-18 08:45',
  },
  {
    type: 'reward',
    primary: 'Reward received — WIF • $1.42',
    amountUsd: 1.42,
    tx: '2m5...kTu',
    ts: '2026-01-17 14:20',
  },
  {
    type: 'reward',
    primary: 'Reward received — BONK • $0.88',
    amountUsd: 0.88,
    tx: '5t6...pZa',
    ts: '2026-01-17 10:30',
  },
  {
    type: 'buy',
    primary: 'Purchased — SEAS • $500.00',
    amountUsd: 500.0,
    tx: '5m9...cQr',
    ts: '2026-01-15 14:08',
  },
  {
    type: 'reward',
    primary: 'Reward received — PENGU • $0.34',
    amountUsd: 0.34,
    tx: '6p8...hRs',
    ts: '2026-01-16 09:15',
  },
  {
    type: 'reward',
    primary: 'Reward received — BOME • $0.43',
    amountUsd: 0.43,
    tx: '7r3...nXy',
    ts: '2026-01-15 16:08',
  },
  {
    type: 'reward',
    primary: 'Reward received — WIF • $1.35',
    amountUsd: 1.35,
    tx: '9s1...oYz',
    ts: '2026-01-14 12:42',
  },
  {
    type: 'reward',
    primary: 'Reward received — WOJAK • $0.28',
    amountUsd: 0.28,
    tx: '4q9...mVw',
    ts: '2026-01-13 18:12',
  },
  {
    type: 'buy',
    primary: 'Purchased — SEAS • $320.00',
    amountUsd: 320.0,
    tx: '8j4...fPq',
    ts: '2026-01-10 11:33',
  },
];

export const mockInclusions: Inclusion[] = [
  {
    symbol: 'PHOTON',
    name: 'Photon',
    status: 'Active',
    aprImpactRange: '+0.3–0.6%',
    note: 'High-velocity Solana trading infra.',
    tag: 'Added to Inclusion List',
  },
  {
    symbol: 'DRIFT',
    name: 'Drift Protocol',
    status: 'Active',
    aprImpactRange: '+0.4–0.8%',
    note: 'Decentralized perpetuals platform.',
    tag: 'Added to Inclusion List',
  },
  {
    symbol: 'ORCA',
    name: 'Orca',
    status: 'Active',
    aprImpactRange: '+0.2–0.5%',
    note: 'Leading Solana DEX with concentrated liquidity.',
    tag: 'Added to Inclusion List',
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 12,
    title: 'Include ASSET_X in Rising Stars',
    endsIn: '2d 11h',
    forPct: 68,
    againstPct: 24,
    abstainPct: 8,
    canVote: true,
  },
];

export const mockSystemHealth: SystemHealth = {
  distribution: {
    status: 'Operational',
    meta: 'Last block: 23s ago',
  },
  feesFlow: {
    status: 'Normal',
    meta: 'Pool: $45,234 / $50,000',
  },
  rebalancing: {
    status: 'Scheduled',
    meta: 'Trigger: 4h 23m or $50K',
  },
};

export const mockAlerts: Alert[] = [
  {
    severity: 'warning',
    text: "Acquirer contract approaching trigger threshold. Pool at $45,234 / $50,000.",
    ts: 'Triggers in 4h 23m',
  },
];

export const targetWeights = {
  blue: 60,
  under: 30,
  rising: 10,
};

export const mockReferrals: Referral[] = [
  {
    address: 'danik...t92a',
    status: 'Completed',
    purchased: 10500,
    rewarded: 250,
    tx: '8h3...bKq',
    timestamp: '2025-10-28 14:22',
  },
  {
    address: 'alex...m45b',
    status: 'Completed',
    purchased: 12000,
    rewarded: 300,
    tx: '5k9...cLr',
    timestamp: '2025-10-25 09:15',
  },
  {
    address: 'maria...p78c',
    status: 'Pending',
    purchased: 8500,
    rewarded: 0,
    tx: '3m7...dNs',
    timestamp: '2025-11-02 16:45',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'reward',
    title: 'Daily Rewards Distributed',
    message: 'You received $4.08 in yield rewards. Breakdown: 88.5% direct holder distribution, 10% DEX yields, 1.5% LP fee.',
    timestamp: '2 hours ago',
    read: false,
    actionLabel: 'View Details',
    actionUrl: '#rewards',
  },
  {
    id: 'notif-2',
    type: 'governance',
    title: 'Proposal #47 Voting Ends Soon',
    message: 'Adjust WIF target allocation to 25% — Vote closes in 18 hours. Current: 76% For, 18% Against.',
    timestamp: '5 hours ago',
    read: false,
    actionLabel: 'Vote Now',
    actionUrl: '#governance',
  },
  {
    id: 'notif-3',
    type: 'inclusion',
    title: 'New Asset Added to Inclusion List',
    message: 'GRASS has been added to the Underdog Rotation tier. Expected APR impact: +0.4–0.7%.',
    timestamp: '8 hours ago',
    read: false,
    actionLabel: 'View Inclusion',
    actionUrl: '#inclusion-list',
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Rotation Window Approaching',
    message: 'Rising Stars category rebalancing scheduled in ~26h. Assets may be rotated based on performance metrics.',
    timestamp: '12 hours ago',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'announcement',
    title: 'Platform Update: Enhanced Analytics',
    message: 'New transaction history filtering and export features now available in the Reports section.',
    timestamp: '1 day ago',
    read: true,
    actionLabel: 'Learn More',
    actionUrl: '#announcements',
  },
  {
    id: 'notif-6',
    type: 'reward',
    title: 'Weekly Performance Summary',
    message: 'Your portfolio generated $28.56 in the past 7 days. Consistent with platform APR projections.',
    timestamp: '1 day ago',
    read: true,
    actionLabel: 'View Report',
    actionUrl: '#reports',
  },
  {
    id: 'notif-7',
    type: 'governance',
    title: 'Proposal #46 Passed',
    message: 'Increase treasury allocation to 10% — Passed with 82% approval. Implementation begins next epoch.',
    timestamp: '2 days ago',
    read: true,
  },
  {
    id: 'notif-8',
    type: 'inclusion',
    title: 'MEW Removed from Rotation',
    message: 'MEW has been removed from the Underdog tier due to declining liquidity metrics.',
    timestamp: '3 days ago',
    read: true,
  },
];

// Platform statistics (real data)
export const mockPlatformStats: PlatformStats = {
  marketCap: 250000000, // $250M
  priceChange24h: 2.6, // +2.6%
  liquidity: 7000000, // $7M
  totalHolders: 2560,
  activeNodes: 259, // Active nodes with 10k+ SEAS
  transactions24h: 650,
  transactionsTotal: 12068,
  totalDistributed: 62560, // $62,560
  distributionCount: 13,
  currentAPY: 34.5, // Calculated from distributions
  tvl: 7000000, // Using liquidity as TVL
};

// User node data (example states)
export const mockUserNode: UserNode = {
  seasBalance: 15420, // Has more than 10k - node active
  nodeStatus: 'active',
  earnedToday: 4.08, // Matches Overview Today's Yield
  earnedTotal: 391.77, // Matches Overview Total Earned (96 days at 34.5% APR)
  shareOfPool: 0.58, // 0.58% of total pool
  activationDate: '2025-10-15T14:22:00Z',
  yieldHistory: [
    { date: '2026-01-19T14:22:00Z', amount: 4.08, txHash: '5xR2...Kp9L' },
    { date: '2026-01-18T14:22:00Z', amount: 3.95, txHash: '3jM7...vN8Q' },
    { date: '2026-01-17T14:22:00Z', amount: 4.12, txHash: '9wP4...Hx2D' },
    { date: '2026-01-16T14:22:00Z', amount: 3.88, txHash: '7kL3...Yx5F' },
    { date: '2026-01-15T14:22:00Z', amount: 4.01, txHash: '2nQ6...Bm4T' },
    { date: '2026-01-14T14:22:00Z', amount: 4.15, txHash: '8pN2...Qr7W' },
    { date: '2026-01-13T14:22:00Z', amount: 3.82, txHash: '4mK9...Ls3P' },
    { date: '2026-01-12T14:22:00Z', amount: 3.98, txHash: '6tH5...Nv8M' },
    { date: '2026-01-11T14:22:00Z', amount: 4.18, txHash: '1rD4...Cj2X' },
    { date: '2026-01-10T14:22:00Z', amount: 3.92, txHash: '9vB7...Fp6K' },
    { date: '2026-01-09T14:22:00Z', amount: 3.86, txHash: '3wS1...Hm9R' },
    { date: '2026-01-08T14:22:00Z', amount: 4.07, txHash: '7zX3...Dt5Y' },
    { date: '2026-01-07T14:22:00Z', amount: 3.91, txHash: '2qF8...Vn4L' },
  ],
};

export const mockUserNodeInsufficient: UserNode = {
  seasBalance: 7850, // Less than 10k - node inactive
  nodeStatus: 'insufficient',
  earnedToday: 0,
  earnedTotal: 0,
  shareOfPool: 0,
};

export const mockUserNodeEmpty: UserNode = {
  seasBalance: 0, // No tokens
  nodeStatus: 'no-tokens',
  earnedToday: 0,
  earnedTotal: 0,
  shareOfPool: 0,
};

// Live rewards feed (creates FOMO effect on Overview)
export const mockLiveRewards: LiveReward[] = [
  { address: 'yuri...8f1G', amount: 24.32, timestamp: '2 min ago' },
  { address: 'alex...m45b', amount: 18.91, timestamp: '5 min ago' },
  { address: 'mari...p78c', amount: 31.17, timestamp: '8 min ago' },
  { address: 'john...k92a', amount: 15.64, timestamp: '12 min ago' },
  { address: 'sara...n34d', amount: 27.89, timestamp: '15 min ago' },
  { address: 'mike...r67f', amount: 22.45, timestamp: '18 min ago' },
  { address: 'emma...t21g', amount: 19.73, timestamp: '22 min ago' },
  { address: 'dave...w88h', amount: 33.12, timestamp: '25 min ago' },
];