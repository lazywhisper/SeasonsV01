import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { cardStyles, textStyles, badgeStyles } from '../../styles/cardStyles';

interface TrendData {
  value: number;
  label: string;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  tooltip?: string;
  value: string | number;
  subValue?: string;
  trend?: TrendData;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

/**
 * Reusable metric card component
 * Used for displaying key metrics with optional trends and tooltips
 */
export function MetricCard({
  icon,
  label,
  tooltip,
  value,
  subValue,
  trend,
  variant = 'default',
  className = '',
}: MetricCardProps) {
  const labelContent = (
    <div className="flex items-center gap-2">
      <div
        style={{
          color: 'var(--seasons-text-tertiary)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          ...textStyles.label,
          color: 'var(--seasons-text-tertiary)',
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      className={`p-3 md:p-4 rounded-lg ${className}`}
      style={cardStyles.base}
    >
      {/* Header with icon and label */}
      <div className="mb-2">
        {tooltip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">{labelContent}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          labelContent
        )}
      </div>

      {/* Main value */}
      <div
        className="text-xl md:text-2xl mb-1"
        style={{
          color: 'var(--seasons-text-primary)',
          fontWeight: 700,
          ...textStyles.tabular,
        }}
      >
        {value}
      </div>

      {/* Sub value */}
      {subValue && (
        <div
          className="text-xs mb-2"
          style={{
            color: 'var(--seasons-text-tertiary)',
          }}
        >
          {subValue}
        </div>
      )}

      {/* Trend badge */}
      {trend && (
        <div
          className="inline-flex items-center gap-1"
          style={
            trend.value >= 0
              ? badgeStyles.success
              : badgeStyles.warning
          }
        >
          {trend.value >= 0 ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );
}
