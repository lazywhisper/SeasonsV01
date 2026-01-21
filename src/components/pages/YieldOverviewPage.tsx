import { TrendingUp, DollarSign, Users, Clock, ArrowUpRight, ExternalLink, Info, Zap, Activity, Calendar, BarChart3 } from 'lucide-react';
import { mockPlatformStats } from '../../lib/mockData';

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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
              {avgAPY}%
            </div>
            <div
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
              }}
            >
              Expected annual yield
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