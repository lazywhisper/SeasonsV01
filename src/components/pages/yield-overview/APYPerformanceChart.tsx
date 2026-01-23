import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cardStyles } from '../../../styles/cardStyles';
import { CustomTooltip } from './ChartTooltips';
import { APYHistoryDataPoint } from './types';

interface APYPerformanceChartProps {
  data: APYHistoryDataPoint[];
}

export function APYPerformanceChart({ data }: APYPerformanceChartProps) {
  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} style={{ color: 'var(--seasons-brand-grad-start)' }} />
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--seasons-text-primary)',
          }}
        >
          APY Performance (30d)
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="apyGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E9C774" />
                <stop offset="33%" stopColor="#F27783" />
                <stop offset="66%" stopColor="#B44BCB" />
                <stop offset="100%" stopColor="#4B80CB" />
              </linearGradient>
              <linearGradient id="apyGradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E9C774" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#4B80CB" stopOpacity={0.05} />
              </linearGradient>
              <filter id="glow">
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
              domain={[30, 37]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="apy"
              stroke="url(#apyGradient)"
              strokeWidth={3}
              fill="url(#apyGradientFill)"
              filter="url(#glow)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
