import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';
import { WalletConnectModal } from './WalletConnectModal';
import Frame from '../imports/Frame';
import { TopBarProps, Season, PlatformNotification } from './topbar/types';
import { mockPlatformNotifications } from './topbar/mockData';
import { SearchPopover } from './topbar/SearchPopover';
import { DesktopActions } from './topbar/DesktopActions';
import { MobileSidebar } from './topbar/MobileSidebar';

export function TopBar({ 
  isConnected, 
  walletAddress, 
  onConnectWallet, 
  onDisconnectWallet, 
  currentPage, 
  onNavigate, 
  walletModalOpen: externalWalletModalOpen, 
  onWalletModalChange 
}: TopBarProps) {
  const [isDarkTheme] = useState(true); // Always dark theme
  
  // Season state - represents current crypto market cycle
  const [currentSeason] = useState<Season>('MEME');
  
  const [platformNotifications, setPlatformNotifications] = useState<PlatformNotification[]>(mockPlatformNotifications);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalWalletModalOpen, setInternalWalletModalOpen] = useState(false);
  
  // Use external modal state if provided, otherwise use internal state
  const walletModalOpen = externalWalletModalOpen !== undefined ? externalWalletModalOpen : internalWalletModalOpen;
  const setWalletModalOpen = (open: boolean) => {
    if (onWalletModalChange) {
      onWalletModalChange(open);
    } else {
      setInternalWalletModalOpen(open);
    }
  };

  const handlePlatformMarkAsRead = (id: string) => {
    setPlatformNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handlePlatformMarkAllAsRead = () => {
    setPlatformNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handlePlatformDeleteNotification = (id: string) => {
    setPlatformNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleWalletConnect = (walletId: string) => {
    console.log('Connecting wallet:', walletId);
    onConnectWallet(walletId);
  };

  // Token price and node status mock data
  const tokenPrice = 0.28;
  const priceChange24h = 1.2;
  const isNodeActive = isConnected; // Node is active when wallet is connected with 10k+ $SEAS

  return (
    <div
      className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-4 md:px-6"
      style={{
        background: 'var(--seasons-bg-elev)',
        borderBottom: '1px solid var(--seasons-border-hair)',
      }}
    >
      {/* Left region */}
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center gap-2"
          style={{
            height: '24px',
            width: '129px', // Fixed width for the logo container
          }}
        >
          <Frame />
        </div>
      </div>

      {/* Center - Search (Desktop only) */}
      <SearchPopover onNavigate={onNavigate} />

      {/* Right side - Desktop Actions */}
      <DesktopActions
        currentSeason={currentSeason}
        tokenPrice={tokenPrice}
        priceChange24h={priceChange24h}
        isConnected={isConnected}
        isNodeActive={isNodeActive}
        walletAddress={walletAddress}
        platformNotifications={platformNotifications}
        onPlatformMarkAsRead={handlePlatformMarkAsRead}
        onPlatformMarkAllAsRead={handlePlatformMarkAllAsRead}
        onPlatformDeleteNotification={handlePlatformDeleteNotification}
        onDisconnectWallet={onDisconnectWallet}
        onConnectClick={() => setWalletModalOpen(true)}
      />

      <WalletConnectModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
        onConnect={handleWalletConnect}
      />

      {/* Mobile menu trigger */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <button
            className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} style={{ color: 'var(--seasons-text-primary)' }} />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[280px] p-0"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: 'none',
          }}
          aria-describedby={undefined}
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <MobileSidebar
            currentPage={currentPage}
            onNavigate={(page) => {
              onNavigate(page);
              setMobileMenuOpen(false);
            }}
            isConnected={isConnected}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}