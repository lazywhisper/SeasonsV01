import { TrendingUp, TrendingDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { formatters } from '../../../utils/formatters';
import { Asset } from '../../../lib/mockData';
import { CompositionDataItem } from './types';

interface AllocationCardsProps {
  compositionData: CompositionDataItem[];
  activeFilter: string;
  assets: Asset[];
}

export function AllocationCards({ compositionData, activeFilter, assets }: AllocationCardsProps) {
  return (
    <>
      <div className={activeFilter === 'all' ? 'grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6' : 'space-y-3 md:space-y-4 mb-6'}>
        {compositionData
          .filter(item => activeFilter === 'all' || item.category === activeFilter)
          .map((item) => {
            const delta = item.actual - item.target;
            const isBalanced = Math.abs(delta) <= 2;
            const isOverweight = delta > 2;
            
            return (
              <div
                key={item.name}
                className="p-3 md:p-4 rounded-lg"
                style={{
                  background: 'var(--seasons-bg-card)',
                  border: '1px solid var(--seasons-border-hair)',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span 
                      className="text-xs md:text-sm"
                      style={{ 
                        color: 'var(--seasons-text-primary)', 
                        fontWeight: 600 
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                  
                  {/* Badge above progress bar */}
                  {!isBalanced && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded"
                            style={{
                              background: isOverweight 
                                ? 'rgba(242, 119, 131, 0.08)' 
                                : 'rgba(96, 211, 148, 0.08)',
                              fontSize: '10px',
                              fontWeight: 600,
                              color: isOverweight 
                                ? 'var(--seasons-brand-grad-mid1)' 
                                : 'var(--seasons-success)',
                            }}
                          >
                            {isOverweight ? (
                              <TrendingUp size={10} />
                            ) : (
                              <TrendingDown size={10} />
                            )}
                            {formatters.percentage(Math.abs(delta), 1)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {isOverweight ? 'Overweight' : 'Underweight'} by {formatters.percentage(Math.abs(delta), 1)}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 rounded-full overflow-hidden mb-2 md:mb-3" style={{ background: 'var(--seasons-bg-progress)' }}>
                  {/* Target marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 z-10"
                    style={{
                      left: `${item.target}%`,
                      background: 'var(--seasons-text-tertiary)',
                    }}
                  />
                  {/* Actual fill */}
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min(item.actual, 100)}%`,
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                    }}
                  />
                </div>

                {/* Footer with asset count and percentages */}
                <div className="flex items-center justify-between">
                  <div 
                    className="text-[10px]"
                    style={{ 
                      color: 'var(--seasons-text-tertiary)' 
                    }}
                  >
                    {assets.filter(a => a.category === item.category).length} assets
                  </div>
                  
                  <div className="text-right">
                    <div 
                      className="text-sm md:text-base"
                      style={{ 
                        fontWeight: 700,
                        color: 'var(--seasons-text-primary)'
                      }}
                    >
                      {formatters.percentage(item.actual, 1)}
                    </div>
                    <div 
                      className="text-[10px]"
                      style={{ 
                        color: 'var(--seasons-text-tertiary)' 
                      }}
                    >
                      target {item.target}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <p
        className="text-center mb-6"
        style={{
          color: 'var(--seasons-text-tertiary)',
          fontSize: '11px',
        }}
      >
        Targets are guidelines; live weights fluctuate via rotation.
      </p>
    </>
  );
}
