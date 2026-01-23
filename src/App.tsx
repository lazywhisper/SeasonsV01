import { useState, useEffect, lazy, Suspense } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { SEO } from './components/SEO';
import { CursorGlow } from './components/CursorGlow';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { mockPlatformStats, mockLiveRewards, mockAssets, mockUserNode } from './lib/mockData';
import './styles/globals.css';

// Lazy load pages for better code splitting
const DashboardPage = lazy(() => import('./components/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const YieldOverviewPage = lazy(() => import('./components/pages/YieldOverviewPage').then(m => ({ default: m.YieldOverviewPage })));
const MyNodePage = lazy(() => import('./components/pages/MyNodePage').then(m => ({ default: m.MyNodePage })));
const HoldingsPage = lazy(() => import('./components/pages/HoldingsPage').then(m => ({ default: m.HoldingsPage })));
const FAQPage = lazy(() => import('./components/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const RisksDisclosurePage = lazy(() => import('./components/pages/RisksDisclosurePage').then(m => ({ default: m.RisksDisclosurePage })));
const SettingsPage = lazy(() => import('./components/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
        <div className="h-8 bg-white/5 rounded-lg w-1/3" />
        <div className="h-4 bg-white/5 rounded-lg w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export type PageType = 
  | 'dashboard'
  | 'yield-overview'
  | 'my-node'
  | 'holdings'
  | 'faq'
  | 'risks'
  | 'settings';

export type Theme = 'light' | 'dark';

// SEO metadata for each page
const pageSEO: Record<PageType, { title: string; description: string; keywords: string }> = {
  dashboard: {
    title: 'Seasons | Earn 34.5% APY on Solana Memecoins - Alternative Onchain Yield',
    description: 'Alternative yield platform on Solana. Earn 34.5% APY through curated memecoin portfolios. $62K+ distributed across 259 active nodes. Connect wallet to start earning.',
    keywords: 'Solana yield, memecoin yield, alternative income, DeFi Solana, $SEAS, crypto APY, alternative yield',
  },
  'yield-overview': {
    title: 'Yield Overview - Seasons | Node Status & Earnings Dashboard',
    description: 'Monitor your Seasons node status, track earnings, and view your share of the yield distribution pool.',
    keywords: 'Seasons node, earnings dashboard, yield tracking, $SEAS balance, onchain rewards',
  },
  'my-node': {
    title: 'My Node - Seasons | Node Status & Earnings Dashboard',
    description: 'Monitor your Seasons node status, track earnings, and view your share of the yield distribution pool.',
    keywords: 'Seasons node, earnings dashboard, yield tracking, $SEAS balance, onchain rewards',
  },
  holdings: {
    title: 'Assets Inclusion - Seasons | Blue Chips, Underdogs & Rising Stars',
    description: 'Explore the curated asset lists across Blue Chips (60%), Underdogs (30%), and Rising Stars (10%). View inclusion criteria and portfolio composition.',
    keywords: 'crypto assets, asset inclusion, memecoin list, Blue Chips, Underdogs, Rising Stars, Solana memecoins, portfolio composition',
  },
  faq: {
    title: 'FAQ - Seasons | Frequently Asked Questions & Support',
    description: 'Get answers to common questions about Seasons yield platform, node activation, rewards distribution, and more.',
    keywords: 'Seasons FAQ, help, support, how to earn yield, $SEAS questions',
  },
  risks: {
    title: 'Risk Disclosure - Seasons | Important Risk Information',
    description: 'Understand the risks associated with Seasons platform including smart contract, market volatility, and DeFi risks.',
    keywords: 'crypto risks, DeFi risks, investment risks, risk disclosure, cryptocurrency warnings',
  },
  settings: {
    title: 'Settings - Seasons | Customize Your Experience',
    description: 'Adjust your preferences and settings to enhance your experience on the Seasons platform.',
    keywords: 'Seasons settings, user preferences, customization, platform settings, user experience',
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  // Apply dark theme on mount
  useEffect(() => {
    document.documentElement.classList.add('dark-theme');
  }, []);

  // Auto-scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleConnectWallet = (walletId?: string) => {
    setIsConnected(true);
    setWalletAddress('yuri...8f1G');
    setWalletModalOpen(false);
    toast.success(`Connected to ${walletId || 'wallet'}`, {
      description: 'Your wallet has been connected successfully.',
    });
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(undefined);
    setCurrentPage('dashboard');
  };

  const handleBuySeas = () => {
    toast.info('Redirecting to exchange...', {
      description: 'Opening Jupiter or Raydium to buy $SEAS',
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage
              isConnected={isConnected}
              onConnectWallet={() => setWalletModalOpen(true)}
              onBuySeas={handleBuySeas}
              onNavigate={(page) => setCurrentPage(page as PageType)}
            />
          </Suspense>
        );
      case 'yield-overview':
        return (
          <Suspense fallback={<PageLoader />}>
            <YieldOverviewPage
              isConnected={isConnected}
            />
          </Suspense>
        );
      case 'my-node':
        return (
          <Suspense fallback={<PageLoader />}>
            <MyNodePage
              nodeData={mockUserNode}
              onBuySeas={handleBuySeas}
            />
          </Suspense>
        );
      case 'holdings':
        return <Suspense fallback={<PageLoader />}><HoldingsPage /></Suspense>;
      case 'faq':
        return <Suspense fallback={<PageLoader />}><FAQPage /></Suspense>;
      case 'risks':
        return <Suspense fallback={<PageLoader />}><RisksDisclosurePage /></Suspense>;
      case 'settings':
        return (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage
              isConnected={isConnected}
              walletAddress={walletAddress}
              onDisconnect={handleDisconnectWallet}
            />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage
              isConnected={isConnected}
              onConnectWallet={handleConnectWallet}
              onBuySeas={handleBuySeas}
              onNavigate={(page) => setCurrentPage(page as PageType)}
            />
          </Suspense>
        );
    }
  };

  // Get current page SEO data
  const currentSEO = pageSEO[currentPage];

  // FAQ Page Structured Data
  const faqStructuredData = currentPage === 'faq' ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why is the yield on Season\'s different from any other?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The differentiator is the method through yield is derived; rather than simple lending/borrowing, yield is generated from the transactional fee mechanism; which in turn provides a radically different potential APY.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a Season\'s Node?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Season\'s nodes are any, non-blacklisted, on-chain address that are generating yield by possessing at least the threshold amount of 10,000 tokens.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is the yield quantity calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yield quantity is derived from 4 main variables: Buy Volume, Sell Volume, Number of "nodes" (active yielder\'s), and Rolling auto-yield.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is there such a large fee on the buy/sell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The fee is where Market trading revenue originates from. The fee is used to incentivize holding.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can i buy $SEAS',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '$SEAS token can be acquired on any/every decentralized exchange compatible with the Solana blockchain/SPL token standard.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I navigate the Seasons dashboard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The dashboard is organized into several key sections accessible via the sidebar: Overview (main dashboard), Yield (distribution metrics), Assets (portfolio breakdown), My Node (personal stats), Settings (account preferences), and FAQ. Click any menu item to view that section.',
        },
      },
    ],
  } : null;

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        ogTitle={currentSEO.title}
        ogDescription={currentSEO.description}
        ogImage="https://seasons.finance/og-image.jpg"
        ogUrl={`https://seasons.finance/${currentPage === 'dashboard' ? '' : currentPage}`}
        twitterCard="summary_large_image"
        twitterTitle={currentSEO.title}
        twitterDescription={currentSEO.description}
        canonical={`https://seasons.finance/${currentPage === 'dashboard' ? '' : currentPage}`}
      />

      {/* FAQ Page Structured Data */}
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      {/* Cursor Glow Effect */}
      <CursorGlow />

      <div
        className="min-h-screen"
        style={{
          background: 'var(--seasons-bg-base)',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro", system-ui, sans-serif',
        }}
      >
        <TopBar
          isConnected={isConnected}
          walletAddress={walletAddress}
          onConnectWallet={handleConnectWallet}
          onDisconnectWallet={handleDisconnectWallet}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          walletModalOpen={walletModalOpen}
          onWalletModalChange={setWalletModalOpen}
        />
      
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isAdmin={isAdmin}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isConnected={isConnected}
      />

      {/* Main content */}
      <main
        className={`${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-56'} mt-16 p-4 md:p-6 transition-all duration-300`}
        style={{
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <div className="max-w-[1600px] mx-auto">
          {renderPage()}

          {/* Footer */}
          <footer
            className="mt-12 pt-8 pb-6"
            style={{
              borderTop: '1px solid var(--seasons-border-hair)',
            }}
          >
            {/* Links Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              {/* Docs */}
              <div className="flex items-center gap-4">
                <a
                  href="https://seasons.gitbook.io/seasons-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:opacity-70"
                  style={{
                    color: 'var(--seasons-text-secondary)',
                    fontSize: '13px',
                  }}
                >
                  Documentation
                </a>
                <button
                  onClick={() => setCurrentPage('risks')}
                  className="transition-all duration-200 hover:opacity-70"
                  style={{
                    color: 'var(--seasons-text-secondary)',
                    fontSize: '13px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Risk Disclosure
                </button>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: '1px',
                  height: '16px',
                  background: 'var(--seasons-border-hair)',
                  display: 'none',
                }}
                className="md:block"
              />

              {/* Legal Links */}
              <div className="flex items-center gap-4">
                <a
                  href="/privacy"
                  className="transition-all duration-200 hover:opacity-70"
                  style={{
                    color: 'var(--seasons-text-secondary)',
                    fontSize: '13px',
                  }}
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="transition-all duration-200 hover:opacity-70"
                  style={{
                    color: 'var(--seasons-text-secondary)',
                    fontSize: '13px',
                  }}
                >
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* X (Twitter) */}
              <a
                href="https://x.com/SEAS_onchain"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                }}
                aria-label="X (Twitter)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Telegram */}
              <a
                href="https://t.me/SeasonsCommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                }}
                aria-label="Telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/seasons-seas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                }}
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@SEAS_onchain"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                }}
                aria-label="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              
              {/* Medium */}
              <a
                href="https://medium.com/seasons-blog"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
                style={{
                  color: 'var(--seasons-text-tertiary)',
                }}
                aria-label="Medium"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </a>
            </div>

            {/* Tagline */}
            <p
              className="text-center"
              style={{
                color: 'var(--seasons-text-tertiary)',
                fontSize: '12px',
              }}
            >
              © 2026 Seasons — Alternative, onchain yield.
            </p>
          </footer>
        </div>
      </main>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--seasons-bg-elev)',
              border: '1px solid var(--seasons-border-hair)',
              color: 'var(--seasons-text-primary)',
            },
          }}
        />
      </div>
    </>
  );
}