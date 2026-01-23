/**
 * Active Node State Component
 * 
 * Displays when user's node is active and earning rewards
 */

import { Check, TrendingUp, Zap, Clock } from 'lucide-react';
import { cardStyles, textStyles, badgeStyles } from '../../../styles/cardStyles';
import { formatters } from '../../../utils/formatters';

interface ActiveNodeStateProps {
  seasBalance: number;
  stabilityPct: number;
  distributionUptimePct: number;
  velocity: number;
  nextDistribution?: Date;
}

export function ActiveNodeState({
  seasBalance,
  stabilityPct,
  distributionUptimePct,
  velocity,
  nextDistribution,
}: ActiveNodeStateProps) {
  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 style={textStyles.heading}>Node Status</h2>
        <span
          className="px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5"
          style={badgeStyles.success}
        >
          <Check size={14} />
          ACTIVE
        </span>
      </div>

      {/* Balance Display */}
      <div className="p-4 rounded-lg mb-6" style={cardStyles.base}>
        <div
          className="text-xs mb-2"
          style={{
            color: 'var(--seasons-text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}
        >
          Your Balance
        </div>
        <div className="text-2xl font-semibold" style={textStyles.tabular}>
          {formatters.tokens(seasBalance, 'SEAS')}
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {/* Stability */}
        <div className="p-3 rounded-lg" style={cardStyles.base}>
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp size={14} style={{ color: 'var(--seasons-success)' }} />
            <span
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Stability
            </span>
          </div>
          <div className="text-lg font-semibold" style={textStyles.tabular}>
            {formatters.percentage(stabilityPct, 1)}
          </div>
        </div>

        {/* Uptime */}
        <div className="p-3 rounded-lg" style={cardStyles.base}>
          <div className="flex items-center gap-1.5 mb-2">
            <Zap size={14} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
            <span
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Uptime
            </span>
          </div>
          <div className="text-lg font-semibold" style={textStyles.tabular}>
            {formatters.percentage(distributionUptimePct, 1)}
          </div>
        </div>

        {/* Velocity */}
        <div className="p-3 rounded-lg" style={cardStyles.base}>
          <div className="flex items-center gap-1.5 mb-2">
            <Clock size={14} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
            <span
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Velocity
            </span>
          </div>
          <div className="text-lg font-semibold" style={textStyles.tabular}>
            {velocity}
          </div>
        </div>
      </div>

      {/* Next Distribution */}
      {nextDistribution && (
        <div
          className="p-4 rounded-lg flex items-center justify-between"
          style={{
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <span
            style={{
              color: 'var(--seasons-text-secondary)',
              fontSize: '13px',
            }}
          >
            Next Distribution
          </span>
          <span
            className="font-medium"
            style={{
              color: 'var(--seasons-brand-grad-mid2)',
              fontSize: '13px',
            }}
          >
            {formatters.relativeTime(nextDistribution.toISOString())}
          </span>
        </div>
      )}
    </div>
  );
}
