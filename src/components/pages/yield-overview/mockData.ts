import { DistributionEvent, AssetBreakdown, APYHistoryDataPoint, YieldSourceDataPoint, WeeklyDistributionDataPoint } from './types';

// Distribution events (mock timeline) - 13 events totaling $62,560
export const distributionEvents: DistributionEvent[] = [
  { id: 1, date: '2026-01-18T14:22:00Z', amount: 842.11, recipients: 259, txHash: '5xR2...Kp9L' },
  { id: 2, date: '2026-01-16T14:22:00Z', amount: 798.45, recipients: 258, txHash: '3jM7...vN8Q' },
  { id: 3, date: '2026-01-13T14:22:00Z', amount: 815.23, recipients: 256, txHash: '9wP4...Hx2D' },
  { id: 4, date: '2026-01-11T14:22:00Z', amount: 723.91, recipients: 254, txHash: '7kL3...Yx5F' },
  { id: 5, date: '2026-01-08T14:22:00Z', amount: 782.50, recipients: 251, txHash: '2nQ6...Bm4T' },
  { id: 6, date: '2026-01-06T14:22:00Z', amount: 7200.00, recipients: 248, txHash: '8pN2...Qr7W' },
  { id: 7, date: '2026-01-03T14:22:00Z', amount: 7100.00, recipients: 244, txHash: '4mK9...Ls3P' },
  { id: 8, date: '2026-01-01T14:22:00Z', amount: 7450.00, recipients: 240, txHash: '6tH5...Nv8M' },
  { id: 9, date: '2025-12-29T14:22:00Z', amount: 7650.00, recipients: 235, txHash: '1rD4...Cj2X' },
  { id: 10, date: '2025-12-27T14:22:00Z', amount: 7300.00, recipients: 230, txHash: '9vB7...Fp6K' },
  { id: 11, date: '2025-12-24T14:22:00Z', amount: 7250.00, recipients: 224, txHash: '3wS1...Hm9R' },
  { id: 12, date: '2025-12-22T14:22:00Z', amount: 7400.00, recipients: 218, txHash: '7zX3...Dt5Y' },
  { id: 13, date: '2025-12-19T14:22:00Z', amount: 7247.80, recipients: 212, txHash: '2qF8...Vn4L' },
];

// Assets breakdown
export const assetsBreakdown: AssetBreakdown[] = [
  { category: 'Blue Chips', percentage: 60, apy: '28-35%', examples: 'WIF, BONK, POPCAT' },
  { category: 'Underdogs', percentage: 30, apy: '30-38%', examples: 'BOME, PENGU, PUMP' },
  { category: 'Rising Stars', percentage: 10, apy: '35-45%', examples: 'FARTCOIN, WOJAK' },
];

// Chart 1: APY Performance History (30 days)
export const apyHistoryData: APYHistoryDataPoint[] = [
  { date: 'Dec 22', apy: 31.2 },
  { date: 'Dec 25', apy: 32.1 },
  { date: 'Dec 28', apy: 33.5 },
  { date: 'Dec 31', apy: 32.8 },
  { date: 'Jan 3', apy: 34.2 },
  { date: 'Jan 6', apy: 33.9 },
  { date: 'Jan 9', apy: 35.1 },
  { date: 'Jan 12', apy: 34.5 },
  { date: 'Jan 15', apy: 35.8 },
  { date: 'Jan 18', apy: 34.5 },
];

// Chart 2: Yield Sources Breakdown
export const yieldSourcesData: YieldSourceDataPoint[] = [
  { name: 'Buy Fee (10%)', value: 70, color: '#E9C774', amount: 43792 },
  { name: 'Sell Fee (10%)', value: 10, color: '#F27783', amount: 6256 },
  { name: 'Onchain Yield', value: 20, color: '#4B80CB', amount: 12512 },
];

// Chart 3: Weekly Distribution Trends (8 weeks)
export const weeklyDistributionData: WeeklyDistributionDataPoint[] = [
  { week: 'Week 1', amount: 0 },
  { week: 'Week 2', amount: 0 },
  { week: 'Week 3', amount: 7247.80 },
  { week: 'Week 4', amount: 14650.00 },
  { week: 'Week 5', amount: 14950.00 },
  { week: 'Week 6', amount: 14550.00 },
  { week: 'Week 7', amount: 8706.41 },
  { week: 'Week 8', amount: 2455.79 },
];
