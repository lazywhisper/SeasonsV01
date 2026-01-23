import { BarChart as BarChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cardStyles } from '../../../styles/cardStyles';
import { NodeChartsProps } from './types';

export function WeeklyEarningsChart({ nodeData }: NodeChartsProps) {
  const chartData = nodeData.yieldHistory.slice(0, 7).map((entry) => ({
    day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
    amount: entry.amount,
  })).reverse();

  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <div className="flex items-center gap-2 mb-4">
        <BarChartIcon size={18} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--seasons-text-primary)',
          }}
        >
          This Week's Earnings
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="weeklyBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E9C774" />
                <stop offset="50%" stopColor="#F27783" />
                <stop offset="100%" stopColor="#B44BCB" />
              </linearGradient>
              <filter id="weeklyGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="day"
              stroke="var(--seasons-text-tertiary)"
              style={{ fontSize: '11px', fontFeatureSettings: "'tnum' 1" }}
            />
            <YAxis
              stroke="var(--seasons-text-tertiary)"
              style={{ fontSize: '11px', fontFeatureSettings: "'tnum' 1" }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
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
                          color: 'var(--seasons-text-primary)',
                          fontFeatureSettings: "'tnum' 1",
                        }}
                      >
                        ${payload[0].value.toFixed(2)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ fill: 'transparent' }}
            />
            <Bar
              dataKey="amount"
              fill="url(#weeklyBarGradient)"
              radius={[8, 8, 0, 0]}
              filter="url(#weeklyGlow)"
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
