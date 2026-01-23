import { CheckCircle, Calendar } from 'lucide-react';
import { UserNode } from '../../../lib/mockData';

interface NodeStatusInfoProps {
  nodeData: UserNode;
}

export function NodeStatusInfo({ nodeData }: NodeStatusInfoProps) {
  return (
    <div
      className="p-6 rounded-xl"
      style={{
        background: 'rgba(96, 211, 148, 0.04)',
        border: '1px solid rgba(96, 211, 148, 0.1)',
      }}
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <CheckCircle size={20} style={{ color: 'var(--seasons-success)', marginTop: '2px' }} />
          <div>
            <h3
              className="mb-2"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
              }}
            >
              Your node is active and earning
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              Rewards are automatically distributed to your wallet based on your $SEAS holdings. 
              The more $SEAS you hold, the larger your share of the yield distribution pool.
            </p>
          </div>
        </div>

        {/* Activation Date */}
        {nodeData.activationDate && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg" style={{ background: 'var(--seasons-bg-card)', border: '1px solid var(--seasons-border-hair)', minWidth: '220px' }}>
            <Calendar size={16} style={{ color: 'var(--seasons-text-tertiary)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--seasons-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                Node Activated
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--seasons-text-primary)' }}>
                {new Date(nodeData.activationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
