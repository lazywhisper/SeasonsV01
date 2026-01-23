import { Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cardStyles } from '../../../styles/cardStyles';
import { CustomTooltip } from './ChartTooltips';
import { WeeklyDistributionDataPoint } from './types';

interface WeeklyDistributionChartProps {
  data: WeeklyDistributionDataPoint[];
}

export function WeeklyDistributionChart({ data }: WeeklyDistributionChartProps) {
  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--seasons-text-primary)',
          }}
        >
          Weekly Distribution Trends
        </h3>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0%" y1="0%" x2="76.6%" y2="64.3%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F5D98B" />
                <stop offset="20%" stopColor="#E9C774" />
                <stop offset="40%" stopColor="#FF8A9A" />
                <stop offset="60%" stopColor="#B44BCB" />
                <stop offset="80%" stopColor="#6B9FE0" />
                <stop offset="100%" stopColor="#4B80CB" />
              </linearGradient>
              <filter id="barGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="week"
              stroke="var(--seasons-text-tertiary)"
              style={{ fontSize: '12px', fontFeatureSettings: "'tnum' 1" }}
            />
            <YAxis
              stroke="var(--seasons-text-tertiary)"
              style={{ fontSize: '11px', fontFeatureSettings: "'tnum' 1" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey="amount"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              filter="url(#barGlow)"
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
