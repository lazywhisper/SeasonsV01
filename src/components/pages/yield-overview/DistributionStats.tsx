import { Activity } from 'lucide-react';
import { formatters } from '../../../utils/formatters';
import { cardStyles } from '../../../styles/cardStyles';
import { DistributionEventsTable } from './DistributionEventsTable';
import { DistributionEvent } from './types';

interface DistributionStatsProps {
  totalDistributions: number;
  distributionFrequency: string;
  avgDistributionAmount: number;
  totalRecipients: number;
  activeNodes: number;
  distributionEvents: DistributionEvent[];
}

export function DistributionStats({
  totalDistributions,
  distributionFrequency,
  avgDistributionAmount,
  totalRecipients,
  activeNodes,
  distributionEvents,
}: DistributionStatsProps) {
  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <h2 className="mb-6">Yield Distribution</h2>

      {/* Distribution Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="text-center">
          <div
            className="mb-1"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--seasons-text-primary)',
            }}
          >
            {totalDistributions}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--seasons-text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Total Events
          </div>
        </div>

        <div className="text-center">
          <div
            className="mb-1"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--seasons-text-primary)',
            }}
          >
            {distributionFrequency}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--seasons-text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Frequency
          </div>
        </div>

        <div className="text-center">
          <div
            className="mb-1"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--seasons-text-primary)',
            }}
          >
            {formatters.currency(avgDistributionAmount, 2)}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--seasons-text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Avg Amount
          </div>
        </div>

        <div className="text-center">
          <div
            className="mb-1"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--seasons-text-primary)',
            }}
          >
            {totalRecipients}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--seasons-text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Total Recipients
          </div>
        </div>

        <div className="text-center">
          <div
            className="mb-1"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--seasons-success)',
            }}
          >
            {activeNodes}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--seasons-text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Active Nodes
          </div>
        </div>
      </div>

      {/* Distribution Events Timeline */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--seasons-text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Recent Yield Distributions
          </h3>
        </div>

        <DistributionEventsTable events={distributionEvents} />
      </div>
    </div>
  );
}
