import { LayoutDashboard, TrendingUp, Coins, List, AlertCircle, Settings, HelpCircle } from 'lucide-react';
import type { PageType } from '../../App';

interface MobileSidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  isConnected: boolean;
}

export function MobileSidebar({ currentPage, onNavigate, isConnected }: MobileSidebarProps) {
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
