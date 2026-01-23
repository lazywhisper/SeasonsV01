import React, { useState } from 'react';
import { Zap, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { PLATFORM } from '../../constants/platform';
import { formatters } from '../../utils/formatters';
import { cardStyles, textStyles, badgeStyles } from '../../styles/cardStyles';

interface NodeStatusCardProps {
  isConnected: boolean;
  seasBalance: number;
  onConnectWallet: () => void;
  onBuySeas: () => void;
}

export function NodeStatusCard({ 
  isConnected, 
  seasBalance, 
  onConnectWallet, 
  onBuySeas 
}: NodeStatusCardProps) {
  const progressPercent = Math.min((seasBalance / PLATFORM.NODE.ACTIVATION_THRESHOLD) * 100, 100);
  const remainingTokens = Math.max(PLATFORM.NODE.ACTIVATION_THRESHOLD - seasBalance, 0);

  // STATE 1: Wallet Not Connected
  if (!isConnected) {
    return (
      <div
        className="rounded-2xl p-8 md:p-10"
        style={cardStyles.elevated}
      >
        <div className="text-center max-w-2xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={badgeStyles.inactive}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--seasons-text-tertiary)' }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--seasons-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Node Inactive
            </span>
          </div>

          {/* Title */}
          <h2 className="display-md mb-3">
            Power Up Your Yield Engine
          </h2>

          {/* Description */}
          <p
            className="mb-6 max-w-xl mx-auto"
            style={{
              fontSize: '14px',
              color: 'var(--seasons-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            Become a Seasons Node. Hold 10,000+ $SEAS. Earn sustainable alternative yield in any market condition, powered by real activity and transaction fees. No staking. No lock-ups.
          </p>

          {/* CTA Button */}
          <Button
            onClick={onConnectWallet}
            size="lg"
            className="relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 32px',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                transition: 'opacity 0.5s ease',
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Zap size={16} />
              Connect Wallet
            </span>
          </Button>
        </div>
      </div>
    );
  }

  // STATE 2: Connected but < 10,000 tokens
  if (seasBalance < PLATFORM.NODE.ACTIVATION_THRESHOLD) {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.03), rgba(242, 119, 131, 0.03))',
          border: '1px solid var(--seasons-border-hair)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Premium gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle at top right, rgba(233, 199, 116, 0.15), transparent 50%)',
          }}
        />
        
        <div className="relative p-5 md:p-6">
          {/* Decorative corner accents */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-40 pointer-events-none"
            style={{
              background: seasBalance === 0 
                ? 'radial-gradient(circle at top right, rgba(172, 169, 169, 0.15), transparent 60%)'
                : 'radial-gradient(circle at top right, rgba(233, 199, 116, 0.2), transparent 60%)',
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-24 h-24 opacity-30 pointer-events-none"
            style={{
              background: seasBalance === 0
                ? 'radial-gradient(circle at bottom left, rgba(172, 169, 169, 0.1), transparent 60%)'
                : 'radial-gradient(circle at bottom left, rgba(242, 119, 131, 0.15), transparent 60%)',
            }}
          />

          <div className="relative flex flex-col gap-4">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Premium Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                  style={{
                    background: seasBalance === 0
                      ? 'linear-gradient(135deg, rgba(172, 169, 169, 0.1), rgba(172, 169, 169, 0.1))'
                      : 'linear-gradient(135deg, rgba(233, 199, 116, 0.15), rgba(242, 119, 131, 0.15))',
                    border: seasBalance === 0
                      ? '1px solid rgba(172, 169, 169, 0.2)'
                      : '1px solid rgba(233, 199, 116, 0.3)',
                    boxShadow: seasBalance === 0
                      ? '0 4px 16px rgba(172, 169, 169, 0.1)'
                      : '0 4px 16px rgba(233, 199, 116, 0.2)',
                  }}
                >
                  <TrendingUp 
                    size={22} 
                    style={{ 
                      color: seasBalance === 0 
                        ? 'var(--seasons-text-tertiary)' 
                        : 'var(--seasons-brand-grad-start)' 
                    }} 
                  />
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-50 blur-sm"
                    style={{
                      background: seasBalance === 0
                        ? 'linear-gradient(135deg, rgba(172, 169, 169, 0.2), rgba(172, 169, 169, 0.2))'
                        : 'linear-gradient(135deg, rgba(233, 199, 116, 0.3), rgba(242, 119, 131, 0.3))',
                    }}
                  />
                </div>
                
                <div>
                  {/* Premium Badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-1.5"
                    style={{
                      background: seasBalance === 0
                        ? 'rgba(172, 169, 169, 0.08)'
                        : 'linear-gradient(135deg, rgba(233, 199, 116, 0.12), rgba(242, 119, 131, 0.12))',
                      border: seasBalance === 0
                        ? '1px solid rgba(172, 169, 169, 0.15)'
                        : '1px solid rgba(233, 199, 116, 0.3)',
                      boxShadow: seasBalance === 0
                        ? '0 2px 8px rgba(172, 169, 169, 0.1)'
                        : '0 2px 8px rgba(233, 199, 116, 0.15)',
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ 
                        background: seasBalance === 0
                          ? 'var(--seasons-text-tertiary)'
                          : 'var(--seasons-brand-grad-start)' 
                      }}
                    />
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        color: seasBalance === 0
                          ? 'var(--seasons-text-tertiary)'
                          : 'var(--seasons-brand-grad-start)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                      }}
                    >
                      {seasBalance === 0 ? 'Node Inactive' : 'Activation In Progress'}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mb-0" style={{ color: 'var(--seasons-text-primary)' }}>
                    Complete Your Node
                  </h2>
                </div>
              </div>

              {/* Threshold Card - Top Right */}
              <div
                className="p-3 rounded-lg text-center relative overflow-hidden"
                style={{
                  background: 'var(--seasons-bg-card)',
                  border: seasBalance === 0
                    ? '1px solid rgba(172, 169, 169, 0.15)'
                    : '1px solid rgba(233, 199, 116, 0.2)',
                  minWidth: '120px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Decorative gradient line on top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: seasBalance === 0
                      ? 'rgba(172, 169, 169, 0.3)'
                      : 'linear-gradient(90deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
                  }}
                />
                <div
                  className="mb-0.5"
                  style={{
                    fontSize: '9px',
                    color: 'var(--seasons-text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    fontWeight: 600,
                  }}
                >
                  $SEAS REQUIRED
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    fontFeatureSettings: "'tnum' 1",
                    backgroundImage: seasBalance === 0
                      ? 'none'
                      : 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
                    WebkitBackgroundClip: seasBalance === 0 ? 'unset' : 'text',
                    WebkitTextFillColor: seasBalance === 0 ? 'var(--seasons-text-tertiary)' : 'transparent',
                    backgroundClip: seasBalance === 0 ? 'unset' : 'text',
                    color: seasBalance === 0 ? 'var(--seasons-text-tertiary)' : 'unset',
                    lineHeight: '1.1',
                  }}
                >
                  10,000
                </div>
              </div>
            </div>

            {/* Decorative divider */}
            <div 
              className="h-px my-1"
              style={{
                background: seasBalance === 0
                  ? 'linear-gradient(90deg, transparent, rgba(172, 169, 169, 0.15), rgba(172, 169, 169, 0.15), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(233, 199, 116, 0.2), rgba(242, 119, 131, 0.2), transparent)',
              }}
            />

            {/* Balance & Progress Section */}
            <div className="space-y-3">
              {/* Current Balance */}
              <div className="flex items-baseline justify-between">
                <div>
                  <div
                    className="mb-1"
                    style={{
                      fontSize: '10px',
                      color: 'var(--seasons-text-tertiary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                      fontWeight: 600,
                    }}
                  >
                    Current Balance
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--seasons-text-primary)',
                        fontFamily: 'Inter, sans-serif',
                        fontFeatureSettings: "'tnum' 1",
                        letterSpacing: '-0.01em',
                        lineHeight: '1',
                      }}
                    >
                      {formatters.number(seasBalance)} $SEAS
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--seasons-text-secondary)',
                      fontWeight: 500,
                    }}
                  >
                    Activation Progress
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-1 h-1 rounded-full"
                      style={{ 
                        background: seasBalance === 0
                          ? 'var(--seasons-text-tertiary)'
                          : 'var(--seasons-brand-grad-start)' 
                      }}
                    />
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        fontFeatureSettings: "'tnum' 1",
                        backgroundImage: seasBalance === 0
                          ? 'none'
                          : 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
                        WebkitBackgroundClip: seasBalance === 0 ? 'unset' : 'text',
                        WebkitTextFillColor: seasBalance === 0 ? 'var(--seasons-text-tertiary)' : 'transparent',
                        backgroundClip: seasBalance === 0 ? 'unset' : 'text',
                        color: seasBalance === 0 ? 'var(--seasons-text-tertiary)' : 'unset',
                      }}
                    >
                      {formatters.percentage(progressPercent, 1)}
                    </span>
                  </div>
                </div>
                <div
                  className="relative h-2.5 rounded-full overflow-hidden"
                  style={{
                    background: 'var(--seasons-bg-progress)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${progressPercent}%`,
                      background: seasBalance === 0
                        ? 'rgba(172, 169, 169, 0.3)'
                        : 'linear-gradient(90deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2))',
                      boxShadow: seasBalance === 0
                        ? 'none'
                        : `0 0 12px rgba(233, 199, 116, 0.5)`,
                    }}
                  />
                  {/* Animated shimmer effect */}
                  {seasBalance > 0 && (
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                        animation: 'shimmer 2s infinite',
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Remaining Info + CTA */}
              <div className="flex items-center justify-between pt-1">
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.5',
                    maxWidth: '400px',
                  }}
                >
                  Need <span style={{ fontWeight: 700, fontFeatureSettings: "'tnum' 1", color: 'var(--seasons-text-primary)' }}>{formatters.number(remainingTokens)} $SEAS</span> to activate
                </p>

                <Button
                  onClick={onBuySeas}
                  size="lg"
                  className="relative overflow-hidden group ml-3 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    padding: '10px 24px',
                    boxShadow: '0 4px 20px rgba(233, 199, 116, 0.35)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                      transition: 'opacity 0.5s ease',
                    }}
                  />
                  <span className="relative z-10">
                    Buy $SEAS
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STATE 3: Active Node (>= 10,000 tokens)
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.03), rgba(75, 128, 203, 0.03))',
        border: '1px solid rgba(96, 211, 148, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Premium gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at top right, rgba(96, 211, 148, 0.15), transparent 50%)',
        }}
      />
      
      <div className="relative p-5 md:p-6">
        {/* Decorative corner accents */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(96, 211, 148, 0.2), transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-24 h-24 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at bottom left, rgba(75, 128, 203, 0.15), transparent 60%)',
          }}
        />

        <div className="relative flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Premium Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.15), rgba(75, 128, 203, 0.15))',
                  border: '1px solid rgba(96, 211, 148, 0.3)',
                  boxShadow: '0 4px 16px rgba(96, 211, 148, 0.25)',
                }}
              >
                <CheckCircle size={22} style={{ color: 'var(--seasons-success)' }} />
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-50 blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.3), rgba(75, 128, 203, 0.3))',
                  }}
                />
              </div>
              
              <div>
                {/* Premium Badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-1.5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.12), rgba(75, 128, 203, 0.12))',
                    border: '1px solid rgba(96, 211, 148, 0.3)',
                    boxShadow: '0 2px 8px rgba(96, 211, 148, 0.2)',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: 'var(--seasons-success)' }}
                  />
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'var(--seasons-success)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                    }}
                  >
                    Node Active
                  </span>
                </div>
                <h2 className="text-lg font-semibold mb-0" style={{ color: 'var(--seasons-text-primary)' }}>
                  Earning Onchain Yield
                </h2>
              </div>
            </div>

            {/* Balance Card - Top Right */}
            <div
              className="p-3 rounded-lg text-center relative overflow-hidden"
              style={{
                background: 'var(--seasons-bg-card)',
                border: '1px solid rgba(96, 211, 148, 0.2)',
                minWidth: '120px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
              }}
            >
              {/* Decorative gradient line on top */}
              <div 
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, var(--seasons-success), #4B80CB)',
                }}
              />
              <div
                className="mb-0.5"
                style={{
                  fontSize: '9px',
                  color: 'var(--seasons-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  fontWeight: 600,
                }}
              >
                $SEAS BALANCE
              </div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  fontFeatureSettings: "'tnum' 1",
                  backgroundImage: 'linear-gradient(135deg, var(--seasons-success), #4B80CB)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.1',
                }}
              >
                {formatters.number(seasBalance)}
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          <div 
            className="h-px my-1"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(96, 211, 148, 0.2), rgba(75, 128, 203, 0.2), transparent)',
            }}
          />

          {/* Status Info Section */}
          <div className="space-y-3">
            {/* Status Message */}
            <div className="flex items-baseline justify-between">
              <div>
                <div
                  className="mb-1"
                  style={{
                    fontSize: '10px',
                    color: 'var(--seasons-text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    fontWeight: 600,
                  }}
                >
                  Node Status
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--seasons-text-primary)',
                      letterSpacing: '-0.01em',
                      lineHeight: '1',
                    }}
                  >
                    Active & Earning
                  </span>
                </div>
              </div>
            </div>

            {/* Active Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--seasons-text-secondary)',
                    fontWeight: 500,
                  }}
                >
                  Node Activation
                </span>
                <div className="flex items-center gap-1.5">
                  <div 
                    className="w-1 h-1 rounded-full"
                    style={{ background: 'var(--seasons-success)' }}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      fontFeatureSettings: "'tnum' 1",
                      backgroundImage: 'linear-gradient(135deg, var(--seasons-success), #4B80CB)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    100%
                  </span>
                </div>
              </div>
              <div
                className="relative h-2.5 rounded-full overflow-hidden"
                style={{
                  background: 'var(--seasons-bg-progress)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out w-full"
                  style={{
                    background: 'linear-gradient(90deg, var(--seasons-success), #4B80CB)',
                    boxShadow: `0 0 12px rgba(96, 211, 148, 0.5)`,
                  }}
                />
                {/* Animated shimmer effect */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'shimmer 2s infinite',
                  }}
                />
              </div>
            </div>

            {/* Info + CTA */}
            <div className="flex items-center justify-between pt-1">
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--seasons-text-secondary)',
                  lineHeight: '1.5',
                  maxWidth: '400px',
                }}
              >
                Your node is active. <span style={{ fontWeight: 700, color: 'var(--seasons-text-primary)' }}>Rewards are automatically distributed</span> to your wallet.
              </p>

              <Button
                onClick={onBuySeas}
                size="lg"
                className="relative overflow-hidden group ml-3 flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '10px 24px',
                  boxShadow: '0 4px 20px rgba(233, 199, 116, 0.35)',
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                  }}
                />
                <span className="relative z-10">
                  Buy $SEAS
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}