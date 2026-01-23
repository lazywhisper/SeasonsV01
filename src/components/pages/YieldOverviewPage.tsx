import { mockPlatformStats } from '../../lib/mockData';
import { YieldOverviewPageProps } from './yield-overview/types';
import { apyHistoryData, yieldSourcesData, weeklyDistributionData, distributionEvents } from './yield-overview/mockData';
import { YieldStatsCards } from './yield-overview/YieldStatsCards';
import { APYPerformanceChart } from './yield-overview/APYPerformanceChart';
import { YieldSourcesChart } from './yield-overview/YieldSourcesChart';
import { WeeklyDistributionChart } from './yield-overview/WeeklyDistributionChart';
import { DistributionStats } from './yield-overview/DistributionStats';

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

      {/* Yield Stats Cards */}
      <YieldStatsCards
        networkYieldDistributed={networkYieldDistributed}
        userYield={userYield}
        avgAPY={avgAPY}
        lastDistribution={lastDistribution}
        isConnected={isConnected}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <APYPerformanceChart data={apyHistoryData} />
        <YieldSourcesChart data={yieldSourcesData} />
      </div>

      {/* Weekly Distribution Chart - Full Width */}
      <WeeklyDistributionChart data={weeklyDistributionData} />

      {/* Distribution Stats & Events Table */}
      <DistributionStats
        totalDistributions={totalDistributions}
        distributionFrequency={distributionFrequency}
        avgDistributionAmount={avgDistributionAmount}
        totalRecipients={totalRecipients}
        activeNodes={activeNodes}
        distributionEvents={distributionEvents}
      />
    </div>
  );
}
