import { LayoutDashboard, TrendingUp, Wallet, Trophy, Server, HelpCircle, ShieldAlert, ChevronLeft, ChevronRight, PieChart, Settings } from 'lucide-react';
import type { PageType } from '../App';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  page: PageType;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  isAdmin?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isConnected?: boolean;
}

export function Sidebar({ currentPage, onNavigate, isAdmin = false, isCollapsed = false, onToggleCollapse, isConnected = false }: SidebarProps) {
  const navGroups: NavGroup[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: <LayoutDashboard size={18} />, page: 'dashboard' },
        { label: 'Yield Overview', icon: <PieChart size={18} />, page: 'yield-overview' },
        { label: 'My Node', icon: <Server size={18} />, page: 'my-node' },
      ],
    },
    {
      title: 'Ecosystem',
      items: [
        { label: 'Assets Inclusion', icon: <Wallet size={18} />, page: 'holdings' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'FAQ', icon: <HelpCircle size={18} />, page: 'faq' },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Settings', icon: <Settings size={18} />, page: 'settings' },
      ],
    },
  ];

  // Determine if page requires wallet connection
  const requiresWallet = (page: PageType) => {
    // Only Dashboard, FAQ, and Risk Disclosure are accessible without wallet
    const publicPages: PageType[] = ['dashboard', 'faq', 'risks'];
    return !publicPages.includes(page);
  };

  const allGroups = navGroups;

  return (
    <div
      className={`hidden md:flex fixed left-0 top-16 bottom-0 ${isCollapsed ? 'w-16' : 'w-56'} flex-col sidebar-container transition-all duration-300 group`}
      style={{
        background: 'var(--seasons-bg-elev)',
        borderRight: '1px solid var(--seasons-border-hair)',
      }}
    >
      {/* Toggle button */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className={`absolute top-3 ${isCollapsed ? 'left-1/2 -translate-x-1/2' : 'right-2'} p-1.5 rounded-lg hover:bg-white/5 transition-all duration-150 z-10`}
          style={{
            color: 'var(--seasons-text-tertiary)',
          }}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      )}

      {/* Navigation groups */}
      <TooltipProvider delayDuration={0}>
        <nav className="flex-1 px-3 pt-12 pb-2 overflow-y-auto scrollbar-hidden">
          {allGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-4">
              {isCollapsed ? (
                <div className="flex justify-center mb-1.5">
                  <div
                    className="h-px w-6"
                    style={{
                      background: 'var(--seasons-border-hair)',
                    }}
                  />
                </div>
              ) : (
                <h3
                  className="px-3 mb-1.5"
                  style={{
                    color: 'var(--seasons-text-tertiary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {group.title}
                </h3>
              )}
              <div className="space-y-0.5">
                {group.items.map((item, itemIdx) => {
                  const isActive = currentPage === item.page;
                  const needsWallet = requiresWallet(item.page);
                  const isDisabled = needsWallet && !isConnected;
                  
                  const NavButton = (
                    <button
                      key={itemIdx}
                      onClick={() => !isDisabled && onNavigate(item.page)}
                      disabled={isDisabled}
                      className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-1.5 rounded-lg transition-all duration-150 hover:bg-white/5 relative ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                      style={{
                        color: isActive
                          ? 'var(--seasons-text-primary)'
                          : 'var(--seasons-text-secondary)',
                        fontWeight: isActive ? 500 : 400,
                        fontSize: '14px',
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
                      <span
                        style={{
                          color: isActive
                            ? 'var(--seasons-text-primary)'
                            : 'var(--seasons-text-secondary)',
                        }}
                      >
                        {item.icon}
                      </span>
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );

                  // Wrap in tooltip if disabled or collapsed
                  if (isDisabled || isCollapsed) {
                    return (
                      <Tooltip key={itemIdx}>
                        <TooltipTrigger asChild>
                          {NavButton}
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                          <div>
                            {item.label}
                            {isDisabled && (
                              <div className="text-xs mt-1" style={{ color: 'var(--seasons-text-tertiary)' }}>
                                Connect wallet to access
                              </div>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return NavButton;
                })}
              </div>
            </div>
          ))}
        </nav>
      </TooltipProvider>

      {/* Sidebar footer */}
      <div
        className="px-3 py-3 border-t"
        style={{
          borderColor: 'var(--seasons-border-hair)',
        }}
      >
        <p
          style={{
            color: 'var(--seasons-text-tertiary)',
            fontSize: '11px',
          }}
        >
          v0.1 — Alternative, onchain yield.
        </p>
      </div>
    </div>
  );
}