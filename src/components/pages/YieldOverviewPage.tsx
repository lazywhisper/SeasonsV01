import { TrendingUp, DollarSign, Users, Clock, ArrowUpRight, ExternalLink, Info, Zap, Activity, Calendar, BarChart3 } from 'lucide-react';
import { mockPlatformStats } from '../../lib/mockData';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface YieldOverviewPageProps {
  isConnected: boolean;
}

export function YieldOverviewPage({ isConnected }: YieldOverviewPageProps) {
  // Use platform stats for consistency
  const stats = mockPlatformStats;
  const networkYieldDistributed = stats.totalDistributed;
  const userYield = 1824.32;
  const avgAPY = stats.currentAPY;
  const lastDistribution = '1d ago';
  
  // Distribution stats
  const totalDistributions = stats.distributionCount;
  const distributionFrequency = 'Every 2-3 days';
  const avgDistributionAmount = stats.totalDistributed / stats.distributionCount;
  const totalRecipients = 1247;
  const activeNodes = 259;
  
  // Distribution events (mock timeline) - 13 events totaling $62,560
  const distributionEvents = [
    { id: 1, date: '2026-01-18T14:22:00Z', amount: 842.11, recipients: 259, txHash: '5xR2...Kp9L' },
    { id: 2, date: '2026-01-16T14:22:00Z', amount: 798.45, recipients: 258, txHash: '3jM7...vN8Q' },
    { id: 3, date: '2026-01-13T14:22:00Z', amount: 815.23, recipients: 256, txHash: '9wP4...Hx2D' },
    { id: 4, date: '2026-01-11T14:22:00Z', amount: 723.91, recipients: 254, txHash: '7kL3...Yx5F' },
    { id: 5, date: '2026-01-08T14:22:00Z', amount: 782.50, recipients: 251, txHash: '2nQ6...Bm4T' },
    { id: 6, date: '2026-01-06T14:22:00Z', amount: 7200.00, recipients: 248, txHash: '8pN2...Qr7W' },
    { id: 7, date: '2026-01-03T14:22:00Z', amount: 7100.00, recipients: 244, txHash: '4mK9...Ls3P' },
    { id: 8, date: '2026-01-01T14:22:00Z', amount: 7450.00, recipients: 240, txHash: '6tH5...Nv8M' },
    { id: 9, date: '2025-12-29T14:22:00Z', amount: 7650.00, recipients: 235, txHash: '1rD4...Cj2X' },
    { id: 10, date: '2025-12-27T14:22:00Z', amount: 7300.00, recipients: 230, txHash: '9vB7...Fp6K' },
    { id: 11, date: '2025-12-24T14:22:00Z', amount: 7250.00, recipients: 224, txHash: '3wS1...Hm9R' },
    { id: 12, date: '2025-12-22T14:22:00Z', amount: 7400.00, recipients: 218, txHash: '7zX3...Dt5Y' },
    { id: 13, date: '2025-12-19T14:22:00Z', amount: 7247.80, recipients: 212, txHash: '2qF8...Vn4L' },
  ];

  // Assets breakdown
  const assetsBreakdown = [
    { category: 'Blue Chips', percentage: 60, apy: '28-35%', examples: 'WIF, BONK, POPCAT' },
    { category: 'Underdogs', percentage: 30, apy: '30-38%', examples: 'BOME, PENGU, PUMP' },
    { category: 'Rising Stars', percentage: 10, apy: '35-45%', examples: 'FARTCOIN, WOJAK' },
  ];

  // Chart 1: APY Performance History (30 days)
  const apyHistoryData = [
    { date: 'Dec 22', apy: 31.2 },
    { date: 'Dec 25', apy: 32.1 },
    { date: 'Dec 28', apy: 33.5 },
    { date: 'Dec 31', apy: 32.8 },
    { date: 'Jan 3', apy: 34.2 },
    { date: 'Jan 6', apy: 33.9 },
    { date: 'Jan 9', apy: 35.1 },
    { date: 'Jan 12', apy: 34.5 },
    { date: 'Jan 15', apy: 35.8 },
    { date: 'Jan 18', apy: 34.5 },
  ];

  // Chart 2: Yield Sources Breakdown
  const yieldSourcesData = [
    { name: 'Buy Fee (10%)', value: 70, color: '#E9C774', amount: 43792 },
    { name: 'Sell Fee (10%)', value: 10, color: '#F27783', amount: 6256 },
    { name: 'Onchain Yield', value: 20, color: '#4B80CB', amount: 12512 },
  ];

  // Chart 3: Weekly Distribution Trends (8 weeks)
  const weeklyDistributionData = [
    { week: 'Week 1', amount: 0 },
    { week: 'Week 2', amount: 0 },
    { week: 'Week 3', amount: 7247.80 },
    { week: 'Week 4', amount: 14650.00 },
    { week: 'Week 5', amount: 14950.00 },
    { week: 'Week 6', amount: 14550.00 },
    { week: 'Week 7', amount: 8706.41 },
    { week: 'Week 8', amount: 2455.79 },
  ];

  // Custom Tooltip Components
  const CustomTooltip = ({ active, payload, label }: any) => {
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
            {payload[0].name === 'apy' ? `${payload[0].value}%` : `$${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
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
              fontSize: '13px',
              color: 'var(--seasons-text-tertiary)',
              fontFeatureSettings: "'tnum' 1",
            }}
          >
            ${data.amount.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="display-md mb-2">
          Yield Overview
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--seasons-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          Platform-wide yield distribution statistics and performance metrics
        </p>
      </div>

      {/* YIELD OVERVIEW Section */}
      <div
        className="p-6 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
        }}
      >
        <h2 className="mb-6">
          Yield Overview
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Yield Distributed (Network) */}
          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.1), rgba(242, 119, 131, 0.1))',
                }}
              >
                <DollarSign size={18} style={{ color: 'var(--seasons-brand-grad-start)' }} />
              </div>
              <span
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                }}
              >
                Yield Distributed
              </span>
            </div>
            <div
              className="mb-1"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: '1',
                color: 'var(--seasons-text-primary)',
              }}
            >
              ${networkYieldDistributed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
              }}
            >
              Network-wide earnings
            </div>
          </div>

          {/* Your Yield (Wallet) */}
          {isConnected ? (
            <div
              className="p-5 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.05), rgba(75, 128, 203, 0.05))',
                border: '1px solid rgba(96, 211, 148, 0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: 'rgba(96, 211, 148, 0.1)',
                  }}
                >
                  <Zap size={18} style={{ color: 'var(--seasons-success)' }} />
                </div>
                <span
                  style={{
                    color: 'var(--seasons-text-tertiary)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: 600,
                  }}
                >
                  Your Yield
                </span>
              </div>
              <div
                className="mb-1"
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: '1',
                  color: 'var(--seasons-success)',
                }}
              >
                ${userYield.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '11px',
                }}
              >
                Personal lifetime earnings
              </div>
            </div>
          ) : (
            <div
              className="p-5 rounded-lg"
              style={{
                background: 'var(--seasons-bg-card)',
                border: '1px solid var(--seasons-border-hair)',
                opacity: 0.6,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: 'rgba(180, 75, 203, 0.1)',
                  }}
                >
                  <Zap size={18} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
                </div>
                <span
                  style={{
                    color: 'var(--seasons-text-tertiary)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: 600,
                  }}
                >
                  Your Yield
                </span>
              </div>
              <div
                className="mb-1"
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: '1',
                  color: 'var(--seasons-text-primary)',
                }}
              >
                —
              </div>
              <div
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '11px',
                }}
              >
                Connect wallet to view
              </div>
            </div>
          )}

          {/* Average Expected APY */}
          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(180, 75, 203, 0.1), rgba(75, 128, 203, 0.1))',
                }}
              >
                <TrendingUp size={18} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
              </div>
              <span
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                }}
              >
                Average APY
              </span>
            </div>
            <div
              className="mb-1"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: '1',
                color: 'var(--seasons-text-primary)',
              }}
            >
              {avgAPY}%<sup style={{ fontSize: '0.5em', marginLeft: '2px' }}>*</sup>
            </div>
            <div
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
              }}
            >
              * Calculated based on 30-day period
            </div>
          </div>

          {/* Last Distribution */}
          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'rgba(75, 128, 203, 0.1)',
                }}
              >
                <Clock size={18} style={{ color: 'var(--seasons-brand-grad-end)' }} />
              </div>
              <span
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                }}
              >
                Last Distribution
              </span>
            </div>
            <div
              className="mb-1"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: '1',
                color: 'var(--seasons-text-primary)',
              }}
            >
              {lastDistribution}
            </div>
            <div
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
              }}
            >
              Latest yield snapshot
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION - NEW! */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: APY Performance History */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
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
              <AreaChart data={apyHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

        {/* Chart 2: Yield Sources Breakdown */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
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
                  data={yieldSourcesData}
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
      </div>

      {/* Chart 3: Weekly Distribution Trends - Full Width */}
      <div
        className="p-6 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
        }}
      >
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
            <BarChart data={weeklyDistributionData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
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

      {/* YIELD DISTRIBUTION Section */}
      <div
        className="p-6 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
        }}
      >
        <h2 className="mb-6">
          Yield Distribution
        </h2>

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
              ${avgDistributionAmount.toFixed(2)}
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

          {/* Events Table */}
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
                {distributionEvents.map((event, index) => (
                  <tr
                    key={event.id}
                    className="hover:bg-white/5 transition-colors"
                    style={{
                      borderBottom: index < distributionEvents.length - 1 ? '1px solid var(--seasons-border-hair)' : 'none',
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
                        ${event.amount.toFixed(2)}
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
        </div>
      </div>
    </div>
  );
}