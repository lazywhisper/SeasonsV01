import { useState } from 'react';
import { Bell, X, CheckCheck, Package, TrendingUp, Power, PowerOff } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { cardStyles } from '../styles/cardStyles';
import { formatters } from '../utils/formatters';

// Notification types specific to platform operations
export interface PlatformNotification {
  id: string;
  type: 'asset_listing' | 'yield_distribution' | 'node_online' | 'node_offline';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  metadata?: {
    assetSymbol?: string;
    distributionAmount?: number;
    nodeAddress?: string;
    nodeCount?: number;
  };
}

interface NotificationPanelProps {
  notifications: PlatformNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
}

export function NotificationPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
}: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: PlatformNotification['type']) => {
    switch (type) {
      case 'asset_listing':
        return <Package size={16} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />;
      case 'yield_distribution':
        return <TrendingUp size={16} style={{ color: 'var(--seasons-success)' }} />;
      case 'node_online':
        return <Power size={16} style={{ color: 'var(--seasons-success)' }} />;
      case 'node_offline':
        return <PowerOff size={16} style={{ color: 'var(--seasons-warning)' }} />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Open notifications"
        >
          <Bell size={18} style={{ color: 'var(--seasons-text-secondary)' }} />
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--seasons-danger)',
                color: 'var(--seasons-text-primary)',
                fontSize: '10px',
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[calc(100vw-32px)] sm:w-[440px] p-0"
        style={{
          ...cardStyles.elevated,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3.5 flex items-center justify-between"
          style={{
            borderBottom: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <h3
              style={{
                color: 'var(--seasons-text-primary)',
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}
            >
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span
                className="px-2 py-0.5 rounded-full"
                style={{
                  background: 'var(--seasons-danger)',
                  color: 'var(--seasons-text-primary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
              style={{
                color: 'var(--seasons-text-secondary)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: '480px',
          }}
        >
          {notifications.length === 0 ? (
            <div
              className="px-4 py-12 text-center"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '14px',
              }}
            >
              <Bell size={32} className="mx-auto mb-3 opacity-30" />
              <p className="mb-1" style={{ color: 'var(--seasons-text-secondary)', fontWeight: 600 }}>
                No notifications yet
              </p>
              <p>You'll see global updates here</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="group relative px-4 py-3.5 transition-colors cursor-pointer hover:bg-white/5"
                style={{
                  borderBottom: '1px solid var(--seasons-border-hair)',
                  background: notification.read ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                }}
                onClick={() => !notification.read && onMarkAsRead(notification.id)}
              >
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.id);
                  }}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 transition-all"
                  style={{
                    color: 'var(--seasons-text-tertiary)',
                  }}
                  aria-label="Delete notification"
                >
                  <X size={14} />
                </button>

                <div className="flex gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-8">
                    <h4
                      className="mb-1"
                      style={{
                        color: 'var(--seasons-text-primary)',
                        fontSize: '13px',
                        fontWeight: 600,
                        lineHeight: '1.4',
                      }}
                    >
                      {notification.title}
                    </h4>
                    <p
                      className="mb-2"
                      style={{
                        color: 'var(--seasons-text-secondary)',
                        fontSize: '12px',
                        lineHeight: '1.5',
                      }}
                    >
                      {notification.message}
                    </p>
                    
                    {/* Metadata */}
                    {notification.metadata && (
                      <div className="flex items-center gap-2 mb-2">
                        {notification.metadata.assetSymbol && (
                          <span
                            className="px-2 py-0.5 rounded text-xs"
                            style={{
                              background: 'var(--seasons-bg-progress)',
                              color: 'var(--seasons-brand-grad-mid1)',
                              fontSize: '11px',
                              fontWeight: 600,
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {notification.metadata.assetSymbol}
                          </span>
                        )}
                        {notification.metadata.distributionAmount && (
                          <span
                            className="px-2 py-0.5 rounded text-xs"
                            style={{
                              background: 'rgba(96, 211, 148, 0.1)',
                              color: 'var(--seasons-success)',
                              fontSize: '11px',
                              fontWeight: 600,
                              fontFamily: 'Inter, sans-serif',
                              fontFeatureSettings: '"tnum" 1',
                            }}
                          >
                            ${formatters.currency(notification.metadata.distributionAmount)}
                          </span>
                        )}
                        {notification.metadata.nodeCount !== undefined && (
                          <span
                            className="px-2 py-0.5 rounded text-xs"
                            style={{
                              background: 'var(--seasons-bg-progress)',
                              color: 'var(--seasons-text-secondary)',
                              fontSize: '11px',
                              fontWeight: 600,
                              fontFamily: 'Inter, sans-serif',
                              fontFeatureSettings: '"tnum" 1',
                            }}
                          >
                            {notification.metadata.nodeCount} {notification.metadata.nodeCount === 1 ? 'node' : 'nodes'}
                          </span>
                        )}
                      </div>
                    )}

                    <span
                      style={{
                        color: 'var(--seasons-text-tertiary)',
                        fontSize: '11px',
                      }}
                    >
                      {formatters.relativeTime(new Date(notification.timestamp).getTime())}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - only show if there are notifications */}
        {notifications.length > 0 && (
          <div
            className="px-4 py-3 text-center"
            style={{
              borderTop: '1px solid var(--seasons-border-hair)',
              background: 'var(--seasons-bg-base)',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}