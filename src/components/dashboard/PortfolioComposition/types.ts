/**
 * Type definitions for Portfolio Composition components
 */

export type SortField = 'symbol' | 'weightPct' | 'change24hPct' | 'rewards7dUsd';
export type SortDirection = 'asc' | 'desc' | null;

export interface CompositionCategory {
  name: string;
  target: number;
  actual: number;
  color: string;
  category: string;
}

export interface CategoryWeights {
  blue: number;
  under: number;
  rising: number;
}

export interface LogoMap {
  [key: string]: string;
}
