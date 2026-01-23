/**
 * Inactive Node State Component
 * 
 * Displays when user's SEAS balance is below activation threshold
 */

import { Button } from '../../ui/button';
import { AlertCircle } from 'lucide-react';
import { cardStyles, textStyles, badgeStyles } from '../../../styles/cardStyles';
import { PLATFORM } from '../../../constants/platform';
import { formatters } from '../../../utils/formatters';

interface InactiveNodeStateProps {
  seasBalance: number;
  onBuySeas: () => void;
}

export function InactiveNodeState({ seasBalance, onBuySeas }: InactiveNodeStateProps) {
  const progressPercent = (seasBalance / PLATFORM.NODE.ACTIVATION_THRESHOLD) * 100;
  const remaining = PLATFORM.NODE.ACTIVATION_THRESHOLD - seasBalance;

  return (
    <div className="p-6 rounded-xl" style={cardStyles.elevated}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 style={textStyles.heading}>Node Status</h2>
        <span
          className="px-3 py-1 text-xs font-medium rounded-full"
          style={badgeStyles.inactive}
        >
          INACTIVE
        </span>
      </div>

      {/* Warning Message */}
      <div
        className="p-4 rounded-lg mb-6 flex items-start gap-3"
        style={{
          background: 'rgba(251, 146, 60, 0.08)',
          border: '1px solid rgba(251, 146, 60, 0.2)',
        }}
      >
        <AlertCircle
          size={20}
          style={{
            color: 'var(--seasons-warning)',
            flexShrink: 0,
            marginTop: '2px',
          }}
        />
        <div>
          <div
            className="font-medium mb-1"
            style={{
              color: 'var(--seasons-warning)',
              fontSize: '13px',
            }}
          >
            Node Not Active
          </div>
          <div
            style={{
              color: 'var(--seasons-text-secondary)',
              fontSize: '12px',
              lineHeight: '1.5',
            }}
          >
            Hold {formatters.tokens(PLATFORM.NODE.ACTIVATION_THRESHOLD, 'SEAS')} to activate your
            node and start earning onchain rewards.
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span
            style={{
              color: 'var(--seasons-text-secondary)',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            Your Balance
          </span>
          <span style={textStyles.tabular}>
            {formatters.tokens(seasBalance, 'SEAS')}
          </span>
        </div>

        {/* Progress track */}
        <div
          className="relative w-full rounded-full overflow-hidden"
          style={{
            height: '8px',
            background: 'var(--seasons-bg-card)',
          }}
        >
          <div
            className="absolute left-0 top-0 h-full transition-all duration-500"
            style={{
              width: `${Math.min(progressPercent, 100)}%`,
              background:
                'linear-gradient(90deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
            }}
          />
        </div>

        {/* Remaining */}
        <div className="mt-2 text-right">
          <span
            style={{
              color: 'var(--seasons-text-tertiary)',
              fontSize: '12px',
            }}
          >
            {formatters.tokens(remaining, 'SEAS')} needed
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={onBuySeas}
        className="w-full"
        style={{
          background:
            'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
          color: '#FFFFFF',
          fontWeight: 600,
        }}
      >
        Buy $SEAS to Activate
      </Button>
    </div>
  );
}
