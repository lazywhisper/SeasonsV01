import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatters } from '../../../utils/formatters';
import { cardStyles } from '../../../styles/cardStyles';
import { NodeChartsProps } from './types';

export function NodeEarningsChart({ nodeData }: NodeChartsProps) {
  const chartData = nodeData.yieldHistory.slice(0, 10).reverse().map((entry, idx) => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total: nodeData.yieldHistory.slice(0, 10).reverse().slice(0, idx + 1).reduce((sum, e) => sum + e.amount, 0),
  }));

  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} style={{ color: 'var(--seasons-success)' }} />
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--seasons-text-primary)',
          }}
        >
          Cumulative Earnings (30d)
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60D394" />
                <stop offset="50%" stopColor="#4B80CB" />
                <stop offset="100%" stopColor="#B44BCB" />
              </linearGradient>
              <linearGradient id="earningsGradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60D394" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#4B80CB" stopOpacity={0.05} />
              </linearGradient>
              <filter id="earningsGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              stroke="var(--seasons-text-tertiary)"
              style={{ fontSize: '11px', fontFeatureSettings: "'tnum' 1" }}
            />
            <YAxis
              stroke="var(--seasons-text-tertiary)"
              style={{ fontSize: '11px', fontFeatureSettings: "'tnum' 1" }}
              tickFormatter={(value) => formatters.currency(value, 0)}
            />
            <Tooltip
              content={({ active, payload, label }: any) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      className="px-3 py-2 rounded-lg"
                      style={{
                        background: 'rgba(17, 17, 19, 0.95)',
                        border: '1px solid var(--seasons-border-hair)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      <p style={{ fontSize: '12px', color: 'var(--seasons-text-secondary)', marginBottom: '4px' }}>
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: 'var(--seasons-success)',
                          fontFeatureSettings: "'tnum' 1",
                        }}
                      >
                        {formatters.currency(payload[0].value, 2)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: 'transparent' }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="url(#earningsGradient)"
              strokeWidth={3}
              fill="url(#earningsGradientFill)"
              filter="url(#earningsGlow)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
