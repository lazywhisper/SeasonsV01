import { Coins, CheckCircle2, XCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { NotificationPanel } from '../NotificationPanel';
import { WalletDropdown } from './WalletDropdown';
import { getSeasonIcon } from './seasonUtils';
import { formatters } from '../../utils/formatters';
import { Season, PlatformNotification } from './types';

interface DesktopActionsProps {
  currentSeason: Season;
  tokenPrice: number;
  priceChange24h: number;
  isConnected: boolean;
  isNodeActive: boolean;
  walletAddress?: string;
  platformNotifications: PlatformNotification[];
  onPlatformMarkAsRead: (id: string) => void;
  onPlatformMarkAllAsRead: () => void;
  onPlatformDeleteNotification: (id: string) => void;
  onDisconnectWallet: () => void;
  onConnectClick: () => void;
}

export function DesktopActions({
  currentSeason,
  tokenPrice,
  priceChange24h,
  isConnected,
  isNodeActive,
  walletAddress,
  platformNotifications,
  onPlatformMarkAsRead,
  onPlatformMarkAllAsRead,
  onPlatformDeleteNotification,
  onDisconnectWallet,
  onConnectClick,
}: DesktopActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Season Badge + Token Price Group */}
      <div className="hidden lg:flex items-center gap-2">
        {/* Season Badge */}
        <div
          className="px-2.5 py-1.5 rounded-lg flex items-center gap-1.5"
          style={{
            border: '1px solid var(--seasons-border-hair)',
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          {getSeasonIcon(currentSeason)}
          <span style={{ color: 'var(--seasons-text-tertiary)' }}>Season:</span>
          <span style={{ color: 'var(--seasons-text-secondary)' }}>{currentSeason}</span>
        </div>

        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '20px',
            background: 'var(--seasons-border-hair)',
          }}
        />

        {/* Token Price */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="px-2.5 py-1.5 rounded-lg flex items-center gap-2"
                style={{
                  border: '1px solid var(--seasons-border-hair)',
                  fontSize: '12px',
                }}
              >
                <Coins size={14} style={{ color: 'var(--seasons-brand-grad-start)' }} />
                <span style={{ color: 'var(--seasons-text-tertiary)', fontWeight: 500, fontFamily: 'Inter, sans-serif', fontFeatureSettings: "'tnum' 1" }}>
                  $SEAS
                </span>
                <span style={{ color: 'var(--seasons-text-primary)', fontWeight: 600, fontFamily: 'Inter, sans-serif', fontFeatureSettings: "'tnum' 1" }}>
                  ${formatters.currency(tokenPrice, 2)}
                </span>
                <span
                  style={{
                    color: priceChange24h >= 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
                    fontSize: '11px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    fontFeatureSettings: "'tnum' 1",
                  }}
                >
                  {formatters.percentage(priceChange24h, 1, true)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">$SEAS Token Price (24h change)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Node Status */}
      {isConnected && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="hidden md:flex px-2.5 py-1.5 rounded-lg items-center gap-1.5"
                style={{
                  border: '1px solid var(--seasons-border-hair)',
                  fontSize: '12px',
                  background: isNodeActive 
                    ? 'rgba(96, 211, 148, 0.08)' 
                    : 'rgba(255, 122, 122, 0.08)',
                }}
              >
                {isNodeActive ? (
                  <CheckCircle2 size={14} style={{ color: 'var(--seasons-success)' }} />
                ) : (
                  <XCircle size={14} style={{ color: 'var(--seasons-danger)' }} />
                )}
                <span 
                  style={{ 
                    color: isNodeActive 
                      ? 'var(--seasons-success)' 
                      : 'var(--seasons-danger)',
                    fontWeight: 600,
                  }}
                >
                  {isNodeActive ? 'Node Active' : 'Node Inactive'}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                {isNodeActive 
                  ? 'Your yield node is active and earning rewards' 
                  : 'Node inactive - connect wallet with 10k+ $SEAS to activate'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <NotificationPanel
        notifications={platformNotifications}
        onMarkAsRead={onPlatformMarkAsRead}
        onMarkAllAsRead={onPlatformMarkAllAsRead}
        onDelete={onPlatformDeleteNotification}
      />

      <WalletDropdown
        isConnected={isConnected}
        walletAddress={walletAddress}
        onDisconnectWallet={onDisconnectWallet}
        onConnectClick={onConnectClick}
      />
    </div>
  );
}
