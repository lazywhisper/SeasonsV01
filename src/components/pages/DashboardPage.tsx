import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Droplets, Zap, Trophy, Search } from 'lucide-react';
import { HeroYieldSummary } from '../dashboard/HeroYieldSummary';
import { YieldInfoPanel } from '../dashboard/YieldInfoPanel';
import { TokenInfoPanel } from '../dashboard/TokenInfoPanel';
import { PortfolioAutoBuilderMini } from '../dashboard/PortfolioAutoBuilderMini';
import { YieldTimeline } from '../dashboard/YieldTimeline';
import { RecentActivity } from '../dashboard/RecentActivity';
import { JupiterSwapWidget } from '../dashboard/JupiterSwapWidget';
import { PortfolioComposition } from '../dashboard/PortfolioComposition';
import { NodeStatusCard } from '../dashboard/NodeStatusCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { mockPlatformStats, mockWalletSummary, mockTimeline, mockActivity, mockAssets, mockLiveRewards } from '../../lib/mockData';
import type { Asset } from '../../types/asset';
import seasLogo from 'figma:asset/a05ba37d7326a8065a40e3c7ff0d46af03371b9e.png';

interface DashboardPageProps {
  isConnected: boolean;
  onConnectWallet: () => void;
  onBuySeas: () => void;
  onNavigate?: (page: string) => void;
}

export function DashboardPage({ isConnected, onConnectWallet, onBuySeas, onNavigate }: DashboardPageProps) {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [canRebalance, setCanRebalance] = useState(true);
  const [rebalancedWeights, setRebalancedWeights] = useState<{ blue: number; under: number; rising: number } | null>(null);
  const [hoverConnect, setHoverConnect] = useState(false);
  const [hoverBuy, setHoverBuy] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false); // Modal for Buy $SEAS
  
  // DEV: State switcher for testing Node Status Card states
  const [devNodeState, setDevNodeState] = useState<'disconnected' | 'partial' | 'active'>('disconnected');
  const [devSeasBalance, setDevSeasBalance] = useState(0);

  const handleRebalance = () => {
    if (!canRebalance) return;
    
    setIsRebalancing(true);
    
    // Simulate rebalancing process
    setTimeout(() => {
      const shuffled = [...assets].sort(() => Math.random() - 0.5);
      setAssets(shuffled);
      
      const totalWeight = shuffled.reduce((sum, asset) => sum + asset.weightPct, 0);
      
      const blueWeight = shuffled
        .filter(a => a.category === 'blue')
        .reduce((sum, a) => sum + a.weightPct, 0);
      
      const underWeight = shuffled
        .filter(a => a.category === 'under')
        .reduce((sum, a) => sum + a.weightPct, 0);
      
      const risingWeight = shuffled
        .filter(a => a.category === 'rising')
        .reduce((sum, a) => sum + a.weightPct, 0);
      
      setRebalancedWeights({
        blue: totalWeight > 0 ? (blueWeight / totalWeight) * 100 : 0,
        under: totalWeight > 0 ? (underWeight / totalWeight) * 100 : 0,
        rising: totalWeight > 0 ? (risingWeight / totalWeight) * 100 : 0,
      });
      
      setIsRebalancing(false);
      setCanRebalance(false);
    }, 2000);
  };

  const stats = mockPlatformStats;
  const liveRewards = mockLiveRewards;

  // Mock 30-day TVL growth data
  const tvlGrowthData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    tvl: 5200000 + (i * 60000) + Math.random() * 100000,
  }));

  // Calculate portfolio composition for preview
  const blueChipsAssets = assets.filter(a => a.category === 'blue');
  const underDogsAssets = assets.filter(a => a.category === 'under');
  const risingStarsAssets = assets.filter(a => a.category === 'rising');

  // WALLET NOT CONNECTED - Show public overview
  if (!isConnected) {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="display-md mb-2">
            Dashboard
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--seasons-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            Real-time yield, liquid in any market.
          </p>
        </div>

        {/* Node Status Card */}
        <NodeStatusCard
          isConnected={false}
          seasBalance={0}
          onConnectWallet={onConnectWallet}
          onBuySeas={onBuySeas}
        />

        {/* $SEAS Platform Statistics Section */}
        <div>
          <h2 className="mb-4">
            Project Metrics
          </h2>

          {/* Enhanced Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* APY - Enhanced */}
            <div
              className="group relative p-6 rounded-2xl overflow-hidden"
              style={{
                background: '#0f0d12',
                border: '1px solid rgba(172, 169, 169, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(96, 211, 148, 0.25)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(96, 211, 148, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(172, 169, 169, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient blur effect */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(96, 211, 148, 0.15), transparent)',
                  filter: 'blur(40px)',
                  opacity: 0.6,
                }}
              />
              
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, rgba(96, 211, 148, 0) 0%, rgba(96, 211, 148, 0.3) 40%, rgba(75, 128, 203, 0.3) 60%, rgba(75, 128, 203, 0) 100%)',
                }}
              />
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div
                  className="p-2.5 rounded-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.08), rgba(75, 128, 203, 0.08))',
                  }}
                >
                  <TrendingUp size={20} style={{ color: 'var(--seasons-success)' }} />
                </div>
                <span className="label-md" style={{ color: '#aca9a9' }}>
                  Current APY
                </span>
              </div>
              <div className="metric-xl mb-2 relative z-10">
                {stats.currentAPY}%<sup style={{ fontSize: '0.6em', marginLeft: '2px' }}>*</sup>
              </div>
              <p
                className="label-sm relative z-10"
                style={{
                  color: '#aca9a9',
                  fontSize: '11px',
                }}
              >
                * Based on 30-day rolling period
              </p>
            </div>

            {/* TVL - Enhanced */}
            <div
              className="group relative p-6 rounded-2xl overflow-hidden"
              style={{
                background: '#0f0d12',
                border: '1px solid rgba(172, 169, 169, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(233, 199, 116, 0.25)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(233, 199, 116, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(172, 169, 169, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient blur effect */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(233, 199, 116, 0.15), transparent)',
                  filter: 'blur(40px)',
                  opacity: 0.6,
                }}
              />
              
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, rgba(233, 199, 116, 0) 0%, rgba(233, 199, 116, 0.3) 40%, rgba(242, 119, 131, 0.3) 60%, rgba(242, 119, 131, 0) 100%)',
                }}
              />
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div
                  className="p-2.5 rounded-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.08), rgba(242, 119, 131, 0.08))',
                  }}
                >
                  <Droplets size={20} style={{ color: 'var(--seasons-brand-grad-start)' }} />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="label-md cursor-help" style={{ color: '#aca9a9' }}>
                        Liquidity
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Total value locked in liquidity pools</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="metric-xl mb-2 relative z-10">
                ${(stats.tvl / 1000000).toFixed(1)}M
              </div>
              <div className="label-sm relative z-10" style={{ color: '#aca9a9' }}>
                Total Value Locked
              </div>
            </div>

            {/* Active Nodes - Enhanced */}
            <div
              className="group relative p-6 rounded-2xl overflow-hidden"
              style={{
                background: '#0f0d12',
                border: '1px solid rgba(172, 169, 169, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(180, 75, 203, 0.25)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(180, 75, 203, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(172, 169, 169, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient blur effect */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(180, 75, 203, 0.15), transparent)',
                  filter: 'blur(40px)',
                  opacity: 0.6,
                }}
              />
              
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, rgba(180, 75, 203, 0) 0%, rgba(180, 75, 203, 0.3) 40%, rgba(75, 128, 203, 0.3) 60%, rgba(75, 128, 203, 0) 100%)',
                }}
              />
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div
                  className="p-2.5 rounded-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(180, 75, 203, 0.08), rgba(75, 128, 203, 0.08))',
                  }}
                >
                  <Users size={20} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />
                </div>
                <span className="label-md" style={{ color: '#aca9a9' }}>
                  Active Nodes
                </span>
              </div>
              <div className="metric-xl mb-2 relative z-10">
                {stats.activeNodes.toLocaleString()}
              </div>
              <div className="label-sm relative z-10" style={{ color: '#aca9a9' }}>
                of {stats.totalHolders.toLocaleString()} holders
              </div>
            </div>

            {/* Total Distributed - Enhanced */}
            <div
              className="group relative p-6 rounded-2xl overflow-hidden"
              style={{
                background: '#0f0d12',
                border: '1px solid rgba(172, 169, 169, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(242, 119, 131, 0.25)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 119, 131, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(172, 169, 169, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient blur effect */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(242, 119, 131, 0.15), transparent)',
                  filter: 'blur(40px)',
                  opacity: 0.6,
                }}
              />
              
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, rgba(242, 119, 131, 0) 0%, rgba(242, 119, 131, 0.3) 40%, rgba(180, 75, 203, 0.3) 60%, rgba(180, 75, 203, 0) 100%)',
                }}
              />
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div
                  className="p-2.5 rounded-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(242, 119, 131, 0.08), rgba(180, 75, 203, 0.08))',
                  }}
                >
                  <DollarSign size={20} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />
                </div>
                <span className="label-md" style={{ color: '#aca9a9' }}>
                  Yield Distributed
                </span>
              </div>
              <div className="metric-xl mb-2 relative z-10">
                ${(stats.totalDistributed / 1000).toFixed(1)}K
              </div>
              <div className="label-sm relative z-10" style={{ color: '#aca9a9' }}>
                {stats.distributionCount} distributions
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Market Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className="p-4 rounded-lg transition-all duration-300"
            style={{
              background: 'var(--seasons-bg-elev)',
              border: '1px solid var(--seasons-border-hair)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(233, 199, 116, 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="label-sm mb-1">
              Market Cap
            </div>
            <div className="metric-md">
              ${(stats.marketCap / 1000000).toFixed(0)}M
            </div>
          </div>

          <div
            className="p-4 rounded-lg transition-all duration-300"
            style={{
              background: 'var(--seasons-bg-elev)',
              border: '1px solid var(--seasons-border-hair)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = stats.priceChange24h > 0 ? 'rgba(96, 211, 148, 0.2)' : 'rgba(255, 107, 107, 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="label-sm mb-1">
              24h Change
            </div>
            <div
              className="metric-md flex items-center gap-1"
              style={{
                color: stats.priceChange24h > 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
              }}
            >
              {stats.priceChange24h > 0 ? '+' : ''}{stats.priceChange24h}%
              <TrendingUp size={16} />
            </div>
          </div>

          <div
            className="p-4 rounded-lg transition-all duration-300"
            style={{
              background: 'var(--seasons-bg-elev)',
              border: '1px solid var(--seasons-border-hair)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(75, 128, 203, 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="label-sm mb-1">
              24h Transactions
            </div>
            <div className="metric-md">
              {stats.transactions24h.toLocaleString()}
            </div>
          </div>

          <div
            className="p-4 rounded-lg transition-all duration-300"
            style={{
              background: 'var(--seasons-bg-elev)',
              border: '1px solid var(--seasons-border-hair)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(180, 75, 203, 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="label-sm mb-1">
              Total Transactions
            </div>
            <div className="metric-md">
              {stats.transactionsTotal.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Portfolio Composition - Full Widget */}
        <PortfolioComposition
          assets={assets}
        />

        {/* Live Rewards Feed (FOMO) */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1">
                Live Rewards Feed
              </h2>
              <p className="label-lg" style={{ textTransform: 'none' }}>
                Recent automatic distributions
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full label-md"
              style={{
                background: 'rgba(96, 211, 148, 0.08)',
                border: '1px solid rgba(96, 211, 148, 0.2)',
                color: 'var(--seasons-success)',
                textTransform: 'none',
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--seasons-success)' }}
              />
              {stats.activeNodes} nodes earning now
            </div>
          </div>

          <div className="space-y-2">
            {liveRewards.map((reward, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                style={{
                  background: 'var(--seasons-bg-card)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Trophy size={16} style={{ color: 'var(--seasons-brand-grad-start)' }} />
                  <div>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--seasons-text-primary)',
                      }}
                    >
                      {reward.address}
                    </span>
                    <span
                      style={{
                        fontSize: '14px',
                        color: 'var(--seasons-text-secondary)',
                        marginLeft: '8px',
                      }}
                    >
                      earned
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--seasons-success)',
                    }}
                  >
                    ${reward.amount.toFixed(2)}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--seasons-text-tertiary)',
                    }}
                  >
                    {reward.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="p-8 md:p-12 rounded-xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.05), rgba(242, 119, 131, 0.05), rgba(180, 75, 203, 0.05), rgba(75, 128, 203, 0.05))',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <h2 className="display-md mb-3">
            Ready to Start Earning?
          </h2>
          <p
            className="mb-6 max-w-xl mx-auto"
            style={{
              fontSize: '16px',
              color: 'var(--seasons-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            Join {stats.activeNodes.toLocaleString()} active nodes earning {stats.currentAPY}% APY through automated yield distribution
          </p>
          <Button
            onClick={onConnectWallet}
            onMouseEnter={() => setHoverConnect(true)}
            onMouseLeave={() => setHoverConnect(false)}
            size="lg"
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              color: '#FFFFFF',
              border: 'none',
              padding: '16px 32px',
              transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <span
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                opacity: hoverConnect ? 1 : 0,
                transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Zap size={18} />
              Connect Wallet to Start
            </span>
          </Button>
        </div>
      </div>
    );
  }

  // WALLET CONNECTED - Show personalized dashboard
  return (
    <>
      {/* Page Header with Buy $SEAS Button */}
      <div className="mb-8">
        <h1 className="display-md" style={{ marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--seasons-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          Real-time yield, liquid in any market.
        </p>
      </div>

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

      {/* Node Status Card */}
      <div className="mb-6">
        <NodeStatusCard
          isConnected={true}
          seasBalance={devSeasBalance}
          onConnectWallet={onConnectWallet}
          onBuySeas={() => setShowSwapModal(true)}
        />
        
        {/* DEV: State Switcher */}
        <div
          className="mt-4 p-4 rounded-lg"
          style={{
            background: 'rgba(242, 119, 131, 0.08)',
            border: '1px solid rgba(242, 119, 131, 0.2)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--seasons-brand-grad-mid1)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              🔧 Dev Controls (Remove in production)
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setDevSeasBalance(0)}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{
                background: devSeasBalance === 0 ? 'rgba(180, 75, 203, 0.2)' : 'rgba(172, 169, 169, 0.1)',
                border: '1px solid ' + (devSeasBalance === 0 ? 'rgba(180, 75, 203, 0.3)' : 'rgba(172, 169, 169, 0.2)'),
                color: devSeasBalance === 0 ? 'var(--seasons-brand-grad-mid2)' : 'var(--seasons-text-secondary)',
              }}
            >
              0 $SEAS (Inactive)
            </button>
            <button
              onClick={() => setDevSeasBalance(3500)}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{
                background: devSeasBalance === 3500 ? 'rgba(233, 199, 116, 0.2)' : 'rgba(172, 169, 169, 0.1)',
                border: '1px solid ' + (devSeasBalance === 3500 ? 'rgba(233, 199, 116, 0.3)' : 'rgba(172, 169, 169, 0.2)'),
                color: devSeasBalance === 3500 ? 'var(--seasons-brand-grad-start)' : 'var(--seasons-text-secondary)',
              }}
            >
              3,500 $SEAS (35%)
            </button>
            <button
              onClick={() => setDevSeasBalance(7250)}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{
                background: devSeasBalance === 7250 ? 'rgba(233, 199, 116, 0.2)' : 'rgba(172, 169, 169, 0.1)',
                border: '1px solid ' + (devSeasBalance === 7250 ? 'rgba(233, 199, 116, 0.3)' : 'rgba(172, 169, 169, 0.2)'),
                color: devSeasBalance === 7250 ? 'var(--seasons-brand-grad-start)' : 'var(--seasons-text-secondary)',
              }}
            >
              7,250 $SEAS (72.5%)
            </button>
            <button
              onClick={() => setDevSeasBalance(12500)}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{
                background: devSeasBalance >= 10000 ? 'rgba(96, 211, 148, 0.2)' : 'rgba(172, 169, 169, 0.1)',
                border: '1px solid ' + (devSeasBalance >= 10000 ? 'rgba(96, 211, 148, 0.3)' : 'rgba(172, 169, 169, 0.2)'),
                color: devSeasBalance >= 10000 ? 'var(--seasons-success)' : 'var(--seasons-text-secondary)',
              }}
            >
              12,500 $SEAS (Active)
            </button>
          </div>
          <Input
            type="number"
            value={devSeasBalance}
            onChange={(e) => setDevSeasBalance(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="Custom balance"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
              color: 'var(--seasons-text-primary)',
              fontSize: '13px',
            }}
          />
        </div>
      </div>

      {/* Yield Information Panel */}
      <div className="mb-4 md:mb-6">
        <YieldInfoPanel
          apy={stats.currentAPY}
          activeNodes={stats.activeNodes}
          yieldDistributed={stats.totalDistributed}
          isConnected={isConnected}
        />
      </div>

      {/* Token Information Panel */}
      <div className="mb-4 md:mb-6">
        <TokenInfoPanel
          marketCap={stats.marketCap}
          liquidity={stats.liquidity}
          price={stats.tokenPrice}
          change24h={stats.priceChange24h}
          txs24h={stats.transactions24h}
          totalTxs={stats.transactionsTotal}
          isConnected={isConnected}
        />
      </div>

      {/* Portfolio Auto Builder + Yield Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <PortfolioAutoBuilderMini assets={assets} onNavigate={onNavigate} />
        <YieldTimeline data={mockTimeline} isConnected={isConnected} />
      </div>

      {/* Jupiter Swap Widget + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <JupiterSwapWidget />
        <RecentActivity data={mockActivity} />
      </div>
    </>
  );
}