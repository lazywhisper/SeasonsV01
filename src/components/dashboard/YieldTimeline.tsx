import { MoreVertical } from 'lucide-react';
import { TimelinePoint } from '../../lib/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';
import { useState } from 'react';

interface YieldTimelineProps {
  data: TimelinePoint[];
  isConnected: boolean;
}

export function YieldTimeline({ data, isConnected }: YieldTimelineProps) {
  const [range, setRange] = useState('30d');

  // Filter data based on selected range
  const getFilteredData = () => {
    const now = new Date();
    let startDate = new Date();

    switch (range) {
      case '24h':
        startDate.setHours(now.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case 'ytd':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'max':
        return data;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    return data.filter(point => new Date(point.tsISO) >= startDate);
  };

  const filteredData = getFilteredData();

  if (!isConnected) {
    return (
      <div
        className="p-4 md:p-6 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
          boxShadow: 'var(--seasons-card-shadow)',
        }}
      >
        <h2
          className="mb-4"
          style={{
            color: 'var(--seasons-text-primary)',
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '24px',
          }}
        >
          Yield Timeline
        </h2>
        <div className="text-center py-12">
          <p style={{ color: 'var(--seasons-text-secondary)', fontSize: '14px' }}>
            Nothing yet to show. Rewards appear here as they stream in.
          </p>
        </div>
      </div>
    );
  }

  const totalRewards = filteredData.reduce((sum, point) => sum + point.rewardsUsd, 0);
  const avgApr = 34.5;

  // Convert to cumulative rewards (always increasing)
  let cumulativeSum = 0;
  const chartData = filteredData.map((point) => {
    cumulativeSum += point.rewardsUsd;
    return {
      date: new Date(point.tsISO).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rewards: parseFloat(cumulativeSum.toFixed(2)),
    };
  });

  return (
    <div
      className="p-4 md:p-6 rounded-xl"
      style={{
        background: 'var(--seasons-bg-elev)',
        border: '1px solid var(--seasons-border-hair)',
        boxShadow: 'var(--seasons-card-shadow)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-0 mb-6">
        <div>
          <h2
            className="text-base md:text-lg"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
              lineHeight: '1.3',
            }}
          >
            Yield Timeline
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile: Select dropdown */}
          <div className="md:hidden flex-1">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-xs transition-colors"
              style={{
                background: 'var(--seasons-bg-base)',
                color: 'var(--seasons-text-primary)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="ytd">Year to Date</option>
              <option value="max">Max</option>
            </select>
          </div>

          {/* Desktop: Button group */}
          <div className="hidden md:flex items-center gap-2 rounded-md" style={{ background: 'var(--seasons-bg-base)', padding: '4px' }}>
            <button
              onClick={() => setRange('7d')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: range === '7d' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: range === '7d' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              7d
            </button>
            <button
              onClick={() => setRange('30d')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: range === '30d' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: range === '30d' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              30d
            </button>
            <button
              onClick={() => setRange('ytd')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: range === 'ytd' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: range === 'ytd' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              YTD
            </button>
            <button
              onClick={() => setRange('max')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: range === 'max' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: range === 'max' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              Max
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 hover:bg-white/5 rounded transition-colors flex-shrink-0"
                aria-label="More options"
              >
                <MoreVertical size={18} style={{ color: 'var(--seasons-text-tertiary)' }} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              style={{
                background: 'var(--seasons-bg-elev)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <DropdownMenuItem style={{ color: 'var(--seasons-text-secondary)' }}>
                Download CSV
              </DropdownMenuItem>
              <DropdownMenuItem style={{ color: 'var(--seasons-text-secondary)' }}>
                Copy values
              </DropdownMenuItem>
              <DropdownMenuItem style={{ color: 'var(--seasons-text-secondary)' }}>
                View details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--seasons-brand-grad-start)" />
                <stop offset="50%" stopColor="var(--seasons-brand-grad-mid2)" />
                <stop offset="100%" stopColor="var(--seasons-brand-grad-end)" />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="rgba(255, 255, 255, 0.03)" 
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="var(--seasons-text-tertiary)"
              style={{ fontSize: '11px' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--seasons-text-tertiary)"
              style={{ fontSize: '11px' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              width={40}
            />
            <RechartsTooltip
              contentStyle={{
                background: 'var(--seasons-bg-elev)',
                border: '1px solid var(--seasons-border-hair)',
                borderRadius: '8px',
                color: 'var(--seasons-text-primary)',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Rewards']}
            />
            <Line
              type="stepAfter"
              dataKey="rewards"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div 
          className="p-4 rounded-lg transition-all duration-200 hover:bg-white/[0.02] group"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
              }}
            />
            <div
              className="text-xs uppercase tracking-wide"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              Total Rewards
            </div>
          </div>
          <div
            className="text-xl md:text-2xl transition-colors duration-200"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            ${totalRewards.toFixed(2)}
          </div>
          <div
            className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            Cumulative earnings
          </div>
        </div>
        <div 
          className="p-4 rounded-lg transition-all duration-200 hover:bg-white/[0.02] group"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              }}
            />
            <div
              className="text-xs uppercase tracking-wide"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              Average APY*
            </div>
          </div>
          <div
            className="text-xl md:text-2xl transition-colors duration-200"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {avgApr}%
          </div>
          <div
            className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            Portfolio performance
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div
        className="mt-4"
        style={{
          fontSize: '10px',
          color: 'var(--seasons-text-tertiary)',
          fontStyle: 'italic',
          lineHeight: '1.4',
        }}
      >
        * Calculated based on 30-day period
      </div>
    </div>
  );
}