import { DollarSign, Zap, TrendingUp, Clock } from 'lucide-react';
import { formatters } from '../../../utils/formatters';
import { cardStyles } from '../../../styles/cardStyles';

interface YieldStatsCardsProps {
  networkYieldDistributed: number;
  userYield: number;
  avgAPY: number;
  lastDistribution: string;
  isConnected: boolean;
}

export function YieldStatsCards({
  networkYieldDistributed,
  userYield,
  avgAPY,
  lastDistribution,
  isConnected,
}: YieldStatsCardsProps) {
  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <h2 className="mb-6">Yield Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Yield Distributed (Network) */}
        <div
          className="p-5 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="p-2 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.1), rgba(242, 119, 131, 0.1))',
              }}
            >
              <DollarSign size={18} style={{ color: 'var(--seasons-brand-grad-start)' }} />
            </div>
            <span
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 600,
              }}
            >
              Yield Distributed
            </span>
          </div>
          <div
            className="mb-1"
            style={{
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: '1',
              color: 'var(--seasons-text-primary)',
            }}
          >
            {formatters.currency(networkYieldDistributed, 2)}
          </div>
          <div
            style={{
              color: 'var(--seasons-text-tertiary)',
              fontSize: '11px',
            }}
          >
            Network-wide earnings
          </div>
        </div>

        {/* Your Yield (Wallet) */}
        {isConnected ? (
          <div
            className="p-5 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.05), rgba(75, 128, 203, 0.05))',
              border: '1px solid rgba(96, 211, 148, 0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'rgba(96, 211, 148, 0.1)',
                }}
              >
                <Zap size={18} style={{ color: 'var(--seasons-success)' }} />
              </div>
              <span
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                }}
              >
                Your Yield
              </span>
            </div>
            <div
              className="mb-1"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: '1',
                color: 'var(--seasons-success)',
              }}
            >
              {formatters.currency(userYield, 2)}
            </div>
            <div
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
              }}
            >
              Personal lifetime earnings
            </div>
          </div>
        ) : (
          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
              opacity: 0.6,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'rgba(180, 75, 203, 0.1)',
                }}
              >
                <Zap size={18} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
              </div>
              <span
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                }}
              >
                Your Yield
              </span>
            </div>
            <div
              className="mb-1"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: '1',
                color: 'var(--seasons-text-primary)',
              }}
            >
              —
            </div>
            <div
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
              }}
            >
              Connect wallet to view
            </div>
          </div>
        )}

        {/* Average Expected APY */}
        <div
          className="p-5 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="p-2 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(180, 75, 203, 0.1), rgba(75, 128, 203, 0.1))',
              }}
            >
              <TrendingUp size={18} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
            </div>
            <span
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 600,
              }}
            >
              Average APY
            </span>
          </div>
          <div
            className="mb-1"
            style={{
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: '1',
              color: 'var(--seasons-text-primary)',
            }}
          >
            {avgAPY}%<sup style={{ fontSize: '0.5em', marginLeft: '2px' }}>*</sup>
          </div>
          <div
            style={{
              color: 'var(--seasons-text-tertiary)',
              fontSize: '11px',
            }}
          >
            * Calculated based on 30-day period
          </div>
        </div>

        {/* Last Distribution */}
        <div
          className="p-5 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="p-2 rounded-lg"
              style={{
                background: 'rgba(75, 128, 203, 0.1)',
              }}
            >
              <Clock size={18} style={{ color: 'var(--seasons-brand-grad-end)' }} />
            </div>
            <span
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 600,
              }}
            >
              Last Distribution
            </span>
          </div>
          <div
            className="mb-1"
            style={{
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: '1',
              color: 'var(--seasons-text-primary)',
            }}
          >
            {lastDistribution}
          </div>
          <div
            style={{
              color: 'var(--seasons-text-tertiary)',
              fontSize: '11px',
            }}
          >
            Latest yield snapshot
          </div>
        </div>
      </div>
    </div>
  );
}
