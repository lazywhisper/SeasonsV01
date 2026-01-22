import { MoreVertical, Info, TrendingUp, TrendingDown, ArrowUpDown, ArrowUp, ArrowDown, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
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
import { useState, useMemo } from 'react';
import { assets as assetsData } from '../../lib/assetsData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import bonkLogo from 'figma:asset/cabe639e074a7696ad20c8b76102cc7130648803.png';
import wifLogo from 'figma:asset/695464c4e114211df8930e790b5f1354e020512b.png';
import bomeLogo from 'figma:asset/20c435324588bbe92e12f44c7c4d551976978e97.png';
import penguLogo from 'figma:asset/11dd47e096a75ab72a7e500bcdba8d0d4772e45b.png';
import pumpLogo from 'figma:asset/ddd88100b8deee6a95274199e1863ad145297565.png';
import fartcoinLogo from 'figma:asset/501ffda46bf5d1c0917ca63d14c5b266867ac2e7.png';
import wojakLogo from 'figma:asset/4473a63568169da525a90ec8727cf26b6ee11add.png';
import jbmbLogo from 'figma:asset/5f7d06d332fd284477eac1ceb01e315d9b508091.png';
import solanaLogo from 'figma:asset/5633c08b2dd5db21c15725009af45cc34535287a.png';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

// Asset yield data with realistic APY ranges, 7-day accruals, and USD values
const assetYieldData: Record<string, { apyRange: string; accrued7d: number; valueUsd7d: number }> = {
  'WIF': { apyRange: '9–15%', accrued7d: 10.45, valueUsd7d: 198.60 },
  'BONK': { apyRange: '8–14%', accrued7d: 11.89, valueUsd7d: 245.80 },
  'PENGU': { apyRange: '11–17%', accrued7d: 8.91, valueUsd7d: 134.20 },
  'FARTCOIN': { apyRange: '28–38%', accrued7d: 15.54, valueUsd7d: 189.30 },
  'JBMB': { apyRange: '23–31%', accrued7d: 22.15, valueUsd7d: 68.90 },
};

type SortField = 'symbol' | 'allocation' | 'change24h' | 'marketCap';
type SortDirection = 'asc' | 'desc' | null;

// Map categories from assetsData to match the filter values
const categoryMap = {
  'blue-chip': 'blue',
  'underdog': 'under',
  'rising-star': 'rising',
};

// Map asset symbols to their logos
const logoMap: Record<string, string> = {
  'WIF': wifLogo,
  'BONK': bonkLogo,
  'PENGU': penguLogo,
  'FARTCOIN': fartcoinLogo,
  'JBMB': jbmbLogo,
};

export function PortfolioBuilder() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [hoveredHeader, setHoveredHeader] = useState<SortField | null>(null);

  // Calculate actual weights from asset allocation
  const actualWeights = useMemo(() => {
    const blueWeight = assetsData
      .filter(a => a.category === 'blue-chip')
      .reduce((sum, asset) => sum + asset.allocation, 0);
    
    const underWeight = assetsData
      .filter(a => a.category === 'underdog')
      .reduce((sum, asset) => sum + asset.allocation, 0);
    
    const risingWeight = assetsData
      .filter(a => a.category === 'rising-star')
      .reduce((sum, asset) => sum + asset.allocation, 0);
    
    return {
      blue: blueWeight,
      under: underWeight,
      rising: risingWeight,
    };
  }, []);

  const targetWeights = {
    blue: 60,
    under: 30,
    rising: 10,
  };

  const compositionData = [
    { 
      name: 'Blue Chips', 
      target: targetWeights.blue, 
      actual: actualWeights.blue,
      color: '#E9C774',
      category: 'blue'
    },
    { 
      name: 'Underdogs', 
      target: targetWeights.under, 
      actual: actualWeights.under,
      color: '#B44BCB',
      category: 'under'
    },
    { 
      name: 'Rising Stars', 
      target: targetWeights.rising, 
      actual: actualWeights.rising,
      color: '#4B80CB',
      category: 'rising'
    },
  ];

  const categoryColors = {
    'blue-chip': '#E9C774',
    'underdog': '#B44BCB',
    'rising-star': '#4B80CB',
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
      ? assetsData 
      : assetsData.filter(asset => categoryMap[asset.category] === activeFilter);

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
  }, [activeFilter, sortField, sortDirection]);

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
                    {assetsData.filter(a => categoryMap[a.category] === item.category).length} assets
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
                  color: sortField === 'allocation' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-tertiary)',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
                onClick={() => handleSort('allocation')}
                onMouseEnter={() => setHoveredHeader('allocation')}
                onMouseLeave={() => setHoveredHeader(null)}
              >
                <div className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md transition-all duration-200"
                  style={{
                    background: sortField === 'allocation' || hoveredHeader === 'allocation' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'transparent',
                  }}
                >
                  Weight
                  {sortField === 'allocation' ? (
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
                        opacity: hoveredHeader === 'allocation' ? 0.6 : 0.25 
                      }} 
                    />
                  )}
                </div>
              </th>
              <th
                className="text-right pb-3 px-3 text-xs cursor-pointer select-none group"
                style={{
                  color: sortField === 'change24h' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-tertiary)',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
                onClick={() => handleSort('change24h')}
                onMouseEnter={() => setHoveredHeader('change24h')}
                onMouseLeave={() => setHoveredHeader(null)}
              >
                <div className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md transition-all duration-200"
                  style={{
                    background: sortField === 'change24h' || hoveredHeader === 'change24h' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'transparent',
                  }}
                >
                  24h
                  {sortField === 'change24h' ? (
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
                        opacity: hoveredHeader === 'change24h' ? 0.6 : 0.25 
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
                        Accrued (7d)
                        <Info size={11} style={{ opacity: 0.5 }} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Total yield accrued over the last 7 days.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                        Value (7d)
                        <Info size={11} style={{ opacity: 0.5 }} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">USD value earned from this asset in the last 7 days.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </th>
              <th
                className="text-right pb-3 pr-3 text-xs"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontWeight: 600,
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="inline-flex items-center gap-1.5">
                        Market Cap
                        <Info size={11} style={{ opacity: 0.5 }} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Total market capitalization.</p>
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
                    {logoMap[asset.symbol] && (
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <ImageWithFallback
                          src={logoMap[asset.symbol]}
                          alt={asset.symbol}
                          className="w-8 h-8 rounded-md object-cover"
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
                  {asset.allocation}%
                </td>
                <td
                  className="py-3.5 px-3 text-right text-sm transition-colors duration-150"
                  style={{
                    color: (asset.change24h || 0) > 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {(asset.change24h || 0) > 0 ? '+' : ''}{(asset.change24h || 0).toFixed(1)}%
                </td>
                <td
                  className="py-3.5 px-3 text-right text-sm transition-colors duration-150"
                  style={{ 
                    color: 'var(--seasons-text-secondary)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {assetYieldData[asset.symbol]?.accrued7d ? `${assetYieldData[asset.symbol]?.accrued7d.toFixed(2)}%` : 'N/A'}
                </td>
                <td
                  className="py-3.5 px-3 text-right text-sm transition-colors duration-150"
                  style={{ 
                    color: 'var(--seasons-text-secondary)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {assetYieldData[asset.symbol]?.valueUsd7d ? `$${assetYieldData[asset.symbol]?.valueUsd7d.toFixed(2)}` : 'N/A'}
                </td>
                <td
                  className="py-3.5 pr-3 text-right text-sm transition-colors duration-150"
                  style={{ 
                    color: 'var(--seasons-text-primary)',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {asset.marketCap || 'N/A'}
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
              {logoMap[asset.symbol] && (
                <div className="relative w-10 h-10 flex-shrink-0">
                  <ImageWithFallback
                    src={logoMap[asset.symbol]}
                    alt={asset.symbol}
                    className="w-10 h-10 rounded-md object-cover"
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
                    {asset.allocation}%
                  </span>
                  <span
                    style={{
                      color: (asset.change24h || 0) > 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
                    }}
                  >
                    {(asset.change24h || 0) > 0 ? '+' : ''}{(asset.change24h || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs mb-1" style={{ color: 'var(--seasons-text-tertiary)' }}>
                  APY
                </div>
                <div className="text-sm" style={{ color: 'var(--seasons-text-secondary)' }}>
                  {assetYieldData[asset.symbol]?.apyRange || 'N/A'}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2" style={{ borderTop: '1px solid var(--seasons-border-hair)' }}>
              <div>
                <span className="text-xs block mb-0.5" style={{ color: 'var(--seasons-text-tertiary)' }}>
                  Accrued (7d)
                </span>
                <span className="text-sm" style={{ color: 'var(--seasons-text-secondary)', fontWeight: 600 }}>
                  {assetYieldData[asset.symbol]?.accrued7d ? `${assetYieldData[asset.symbol]?.accrued7d.toFixed(2)}%` : 'N/A'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs block mb-0.5" style={{ color: 'var(--seasons-text-tertiary)' }}>
                  Value (7d)
                </span>
                <span className="text-sm" style={{ color: 'var(--seasons-text-secondary)', fontWeight: 600 }}>
                  {assetYieldData[asset.symbol]?.valueUsd7d ? `$${assetYieldData[asset.symbol]?.valueUsd7d.toFixed(2)}` : 'N/A'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs block mb-0.5" style={{ color: 'var(--seasons-text-tertiary)' }}>
                  Market Cap
                </span>
                <span className="text-sm" style={{ color: 'var(--seasons-text-primary)', fontWeight: 600 }}>
                  {asset.marketCap || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}