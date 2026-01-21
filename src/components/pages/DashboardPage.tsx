import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Droplets, Zap, Trophy, Search, ShoppingCart } from 'lucide-react';
import { HeroYieldSummary } from '../dashboard/HeroYieldSummary';
import { PortfolioAutoBuilderMini } from '../dashboard/PortfolioAutoBuilderMini';
import { YieldTimeline } from '../dashboard/YieldTimeline';
import { RecentActivity } from '../dashboard/RecentActivity';
import { JupiterSwapWidget } from '../dashboard/JupiterSwapWidget';
import { PortfolioComposition } from '../dashboard/PortfolioComposition';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { mockPlatformStats, mockWalletSummary, mockTimeline, mockActivity, mockAssets, mockLiveRewards } from '../../lib/mockData';
import type { Asset } from '../../types/asset';
import seasLogo from 'figma:asset/a05ba37d7326a8065a40e3c7ff0d46af03371b9e.png';
import bullBearBg from 'figma:asset/5aaff07d8bd5d75feacf4e30f2505b5714fb5bc0.png';

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

        {/* Hero Section */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.06), rgba(242, 119, 131, 0.08), rgba(180, 75, 203, 0.08), rgba(75, 128, 203, 0.06))',
            border: '1px solid transparent',
            backgroundClip: 'padding-box',
          }}
        >
          {/* Background Image - Bull & Bear (very subtle) */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: `url(${bullBearBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.30,
              pointerEvents: 'none',
            }}
          />

          {/* Gradient border */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.2), rgba(242, 119, 131, 0.2), rgba(180, 75, 203, 0.2), rgba(75, 128, 203, 0.2))',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '1px',
              pointerEvents: 'none',
            }}
          />

          {/* Enhanced gradient overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'radial-gradient(circle at 20% 20%, rgba(233, 199, 116, 0.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(180, 75, 203, 0.25), transparent 40%)',
            }}
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Enhanced Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 211, 148, 0.08), rgba(75, 128, 203, 0.08))',
                border: '1px solid rgba(96, 211, 148, 0.25)',
              }}
            >
              <Zap size={14} style={{ color: 'var(--seasons-success)' }} />
              <span className="label-lg" style={{ color: 'var(--seasons-success)' }}>
                {stats.distributionCount} Distributions • ${(stats.totalDistributed / 1000).toFixed(1)}K+ Paid Out
              </span>
            </div>

            <h1 className="display-xl mb-4">
              Bull Or Bear{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #E9C774, #F27783, #B44BCB, #4B80CB)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                We Don't Care
              </span>
            </h1>

            <p
              style={{
                color: 'var(--seasons-text-secondary)',
                fontSize: '18px',
                maxWidth: '680px',
                margin: '0 auto 32px',
                lineHeight: 1.5,
              }}
            >
              Earn alternative, onchain yield from real network activity. Powered by transaction fees and curated inclusion assets. Liquid in any market condition.
            </p>

            {/* Enhanced CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={onConnectWallet}
                onMouseEnter={() => setHoverConnect(true)}
                onMouseLeave={() => setHoverConnect(false)}
                size="lg"
                className="relative overflow-hidden text-base w-full sm:w-auto"
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
                  Connect Wallet to Start Earning
                </span>
              </Button>
            </div>

            {/* Social proof */}
            <p
              className="mt-6 text-sm"
              style={{
                color: 'var(--seasons-text-tertiary)',
              }}
            >
              Join <span style={{ color: 'var(--seasons-text-primary)', fontWeight: 600 }}>{stats.activeNodes.toLocaleString()}</span> active nodes earning onchain yield
            </p>
          </div>
        </div>

        {/* $SEAS Platform Statistics Section */}
        <div>
          <h2 className="mb-4">
            Project Metrics
          </h2>

          {/* Enhanced Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* APY - Enhanced */}
            <div
              className="group relative p-6 rounded-2xl transition-all duration-300 overflow-hidden"
              style={{
                background: '#0f0d12',
                border: '1px solid rgba(172, 169, 169, 0.1)',
                cursor: 'pointer',
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
                {stats.currentAPY}%
              </div>
              <div
                className="inline-flex items-center gap-1 px-2 py-1 rounded label-sm relative z-10"
                style={{
                  background: 'rgba(96, 211, 148, 0.1)',
                  color: 'var(--seasons-success)',
                }}
              >
                <TrendingUp size={10} />
                Live rate
              </div>
            </div>

            {/* TVL - Enhanced */}
            <div
              className="group relative p-6 rounded-2xl transition-all duration-300 overflow-hidden"
              style={{
                background: '#0f0d12',
                border: '1px solid rgba(172, 169, 169, 0.1)',
                cursor: 'pointer',
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
              className="group relative p-6 rounded-2xl transition-all duration-300 overflow-hidden"
              style={{
                background: '#0f0d12',
                border: '1px solid rgba(172, 169, 169, 0.1)',
                cursor: 'pointer',
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
              className="group relative p-6 rounded-2xl transition-all duration-300 overflow-hidden"
              style={{
                background: '#0f0d12',
                border: '1px solid rgba(172, 169, 169, 0.1)',
                cursor: 'pointer',
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
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
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
        
        {/* Buy $SEAS Button */}
        <div className="w-full max-w-[200px] hidden lg:block" style={{ marginTop: '0px' }}>
          <Button
            onClick={() => setShowSwapModal(true)}
            className="w-full h-10 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '10px',
              padding: '0 16px',
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ShoppingCart size={16} />
              Buy $SEAS
            </span>
          </Button>
        </div>
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

      {/* Hero Yield Summary */}
      <div className="mb-4 md:mb-6">
        <HeroYieldSummary
          data={mockWalletSummary}
          isConnected={isConnected}
          onBuySeas={onBuySeas}
        />
      </div>

      {/* Market Status - Platform & Token Stats */}
      <div
        className="mb-4 md:mb-6 p-5 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--seasons-success)' }}
            />
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Project Metrics
            </h3>
          </div>
          <div
            className="px-2 py-1 rounded text-xs"
            style={{
              background: 'rgba(96, 211, 148, 0.1)',
              color: 'var(--seasons-success)',
              fontWeight: 600,
            }}
          >
            Live
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* Current APY */}
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'var(--seasons-bg-base)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div
              className="mb-1 flex items-center gap-1"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}
            >
              <TrendingUp size={11} />
              APY
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--seasons-success)',
              }}
            >
              {stats.currentAPY}%
            </div>
          </div>

          {/* TVL */}
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'var(--seasons-bg-base)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div
              className="mb-1 flex items-center gap-1"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}
            >
              <Droplets size={11} />
              TVL
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--seasons-text-primary)',
              }}
            >
              ${(stats.tvl / 1000000).toFixed(1)}M
            </div>
          </div>

          {/* Market Cap */}
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'var(--seasons-bg-base)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div
              className="mb-1 flex items-center gap-1"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}
            >
              <DollarSign size={11} />
              MCap
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--seasons-text-primary)',
              }}
            >
              ${(stats.marketCap / 1000000).toFixed(0)}M
            </div>
          </div>

          {/* 24h Change */}
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'var(--seasons-bg-base)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div
              className="mb-1 flex items-center gap-1"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}
            >
              24h
            </div>
            <div
              className="flex items-center gap-1"
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: stats.priceChange24h > 0 ? 'var(--seasons-success)' : 'var(--seasons-error)',
              }}
            >
              {stats.priceChange24h > 0 ? '+' : ''}{stats.priceChange24h}%
            </div>
          </div>

          {/* Active Nodes */}
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'var(--seasons-bg-base)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div
              className="mb-1 flex items-center gap-1"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}
            >
              <Users size={11} />
              Nodes
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--seasons-text-primary)',
              }}
            >
              {stats.activeNodes}
            </div>
          </div>

          {/* Total Distributed */}
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'var(--seasons-bg-base)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div
              className="mb-1 flex items-center gap-1"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}
            >
              <Zap size={11} />
              Paid
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--seasons-text-primary)',
              }}
            >
              ${(stats.totalDistributed / 1000).toFixed(0)}K
            </div>
          </div>
        </div>
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