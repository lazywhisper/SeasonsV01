import { 
  MoreVertical, 
  Info, 
  Wallet, 
  TrendingUp, 
  Gauge, 
  Droplets, 
  Shield, 
  Zap,
  BarChart3,
  Clock,
  Activity,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { WalletSummary } from '../../lib/mockData';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { useState } from 'react';

interface HeroYieldSummaryProps {
  data?: WalletSummary;
  isLoading?: boolean;
  isConnected: boolean;
  onBuySeas: () => void;
}

export function HeroYieldSummary({ data, isLoading, isConnected, onBuySeas }: HeroYieldSummaryProps) {
  const [hoverBuySeas, setHoverBuySeas] = useState(false);

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
        <div className="text-center py-8 md:py-12">
          <h3
            className="mb-2 text-base md:text-lg"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
            }}
          >
            Access locked
          </h3>
          <p
            className="mb-4 text-sm"
            style={{
              color: 'var(--seasons-text-secondary)',
            }}
          >
            Hold 10,000+ $SEAS to unlock your yield dashboard.
          </p>
          <Button
            onClick={onBuySeas}
            onMouseEnter={() => setHoverBuySeas(true)}
            onMouseLeave={() => setHoverBuySeas(false)}
            className="relative overflow-hidden text-sm md:text-base"
            style={{
              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              color: '#FFFFFF',
              border: 'none',
            }}
          >
            <span
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                opacity: hoverBuySeas ? 1 : 0,
                transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            <span className="relative z-10">Buy $SEAS</span>
          </Button>
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
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div>
          <h2
            className="text-base md:text-lg"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
              lineHeight: '1.3',
            }}
          >
            Overview
          </h2>
          <p
            className="text-xs mt-1"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            Live rewards and performance metrics
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-1 hover:bg-white/5 rounded transition-colors"
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

      {/* Key metrics */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ minWidth: 0 }}>
              <Skeleton className="h-12 w-40 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
          {/* Total Portfolio Value */}
          <div 
            className="p-4 md:p-5 rounded-lg"
            style={{ 
              minWidth: 0,
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.08), rgba(242, 119, 131, 0.08))',
                }}
              >
                <Wallet size={14} style={{ color: 'var(--seasons-brand-grad-start)' }} />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="text-[10px] md:text-[11px] cursor-help"
                      style={{
                        color: 'var(--seasons-text-tertiary)',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Total Portfolio
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Value of your $SEAS tokens plus accumulated yield rewards (WIF, BONK, etc.).
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div
              className="text-2xl md:text-[36px]"
              style={{
                color: 'var(--seasons-text-primary)',
                lineHeight: '1.2',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              ${data?.portfolioUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            
            <div
              className="text-[10px] md:text-[11px]"
              style={{
                color: 'var(--seasons-text-tertiary)',
                marginBottom: '8px',
              }}
            >
              Across SEAS & distributed assets
            </div>
            
            {/* Mini Sparkline */}
            <Separator className="my-2 md:my-4" style={{ backgroundColor: 'var(--seasons-border-hair)' }} />
            
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
              <div
                className="inline-flex items-center gap-1 px-1.5 md:px-2 py-1 rounded text-[10px] md:text-[11px]"
                style={{
                  background: data && data.delta24hPct > 0 ? 'rgba(96, 211, 148, 0.08)' : 'rgba(255, 122, 122, 0.08)',
                  color: data && data.delta24hPct > 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
                  fontWeight: 600,
                }}
              >
                <TrendingUp size={10} />
                {data && data.delta24hPct > 0 ? '+' : ''}{data?.delta24hPct}% 24h
              </div>
              <div
                className="inline-flex items-center gap-1 px-1.5 md:px-2 py-1 rounded text-[9px] md:text-[10px]"
                style={{
                  background: 'rgba(75, 128, 203, 0.08)',
                  color: 'var(--seasons-brand-grad-end)',
                  fontWeight: 500,
                }}
              >
                <Droplets size={9} />
                Liquidity {data?.liquidityPct}%
              </div>
            </div>
          </div>

          {/* Latest Reward */}
          <div 
            className="p-4 md:p-5 rounded-lg"
            style={{ 
              minWidth: 0,
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.08), rgba(75, 128, 203, 0.08))',
                }}
              >
                <Zap size={14} style={{ color: 'var(--seasons-success)' }} />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="text-[10px] md:text-[11px] cursor-help"
                      style={{
                        color: 'var(--seasons-text-tertiary)',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Latest Reward
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Most recent yield distribution to your wallet
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div
              className="text-2xl md:text-[36px]"
              style={{
                color: 'var(--seasons-text-primary)',
                lineHeight: '1.2',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              ${data?.todaysYieldUsd.toFixed(2)}
            </div>
            
            <div
              className="text-[10px] md:text-[11px]"
              style={{
                color: 'var(--seasons-text-tertiary)',
                marginBottom: '6px',
              }}
            >
              Auto-distributed to your wallet
            </div>
            
            <div
              className="p-2 rounded mb-2 md:mb-3"
              style={{
                background: 'rgba(96, 211, 148, 0.06)',
                border: '1px solid rgba(96, 211, 148, 0.1)',
              }}
            >
              <div
                className="text-[9px] md:text-[10px]"
                style={{
                  color: 'var(--seasons-text-secondary)',
                  marginBottom: '2px',
                  opacity: 0.7,
                }}
              >
                Total Earned
              </div>
              <div
                className="text-xs md:text-sm"
                style={{
                  color: 'var(--seasons-success)',
                  fontWeight: 600,
                }}
              >
                ${data?.totalEarnedUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            
            <div
              className="inline-flex items-center gap-1 px-1.5 md:px-2 py-1 rounded text-[9px] md:text-[10px]"
              style={{
                background: 'rgba(182, 188, 198, 0.06)',
                color: 'var(--seasons-text-tertiary)',
              }}
            >
              <Activity size={9} />
              Updated now
            </div>
          </div>

          {/* Real-Time Yield Rate */}
          <div 
            className="p-4 md:p-5 rounded-lg"
            style={{ 
              minWidth: 0,
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, rgba(180, 75, 203, 0.08), rgba(75, 128, 203, 0.08))',
                }}
              >
                <Gauge size={14} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      <div
                        className="text-[10px] md:text-[11px]"
                        style={{
                          color: 'var(--seasons-text-tertiary)',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                        }}
                      >
                        APR Rate
                      </div>
                      <Info size={10} style={{ color: 'var(--seasons-text-tertiary)', opacity: 0.5 }} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      APR is indicative; rewards stream continuously.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div
              className="text-2xl md:text-[36px]"
              style={{
                color: 'var(--seasons-text-primary)',
                lineHeight: '1.2',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              {data?.aprEstimatePct}% 
              <span className="text-sm md:text-base" style={{ color: 'var(--seasons-text-tertiary)', marginLeft: '4px' }}>
                APR
              </span>
            </div>
            
            <div
              className="text-[10px] md:text-[11px]"
              style={{
                color: 'var(--seasons-text-tertiary)',
                marginBottom: '8px',
              }}
            >
              Based on last 7 days
            </div>
            
            <div className="space-y-1.5 md:space-y-2">
              <div 
                className="flex items-center justify-between p-1.5 md:p-2 rounded"
                style={{
                  background: 'rgba(96, 211, 148, 0.06)',
                }}
              >
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Shield size={10} style={{ color: 'var(--seasons-success)' }} />
                  <span className="text-[9px] md:text-[10px]" style={{ color: 'var(--seasons-text-secondary)' }}>
                    Stability
                  </span>
                </div>
                <span className="text-[10px] md:text-[11px]" style={{ color: 'var(--seasons-text-primary)', fontWeight: 600 }}>
                  {data?.stabilityPct}%
                </span>
              </div>
              
              <div 
                className="flex items-center justify-between p-1.5 md:p-2 rounded"
                style={{
                  background: 'rgba(75, 128, 203, 0.06)',
                }}
              >
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Zap size={10} style={{ color: 'var(--seasons-brand-grad-end)' }} />
                  <span className="text-[9px] md:text-[10px]" style={{ color: 'var(--seasons-text-secondary)' }}>
                    Uptime
                  </span>
                </div>
                <span className="text-[10px] md:text-[11px]" style={{ color: 'var(--seasons-text-primary)', fontWeight: 600 }}>
                  {data?.distributionUptimePct}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform Metrics */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4"
      >
        <div 
          className="p-3 md:p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
            <TrendingUp size={12} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
            <span className="text-[9px] md:text-[10px]" style={{ color: 'var(--seasons-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pool Status
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg md:text-xl" style={{ fontWeight: 700, color: 'var(--seasons-text-primary)' }}>
              $45.2K
            </span>
            <span className="text-[9px] md:text-[10px]" style={{ color: 'var(--seasons-text-tertiary)' }}>
              / $50K
            </span>
          </div>
        </div>
        
        <div 
          className="p-3 md:p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
            <Activity size={12} style={{ color: 'var(--seasons-brand-grad-end)' }} />
            <span className="text-[9px] md:text-[10px]" style={{ color: 'var(--seasons-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Velocity
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg md:text-xl" style={{ fontWeight: 700, color: 'var(--seasons-text-primary)' }}>
              {data?.velocity}x
            </span>
          </div>
        </div>
        
        <div 
          className="p-3 md:p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
            <Clock size={12} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
            <span className="text-[9px] md:text-[10px]" style={{ color: 'var(--seasons-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Next Trigger
            </span>
          </div>
          <div className="text-xs md:text-sm" style={{ fontWeight: 600, color: 'var(--seasons-text-secondary)' }}>
            {data?.nextRebalance}
          </div>
        </div>
      </div>

    </div>
  );
}