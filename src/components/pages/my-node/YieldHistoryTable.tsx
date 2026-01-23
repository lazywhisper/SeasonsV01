import { ExternalLink } from 'lucide-react';
import { formatters } from '../../../utils/formatters';
import { cardStyles } from '../../../styles/cardStyles';
import { YieldHistoryTableProps } from './types';

export function YieldHistoryTable({ yieldHistory }: YieldHistoryTableProps) {
  if (!yieldHistory || yieldHistory.length === 0) return null;

  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <div className="flex items-center justify-between mb-4">
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--seasons-text-primary)',
          }}
        >
          Yield History
        </h2>
        <span
          style={{
            fontSize: '12px',
            color: 'var(--seasons-text-tertiary)',
          }}
        >
          Last {yieldHistory.length} distributions
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--seasons-border-hair)' }}>
              <th
                className="text-left py-3 px-2"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--seasons-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Date
              </th>
              <th
                className="text-right py-3 px-2"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--seasons-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Amount
              </th>
              <th
                className="text-right py-3 px-2"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--seasons-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Transaction
              </th>
            </tr>
          </thead>
          <tbody>
            {yieldHistory.map((entry, index) => (
              <tr
                key={index}
                className="hover:bg-white/5 transition-colors"
                style={{ borderBottom: index < yieldHistory.length - 1 ? '1px solid var(--seasons-border-hair)' : 'none' }}
              >
                <td className="py-3 px-2">
                  <div
                    style={{
                      fontSize: '13px',
                      color: 'var(--seasons-text-secondary)',
                    }}
                  >
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--seasons-text-tertiary)',
                    }}
                  >
                    {new Date(entry.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC
                  </div>
                </td>
                <td className="text-right py-3 px-2">
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--seasons-success)',
                    }}
                  >
                    +{formatters.currency(entry.amount, 2)}
                  </div>
                </td>
                <td className="text-right py-3 px-2">
                  <a
                    href={`https://solscan.io/tx/${entry.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                    style={{
                      fontSize: '12px',
                      color: 'var(--seasons-brand-grad-mid1)',
                      fontWeight: 500,
                    }}
                  >
                    {entry.txHash}
                    <ExternalLink size={12} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
