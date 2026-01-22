import { DollarSign, Droplets, TrendingUp, BarChart3, Activity, Receipt } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface TokenInfoPanelProps {
  marketCap: number;
  liquidity: number;
  price: number;
  change24h: number;
  txs24h: number;
  totalTxs: number;
  isConnected: boolean;
}

export function TokenInfoPanel({ 
  marketCap, 
  liquidity, 
  price, 
  change24h, 
  txs24h, 
  totalTxs,
  isConnected 
}: TokenInfoPanelProps) {
  if (!isConnected) {
    return null;
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
      <div className="mb-4 md:mb-5">
        <h2
          className="text-base md:text-lg"
          style={{
            color: 'var(--seasons-text-primary)',
            fontWeight: 600,
            lineHeight: '1.3',
          }}
        >
          $SEAS Token
        </h2>
        <p
          className="text-xs mt-1"
          style={{
            color: 'var(--seasons-text-tertiary)',
          }}
        >
          Live token metrics and activity
        </p>
      </div>

      {/* Top Row - Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Market Cap */}
        <div
          className="p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="flex items-center justify-center"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.12), rgba(242, 119, 131, 0.12))',
              }}
            >
              <BarChart3 size={16} style={{ color: 'var(--seasons-brand-grad-start)' }} />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="text-[11px] cursor-help uppercase"
                    style={{
                      color: 'var(--seasons-text-tertiary)',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Market Cap
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Total market capitalization of $SEAS token
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div
            className="text-3xl md:text-4xl mb-2"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              fontFeatureSettings: '"tnum" 1',
              lineHeight: '1.2',
            }}
          >
            ${(marketCap / 1000000).toFixed(1)}M
          </div>

          <div
            className="text-[11px]"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            Fully diluted
          </div>
        </div>

        {/* Liquidity */}
        <div
          className="p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="flex items-center justify-center"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(75, 128, 203, 0.12), rgba(180, 75, 203, 0.12))',
              }}
            >
              <Droplets size={16} style={{ color: 'var(--seasons-brand-grad-end)' }} />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="text-[11px] cursor-help uppercase"
                    style={{
                      color: 'var(--seasons-text-tertiary)',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Liquidity
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Total liquidity locked in DEX pools
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div
            className="text-3xl md:text-4xl mb-2"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              fontFeatureSettings: '"tnum" 1',
              lineHeight: '1.2',
            }}
          >
            ${(liquidity / 1000000).toFixed(1)}M
          </div>

          <div
            className="text-[11px]"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            DEX pools
          </div>
        </div>

        {/* Price */}
        <div
          className="p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="flex items-center justify-center"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.12), rgba(75, 128, 203, 0.12))',
              }}
            >
              <DollarSign size={16} style={{ color: 'var(--seasons-success)' }} />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="text-[11px] cursor-help uppercase"
                    style={{
                      color: 'var(--seasons-text-tertiary)',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Price
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Current $SEAS token price
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div
            className="text-3xl md:text-4xl mb-2"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              fontFeatureSettings: '"tnum" 1',
              lineHeight: '1.2',
            }}
          >
            ${price.toFixed(2)}
          </div>

          <div
            className="text-[11px]"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            Current
          </div>
        </div>
      </div>

      {/* Bottom Row - Activity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 24hr Change */}
        <div
          className="p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
            <div
              className="text-[11px] uppercase"
              style={{
                color: 'var(--seasons-text-tertiary)',
                letterSpacing: '0.5px',
              }}
            >
              24hr Change
            </div>
          </div>

          <div
            className="text-2xl md:text-3xl"
            style={{
              color: change24h >= 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              fontFeatureSettings: '"tnum" 1',
              lineHeight: '1.2',
            }}
          >
            {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
          </div>
        </div>

        {/* 24hr Transactions */}
        <div
          className="p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
            <div
              className="text-[11px] uppercase"
              style={{
                color: 'var(--seasons-text-tertiary)',
                letterSpacing: '0.5px',
              }}
            >
              24hr Txs
            </div>
          </div>

          <div
            className="text-2xl md:text-3xl"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              fontFeatureSettings: '"tnum" 1',
              lineHeight: '1.2',
            }}
          >
            {txs24h.toLocaleString()}
          </div>
        </div>

        {/* Total Transactions */}
        <div
          className="p-4 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Receipt size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
            <div
              className="text-[11px] uppercase"
              style={{
                color: 'var(--seasons-text-tertiary)',
                letterSpacing: '0.5px',
              }}
            >
              Total Txs
            </div>
          </div>

          <div
            className="text-2xl md:text-3xl"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              fontFeatureSettings: '"tnum" 1',
              lineHeight: '1.2',
            }}
          >
            {(totalTxs / 1000).toFixed(1)}K
          </div>
        </div>
      </div>
    </div>
  );
}