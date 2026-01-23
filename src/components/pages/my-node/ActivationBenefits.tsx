import { TrendingUp, Trophy, Share2, Zap } from 'lucide-react';
import { PLATFORM } from '../../../constants/platform';

export function ActivationBenefits() {
  return (
    <div
      className="p-6 rounded-xl"
      style={{
        background: 'var(--seasons-bg-elev)',
        border: '1px solid var(--seasons-border-hair)',
      }}
    >
      <h2
        className="mb-4"
        style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--seasons-text-primary)',
        }}
      >
        Once Activated, You'll Get:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div
            className="mt-1 p-1.5 rounded"
            style={{
              background: 'rgba(96, 211, 148, 0.1)',
            }}
          >
            <TrendingUp size={16} style={{ color: 'var(--seasons-success)' }} />
          </div>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                marginBottom: '4px',
              }}
            >
              34.5% APY<sup style={{ fontSize: '0.6em', marginLeft: '2px' }}>*</sup>
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--seasons-text-tertiary)',
              }}
            >
              {PLATFORM.APY.DISCLAIMER}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div
            className="mt-1 p-1.5 rounded"
            style={{
              background: 'rgba(233, 199, 116, 0.1)',
            }}
          >
            <Trophy size={16} style={{ color: 'var(--seasons-brand-grad-start)' }} />
          </div>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                marginBottom: '4px',
              }}
            >
              Onchain Rewards
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--seasons-text-tertiary)',
              }}
            >
              Earn from curated memecoin portfolio
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div
            className="mt-1 p-1.5 rounded"
            style={{
              background: 'rgba(180, 75, 203, 0.1)',
            }}
          >
            <Share2 size={16} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
          </div>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                marginBottom: '4px',
              }}
            >
              Auto-Balanced
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--seasons-text-tertiary)',
              }}
            >
              Portfolio optimized across 3 tiers
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div
            className="mt-1 p-1.5 rounded"
            style={{
              background: 'rgba(75, 128, 203, 0.1)',
            }}
          >
            <Zap size={16} style={{ color: 'var(--seasons-brand-grad-end)' }} />
          </div>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                marginBottom: '4px',
              }}
            >
              Instant Activation
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--seasons-text-tertiary)',
              }}
            >
              Start earning immediately
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
