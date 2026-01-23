import { Trophy } from 'lucide-react';
import { cardStyles } from '../../../styles/cardStyles';
import { formatters } from '../../../utils/formatters';
import { LiveRewardsFeedProps } from './types';
import { memo } from 'react';

export const LiveRewardsFeed = memo(function LiveRewardsFeed({ stats, liveRewards }: LiveRewardsFeedProps) {
  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-1">
            Live Rewards Feed
          </h2>
          <p className="label-lg" style={{ textTransform: 'none' }}>
            Recent automatic distributions
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full label-md"
          style={{
            background: 'rgba(96, 211, 148, 0.08)',
            border: '1px solid rgba(96, 211, 148, 0.2)',
            color: 'var(--seasons-success)',
            textTransform: 'none',
          }}
        >
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--seasons-success)' }}
          />
          {stats.activeNodes} nodes earning now
        </div>
      </div>

      <div className="space-y-2">
        {liveRewards.map((reward, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
            style={{
              background: 'var(--seasons-bg-card)',
            }}
          >
            <div className="flex items-center gap-3">
              <Trophy size={16} style={{ color: 'var(--seasons-brand-grad-start)' }} />
              <div>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--seasons-text-primary)',
                  }}
                >
                  {formatters.walletAddress(reward.address)}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    marginLeft: '8px',
                  }}
                >
                  earned
                </span>
              </div>
            </div>
            <div className="text-right">
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--seasons-success)',
                  fontFeatureSettings: "'tnum' 1",
                }}
              >
                ${formatters.currency(reward.amount, 2)}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--seasons-text-tertiary)',
                }}
              >
                {reward.timeAgo}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});