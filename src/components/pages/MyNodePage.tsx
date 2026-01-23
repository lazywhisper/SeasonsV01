import { useState } from 'react';
import { NodeStatusCard } from '../dashboard/NodeStatusCard';
import { MyNodePageProps } from './my-node/types';
import { BuySeasModal } from './my-node/BuySeasModal';
import { ActivationBenefits } from './my-node/ActivationBenefits';
import { NodeEarningsCards } from './my-node/NodeEarningsCards';
import { NodeEarningsChart } from './my-node/NodeEarningsChart';
import { WeeklyEarningsChart } from './my-node/WeeklyEarningsChart';
import { NodeStatusInfo } from './my-node/NodeStatusInfo';
import { YieldHistoryTable } from './my-node/YieldHistoryTable';

export function MyNodePage({ nodeData, onBuySeas }: MyNodePageProps) {
  const [showSwapModal, setShowSwapModal] = useState(false);

  const REQUIRED_BALANCE = 10000;

  return (
    <div className="space-y-6">
      {/* Buy $SEAS Modal */}
      <BuySeasModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
      />

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

      {/* Show activation benefits for inactive/partial states */}
      {nodeData.nodeStatus !== 'active' && nodeData.seasBalance > 0 && nodeData.seasBalance < REQUIRED_BALANCE && (
        <ActivationBenefits />
      )}

      {/* Active Node Stats - Only show when node is active */}
      {nodeData.nodeStatus === 'active' && (
        <>
          {/* Earnings Stats */}
          <NodeEarningsCards nodeData={nodeData} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NodeEarningsChart nodeData={nodeData} />
            <WeeklyEarningsChart nodeData={nodeData} />
          </div>

          {/* Node Status Info */}
          <NodeStatusInfo nodeData={nodeData} />

          {/* Yield History */}
          <YieldHistoryTable yieldHistory={nodeData.yieldHistory} />
        </>
      )}
    </div>
  );
}
