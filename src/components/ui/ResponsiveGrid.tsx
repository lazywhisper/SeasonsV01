import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { default: 1, md: 2, lg: 3, xl: 4 },
  gap = 4,
  className = ''
}: ResponsiveGridProps) {
  // Build grid classes
  const gridClasses = [
    `grid`,
    `gap-${gap}`,
    cols.default && `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}

// Preset grid configurations
export const GridPresets = {
  // Metric cards: 1 col mobile, 2 col tablet, 4 col desktop
  metrics: { default: 1, sm: 2, lg: 4 },
  
  // Standard cards: 1 col mobile, 2 col tablet, 3 col desktop
  cards: { default: 1, md: 2, lg: 3 },
  
  // Wide cards: 1 col mobile, 2 col desktop
  wide: { default: 1, lg: 2 },
  
  // Asset list: 1 col mobile, 1 col desktop (full width)
  list: { default: 1 },
};
