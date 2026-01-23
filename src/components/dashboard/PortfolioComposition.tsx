import { Info, Loader2 } from 'lucide-react';
import { targetWeights } from '../../lib/mockData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useState, useMemo, useEffect } from 'react';
import { cardStyles } from '../../styles/cardStyles';
import { PortfolioCompositionProps, SortField, SortDirection, CompositionDataItem } from './portfolio/types';
import { NotConnectedState } from './portfolio/NotConnectedState';
import { AllocationCards } from './portfolio/AllocationCards';
import { DesktopTable } from './portfolio/DesktopTable';
import { MobileAssetCards } from './portfolio/MobileAssetCards';

export function PortfolioComposition({ assets, isConnected, isRebalancing = false, rebalancedWeights }: PortfolioCompositionProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [animatedWeights, setAnimatedWeights] = useState<{ blue: number; under: number; rising: number } | null>(null);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [hoveredHeader, setHoveredHeader] = useState<SortField | null>(null);

  // Calculate actual weights from asset data
  const actualWeights = useMemo(() => {
    const totalWeight = assets.reduce((sum, asset) => sum + asset.weightPct, 0);
    
    const blueWeight = assets
      .filter(a => a.category === 'blue')
      .reduce((sum, a) => sum + a.weightPct, 0);
    
    const underWeight = assets
      .filter(a => a.category === 'under')
      .reduce((sum, a) => sum + a.weightPct, 0);
    
    const risingWeight = assets
      .filter(a => a.category === 'rising')
      .reduce((sum, a) => sum + a.weightPct, 0);
    
    return {
      blue: totalWeight > 0 ? (blueWeight / totalWeight) * 100 : 0,
      under: totalWeight > 0 ? (underWeight / totalWeight) * 100 : 0,
      rising: totalWeight > 0 ? (risingWeight / totalWeight) * 100 : 0,
    };
  }, [assets]);

  // Animate weights when rebalancing completes
  useEffect(() => {
    if (rebalancedWeights && !isRebalancing) {
      // Start from 0
      setAnimatedWeights({ blue: 0, under: 0, rising: 0 });
      
      // Animate to target values
      const duration = 800; // 800ms animation
      const steps = 30;
      const stepDuration = duration / steps;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedWeights({
          blue: rebalancedWeights.blue * progress,
          under: rebalancedWeights.under * progress,
          rising: rebalancedWeights.rising * progress,
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedWeights(rebalancedWeights);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    } else if (!rebalancedWeights) {
      setAnimatedWeights(null);
    }
  }, [rebalancedWeights, isRebalancing]);

  // Use animated weights if available, otherwise use actual weights
  const displayWeights = animatedWeights || actualWeights;

  const compositionData: CompositionDataItem[] = [
    { 
      name: 'Blue Chips', 
      target: targetWeights.blue, 
      actual: displayWeights.blue,
      color: '#E9C774',
      category: 'blue'
    },
    { 
      name: 'Underdogs', 
      target: targetWeights.under, 
      actual: displayWeights.under,
      color: '#B44BCB',
      category: 'under'
    },
    { 
      name: 'Rising Stars', 
      target: targetWeights.rising, 
      actual: displayWeights.rising,
      color: '#4B80CB',
      category: 'rising'
    },
  ];

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

  if (!isConnected) {
    return <NotConnectedState />;
  }

  return (
    <div
      className="p-4 md:p-6 rounded-xl"
      style={cardStyles.elevated}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h2
          className="text-base md:text-lg"
          style={{
            color: 'var(--seasons-text-primary)',
            fontWeight: 600,
            lineHeight: '1.3',
          }}
        >
          Seasons Composition
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
                style={{ width: '18px', height: '18px' }}
              >
                <Info size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              style={{ maxWidth: '320px', padding: '12px' }}
            >
              <p className="text-xs mb-2" style={{ fontWeight: 600 }}>
                Portfolio Distribution Strategy
              </p>
              <p className="text-xs mb-3" style={{ color: 'var(--seasons-text-secondary)', lineHeight: '1.5' }}>
                Assets are distributed following the 6:3:1 rule:
              </p>
              <ul className="text-xs space-y-1.5" style={{ color: 'var(--seasons-text-secondary)', lineHeight: '1.5' }}>
                <li><strong style={{ color: '#E9C774' }}>Blue Chips (60%)</strong> – Established memecoins with high liquidity and market cap</li>
                <li><strong style={{ color: '#B44BCB' }}>Underdogs (30%)</strong> – Mid-tier tokens with growth potential and active communities</li>
                <li><strong style={{ color: '#4B80CB' }}>Rising Stars (10%)</strong> – Emerging tokens with high volatility and APY potential</li>
              </ul>
              <p className="text-xs mt-3" style={{ color: 'var(--seasons-text-tertiary)', lineHeight: '1.5' }}>
                This allocation balances stability with high-yield opportunities for optimal onchain returns.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Allocation Cards */}
      <AllocationCards 
        compositionData={compositionData}
        activeFilter={activeFilter}
        assets={assets}
      />

      {isRebalancing ? (
        <div className="flex flex-col items-center justify-center py-12 md:py-16">
          <div
            className="mb-4 rounded-full p-4"
            style={{
              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
            }}
          >
            <Loader2 
              size={40} 
              className="animate-spin" 
              style={{ color: '#FFFFFF' }}
            />
          </div>
          <h3
            className="mb-2"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
            }}
          >
            Rebalancing Portfolio
          </h3>
          <p
            className="text-center text-sm"
            style={{ color: 'var(--seasons-text-secondary)' }}
          >
            Optimizing asset allocation...
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <DesktopTable
            filteredAssets={filteredAssets}
            sortField={sortField}
            sortDirection={sortDirection}
            hoveredHeader={hoveredHeader}
            handleSort={handleSort}
            setHoveredHeader={setHoveredHeader}
          />

          {/* Mobile Asset Cards */}
          <MobileAssetCards filteredAssets={filteredAssets} />

          <button
            className="mt-4 hover:underline"
            style={{
              color: 'var(--seasons-text-secondary)',
              fontSize: '14px',
            }}
          >
            View all assets
          </button>
        </>
      )}
    </div>
  );
}
