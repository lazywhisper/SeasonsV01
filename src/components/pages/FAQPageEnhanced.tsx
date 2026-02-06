import { useState, useMemo } from 'react';
import {
  Search,
  HelpCircle,
  Coins,
  ArrowUpRight,
  Link2,
  ChevronRight,
  TrendingUp,
  Wallet,
  Settings,
  Zap,
  Shield,
  Layout,
  Eye,
  BarChart3,
  FileText,
  Clock,
  AlertCircle,
  Lock,
  Users,
  DollarSign,
  Server,
  Globe,
  Smartphone,
} from 'lucide-react';
import { FilterButtonGroup } from '../ui/FilterButtonGroup';
import { cardStyles } from '../../styles/cardStyles';
import { PageHeader } from '../ui/PageHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

type FAQCategory = 
  | 'getting-started' 
  | 'yields' 
  | 'portfolio' 
  | 'governance' 
  | 'technical' 
  | 'fees';

interface FAQ {
  question: string;
  answer: string;
  category: FAQCategory;
  icon?: any;
  popular?: boolean;
  hasAPYDisclaimer?: boolean;
}

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQCategory | 'all'>('all');

  const faqs: FAQ[] = [
    // ========================================================================
    // GETTING STARTED
    // ========================================================================
    {
      category: 'getting-started',
      icon: Layout,
      popular: true,
      question: 'What is Seasons platform?',
      answer:
        'Seasons is a Solana-native yield aggregation platform that automatically optimizes your portfolio across three strategic asset tiers: Blue Chips (60%), Underdogs (30%), and Rising Stars (10%). Access requires holding 10,000+ $SEAS tokens, providing exclusive entry to institutional-grade onchain yield strategies.',
    },
    {
      category: 'getting-started',
      icon: Users,
      popular: true,
      question: 'How do I qualify for dashboard access?',
      answer:
        'You must hold a minimum of 10,000 $SEAS tokens in your connected wallet. Once you meet this threshold: (1) Connect your Solana wallet (Phantom, Solflare, Backpack supported), (2) The platform automatically verifies your $SEAS balance, (3) Dashboard unlocks immediately upon qualification. NOTE: Access is checked in real-time. If your balance falls below 10,000 $SEAS, access will be temporarily suspended.',
    },
    {
      category: 'getting-started',
      icon: Wallet,
      question: 'Which wallets are supported?',
      answer:
        'Currently supported Solana wallets: Phantom, Solflare, Backpack, Ledger (via Phantom/Solflare).',
    },
    {
      category: 'getting-started',
      icon: Smartphone,
      question: 'Is there a mobile version?',
      answer:
        'Yes, the dashboard is fully responsive and optimized for mobile browsers. A native iOS/Android app is planned for Q3 2026.',
    },

    // ========================================================================
    // YIELDS & RETURNS
    // ========================================================================
    {
      category: 'yields',
      icon: TrendingUp,
      popular: true,
      question: 'How is APR/APY calculated?',
      answer:
        'All displayed APR/APY metrics are calculated based on a 30-day rolling period using actual onchain performance data. This provides a realistic view of recent yields while smoothing short-term volatility. Formula: APY = (1 + daily_rate)^365 - 1, where daily_rate = total_returns_30d / 30. IMPORTANT: Past performance does not guarantee future results.',
      hasAPYDisclaimer: true,
    },
    {
      category: 'yields',
      icon: Coins,
      popular: true,
      question: 'What types of onchain yield does Seasons generate?',
      answer:
        'Seasons aggregates multiple yield sources: \n\nAlternative Yield Sources:\nBlue Chips: Staking rewards (SOL, JTO, JUP), lending protocols (MarginFi, Kamino)\nUnderdogs: Liquidity provision (Raydium, Orca), yield farming\nRising Stars: Early-stage staking, strategic LP positions\n\nOnchain Rewards:\n• Protocol incentives & airdrops\n• Trading fee redistribution\n• MEV capture (when applicable)\n\nWe NEVER use the term "passive income" — all yields require active smart contract participation.',
    },
    {
      category: 'yields',
      icon: AlertCircle,
      question: 'What are the risks?',
      answer:
        'All DeFi activities carry inherent risks: Smart Contract Risk: Exploits in underlying protocols. Impermanent Loss: LP positions may underperform vs. holding. Market Volatility: Token price fluctuations affect portfolio value. Liquidation Risk: Leveraged positions (if used) can be liquidated. MITIGATION: Seasons diversifies across 20+ protocols and employs automated risk monitoring. Always invest only what you can afford to lose.',
    },
    {
      category: 'yields',
      icon: ArrowUpRight,
      question: 'Can I withdraw anytime?',
      answer:
        'Yes, withdrawals are processed immediately for most assets. Some positions (e.g., lockup staking) may have unbonding periods of 1-7 days. These are clearly marked in your portfolio view.',
    },
    {
      category: 'yields',
      icon: TrendingUp,
      question: "Why is the yield on Season's different from any other?",
      answer:
        'The differentiator is the method through which yield is derived; rather than simple lending/borrowing, yield is generated from the transactional fee mechanism; which in turn provides a radically different potential APY.',
      hasAPYDisclaimer: true,
    },
    {
      category: 'yields',
      icon: BarChart3,
      question: 'How is the yield quantity calculated?',
      answer:
        'Yield quantity is derived from 4 main variables: Buy Volume, Sell Volume, Number of "nodes" (active yielders), and Rolling auto-yield.',
    },

    // ========================================================================
    // PORTFOLIO & ASSETS
    // ========================================================================
    {
      category: 'portfolio',
      icon: BarChart3,
      popular: true,
      question: 'What is the 6:3:1 allocation rule?',
      answer:
        'This is Seasons\' core portfolio philosophy designed to balance stability, growth, and moonshot potential:\n\nBlue Chips: 60%\n└─ Established Solana projects (SOL, JTO, JUP, PYTH)\n└─ Lower volatility, steady yields\n└─ Foundation of portfolio stability\n\nUnderdogs: 30%\n└─ Mid-cap protocols with proven PMF\n└─ Higher growth potential, moderate risk\n└─ Examples: Drift, Marginfi, Kamino\n\nRising Stars: 10%\n└─ Early-stage high-conviction bets\n└─ Highest risk/reward ratio\n└─ Carefully curated emerging projects\n\nThis ratio is enforced automatically and rebalanced daily at 00:00 UTC.',
    },
    {
      category: 'portfolio',
      icon: Settings,
      question: 'Can I customize my allocation?',
      answer:
        'Not currently. The 6:3:1 ratio is fundamental to Seasons\' risk-managed approach. Custom allocations may be introduced for holders of 100,000+ $SEAS in future updates.',
    },
    {
      category: 'portfolio',
      icon: Clock,
      question: 'How often is the portfolio rebalanced?',
      answer:
        'Daily check: 00:00 UTC. Auto-rebalance: Only if deviation exceeds ±5% from target ratios. Manual override: Available via Governance proposals (requires 50,000 $SEAS vote threshold). You\'ll receive notifications for all rebalancing events.',
    },
    {
      category: 'portfolio',
      icon: Eye,
      question: 'What assets are currently in each tier?',
      answer:
        'See the live breakdown in your Portfolio page. Current allocations (as of Feb 2026): Blue Chips: SOL, JTO, JUP, PYTH, BONK. Underdogs: DRIFT, MNGO, ORCA, RAY, KMNO. Rising Stars: [Concealed for strategic reasons — visible to qualified holders]. Asset selections are reviewed quarterly by the Seasons Core Team and approved via governance.',
    },

    // ========================================================================
    // GOVERNANCE
    // ========================================================================
    {
      category: 'governance',
      icon: Users,
      popular: true,
      question: 'How does governance work?',
      answer:
        'Seasons uses a weighted voting system:\n\nVoting Power:\n• 1 $SEAS = 1 vote\n• Proposals require 50,000 $SEAS to create\n• 100,000 $SEAS threshold to activate system-critical changes\n\nProcess:\n1. Proposal submitted (7-day discussion period)\n2. Voting opens (5-day voting window)\n3. Execution (if quorum met: 20% of circulating $SEAS)',
    },
    {
      category: 'governance',
      icon: FileText,
      question: 'What can be governed?',
      answer:
        'Token holders can vote on: Asset tier inclusions/exclusions, Fee structure adjustments, Treasury allocations, Protocol integrations. NOT ALLOWED: Core 6:3:1 ratio (hardcoded for security).',
    },
    {
      category: 'governance',
      icon: Lock,
      question: 'Do I need to lock $SEAS to vote?',
      answer:
        'No. Your $SEAS remains liquid while voting. Voting power is snapshot at proposal creation time to prevent manipulation.',
    },

    // ========================================================================
    // TECHNICAL
    // ========================================================================
    {
      category: 'technical',
      icon: Shield,
      popular: true,
      question: 'Is my wallet safe when connecting?',
      answer:
        'Yes. Seasons uses read-only wallet connections by default: We NEVER request private keys, Transactions require explicit wallet approval, All smart contracts are audited (Certik, Halborn). Best practices: Use hardware wallets for large holdings, Verify transaction details before signing, Enable wallet security features (biometrics, passwords).',
    },
    {
      category: 'technical',
      icon: Server,
      question: 'Why is the dashboard loading slowly?',
      answer:
        'Potential causes: (1) RPC congestion — Try switching RPC endpoint (Settings → Network), (2) Wallet extension conflicts — Disable unused wallet extensions, (3) First load — Some data is cached after initial visit. If issues persist, check status.seasons.io for system health.',
    },
    {
      category: 'technical',
      icon: Clock,
      question: 'What blockchain data is displayed in real-time?',
      answer:
        'Updated every ~2-3 seconds: Portfolio value (total & per-asset), Current APY (all positions), Recent activity feed, Governance proposal states.',
      hasAPYDisclaimer: true,
    },
    {
      category: 'technical',
      icon: Globe,
      question: 'Are there API endpoints for developers?',
      answer:
        'Public read-only APIs are available at api.seasons.io/v1: GET /yields (Current APY across all tiers), GET /allocations (Portfolio composition), GET /governance (Active proposals). Rate limit: 100 requests/minute. API key required for higher limits (apply via Discord).',
      hasAPYDisclaimer: true,
    },

    // ========================================================================
    // FEES & ECONOMICS
    // ========================================================================
    {
      category: 'fees',
      icon: DollarSign,
      popular: true,
      question: 'What fees does Seasons charge?',
      answer:
        'Management fee: 0.5% annually (charged continuously). Performance fee: 10% of yields above 8% APY benchmark. Withdrawal fee: None. Deposit fee: None. All fees are transparent and viewable in real-time on the Dashboard → Fees page.',
      hasAPYDisclaimer: true,
    },
    {
      category: 'fees',
      icon: Coins,
      question: 'What is $SEAS used for?',
      answer:
        'The $SEAS token has three core utilities: (1) Access Key — 10,000+ required for dashboard. (2) Governance Rights — Vote on protocol decisions. (3) Fee Discounts — Hold 50,000+ for 50% fee reduction.',
    },
    {
      category: 'fees',
      icon: Zap,
      question: 'Is there a $SEAS burn mechanism?',
      answer:
        'Yes. 25% of all platform fees are used to buy back and burn $SEAS tokens quarterly: Next burn: April 1, 2026 00:00 UTC. Last burn: 47,293 $SEAS (Jan 1, 2026). Burn events are announced 48 hours in advance via notifications.',
    },
    {
      category: 'fees',
      icon: TrendingUp,
      question: 'Where can I buy $SEAS?',
      answer:
        'Primary markets: Raydium (largest liquidity), Orca (concentrated liquidity pools), Jupiter Aggregator (best execution). Always verify the official contract address: SEASxxx...xxx (see footer).',
    },
    {
      category: 'fees',
      icon: AlertCircle,
      question: 'Why is there such a large fee on the buy/sell?',
      answer:
        'The fee is where Market trading revenue originates from. The fee is used to incentivize holding.',
    },

    // ========================================================================
    // ADDITIONAL QUESTIONS FROM ORIGINAL FAQ
    // ========================================================================
    {
      category: 'getting-started',
      icon: HelpCircle,
      question: "What is a Season's Node?",
      answer:
        'Season\'s nodes are any, non-blacklisted, on-chain address that are generating yield by possessing at least the threshold amount of 10,000 tokens.',
    },
    {
      category: 'technical',
      icon: Clock,
      question: 'What timezone is used across the platform?',
      answer:
        'All times are displayed in UTC (Coordinated Universal Time) to ensure consistency for our global user base. Examples: Rebalancing: 00:00 UTC daily, Governance votes close: 23:59 UTC on final day, Activity feed timestamps: "2h ago" (relative) or "Feb 4, 2026 14:32 UTC" (absolute). You can view your local timezone equivalent by hovering over any timestamp.',
    },
    {
      category: 'portfolio',
      icon: HelpCircle,
      question: 'Can I recommend a project for Inclusion into Yield?',
      answer: 'Absolutely! Just fill out the Inclusion List Request Form on our website.',
    },
    {
      category: 'yields',
      icon: Settings,
      question: 'Can I choose which assets I receive in yield?',
      answer: 'Not yet, but that feature is being developed for future releases.',
    },
    {
      category: 'yields',
      icon: Coins,
      question: 'Will Yield always be paid in Memecoins?',
      answer:
        'The default mechanism will always opt for Memecoins (due to the volatility profile which amplifies the APY potential), however, in the future users will be able to select a basket of assets in which they want to receive their yield (including stablecoins).',
      hasAPYDisclaimer: true,
    },
    {
      category: 'fees',
      icon: Zap,
      question: 'Will $SEAS tokens have more Utility beyond Yield?',
      answer:
        'Yes. At a later date they shall be imbued with DAO membership rights; giving holders direct ownership over the protocol.',
    },
    {
      category: 'fees',
      icon: TrendingUp,
      question: 'Will there be a Buyback mechanism for $SEAS?',
      answer: 'Potentially via the treasury at a later date as to be determined by the community, at launch no.',
    },
    {
      category: 'getting-started',
      icon: Wallet,
      question: 'Will there be a fee for transferred tokens between wallets?',
      answer:
        'No. The fee module is activated whenever DEX related activities are triggered via the call functions.',
    },
    {
      category: 'fees',
      icon: DollarSign,
      question: 'What is the Transactional Fee?',
      answer:
        'The transactional fee is attached to every open on-chain market operations that involves the $SEAS token. The fee is captured and redirected throughout the Season\'s nodes.',
    },
  ];

  // Filter FAQs based on search query and active category
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Get popular FAQs
  const popularFAQs = useMemo(() => {
    return faqs.filter((faq) => faq.popular);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: faqs.length,
      'getting-started': faqs.filter((f) => f.category === 'getting-started').length,
      yields: faqs.filter((f) => f.category === 'yields').length,
      portfolio: faqs.filter((f) => f.category === 'portfolio').length,
      governance: faqs.filter((f) => f.category === 'governance').length,
      technical: faqs.filter((f) => f.category === 'technical').length,
      fees: faqs.filter((f) => f.category === 'fees').length,
    };
  }, []);

  const copyLinkToFAQ = async (index: number) => {
    const url = `${window.location.origin}${window.location.pathname}#faq-${index}`;
    
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback method
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Silent fail - user can still manually copy the URL
    }
  };

  // Check if any displayed FAQ has APY disclaimer
  const showAPYDisclaimer = filteredFAQs.some(faq => faq.hasAPYDisclaimer);

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Frequently Asked Questions"
        description="Everything you need to know about Seasons onchain yield platform"
      />

      {/* Search Bar */}
      <div
        className="mb-6 p-1.5 rounded-xl"
        style={cardStyles.elevated}
      >
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--seasons-text-tertiary)' }}
          />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-all font-raleway"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid transparent',
              color: 'var(--seasons-text-primary)',
              fontSize: '14px',
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = '1px solid var(--seasons-border-subtle)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = '1px solid transparent';
            }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto">
        <FilterButtonGroup
          options={[
            { value: 'all' as const, label: `All (${categoryCounts.all})` },
            { value: 'getting-started' as const, label: `Getting Started (${categoryCounts['getting-started']})` },
            { value: 'yields' as const, label: `Yields (${categoryCounts.yields})` },
            { value: 'portfolio' as const, label: `Portfolio (${categoryCounts.portfolio})` },
            { value: 'governance' as const, label: `Governance (${categoryCounts.governance})` },
            { value: 'technical' as const, label: `Technical (${categoryCounts.technical})` },
            { value: 'fees' as const, label: `Fees (${categoryCounts.fees})` },
          ]}
          value={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Popular Questions (only show when no search/filter) */}
      {searchQuery === '' && activeCategory === 'all' && (
        <div
          className="mb-6 p-5 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.05), rgba(242, 119, 131, 0.05))',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp
              size={16}
              style={{
                color: 'var(--seasons-brand-grad-start)',
              }}
            />
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Popular Questions
            </h3>
          </div>
          <div className="grid gap-2">
            {popularFAQs.map((faq, index) => {
              const Icon = faq.icon || HelpCircle;
              return (
                <a
                  key={index}
                  href={`#faq-popular-${index}`}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all group hover:bg-white/5"
                  style={{
                    border: '1px solid transparent',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid var(--seasons-border-subtle)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid transparent';
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'var(--seasons-bg-card)',
                      border: '1px solid var(--seasons-border-hair)',
                    }}
                  >
                    <Icon size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
                  </div>
                  <span
                    className="flex-1"
                    style={{
                      fontSize: '15px',
                      color: 'var(--seasons-text-primary)',
                      fontWeight: 500,
                      fontFamily: 'Raleway, sans-serif',
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--seasons-text-tertiary)' }}
                  />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* FAQ Accordion */}
      <div
        className="p-6 rounded-xl"
        style={cardStyles.elevated}
      >
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <Search
              size={48}
              className="mx-auto mb-4 opacity-20"
              style={{ color: 'var(--seasons-text-tertiary)' }}
            />
            <p
              style={{
                fontSize: '16px',
                color: 'var(--seasons-text-secondary)',
                marginBottom: '8px',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              No FAQs found
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--seasons-text-tertiary)',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {filteredFAQs.map((faq, index) => {
              const Icon = faq.icon || HelpCircle;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  id={`faq-${index}`}
                  className="rounded-lg overflow-hidden group"
                  style={{
                    background: 'var(--seasons-bg-card)',
                    border: '1px solid var(--seasons-border-hair)',
                  }}
                >
                  <AccordionTrigger
                    className="px-4 py-4 hover:no-underline transition-all"
                    style={{
                      color: 'var(--seasons-text-primary)',
                    }}
                  >
                    <div className="flex items-start gap-3 flex-1 text-left">
                      {/* Icon */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          background: 'var(--seasons-bg-base)',
                          border: '1px solid var(--seasons-border-hair)',
                        }}
                      >
                        <Icon size={16} style={{ color: 'var(--seasons-text-tertiary)' }} />
                      </div>

                      {/* Question */}
                      <div className="flex-1">
                        <div
                          style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            lineHeight: '1.5',
                            fontFamily: 'Raleway, sans-serif',
                          }}
                        >
                          {faq.question}
                        </div>
                        {faq.popular && (
                          <div
                            className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(233, 199, 116, 0.1)',
                              border: '1px solid rgba(233, 199, 116, 0.2)',
                            }}
                          >
                            <TrendingUp size={10} style={{ color: 'var(--seasons-brand-grad-start)' }} />
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 600,
                                color: 'var(--seasons-brand-grad-start)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px',
                              }}
                            >
                              Popular
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Copy Link Button */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          copyLinkToFAQ(index);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            copyLinkToFAQ(index);
                          }
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/5"
                        style={{
                          border: '1px solid var(--seasons-border-hair)',
                          cursor: 'pointer',
                        }}
                        title="Copy link to this FAQ"
                      >
                        <Link2 size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-4 pb-4"
                    style={{
                      color: 'var(--seasons-text-secondary)',
                      fontSize: '14px',
                      lineHeight: '1.7',
                      fontFamily: 'Raleway, sans-serif',
                    }}
                  >
                    <div
                      className="pl-12 pr-4"
                      style={{
                        borderLeft: '2px solid var(--seasons-border-hair)',
                        marginLeft: '18px',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>

      {/* APY Disclaimer (shown when relevant FAQs are displayed) */}
      {showAPYDisclaimer && (
        <div
          className="p-4 rounded-xl flex items-start gap-3"
          style={{
            background: 'rgba(233, 199, 116, 0.05)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <AlertCircle size={16} style={{ color: 'var(--seasons-brand-grad-start)', flexShrink: 0, marginTop: '2px' }} />
          <p
            style={{
              fontSize: '12px',
              color: 'var(--seasons-text-secondary)',
              lineHeight: '1.6',
              fontFamily: 'Raleway, sans-serif',
            }}
          >
            <strong style={{ color: 'var(--seasons-text-primary)' }}>* APY/APR Disclaimer:</strong> All APR/APY calculations based on 30-day rolling period. Past performance is not indicative of future results. Times displayed in UTC.
          </p>
        </div>
      )}

      {/* Still have questions */}
      <div
        className="mt-8 p-6 rounded-xl relative overflow-hidden"
        style={cardStyles.elevated}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
          }}
        />

        <div className="relative text-center">
          <h3
            className="mb-2"
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--seasons-text-primary)',
            }}
          >
            Still have questions?
          </h3>
          <p
            className="mb-5"
            style={{
              fontSize: '14px',
              color: 'var(--seasons-text-secondary)',
              maxWidth: '480px',
              margin: '0 auto 20px',
              fontFamily: 'Raleway, sans-serif',
            }}
          >
            Join our community for support, discussions, and the latest updates
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="https://t.me/SeasonsCommunity"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2 group"
              style={{
                background:
                  'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                border: 'none',
                textDecoration: 'none',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Join Telegram
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <a
              href="https://x.com/SEAS_onchain"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg transition-all hover:bg-white/5 flex items-center gap-2"
              style={{
                background: 'transparent',
                color: 'var(--seasons-text-secondary)',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid var(--seasons-border-hair)',
                textDecoration: 'none',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Follow on X
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Results counter (when searching/filtering) */}
      {(searchQuery !== '' || activeCategory !== 'all') && (
        <div
          className="mt-4 text-center"
          style={{
            fontSize: '12px',
            color: 'var(--seasons-text-tertiary)',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          Showing <span className="font-inter font-semibold" style={{ fontFeatureSettings: '"tnum" 1' }}>{filteredFAQs.length}</span> of{' '}
          <span className="font-inter font-semibold" style={{ fontFeatureSettings: '"tnum" 1' }}>{faqs.length}</span> FAQs
        </div>
      )}
    </div>
  );
}