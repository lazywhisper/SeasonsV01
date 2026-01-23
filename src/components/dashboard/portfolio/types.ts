import { Asset } from '../../../lib/mockData';

export interface PortfolioCompositionProps {
  assets: Asset[];
  isConnected: boolean;
  isRebalancing?: boolean;
  rebalancedWeights?: { blue: number; under: number; rising: number } | null;
}

export type SortField = 'symbol' | 'weightPct' | 'change24hPct' | 'rewards7dUsd';
export type SortDirection = 'asc' | 'desc' | null;

export interface CompositionDataItem {
  name: string;
  target: number;
  actual: number;
  color: string;
  category: 'blue' | 'under' | 'rising';
}

export interface CategoryColors {
  blue: string;
  under: string;
  rising: string;
}

export const categoryColors: CategoryColors = {
  blue: '#E9C774',
  under: '#B44BCB',
  rising: '#4B80CB',
};
