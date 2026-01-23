import { ArrowUpDown, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { formatters } from '../../../utils/formatters';
import { Asset } from '../../../lib/mockData';
import { SortField, SortDirection, categoryColors } from './types';

interface DesktopTableProps {
  filteredAssets: Asset[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  hoveredHeader: SortField | null;
  handleSort: (field: SortField) => void;
  setHoveredHeader: (field: SortField | null) => void;
}

export function DesktopTable({
  filteredAssets,
  sortField,
  sortDirection,
  hoveredHeader,
  handleSort,
  setHoveredHeader,
}: DesktopTableProps) {
  return (
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
                    <div className="inline-flex items-center gap-1 py-1 px-2 cursor-help">
                      APY Range
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
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: categoryColors[asset.category] }}
                    />
                    <span
                      className="text-sm transition-colors duration-150"
                      style={{
                        color: 'var(--seasons-text-primary)',
                        fontWeight: 600,
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
                {formatters.currency(asset.rewards7dUsd, 2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
