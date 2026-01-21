import { Zap, TrendingUp, Info, DollarSign, ArrowUpRight, Calendar, Clock, Infinity } from 'lucide-react';
import { Asset, targetWeights } from '../../lib/mockData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useMemo } from 'react';

interface PortfolioAutoBuilderMiniProps {
  assets: Asset[];
  onNavigate?: (page: string) => void;
}

export function PortfolioAutoBuilderMini({ assets, onNavigate }: PortfolioAutoBuilderMiniProps) {
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

  // Calculate 7-day rewards
  const rewards7d = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.rewards7dUsd, 0);
  }, [assets]);

  // Calculate 30-day rewards estimate
  const rewards30d = useMemo(() => {
    return rewards7d * 4.3; // ~30 days
  }, [rewards7d]);

  // Calculate all-time rewards estimate (based on ~1 year)
  const rewardsAllTime = useMemo(() => {
    return rewards7d * 52; // ~365 days
  }, [rewards7d]);

  // Calculate weighted average APR
  const portfolioAPR = useMemo(() => {
    const totalWeight = assets.reduce((sum, asset) => sum + asset.weightPct, 0);
    if (totalWeight === 0) return 0;
    
    // Extract average APR from aprRange string (e.g., "8–12%" -> 10%)
    const weightedAPR = assets.reduce((sum, asset) => {
      const weight = asset.weightPct / totalWeight;
      const aprMatch = asset.aprRange.match(/(\d+)–(\d+)%/);
      if (aprMatch) {
        const avgAPR = (parseInt(aprMatch[1]) + parseInt(aprMatch[2])) / 2;
        return sum + (avgAPR * weight);
      }
      return sum;
    }, 0);
    
    return weightedAPR;
  }, [assets]);

  const compositionData = [
    { 
      name: 'Blue Chips', 
      target: targetWeights.blue, 
      actual: actualWeights.blue,
      color: '#E9C774',
    },
    { 
      name: 'Underdogs', 
      target: targetWeights.under, 
      actual: actualWeights.under,
      color: '#B44BCB',
    },
    { 
      name: 'Rising Stars', 
      target: targetWeights.rising, 
      actual: actualWeights.rising,
      color: '#4B80CB',
    },
  ];

  return (
    <div
      className="p-6 rounded-xl"
      style={{
        background: 'var(--seasons-bg-elev)',
        border: '1px solid var(--seasons-border-hair)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h2 style={{ fontSize: '16px' }}>Portfolio Allocation</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={14}
                    style={{ color: 'var(--seasons-text-tertiary)', cursor: 'help' }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[240px]">
                    Strategic 6:3:1 allocation for maximum onchain rewards across {assets.length} assets
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p 
            className="label-lg" 
            style={{ 
              textTransform: 'none',
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            {assets.length} assets • 6:3:1 strategy
          </p>
        </div>

        {/* Portfolio APR Badge */}
        <div
          className="px-3 py-1.5 rounded-full label-sm flex items-center gap-1.5"
          style={{
            background: 'rgba(96, 211, 148, 0.1)',
            border: '1px solid rgba(96, 211, 148, 0.2)',
            color: 'var(--seasons-success)',
          }}
        >
          <TrendingUp size={12} />
          {portfolioAPR.toFixed(1)}% APR
        </div>
      </div>

      {/* Onchain Rewards Earned */}
      <div className="mb-6">
        <div 
          className="mb-4"
          style={{
            fontSize: '11px',
            color: 'var(--seasons-text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 600,
          }}
        >
          Onchain Rewards Earned
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* 7 Days */}
          <div
            className="p-3 rounded-lg relative overflow-hidden"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar 
                size={11} 
                style={{ color: 'var(--seasons-text-tertiary)' }} 
              />
              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--seasons-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  fontWeight: 600,
                }}
              >
                7 Days
              </div>
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              ${rewards7d.toFixed(2)}
            </div>
            {/* Subtle accent */}
            <div
              className="absolute bottom-0 right-0 w-16 h-16 opacity-5"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
                borderRadius: '100% 0 0 0',
              }}
            />
          </div>

          {/* 30 Days */}
          <div
            className="p-3 rounded-lg relative overflow-hidden"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Clock 
                size={11} 
                style={{ color: 'var(--seasons-text-tertiary)' }} 
              />
              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--seasons-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  fontWeight: 600,
                }}
              >
                30 Days
              </div>
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              ${rewards30d.toFixed(2)}
            </div>
            {/* Subtle accent */}
            <div
              className="absolute bottom-0 right-0 w-16 h-16 opacity-5"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2))',
                borderRadius: '100% 0 0 0',
              }}
            />
          </div>

          {/* All Time */}
          <div
            className="p-3 rounded-lg relative overflow-hidden"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Infinity 
                size={11} 
                style={{ color: 'var(--seasons-text-tertiary)' }} 
              />
              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--seasons-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  fontWeight: 600,
                }}
              >
                All Time
              </div>
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              ${rewardsAllTime.toFixed(0)}
            </div>
            {/* Subtle accent */}
            <div
              className="absolute bottom-0 right-0 w-16 h-16 opacity-5"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                borderRadius: '100% 0 0 0',
              }}
            />
          </div>
        </div>
        <div 
          className="mt-3"
          style={{
            fontSize: '10px',
            color: 'var(--seasons-text-tertiary)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          30d and All Time are projections based on 7-day yield
        </div>
      </div>

      {/* Allocation Breakdown */}
      <div className="space-y-4 mb-5">
        {compositionData.map((item) => {
          const delta = item.actual - item.target;
          const isBalanced = Math.abs(delta) <= 2;
          
          return (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-2">
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--seasons-text-primary)',
                  }}
                >
                  {item.name}
                </span>
                <div className="flex items-center gap-2.5">
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--seasons-text-primary)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {item.actual.toFixed(1)}%
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--seasons-text-tertiary)',
                    }}
                  >
                    / {item.target}%
                  </span>
                  {!isBalanced && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--seasons-text-secondary)',
                      }}
                    >
                      {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className="h-2 rounded-full overflow-hidden relative"
                style={{
                  background: 'var(--seasons-bg-base)',
                }}
              >
                {/* Target marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 z-10"
                  style={{
                    left: `${item.target}%`,
                    background: 'rgba(255, 255, 255, 0.3)',
                  }}
                />
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.actual}%`,
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Info + View Details Link */}
      <div
        className="p-3.5 rounded-lg"
        style={{
          background: 'rgba(96, 211, 148, 0.06)',
          border: '1px solid rgba(96, 211, 148, 0.12)',
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--seasons-success)' }}
              />
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--seasons-text-primary)',
                }}
              >
                Dynamic rebalancing active
              </p>
            </div>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.5',
              }}
            >
              Maintaining optimal 6:3:1 allocation for maximum onchain rewards
            </p>
          </div>
          
          <button
            onClick={() => onNavigate?.('holdings')}
            className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-white/5 transition-colors flex-shrink-0"
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--seasons-text-secondary)',
              textDecoration: 'none',
              border: '1px solid var(--seasons-border-hair)',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Details
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}