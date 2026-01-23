import { useState, useMemo } from 'react';
import type { Asset } from '../lib/mockData';

type SortField = 'symbol' | 'weightPct' | 'change24hPct' | 'rewards7dUsd';
type SortDirection = 'asc' | 'desc' | null;

/**
 * Custom hook for managing portfolio sorting logic
 * Extracts complex sorting state from component
 */
export function usePortfolioSort(assets: Asset[], activeFilter: string) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [hoveredHeader, setHoveredHeader] = useState<SortField | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAssets = useMemo(() => {
    let filtered = activeFilter === 'all' 
      ? assets 
      : assets.filter(asset => asset.category === activeFilter);

    // Apply sorting
    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Handle string comparison for symbol
        if (sortField === 'symbol') {
          aValue = aValue.toString().toLowerCase();
          bValue = bValue.toString().toLowerCase();
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Handle numeric comparison
        const numA = Number(aValue);
        const numB = Number(bValue);
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      });
    }

    return filtered;
  }, [assets, activeFilter, sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    hoveredHeader,
    setHoveredHeader,
    handleSort,
    filteredAssets,
  };
}
