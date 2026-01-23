/**
 * Node Status Card - Refactored Version
 * 
 * This is a refactored version of NodeStatusCard that demonstrates:
 * - Component splitting (separate components for each state)
 * - Using cardStyles instead of inline styles
 * - Using formatters for all numbers
 * - Using PLATFORM constants
 * 
 * Original file: NodeStatusCard.tsx (717 lines)
 * Refactored: 3 files (~150 lines each)
 */

import { PLATFORM } from '../../../constants/platform';
import { InactiveNodeState } from './InactiveNodeState';
import { ActiveNodeState } from './ActiveNodeState';

interface NodeStatusCardProps {
  seasBalance: number;
  stabilityPct?: number;
  distributionUptimePct?: number;
  velocity?: number;
  nextDistribution?: Date;
  onBuySeas: () => void;
}

export function NodeStatusCardRefactored({
  seasBalance,
  stabilityPct = 98.5,
  distributionUptimePct = 99.8,
  velocity = 87,
  nextDistribution,
  onBuySeas,
}: NodeStatusCardProps) {
  const isActive = seasBalance >= PLATFORM.NODE.ACTIVATION_THRESHOLD;

  if (!isActive) {
    return <InactiveNodeState seasBalance={seasBalance} onBuySeas={onBuySeas} />;
  }

  return (
    <ActiveNodeState
      seasBalance={seasBalance}
      stabilityPct={stabilityPct}
      distributionUptimePct={distributionUptimePct}
      velocity={velocity}
      nextDistribution={nextDistribution}
    />
  );
}
