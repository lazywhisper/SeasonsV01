import { useState, useEffect } from 'react';
import { Search, Bell, Trophy, Users, List, AlertCircle, Megaphone, CheckCheck, X, Menu, ArrowRight, Coins, LayoutDashboard, TrendingUp, Wallet, Receipt, Gift, Settings, Copy, ExternalLink, LogOut, ChevronDown, Gamepad2, Image, CheckCircle2, XCircle, Smile, Dog, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { mockNotifications, type Notification, mockPlatformNotifications, type PlatformNotification } from '../lib/mockData';
import logoDark from 'figma:asset/988052ec62fb0f071bcf98c26d34c830e277b2ca.png';
import logoLight from 'figma:asset/d1a99fbd766926e0e9fcf7601d88dbd91b881f03.png';
import type { PageType } from '../App';
import { toast } from 'sonner@2.0.3';
import { WalletConnectModal } from './WalletConnectModal';
import { NotificationPanel } from './NotificationPanel';

interface TopBarProps {
  isConnected: boolean;
  walletAddress?: string;
  onConnectWallet: (walletId?: string) => void;
  onDisconnectWallet: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  walletModalOpen?: boolean;
  onWalletModalChange?: (open: boolean) => void;
}

type Season = 'MEME' | 'DeFi' | 'Gaming' | 'NFT';

export function TopBar({ isConnected, walletAddress, onConnectWallet, onDisconnectWallet, currentPage, onNavigate, walletModalOpen: externalWalletModalOpen, onWalletModalChange }: TopBarProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(
    document.documentElement.classList.contains('dark-theme')
  );

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkTheme(document.documentElement.classList.contains('dark-theme'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);
  
  // Season state - represents current crypto market cycle
  const [currentSeason] = useState<Season>('MEME');
  
  const getSeasonIcon = (season: Season) => {
    switch (season) {
      case 'MEME':
        return <Dog size={14} style={{ color: '#E9C774' }} />;
      case 'DeFi':
        return <TrendingUp size={14} style={{ color: '#4B80CB' }} />;
      case 'Gaming':
        return <Gamepad2 size={14} style={{ color: '#B44BCB' }} />;
      case 'NFT':
        return <Image size={14} style={{ color: '#F27783' }} />;
    }
  };
  
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [platformNotifications, setPlatformNotifications] = useState<PlatformNotification[]>(mockPlatformNotifications);
  const [hoverConnect, setHoverConnect] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalWalletModalOpen, setInternalWalletModalOpen] = useState(false);
  
  // Use external modal state if provided, otherwise use internal state
  const walletModalOpen = externalWalletModalOpen !== undefined ? externalWalletModalOpen : internalWalletModalOpen;
  const setWalletModalOpen = onWalletModalChange || setInternalWalletModalOpen;

  // Platform notification handlers
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
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'reward':
        return <Trophy size={16} style={{ color: 'var(--seasons-success)' }} />;
      case 'governance':
        return <Users size={16} style={{ color: 'var(--seasons-brand-grad-mid2)' }} />;
      case 'inclusion':
        return <List size={16} style={{ color: 'var(--seasons-brand-grad-mid1)' }} />;
      case 'system':
        return <AlertCircle size={16} style={{ color: 'var(--seasons-warning)' }} />;
      case 'announcement':
        return <Megaphone size={16} style={{ color: 'var(--seasons-text-secondary)' }} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'reward':
        onNavigate('rewards');
        break;
      case 'governance':
        onNavigate('governance');
        break;
      case 'inclusion':
        onNavigate('inclusion-list');
        break;
      case 'system':
        onNavigate('settings');
        break;
      case 'announcement':
        onNavigate('announcements');
        break;
    }
    
    // Close popover
    setNotificationsOpen(false);
  };

  const handleWalletConnect = (walletId: string) => {
    console.log('Connecting wallet:', walletId);
    onConnectWallet(walletId);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  // Search data structure
  interface SearchResult {
    id: string;
    type: 'asset' | 'transaction' | 'proposal' | 'page' | 'action';
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    action: () => void;
  }

  // Search index
  const searchIndex: SearchResult[] = [
    // Assets
    { id: 'wif', type: 'asset', title: 'dogwifhat', subtitle: 'WIF • Memecoin', icon: <Coins size={16} />, action: () => onNavigate('holdings') },
    { id: 'bonk', type: 'asset', title: 'BONK', subtitle: 'Memecoin', icon: <Coins size={16} />, action: () => onNavigate('holdings') },
    { id: 'popcat', type: 'asset', title: 'Popcat', subtitle: 'POPCAT • Memecoin', icon: <Coins size={16} />, action: () => onNavigate('holdings') },
    { id: 'pepe', type: 'asset', title: 'Pepe', subtitle: 'PEPE • Memecoin', icon: <Coins size={16} />, action: () => onNavigate('holdings') },
    
    // Pages
    { id: 'dashboard', type: 'page', title: 'Dashboard', subtitle: 'View your overview', icon: <LayoutDashboard size={16} />, action: () => onNavigate('dashboard') },
    { id: 'yield', type: 'page', title: 'Yield System', subtitle: 'How yields are generated', icon: <TrendingUp size={16} />, action: () => onNavigate('yield-system') },
    { id: 'holdings', type: 'page', title: 'Holdings', subtitle: 'View your portfolio', icon: <Wallet size={16} />, action: () => onNavigate('holdings') },
    { id: 'rewards', type: 'page', title: 'Rewards', subtitle: 'View your rewards', icon: <Trophy size={16} />, action: () => onNavigate('rewards') },
    { id: 'transactions', type: 'page', title: 'Transactions', subtitle: 'Transaction history', icon: <Receipt size={16} />, action: () => onNavigate('transactions') },
    { id: 'inclusion', type: 'page', title: 'Inclusion List', subtitle: 'View included assets', icon: <List size={16} />, action: () => onNavigate('inclusion-list') },
    { id: 'governance', type: 'page', title: 'Governance', subtitle: 'View and vote on proposals', icon: <Users size={16} />, action: () => onNavigate('governance') },
    { id: 'announcements', type: 'page', title: 'Announcements', subtitle: 'Latest updates', icon: <Megaphone size={16} />, action: () => onNavigate('announcements') },
    { id: 'referrals', type: 'page', title: 'Referrals', subtitle: 'Invite friends', icon: <Gift size={16} />, action: () => onNavigate('referrals') },
    { id: 'settings', type: 'page', title: 'Settings', subtitle: 'Account preferences', icon: <Settings size={16} />, action: () => onNavigate('settings') },
    
    // Proposals
    { id: 'prop12', type: 'proposal', title: 'Proposal #12', subtitle: 'Add MEW to basket', icon: <Users size={16} />, action: () => onNavigate('governance') },
    { id: 'prop11', type: 'proposal', title: 'Proposal #11', subtitle: 'Increase rebalancing frequency', icon: <Users size={16} />, action: () => onNavigate('governance') },
    
    // Actions
    { id: 'vote', type: 'action', title: 'Vote on proposals', subtitle: 'Governance', icon: <Users size={16} />, action: () => onNavigate('governance') },
    { id: 'stake', type: 'action', title: 'Stake $SEAS', subtitle: 'Start earning', icon: <Trophy size={16} />, action: () => onNavigate('dashboard') },
  ];

  const recentSearches = [
    'wif',
    'BONK',
    'My rewards',
    'Proposal #12',
    'Inclusion updates',
  ];

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length < 1) {
      setSearchResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = searchIndex.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.subtitle?.toLowerCase().includes(lowercaseQuery) ||
      item.id.toLowerCase().includes(lowercaseQuery)
    );

    setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
  };

  const handleResultClick = (result: SearchResult) => {
    result.action();
    setSearchQuery('');
    setSearchResults([]);
  };

  const getCategoryLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'asset': return 'Asset';
      case 'transaction': return 'Transaction';
      case 'proposal': return 'Proposal';
      case 'page': return 'Page';
      case 'action': return 'Action';
    }
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
        <img 
          src={isDarkTheme ? logoDark : logoLight} 
          alt="Seasons" 
          className="flex-shrink-0"
          style={{
            height: '24px',
            width: 'auto',
            filter: isDarkTheme ? 'brightness(1.2)' : 'none',
          }}
        />
      </div>

      {/* Center - Search (Desktop only) */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative w-[380px] hidden lg:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={16}
              style={{ color: 'var(--seasons-text-tertiary)' }}
            />
            <Input
              placeholder="Search assets, proposals, pages…"
              className="pl-10 h-9"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                background: 'transparent',
                border: '1px solid var(--seasons-border-hair)',
                color: 'var(--seasons-text-primary)',
                fontSize: '13px',
              }}
              aria-label="Global search"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className="w-[380px] p-3"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          {searchQuery && searchResults.length > 0 ? (
            <div>
              <p
                className="mb-2 px-2"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Results for "{searchQuery}"
              </p>
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-3"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0" style={{ color: 'var(--seasons-brand-grad-mid1)' }}>
                      {result.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4
                          className="truncate"
                          style={{
                            color: 'var(--seasons-text-primary)',
                            fontSize: '14px',
                            fontWeight: 500,
                          }}
                        >
                          {result.title}
                        </h4>
                        <span
                          className="px-1.5 py-0.5 rounded text-xs flex-shrink-0"
                          style={{
                            background: 'var(--seasons-bg-progress)',
                            color: 'var(--seasons-text-tertiary)',
                            fontSize: '10px',
                          }}
                        >
                          {getCategoryLabel(result.type)}
                        </span>
                      </div>
                      {result.subtitle && (
                        <p
                          className="truncate"
                          style={{
                            color: 'var(--seasons-text-tertiary)',
                            fontSize: '12px',
                          }}
                        >
                          {result.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      size={14}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--seasons-text-tertiary)' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : searchQuery && searchResults.length === 0 ? (
            <div className="text-center py-6">
              <p
                className="mb-1"
                style={{
                  color: 'var(--seasons-text-primary)',
                  fontSize: '14px',
                }}
              >
                No results found
              </p>
              <p
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '12px',
                }}
              >
                Try searching for assets, pages, or proposals
              </p>
            </div>
          ) : recentSearches.length > 0 ? (
            <div>
              <p
                className="mb-2 px-2"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Recent searches
              </p>
              <div className="space-y-1">
                {recentSearches.map((search, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(search)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                    style={{
                      color: 'var(--seasons-text-primary)',
                      fontSize: '14px',
                    }}
                  >
                    <Search size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p
              className="text-center py-4"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '14px',
              }}
            >
              Start typing to search...
            </p>
          )}
        </PopoverContent>
      </Popover>

      {/* Right side - Wallet button */}
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
                  <span style={{ color: 'var(--seasons-text-tertiary)', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                    $SEAS
                  </span>
                  <span style={{ color: 'var(--seasons-text-primary)', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                    ${tokenPrice.toFixed(2)}
                  </span>
                  <span
                    style={{
                      color: priceChange24h >= 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
                      fontSize: '11px',
                      fontWeight: 600,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(1)}%
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
          onMarkAsRead={handlePlatformMarkAsRead}
          onMarkAllAsRead={handlePlatformMarkAllAsRead}
          onDelete={handlePlatformDeleteNotification}
        />

        {isConnected ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setHoverConnect(true)}
                onMouseLeave={() => setHoverConnect(false)}
                className="h-9 text-sm gap-2 hidden sm:flex"
                style={{
                  background: 'var(--seasons-bg-base)',
                  color: 'var(--seasons-text-primary)',
                  border: '1px solid var(--seasons-border-hair)',
                  fontFamily: 'Inter, monospace',
                  fontSize: '13px',
                }}
                aria-label="View wallet & session options"
              >
                <span>{walletAddress}</span>
                <ChevronDown size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56"
              style={{
                background: 'var(--seasons-bg-elev)',
                border: '1px solid var(--seasons-border-hair)',
                borderRadius: '12px',
              }}
            >
              <DropdownMenuItem
                onClick={async () => {
                  if (walletAddress) {
                    try {
                      if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(walletAddress);
                      } else {
                        // Fallback method
                        const textarea = document.createElement('textarea');
                        textarea.value = walletAddress;
                        textarea.style.position = 'fixed';
                        textarea.style.opacity = '0';
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                      }
                      toast.success('Address copied to clipboard!');
                    } catch (err) {
                      console.error('Failed to copy:', err);
                      toast.error('Failed to copy address');
                    }
                  }
                }}
                className="cursor-pointer"
                style={{
                  color: 'var(--seasons-text-primary)',
                }}
              >
                <Copy size={16} className="mr-2" style={{ color: 'var(--seasons-text-tertiary)' }} />
                Copy Address
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (walletAddress) {
                    const address = walletAddress.replace('...', '');
                    window.open(`https://solscan.io/account/${address}`, '_blank');
                  }
                }}
                className="cursor-pointer"
                style={{
                  color: 'var(--seasons-text-primary)',
                }}
              >
                <ExternalLink size={16} className="mr-2" style={{ color: 'var(--seasons-text-tertiary)' }} />
                View on Solscan
              </DropdownMenuItem>
              <DropdownMenuSeparator style={{ background: 'var(--seasons-border-hair)' }} />
              <DropdownMenuItem
                onClick={() => onDisconnectWallet?.()}
                className="cursor-pointer"
                style={{
                  color: 'var(--seasons-error)',
                }}
              >
                <LogOut size={16} className="mr-2" />
                Disconnect Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setWalletModalOpen(true)}
                  onMouseEnter={() => setHoverConnect(true)}
                  onMouseLeave={() => setHoverConnect(false)}
                  className="h-9 text-sm relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                    color: '#FFFFFF',
                    border: 'none',
                  }}
                  aria-label="Connect wallet"
                >
                  <span
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                      opacity: hoverConnect ? 1 : 0,
                      transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                  <span className="relative z-10">
                    <span className="hidden sm:inline">Connect Wallet</span>
                    <span className="sm:hidden">Connect</span>
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  Connect a Solana wallet to start earning.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

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
    </div>
  );
}

// Mobile sidebar component
function MobileSidebar({
  currentPage,
  onNavigate,
  isConnected,
}: {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  isConnected: boolean;
}) {
  // Menu structure with categories
  const menuSections = [
    {
      title: 'OVERVIEW',
      items: [
        { page: 'dashboard' as PageType, icon: LayoutDashboard, label: 'Dashboard' },
        { page: 'yield-overview' as PageType, icon: TrendingUp, label: 'Yield Overview' },
        { page: 'my-node' as PageType, icon: Coins, label: 'My Node' },
      ],
    },
    {
      title: 'ECOSYSTEM',
      items: [
        { page: 'assets-inclusion' as PageType, icon: List, label: 'Assets Inclusion' },
      ],
    },
    {
      title: 'RESOURCES',
      items: [
        { page: 'faq' as PageType, icon: HelpCircle, label: 'FAQ' },
        { page: 'risk-disclosure' as PageType, icon: AlertCircle, label: 'Risk Disclosure' },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { page: 'settings' as PageType, icon: Settings, label: 'Settings' },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b" style={{ borderColor: 'var(--seasons-border-hair)' }}>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--seasons-text-primary)',
          }}
        >
          Menu
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {menuSections.map((section, sectionIdx) => (
          <div key={section.title} className={sectionIdx > 0 ? 'mt-6' : ''}>
            {/* Section Header */}
            <h3
              className="mb-2 px-3"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                color: 'var(--seasons-text-tertiary)',
                textTransform: 'uppercase',
              }}
            >
              {section.title}
            </h3>
            
            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;
                
                return (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/5 relative"
                    style={{
                      background: 'transparent',
                      color: isActive ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)',
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r"
                        style={{
                          background: 'linear-gradient(180deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                        }}
                      />
                    )}
                    <Icon 
                      size={18} 
                      style={{ 
                        color: isActive ? 'var(--seasons-text-primary)' : 'var(--seasons-text-secondary)' 
                      }} 
                    />
                    <span style={{ fontSize: '14px', fontWeight: isActive ? 500 : 400 }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}