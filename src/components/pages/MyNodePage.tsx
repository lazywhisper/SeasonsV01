import { Zap, AlertCircle, TrendingUp, Trophy, Percent, Share2, Clock, CheckCircle, ExternalLink, Calendar, BarChart as BarChartIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { UserNode } from '../../lib/mockData';
import { useState } from 'react';
import { Progress } from '../ui/progress';
import { NodeStatusCard } from '../dashboard/NodeStatusCard';
import { JupiterSwapWidget } from '../dashboard/JupiterSwapWidget';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface MyNodePageProps {
  nodeData: UserNode;
  onBuySeas: () => void;
}

export function MyNodePage({ nodeData, onBuySeas }: MyNodePageProps) {
  const [hoverBuy, setHoverBuy] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);

  const REQUIRED_BALANCE = 10000;
  const progressPercent = Math.min((nodeData.seasBalance / REQUIRED_BALANCE) * 100, 100);
  const remaining = Math.max(REQUIRED_BALANCE - nodeData.seasBalance, 0);

  return (
    <div className="space-y-6">
      {/* Buy $SEAS Modal */}
      {showSwapModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => setShowSwapModal(false)}
        >
          <div
            className="relative max-w-[480px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <JupiterSwapWidget onClose={() => setShowSwapModal(false)} />
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="display-md mb-2">
          My Node
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--seasons-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          Manage your node activation and track earnings
        </p>
      </div>

      {/* NodeStatusCard - Shows all three states */}
      <NodeStatusCard
        isConnected={true}
        seasBalance={nodeData.seasBalance}
        onConnectWallet={() => {}}
        onBuySeas={() => setShowSwapModal(true)}
      />

      {/* Show additional sections only for inactive/partial states */}
      {nodeData.nodeStatus !== 'active' && nodeData.seasBalance > 0 && nodeData.seasBalance < REQUIRED_BALANCE && (
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <h2
            className="mb-4"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--seasons-text-primary)',
            }}
          >
            Once Activated, You'll Get:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div
                className="mt-1 p-1.5 rounded"
                style={{
                  background: 'rgba(96, 211, 148, 0.1)',
                }}
              >
                <TrendingUp size={16} style={{ color: 'var(--seasons-success)' }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  34.5% APY<sup style={{ fontSize: '0.6em', marginLeft: '2px' }}>*</sup>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  * Based on 30-day rolling period
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="mt-1 p-1.5 rounded"
                style={{
                  background: 'rgba(233, 199, 116, 0.1)',
                }}
              >
                <Trophy size={16} style={{ color: 'var(--seasons-brand-grad-start)' }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  Onchain Rewards
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Earn from curated memecoin portfolio
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="mt-1 p-1.5 rounded"
                style={{
                  background: 'rgba(180, 75, 203, 0.1)',
                }}
              >
                <Share2 size={16} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  Auto-Balanced
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Portfolio optimized across 3 tiers
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="mt-1 p-1.5 rounded"
                style={{
                  background: 'rgba(75, 128, 203, 0.1)',
                }}
              >
                <Zap size={16} style={{ color: 'var(--seasons-brand-grad-end)' }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  Instant Activation
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Start earning immediately
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Node Stats - Only show when node is active */}
      {nodeData.nodeStatus === 'active' && (
        <>
          {/* Earnings Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'var(--seasons-bg-elev)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.1), rgba(75, 128, 203, 0.1))',
                  }}
                >
                  <Zap size={18} style={{ color: 'var(--seasons-success)' }} />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="label-md cursor-help">
                        Latest Reward
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Most recent yield distribution to your wallet</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="metric-xl mb-2">
                ${nodeData.earnedToday.toFixed(2)}
              </div>
              <div className="flex items-center gap-1.5 label-sm">
                <Calendar size={12} />
                <span>
                  {new Date(nodeData.yieldHistory[0].date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            <div
              className="p-6 rounded-xl"
              style={{
                background: 'var(--seasons-bg-elev)',
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
                  <Trophy size={18} style={{ color: 'var(--seasons-brand-grad-start)' }} />
                </div>
                <span className="label-md">
                  Total Earned
                </span>
              </div>
              <div className="metric-xl mb-2">
                ${nodeData.earnedTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="label-sm">
                Lifetime rewards
              </div>
            </div>

            <div
              className="p-6 rounded-xl"
              style={{
                background: 'var(--seasons-bg-elev)',
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
                  <Percent size={18} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="label-md cursor-help">
                        Node weight
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Your percentage of total yield distribution</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="metric-xl mb-2">
                {nodeData.shareOfPool.toFixed(2)}%
              </div>
              <div className="label-sm">
                Based on your $SEAS balance
              </div>
            </div>
          </div>

          {/* CHARTS SECTION - NEW! */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Cumulative Earnings */}
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
                  Cumulative Earnings (30d)
                </h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={nodeData.yieldHistory.slice(0, 10).reverse().map((entry, idx) => ({
                      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                      total: nodeData.yieldHistory.slice(0, 10).reverse().slice(0, idx + 1).reduce((sum, e) => sum + e.amount, 0),
                    }))}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
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
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <RechartsTooltip
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
                                ${payload[0].value.toFixed(2)}
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

            {/* Chart 2: This Week's Earnings */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'var(--seasons-bg-elev)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
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
                  <BarChart
                    data={nodeData.yieldHistory.slice(0, 7).map((entry) => ({
                      day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
                      amount: entry.amount,
                    })).reverse()}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
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
                    <RechartsTooltip
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
          </div>

          {/* Info Panel */}
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

          {/* Yield History */}
          {nodeData.yieldHistory && nodeData.yieldHistory.length > 0 && (
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'var(--seasons-bg-elev)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
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
                  Last {nodeData.yieldHistory.length} distributions
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
                    {nodeData.yieldHistory.map((entry, index) => (
                      <tr
                        key={index}
                        className="hover:bg-white/5 transition-colors"
                        style={{ borderBottom: index < nodeData.yieldHistory!.length - 1 ? '1px solid var(--seasons-border-hair)' : 'none' }}
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
                            +${entry.amount.toFixed(2)}
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
          )}
        </>
      )}
    </div>
  );
}