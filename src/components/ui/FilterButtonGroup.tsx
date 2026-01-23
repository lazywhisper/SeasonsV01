import React from 'react';
import { buttonStyles } from '../../styles/cardStyles';

interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface FilterButtonGroupProps<T extends string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Reusable filter button group component
 * Eliminates duplicated filter UI across RecentActivity, YieldTimeline, PortfolioComposition
 */
export function FilterButtonGroup<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: FilterButtonGroupProps<T>) {
  return (
    <>
      {/* Mobile: Select dropdown */}
      <div className={`md:hidden flex-1 ${className}`}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="w-full px-3 py-2 rounded-md text-xs transition-colors"
          style={{
            background: 'var(--seasons-bg-base)',
            color: 'var(--seasons-text-primary)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: Button group */}
      <div
        className={`hidden md:flex items-center gap-2 rounded-md ${className}`}
        style={{
          background: 'var(--seasons-bg-base)',
          padding: '4px',
        }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className="px-3 py-1 rounded transition-colors hover:bg-white/5"
            style={
              value === option.value
                ? buttonStyles.filterActive
                : buttonStyles.filter
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </>
  );
}
