import { Zap, Trophy, Percent, Calendar } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { formatters } from '../../../utils/formatters';
import { cardStyles } from '../../../styles/cardStyles';
import { NodeEarningsCardsProps } from './types';

export function NodeEarningsCards({ nodeData }: NodeEarningsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Latest Reward */}
      <div className="p-6 rounded-xl" style={cardStyles.elevated}>
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
          {formatters.currency(nodeData.earnedToday, 2)}
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

      {/* Total Earned */}
      <div className="p-6 rounded-xl" style={cardStyles.elevated}>
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
          {formatters.currency(nodeData.earnedTotal, 2)}
        </div>
        <div className="label-sm">
          Lifetime rewards
        </div>
      </div>

      {/* Node Weight */}
      <div className="p-6 rounded-xl" style={cardStyles.elevated}>
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
          {formatters.percentage(nodeData.shareOfPool, 2)}
        </div>
        <div className="label-sm">
          Based on your $SEAS balance
        </div>
      </div>
    </div>
  );
}
