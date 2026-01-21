import { MoreVertical, TrendingUp, TrendingDown, Trophy } from 'lucide-react';
import { ActivityEvent } from '../../lib/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState } from 'react';

interface RecentActivityProps {
  data: ActivityEvent[];
}

type ActivityFilter = 'all' | 'rewards' | 'buys' | 'sells';

export function RecentActivity({ data }: RecentActivityProps) {
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>('all');
  const [showAll, setShowAll] = useState(false);

  // Filter events based on selected filter
  const filteredEvents = activeFilter === 'all' 
    ? data 
    : data.filter(event => {
        if (activeFilter === 'rewards') return event.type === 'reward';
        if (activeFilter === 'buys') return event.type === 'buy';
        if (activeFilter === 'sells') return event.type === 'sell';
        return true;
      });

  // Show only first 5 events by default
  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 5);
  const hasMore = filteredEvents.length > 5;

  const getIcon = (type: string) => {
    switch (type) {
      case 'reward':
        return <Trophy size={16} style={{ color: 'var(--seasons-brand-grad-start)' }} />;
      case 'buy':
        return <TrendingUp size={16} style={{ color: 'var(--seasons-success)' }} />;
      case 'sell':
        return <TrendingDown size={16} style={{ color: 'var(--seasons-danger)' }} />;
      default:
        return null;
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-0 mb-4">
        <div>
          <h2
            className="text-base md:text-lg"
            style={{
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
              lineHeight: '1.3',
            }}
          >
            Recent Activity
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile: Select dropdown */}
          <div className="md:hidden flex-1">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value as ActivityFilter)}
              className="w-full px-3 py-2 rounded-md text-xs transition-colors"
              style={{
                background: 'var(--seasons-bg-base)',
                color: 'var(--seasons-text-primary)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <option value="all">All Activity</option>
              <option value="rewards">Rewards</option>
              <option value="buys">Buys</option>
              <option value="sells">Sells</option>
            </select>
          </div>

          {/* Desktop: Button group */}
          <div className="hidden md:flex items-center gap-2 rounded-md" style={{ background: 'var(--seasons-bg-base)', padding: '4px' }}>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: activeFilter === 'all' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: activeFilter === 'all' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('rewards')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: activeFilter === 'rewards' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: activeFilter === 'rewards' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              Rewards
            </button>
            <button
              onClick={() => setActiveFilter('buys')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: activeFilter === 'buys' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: activeFilter === 'buys' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              Buys
            </button>
            <button
              onClick={() => setActiveFilter('sells')}
              className="px-3 py-1 rounded transition-colors"
              style={{
                fontSize: '11px',
                color: activeFilter === 'sells' ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                whiteSpace: 'nowrap',
                background: activeFilter === 'sells' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              Sells
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

      {/* Activity list */}
      <div className="space-y-2 md:space-y-3">
        {displayedEvents.map((event, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-colors"
            style={{
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="mt-0.5 flex-shrink-0">{getIcon(event.type)}</div>
            <div className="flex-1 min-w-0">
              <div
                className="text-xs md:text-sm mb-1 md:mb-1.5"
                style={{
                  color: 'var(--seasons-text-primary)',
                }}
              >
                {event.primary}
              </div>
              <div
                className="text-[10px] md:text-xs"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                }}
              >
                <div className="md:inline">
                  Tx: <span className="font-mono">{event.tx}</span>
                </div>
                <span className="hidden md:inline"> • </span>
                <div className="md:inline">
                  {event.ts}
                </div>
                <span className="hidden md:inline"> • </span>
                <div className="md:inline">
                  <a
                    href="#"
                    className="hover:underline"
                    style={{ color: 'var(--seasons-text-secondary)' }}
                  >
                    View on Explorer
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
          style={{
            color: 'var(--seasons-text-secondary)',
            fontSize: '13px',
            border: '1px solid var(--seasons-border-hair)',
            textAlign: 'center',
          }}
        >
          {showAll ? 'Show less' : `Show more (${filteredEvents.length - 5} more)`}
        </button>
      )}
    </div>
  );
}