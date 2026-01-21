import { Zap, AlertCircle, TrendingUp, Trophy, Percent, Share2, Clock, CheckCircle, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { UserNode } from '../../lib/mockData';
import { useState } from 'react';
import { Progress } from '../ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface MyNodePageProps {
  nodeData: UserNode;
  onBuySeas: () => void;
}

export function MyNodePage({ nodeData, onBuySeas }: MyNodePageProps) {
  const [hoverBuy, setHoverBuy] = useState(false);

  const REQUIRED_BALANCE = 10000;
  const progressPercent = Math.min((nodeData.seasBalance / REQUIRED_BALANCE) * 100, 100);
  const remaining = Math.max(REQUIRED_BALANCE - nodeData.seasBalance, 0);

  // State: no-tokens
  if (nodeData.nodeStatus === 'no-tokens') {
    return (
      <div className="max-w-4xl mx-auto">
        <div
          className="p-8 md:p-12 rounded-2xl text-center"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          {/* Icon */}
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.1), rgba(242, 119, 131, 0.1))',
            }}
          >
            <AlertCircle size={32} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
          </div>

          <h1 className="display-lg mb-3">
            No $SEAS Detected
          </h1>

          <p className="mb-8" style={{ fontSize: '15px', color: 'var(--seasons-text-secondary)', lineHeight: '1.6' }}>
            To activate your node and start earning onchain yield, you need to hold at least{' '}
            <span style={{ fontWeight: 600, color: 'var(--seasons-text-primary)' }}>
              10,000 $SEAS
            </span>{' '}
            in your connected wallet.
          </p>

          <Button
            onClick={onBuySeas}
            onMouseEnter={() => setHoverBuy(true)}
            onMouseLeave={() => setHoverBuy(false)}
            size="lg"
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              color: '#FFFFFF',
              border: 'none',
              padding: '16px 32px',
              fontSize: '16px',
            }}
          >
            <span
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                opacity: hoverBuy ? 1 : 0,
                transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Zap size={18} />
              Buy $SEAS to Activate Node
            </span>
          </Button>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div
              className="p-4 rounded-lg text-center"
              style={{
                background: 'var(--seasons-bg-card)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <div
                  style={{
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Current APY
                </div>
              </div>
              <div
                className="mb-2"
                style={{
                  fontSize: '40px',
                  fontWeight: 700,
                  lineHeight: '1',
                  color: 'var(--seasons-text-primary)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                34.5% APY
              </div>
            </div>

            <div
              className="p-4 rounded-lg text-center"
              style={{
                background: 'var(--seasons-bg-card)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <div
                className="mb-2"
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--seasons-text-primary)',
                }}
              >
                10,000
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--seasons-text-tertiary)',
                }}
              >
                Minimum $SEAS Required
              </div>
            </div>

            <div
              className="p-4 rounded-lg text-center"
              style={{
                background: 'var(--seasons-bg-card)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <div
                className="mb-2"
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--seasons-text-primary)',
                }}
              >
                Instant
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--seasons-text-tertiary)',
                }}
              >
                Activation Time
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State: insufficient
  if (nodeData.nodeStatus === 'insufficient') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Status Card */}
        <div
          className="p-8 rounded-2xl"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(242, 119, 131, 0.1), rgba(180, 75, 203, 0.1))',
              }}
            >
              <Clock size={24} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
            </div>
            <div>
              <h1 className="display-sm">
                Node Inactive
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--seasons-text-tertiary)',
                }}
              >
                Minimum balance not met
              </p>
            </div>
          </div>

          {/* Progress */}
          <div
            className="p-6 rounded-xl mb-6"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: 'var(--seasons-text-primary)',
                  }}
                >
                  {nodeData.seasBalance.toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Current $SEAS Balance
                </div>
              </div>
              <div className="text-right">
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'var(--seasons-brand-grad-mid1)',
                  }}
                >
                  {progressPercent.toFixed(0)}%
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Complete
                </div>
              </div>
            </div>

            <Progress 
              value={progressPercent}
              className="h-3 mb-3"
              style={{
                background: 'var(--seasons-bg-progress)',
              }}
            />

            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--seasons-text-secondary)',
                }}
              >
                Need {remaining.toLocaleString()} more $SEAS
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--seasons-text-primary)',
                }}
              >
                Goal: 10,000 $SEAS
              </span>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={onBuySeas}
            onMouseEnter={() => setHoverBuy(true)}
            onMouseLeave={() => setHoverBuy(false)}
            size="lg"
            className="w-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              color: '#FFFFFF',
              border: 'none',
              padding: '16px 32px',
              fontSize: '16px',
            }}
          >
            <span
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                opacity: hoverBuy ? 1 : 0,
                transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Zap size={18} />
              Buy More $SEAS to Activate
            </span>
          </Button>
        </div>

        {/* What You'll Get */}
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
                  31.2% APY
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Passive yield automatically distributed
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
                  Daily Rewards
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
      </div>
    );
  }

  // State: active
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Hero Status */}
      <div
        className="p-8 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.05), rgba(75, 128, 203, 0.05))',
          border: '1px solid var(--seasons-border-hair)',
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.2), rgba(75, 128, 203, 0.2))',
              }}
            >
              <CheckCircle size={32} style={{ color: 'var(--seasons-success)' }} />
            </div>
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2"
                style={{
                  background: 'rgba(96, 211, 148, 0.1)',
                  border: '1px solid rgba(96, 211, 148, 0.2)',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: 'var(--seasons-success)' }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--seasons-success)',
                  }}
                >
                  Node Active
                </span>
              </div>
              <h1 className="display-lg">
                Earning Onchain Yield
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--seasons-text-tertiary)',
                  marginTop: '4px',
                }}
              >
                Rewards automatically distributed to your wallet
              </p>
            </div>
          </div>

          <div
            className="p-6 rounded-xl text-center"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
              minWidth: '200px',
            }}
          >
            <div
              className="mb-1"
              style={{
                fontSize: '12px',
                color: 'var(--seasons-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              $SEAS Balance
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--seasons-text-primary)',
              }}
            >
              {nodeData.seasBalance.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

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
                    Share of Pool
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
            Based on your balance
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
                        {new Date(entry.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
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
    </div>
  );
}