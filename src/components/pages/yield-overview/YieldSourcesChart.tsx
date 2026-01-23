import { Activity } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cardStyles } from '../../../styles/cardStyles';
import { PieTooltip } from './ChartTooltips';
import { YieldSourceDataPoint } from './types';

interface YieldSourcesChartProps {
  data: YieldSourceDataPoint[];
}

export function YieldSourcesChart({ data }: YieldSourcesChartProps) {
  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--seasons-text-primary)',
          }}
        >
          Yield Sources
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {/* Mesh градиент для Buy Tax */}
              <radialGradient id="buyTaxMesh" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#F5D98B" />
                <stop offset="50%" stopColor="#E9C774" />
                <stop offset="100%" stopColor="#D4A959" />
              </radialGradient>
              {/* Mesh градиент для Sell Tax */}
              <radialGradient id="sellTaxMesh" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FF8A9A" />
                <stop offset="50%" stopColor="#F27783" />
                <stop offset="100%" stopColor="#E05567" />
              </radialGradient>
              {/* Mesh градиент для Rolling Yield */}
              <radialGradient id="rollingYieldMesh" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#6B9FE0" />
                <stop offset="50%" stopColor="#4B80CB" />
                <stop offset="100%" stopColor="#3A66A8" />
              </radialGradient>
              <filter id="pieGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              filter="url(#pieGlow)"
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
              stroke="none"
            >
              <Cell fill="url(#buyTaxMesh)" />
              <Cell fill="url(#sellTaxMesh)" />
              <Cell fill="url(#rollingYieldMesh)" />
            </Pie>
            <Tooltip content={<PieTooltip />} cursor={{ fill: 'transparent' }} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                fontSize: '12px',
                color: 'var(--seasons-text-secondary)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
