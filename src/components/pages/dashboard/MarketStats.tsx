import { TrendingUp } from 'lucide-react';
import { cardStyles } from '../../../styles/cardStyles';
import { formatters } from '../../../utils/formatters';
import { MarketStatsProps } from './types';
import { memo } from 'react';

export const MarketStats = memo(function MarketStats({ stats }: MarketStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        className="p-4 rounded-lg transition-all duration-300"
        style={cardStyles.elevated}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(233, 199, 116, 0.2)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="label-sm mb-1">
          Market Cap
        </div>
        <div className="metric-md">
          {formatters.compactCurrency(stats.marketCap)}
        </div>
      </div>

      <div
        className="p-4 rounded-lg transition-all duration-300"
        style={cardStyles.elevated}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = stats.priceChange24h > 0 ? 'rgba(96, 211, 148, 0.2)' : 'rgba(255, 107, 107, 0.2)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="label-sm mb-1">
          24h Change
        </div>
        <div
          className="metric-md flex items-center gap-1"
          style={{
            color: stats.priceChange24h > 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
          }}
        >
          {stats.priceChange24h > 0 ? '+' : ''}{stats.priceChange24h}%
          <TrendingUp size={16} />
        </div>
      </div>

      <div
        className="p-4 rounded-lg transition-all duration-300"
        style={cardStyles.elevated}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(75, 128, 203, 0.2)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="label-sm mb-1">
          24h Transactions
        </div>
        <div className="metric-md">
          {formatters.number(stats.transactions24h, 0)}
        </div>
      </div>

      <div
        className="p-4 rounded-lg transition-all duration-300"
        style={cardStyles.elevated}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(180, 75, 203, 0.2)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="label-sm mb-1">
          Total Transactions
        </div>
        <div className="metric-md">
          {formatters.number(stats.transactionsTotal, 0)}
        </div>
      </div>
    </div>
  );
});