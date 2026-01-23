import { TrendingUp, Activity, Coins } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { PLATFORM } from '../../constants/platform';
import { formatters } from '../../utils/formatters';
import { cardStyles, textStyles } from '../../styles/cardStyles';

interface YieldInfoPanelProps {
  apy: number;
  activeNodes: number;
  yieldDistributed: number;
  isConnected: boolean;
}

export function YieldInfoPanel({ apy, activeNodes, yieldDistributed, isConnected }: YieldInfoPanelProps) {
  if (!isConnected) {
    return null;
  }

  return (
    <div
      className="p-4 md:p-6 rounded-xl"
      style={cardStyles.elevated}
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
          Yield Overview
        </h2>
        <p
          className="text-xs mt-1"
          style={{
            color: 'var(--seasons-text-tertiary)',
          }}
        >
          Live platform yield metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* APY */}
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
              <TrendingUp size={16} style={{ color: 'var(--seasons-brand-grad-start)' }} />
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
                    Current APY
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Annual Percentage Yield based on last 7 days of distributions
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
            {apy.toFixed(1)}%<sup style={{ fontSize: '0.6em', marginLeft: '2px' }}>*</sup>
          </div>

          <div
            className="text-[11px]"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            {PLATFORM.APY.DISCLAIMER}
          </div>
        </div>

        {/* Active Nodes */}
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
              <Activity size={16} style={{ color: 'var(--seasons-success)' }} />
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
                    Active Nodes
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Number of nodes currently earning yield on the platform
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
            {activeNodes.toLocaleString()}
          </div>

          <div
            className="text-[11px]"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            Currently earning
          </div>
        </div>

        {/* YIELD Distributed */}
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
                background: 'linear-gradient(135deg, rgba(180, 75, 203, 0.12), rgba(75, 128, 203, 0.12))',
              }}
            >
              <Coins size={16} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
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
                    Yield Distributed
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Total value distributed to all holders in the last 24 hours
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
            ${(yieldDistributed / 1000).toFixed(1)}K
          </div>

          <div
            className="text-[11px]"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            Last 24 hours
          </div>
        </div>
      </div>
    </div>
  );
}