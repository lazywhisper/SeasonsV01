export interface DistributionEvent {
  id: number;
  date: string;
  amount: number;
  recipients: number;
  txHash: string;
}

export interface AssetBreakdown {
  category: string;
  percentage: number;
  apy: string;
  examples: string;
}

export interface APYHistoryDataPoint {
  date: string;
  apy: number;
}

export interface YieldSourceDataPoint {
  name: string;
  value: number;
  color: string;
  amount: number;
}

export interface WeeklyDistributionDataPoint {
  week: string;
  amount: number;
}

export interface YieldOverviewPageProps {
  isConnected: boolean;
}
