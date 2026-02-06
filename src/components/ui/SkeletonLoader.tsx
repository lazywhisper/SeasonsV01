import { cardStyles } from '../../styles/cardStyles';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'circle' | 'metric' | 'table-row' | 'chart';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

export function SkeletonLoader({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}: SkeletonLoaderProps) {
  const baseStyles: React.CSSProperties = {
    background: 'linear-gradient(90deg, var(--seasons-bg-card) 0%, var(--seasons-bg-elev) 50%, var(--seasons-bg-card) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite ease-in-out',
    borderRadius: '8px',
  };

  const variants = {
    text: {
      height: height || '16px',
      width: width || '100%',
      ...baseStyles,
    },
    circle: {
      width: width || '48px',
      height: height || '48px',
      borderRadius: '50%',
      ...baseStyles,
    },
    card: {
      width: width || '100%',
      height: height || '200px',
      borderRadius: '12px',
      ...baseStyles,
    },
    metric: {
      width: width || '100%',
      height: height || '120px',
      borderRadius: '12px',
      ...baseStyles,
    },
    'table-row': {
      width: width || '100%',
      height: height || '48px',
      ...baseStyles,
    },
    chart: {
      width: width || '100%',
      height: height || '300px',
      borderRadius: '12px',
      ...baseStyles,
    },
  };

  const style = variants[variant];

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}
      </style>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={className}
          style={style}
          aria-label="Loading..."
          role="status"
        />
      ))}
    </>
  );
}

// Preset components for common use cases
export function MetricCardSkeleton() {
  return (
    <div
      className="p-5 rounded-xl"
      style={cardStyles.elevated}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <SkeletonLoader variant="text" width="80px" height="12px" />
          <div className="mt-3">
            <SkeletonLoader variant="text" width="120px" height="32px" />
          </div>
        </div>
        <SkeletonLoader variant="circle" width="40px" height="40px" />
      </div>
      <SkeletonLoader variant="text" width="60%" height="12px" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-4 px-4">
      {Array.from({ length: columns }).map((_, index) => (
        <div key={index} className="flex-1">
          <SkeletonLoader variant="text" height="14px" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div
      className="p-6 rounded-xl"
      style={cardStyles.elevated}
    >
      <div className="mb-6">
        <SkeletonLoader variant="text" width="180px" height="24px" />
        <div className="mt-2">
          <SkeletonLoader variant="text" width="240px" height="14px" />
        </div>
      </div>
      <SkeletonLoader variant="chart" height="280px" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <SkeletonLoader variant="text" width="280px" height="48px" className="mb-3" />
        <SkeletonLoader variant="text" width="400px" height="16px" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      {/* Table */}
      <div
        className="p-6 rounded-xl"
        style={cardStyles.elevated}
      >
        <div className="mb-4">
          <SkeletonLoader variant="text" width="200px" height="20px" />
        </div>
        <div className="space-y-2">
          <TableRowSkeleton columns={5} />
          <TableRowSkeleton columns={5} />
          <TableRowSkeleton columns={5} />
          <TableRowSkeleton columns={5} />
        </div>
      </div>
    </div>
  );
}
