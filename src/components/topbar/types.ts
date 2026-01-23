import type { PageType } from '../../App';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PlatformNotification {
  id: string;
  type: 'asset_listing' | 'yield_distribution' | 'node_online' | 'node_offline';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface SearchResult {
  id: string;
  type: 'asset' | 'transaction' | 'proposal' | 'page' | 'action';
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action: () => void;
}

export interface TopBarProps {
  isConnected: boolean;
  walletAddress?: string;
  onConnectWallet: (walletId?: string) => void;
  onDisconnectWallet: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  walletModalOpen?: boolean;
  onWalletModalChange?: (open: boolean) => void;
}

export type Season = 'MEME' | 'DeFi' | 'Gaming' | 'NFT';
