import { Calendar, Users, BarChart3 } from 'lucide-react';
import { formatters } from '../../../utils/formatters';
import { DistributionEvent } from './types';

interface DistributionEventsTableProps {
  events: DistributionEvent[];
}

export function DistributionEventsTable({ events }: DistributionEventsTableProps) {
  return (
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
              Time
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
              Amount Distributed
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
              Recipients
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
          {events.map((event, index) => (
            <tr
              key={event.id}
              className="hover:bg-white/5 transition-colors"
              style={{
                borderBottom: index < events.length - 1 ? '1px solid var(--seasons-border-hair)' : 'none',
              }}
            >
              <td className="py-3 px-2">
                <div className="flex items-center gap-2">
                  <Calendar size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'var(--seasons-text-secondary)',
                    }}
                  >
                    {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </td>
              <td className="text-right py-3 px-2">
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                  }}
                >
                  {formatters.currency(event.amount, 2)}
                </div>
              </td>
              <td className="text-right py-3 px-2">
                <div className="flex items-center justify-end gap-1">
                  <Users size={12} style={{ color: 'var(--seasons-text-tertiary)' }} />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--seasons-text-secondary)',
                    }}
                  >
                    {event.recipients}
                  </span>
                </div>
              </td>
              <td className="text-right py-3 px-2">
                <a
                  href={`https://solscan.io/tx/${event.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-brand-grad-mid1)',
                    fontWeight: 500,
                  }}
                >
                  {event.txHash}
                  <BarChart3 size={12} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
