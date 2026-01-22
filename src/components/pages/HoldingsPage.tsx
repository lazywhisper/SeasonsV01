import { PortfolioBuilder } from './PortfolioBuilder';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

export function HoldingsPage() {
  // Portfolio Distribution Data - Actual Allocation with token examples from Portfolio Auto Builder
  const portfolioDistribution = [
    { 
      name: 'Blue Chips (60%)', 
      value: 60, 
      color: '#E9C774',
      tokens: 'WIF, BONK, PENGU'
    },
    { 
      name: 'Underdogs (30%)', 
      value: 30, 
      color: '#B44BCB',
      tokens: 'FARTCOIN'
    },
    { 
      name: 'Rising Stars (10%)', 
      value: 10, 
      color: '#4B80CB',
      tokens: 'JBMB'
    },
  ];

  // Top 5 Assets by APY - Only tokens from Portfolio Auto Builder
  const topAPYAssets = [
    { name: 'FARTCOIN', apy: 33, category: 'Underdogs' },
    { name: 'JBMB', apy: 27, category: 'Rising Stars' },
    { name: 'PENGU', apy: 14, category: 'Blue Chips' },
    { name: 'WIF', apy: 12, category: 'Blue Chips' },
    { name: 'BONK', apy: 11, category: 'Blue Chips' },
  ];

  // Custom Tooltip for Portfolio Distribution
  const PortfolioTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="px-3 py-2 rounded-lg"
          style={{
            background: 'rgba(17, 17, 19, 0.95)',
            border: '1px solid var(--seasons-border-hair)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            maxWidth: '220px',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--seasons-text-secondary)', marginBottom: '4px' }}>
            {data.name}
          </p>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--seasons-text-primary)',
              fontFeatureSettings: "'tnum' 1",
              marginBottom: '6px',
            }}
          >
            {data.value}%
          </p>
          <p
            style={{
              fontSize: '11px',
              color: 'var(--seasons-text-tertiary)',
              lineHeight: '1.4',
            }}
          >
            {data.tokens}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for APY Chart
  const APYTooltip = ({ active, payload }: any) => {
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
            {payload[0].payload.name}
          </p>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--seasons-text-primary)',
              fontFeatureSettings: "'tnum' 1",
            }}
          >
            {payload[0].value}% APY
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="display-md mb-2">
          Assets Inclusion
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--seasons-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          Curated portfolio following the 6:3:1 distribution rule across Blue Chips, Underdogs, and Rising Stars
        </p>
      </div>

      {/* CHARTS SECTION - NEW! */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Portfolio Distribution Donut */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon size={18} style={{ color: 'var(--seasons-brand-grad-start)' }} />
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
              }}
            >
              Portfolio Distribution
            </h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {/* Mesh градиент для Blue Chips */}
                  <radialGradient id="blueChipsMesh" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#F5D98B" />
                    <stop offset="50%" stopColor="#E9C774" />
                    <stop offset="100%" stopColor="#D4A959" />
                  </radialGradient>
                  {/* Mesh градиент для Underdogs */}
                  <radialGradient id="underdogsMesh" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#D066DD" />
                    <stop offset="50%" stopColor="#B44BCB" />
                    <stop offset="100%" stopColor="#9A3DAA" />
                  </radialGradient>
                  {/* Mesh градиент для Rising Stars */}
                  <radialGradient id="risingStarsMesh" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#6B9FE0" />
                    <stop offset="50%" stopColor="#4B80CB" />
                    <stop offset="100%" stopColor="#3A66A8" />
                  </radialGradient>
                  <filter id="portfolioGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <Pie
                  data={portfolioDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  filter="url(#portfolioGlow)"
                  animationBegin={0}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  stroke="none"
                >
                  <Cell fill="url(#blueChipsMesh)" />
                  <Cell fill="url(#underdogsMesh)" />
                  <Cell fill="url(#risingStarsMesh)" />
                </Pie>
                <Tooltip content={<PortfolioTooltip />} cursor={{ fill: 'transparent' }} />
                <Legend
                  verticalAlign="bottom"
                  height={28}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: '11px',
                    color: 'var(--seasons-text-secondary)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Top 5 Assets by APY */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} style={{ color: 'var(--seasons-success)' }} />
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
              }}
            >
              Top 5 APY Leaders
            </h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topAPYAssets} margin={{ top: 15, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="apyBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E9C774" />
                    <stop offset="33%" stopColor="#F27783" />
                    <stop offset="66%" stopColor="#B44BCB" />
                    <stop offset="100%" stopColor="#4B80CB" />
                  </linearGradient>
                  <filter id="apyGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--seasons-text-tertiary)"
                  style={{ fontSize: '10px', fontFeatureSettings: "'tnum' 1" }}
                  angle={0}
                  textAnchor="middle"
                  height={28}
                />
                <YAxis
                  stroke="var(--seasons-text-tertiary)"
                  style={{ fontSize: '11px', fontFeatureSettings: "'tnum' 1" }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<APYTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar
                  dataKey="apy"
                  fill="url(#apyBarGradient)"
                  radius={[8, 8, 0, 0]}
                  filter="url(#apyGlow)"
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Portfolio Auto Builder Section */}
      <PortfolioBuilder />
    </div>
  );
}