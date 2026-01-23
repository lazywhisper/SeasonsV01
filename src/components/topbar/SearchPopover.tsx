import { useState } from 'react';
import { Search, ArrowRight, Coins, LayoutDashboard, TrendingUp, Wallet, Receipt, Trophy, List, Users, Megaphone, Gift, Settings } from 'lucide-react';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cardStyles } from '../../styles/cardStyles';
import type { PageType } from '../../App';
import { SearchResult } from './types';

interface SearchPopoverProps {
  onNavigate: (page: PageType) => void;
}

export function SearchPopover({ onNavigate }: SearchPopoverProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

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

  return (
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
        style={cardStyles.elevated}
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
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-3 group"
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
  );
}
