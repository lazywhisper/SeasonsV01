import { MoreVertical, Info, TrendingUp, TrendingDown, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Asset, targetWeights } from '../../lib/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useState, useMemo, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import solanaLogo from 'figma:asset/5633c08b2dd5db21c15725009af45cc34535287a.png';

interface PortfolioCompositionProps {
  assets: Asset[];
  isConnected: boolean;
  isRebalancing?: boolean;
  rebalancedWeights?: { blue: number; under: number; rising: number } | null;
}

type SortField = 'symbol' | 'weightPct' | 'change24hPct' | 'rewards7dUsd';
type SortDirection = 'asc' | 'desc' | null;

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

  const compositionData = [
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

  const categoryColors = {
    blue: '#E9C774',
    under: '#B44BCB',
    rising: '#4B80CB',
  };

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
    return (
      <div
        className="p-4 md:p-6 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
          boxShadow: 'var(--seasons-card-shadow)',
        }}
      >
        <h2
          className="mb-4 text-base md:text-lg"
          style={{
            color: 'var(--seasons-text-primary)',
            fontWeight: 600,
            lineHeight: '1.3',
          }}
        >
          Portfolio Composition
        </h2>
        <div className="text-center py-8 md:py-12">
          <p className="text-sm" style={{ color: 'var(--seasons-text-secondary)' }}>
            No assets yet.
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--seasons-text-tertiary)' }}>
            Rewards start once your access is unlocked.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-4 md:p-6 rounded-xl"
      style={{
        background: 'var(--seasons-bg-elev)',
        border: '1px solid var(--seasons-border-hair)',
        boxShadow: 'var(--seasons-card-shadow)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4 mb-4">
        <div>
          <h2
            className="text-base md:text-lg"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
              lineHeight: '1.3',
            }}
          >
            Portfolio Auto Builder
          </h2>
        </div>

        {isRebalancing && (
          <div className="flex items-center gap-2">
            <Loader2 
              size={16} 
              className="animate-spin" 
              style={{ color: 'var(--seasons-brand-grad-mid1)' }}
            />
            <span 
              className="text-sm"
              style={{ color: 'var(--seasons-text-secondary)' }}
            >
              Rebalancing...
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile: Select dropdown */}
          <div className="md:hidden flex-1">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-xs transition-colors"
              style={{
                background: 'var(--seasons-bg-base)',
                color: 'var(--seasons-text-primary)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <option value="all">All</option>
              <option value="blue">Blue Chips</option>
              <option value="under">Underdogs</option>
              <option value="rising">Rising Stars</option>
            </select>
          </div>

          {/* Desktop: Button group */}
          <div className="hidden md:flex items-center gap-2 rounded-md" style={{ background: 'var(--seasons-bg-base)', padding: '4px' }}>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: activeFilter === 'all' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: activeFilter === 'all' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('blue')}
              className="px-3 py-1 rounded transition-colors hover:bg-white/5"
              style={{
                fontSize: '11px',
                color: activeFilter === 'blue' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: activeFilter === 'blue' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              Blue Chips
            </button>
            <button
              onClick={() => setActiveFilter('under')}
              className="px-3 py-1 rounded transition-colors hover:bg-white/5"
              style={{
                fontSize: '11px',
                color: activeFilter === 'under' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: activeFilter === 'under' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              Underdogs
            </button>
            <button
              onClick={() => setActiveFilter('rising')}
              className="px-3 py-1 rounded transition-colors hover:bg-white/5"
              style={{
                fontSize: '11px',
                color: activeFilter === 'rising' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: activeFilter === 'rising' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              Rising Stars
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 hover:bg-white/5 rounded transition-colors flex-shrink-0"
                aria-label="More options"
              >
                <MoreVertical size={18} style={{ color: 'var(--seasons-text-tertiary)' }} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              style={{
                background: 'var(--seasons-bg-elev)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <DropdownMenuItem style={{ color: 'var(--seasons-text-secondary)' }}>
                Download CSV
              </DropdownMenuItem>
              <DropdownMenuItem style={{ color: 'var(--seasons-text-secondary)' }}>
                Copy values
              </DropdownMenuItem>
              <DropdownMenuItem style={{ color: 'var(--seasons-text-secondary)' }}>
                View details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Allocation Cards */}
      <div className={activeFilter === 'all' ? 'grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6' : 'space-y-3 md:space-y-4 mb-6'}>
        {compositionData
          .filter(item => activeFilter === 'all' || item.category === activeFilter)
          .map((item) => {
            const delta = item.actual - item.target;
            const isBalanced = Math.abs(delta) <= 2;
            const isOverweight = delta > 2;
            
            return (
              <div
                key={item.name}
                className="p-3 md:p-4 rounded-lg"
                style={{
                  background: 'var(--seasons-bg-card)',
                  border: '1px solid var(--seasons-border-hair)',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span 
                      className="text-xs md:text-sm"
                      style={{ 
                        color: 'var(--seasons-text-primary)', 
                        fontWeight: 600 
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                  
                  {/* Badge above progress bar */}
                  {!isBalanced && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded"
                            style={{
                              background: isOverweight 
                                ? 'rgba(242, 119, 131, 0.08)' 
                                : 'rgba(96, 211, 148, 0.08)',
                              fontSize: '10px',
                              fontWeight: 600,
                              color: isOverweight 
                                ? 'var(--seasons-brand-grad-mid1)' 
                                : 'var(--seasons-success)',
                            }}
                          >
                            {isOverweight ? (
                              <TrendingUp size={10} />
                            ) : (
                              <TrendingDown size={10} />
                            )}
                            {Math.abs(delta).toFixed(1)}%
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {isOverweight ? 'Overweight' : 'Underweight'} by {Math.abs(delta).toFixed(1)}%
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 rounded-full overflow-hidden mb-2 md:mb-3" style={{ background: 'var(--seasons-bg-progress)' }}>
                  {/* Target marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 z-10"
                    style={{
                      left: `${item.target}%`,
                      background: 'var(--seasons-text-tertiary)',
                    }}
                  />
                  {/* Actual fill */}
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min(item.actual, 100)}%`,
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                    }}
                  />
                </div>

                {/* Footer with asset count and percentages */}
                <div className="flex items-center justify-between">
                  <div 
                    className="text-[10px]"
                    style={{ 
                      color: 'var(--seasons-text-tertiary)' 
                    }}
                  >
                    {assets.filter(a => a.category === item.category).length} assets
                  </div>
                  
                  <div className="text-right">
                    <div 
                      className="text-sm md:text-base"
                      style={{ 
                        fontWeight: 700,
                        color: 'var(--seasons-text-primary)'
                      }}
                    >
                      {item.actual.toFixed(1)}%
                    </div>
                    <div 
                      className="text-[10px]"
                      style={{ 
                        color: 'var(--seasons-text-tertiary)' 
                      }}
                    >
                      target {item.target}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <p
        className="text-center mb-6"
        style={{
          color: 'var(--seasons-text-tertiary)',
          fontSize: '11px',
        }}
      >
        Targets are guidelines; live weights fluctuate via rotation.
      </p>

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
          {/* Asset table - Desktop */}
          <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--seasons-border-hair)',
              }}
            >
              <th
                className="text-left pb-3 pl-3 text-xs cursor-pointer select-none group relative"
                style={{
                  color: sortField === 'symbol' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-tertiary)',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
                onClick={() => handleSort('symbol')}
                onMouseEnter={() => setHoveredHeader('symbol')}
                onMouseLeave={() => setHoveredHeader(null)}
              >
                <div className="inline-flex items-center gap-1.5 py-1 px-2 -ml-2 rounded-md transition-all duration-200"
                  style={{
                    background: sortField === 'symbol' || hoveredHeader === 'symbol' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'transparent',
                  }}
                >
                  Asset
                  {sortField === 'symbol' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp 
                        size={13} 
                        className="transition-all duration-200"
                        style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
                      />
                    ) : (
                      <ArrowDown 
                        size={13}
                        className="transition-all duration-200"
                        style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
                      />
                    )
                  ) : (
                    <ArrowUpDown 
                      size={13} 
                      className="transition-all duration-200"
                      style={{ 
                        opacity: hoveredHeader === 'symbol' ? 0.6 : 0.25 
                      }} 
                    />
                  )}
                </div>
              </th>
              <th
                className="text-right pb-3 px-3 text-xs cursor-pointer select-none group"
                style={{
                  color: sortField === 'weightPct' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-tertiary)',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
                onClick={() => handleSort('weightPct')}
                onMouseEnter={() => setHoveredHeader('weightPct')}
                onMouseLeave={() => setHoveredHeader(null)}
              >
                <div className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md transition-all duration-200"
                  style={{
                    background: sortField === 'weightPct' || hoveredHeader === 'weightPct' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'transparent',
                  }}
                >
                  Weight
                  {sortField === 'weightPct' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp 
                        size={13}
                        className="transition-all duration-200"
                        style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
                      />
                    ) : (
                      <ArrowDown 
                        size={13}
                        className="transition-all duration-200"
                        style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
                      />
                    )
                  ) : (
                    <ArrowUpDown 
                      size={13}
                      className="transition-all duration-200"
                      style={{ 
                        opacity: hoveredHeader === 'weightPct' ? 0.6 : 0.25 
                      }} 
                    />
                  )}
                </div>
              </th>
              <th
                className="text-right pb-3 px-3 text-xs cursor-pointer select-none group"
                style={{
                  color: sortField === 'change24hPct' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-tertiary)',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
                onClick={() => handleSort('change24hPct')}
                onMouseEnter={() => setHoveredHeader('change24hPct')}
                onMouseLeave={() => setHoveredHeader(null)}
              >
                <div className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md transition-all duration-200"
                  style={{
                    background: sortField === 'change24hPct' || hoveredHeader === 'change24hPct' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'transparent',
                  }}
                >
                  24h
                  {sortField === 'change24hPct' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp 
                        size={13}
                        className="transition-all duration-200"
                        style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
                      />
                    ) : (
                      <ArrowDown 
                        size={13}
                        className="transition-all duration-200"
                        style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
                      />
                    )
                  ) : (
                    <ArrowUpDown 
                      size={13}
                      className="transition-all duration-200"
                      style={{ 
                        opacity: hoveredHeader === 'change24hPct' ? 0.6 : 0.25 
                      }} 
                    />
                  )}
                </div>
              </th>
              <th
                className="text-right pb-3 px-3 text-xs"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontWeight: 600,
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="inline-flex items-center gap-1.5">
                        Est. APR
                        <Info size={11} style={{ opacity: 0.5 }} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Indicative, derived from recent platform flows.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </th>
              <th
                className="text-right pb-3 pr-3 text-xs cursor-pointer select-none group"
                style={{
                  color: sortField === 'rewards7dUsd' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-tertiary)',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
                onClick={() => handleSort('rewards7dUsd')}
                onMouseEnter={() => setHoveredHeader('rewards7dUsd')}
                onMouseLeave={() => setHoveredHeader(null)}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md transition-all duration-200"
                        style={{
                          background: sortField === 'rewards7dUsd' || hoveredHeader === 'rewards7dUsd' 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'transparent',
                        }}
                      >
                        Rewards (7d)
                        <Info size={11} style={{ opacity: 0.5 }} />
                        {sortField === 'rewards7dUsd' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp 
                              size={13}
                              className="transition-all duration-200"
                              style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
                            />
                          ) : (
                            <ArrowDown 
                              size={13}
                              className="transition-all duration-200"
                              style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
                            />
                          )
                        ) : (
                          <ArrowUpDown 
                            size={13}
                            className="transition-all duration-200"
                            style={{ 
                              opacity: hoveredHeader === 'rewards7dUsd' ? 0.6 : 0.25 
                            }} 
                          />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Sum of rewards received in the last 7 days.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, idx) => (
              <tr
                key={idx}
                className="group hover:bg-white/[0.02] transition-colors duration-150"
                style={{
                  borderBottom: '1px solid var(--seasons-border-hair)',
                }}
              >
                <td className="py-3.5 pl-3">
                  <div className="flex items-center gap-3">
                    {asset.logo && (
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <ImageWithFallback
                          src={asset.logo}
                          alt={asset.symbol}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <img
                          src={solanaLogo}
                          alt="Solana"
                          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-[var(--seasons-bg-elev)]"
                          style={{ transform: 'translate(25%, 25%)' }}
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: categoryColors[asset.category] }}
                      />
                      <span 
                        className="text-sm transition-colors duration-150" 
                        style={{ 
                          color: 'var(--seasons-text-primary)',
                          fontWeight: 500,
                        }}
                      >
                        {asset.symbol}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-3.5 px-3 text-right text-sm transition-colors duration-150"
                  style={{ 
                    color: 'var(--seasons-text-primary)',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {asset.weightPct}%
                </td>
                <td
                  className="py-3.5 px-3 text-right text-sm transition-colors duration-150"
                  style={{
                    color: asset.change24hPct > 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {asset.change24hPct > 0 ? '+' : ''}{asset.change24hPct}%
                </td>
                <td
                  className="py-3.5 px-3 text-right text-sm transition-colors duration-150"
                  style={{ 
                    color: 'var(--seasons-text-secondary)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {asset.aprRange}
                </td>
                <td
                  className="py-3.5 pr-3 text-right text-sm transition-colors duration-150"
                  style={{ 
                    color: 'var(--seasons-text-primary)',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  ${asset.rewards7dUsd.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Asset list - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredAssets.map((asset, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3 mb-2">
              {asset.logo && (
                <div className="relative w-10 h-10 flex-shrink-0">
                  <ImageWithFallback
                    src={asset.logo}
                    alt={asset.symbol}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <img
                    src={solanaLogo}
                    alt="Solana"
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                    style={{ transform: 'translate(25%, 25%)' }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: categoryColors[asset.category] }}
                  />
                  <span className="text-sm" style={{ color: 'var(--seasons-text-primary)', fontWeight: 600 }}>
                    {asset.symbol}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span style={{ color: 'var(--seasons-text-secondary)' }}>
                    {asset.weightPct}%
                  </span>
                  <span
                    style={{
                      color: asset.change24hPct > 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
                    }}
                  >
                    {asset.change24hPct > 0 ? '+' : ''}{asset.change24hPct}%
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs mb-1" style={{ color: 'var(--seasons-text-tertiary)' }}>
                  APR
                </div>
                <div className="text-sm" style={{ color: 'var(--seasons-text-secondary)' }}>
                  {asset.aprRange}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--seasons-border-hair)' }}>
              <span className="text-xs" style={{ color: 'var(--seasons-text-tertiary)' }}>
                7d Rewards
              </span>
              <span className="text-sm" style={{ color: 'var(--seasons-text-primary)', fontWeight: 600 }}>
                ${asset.rewards7dUsd.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

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