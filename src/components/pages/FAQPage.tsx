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
  Shield,
  Zap,
  BarChart3,
  Users,
  Settings,
  Layout,
  Eye,
  FileText,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

type FAQCategory = 'general' | 'token' | 'platform';

interface FAQ {
  question: string;
  answer: string;
  category: FAQCategory;
  icon?: any;
  popular?: boolean;
}

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQCategory | 'all'>('all');

  const faqs: FAQ[] = [
    // GENERAL FAQ's
    {
      category: 'general',
      icon: TrendingUp,
      popular: true,
      question: "Why is the yield on Season's different from any other?",
      answer:
        "The differentiator is the method through yield is derived; rather than simple lending/borrowing, yield is generated from the transactional taxation; which in turn provides a radically different potential APY.",
    },
    {
      category: 'general',
      icon: Wallet,
      question: 'Will I be taxed for transferred token between wallet?',
      answer:
        'No. The taxation module is activated whenever DEX related activities are triggered via the call functions.',
    },
    {
      category: 'general',
      icon: BarChart3,
      popular: true,
      question: 'What affects the yield?',
      answer:
        "Yield quantity is derived from 4 main variables: Buy Volume, Sell Volume, Number of \"nodes\" (active yielder's), and Rolling auto-yield.",
    },
    {
      category: 'general',
      icon: Coins,
      question: 'What is the Transactional Tax?',
      answer:
        "The transactional Tax is a fee attached to every open on-chain market operations that involves the $SEAS token. The fee is captured and redirected throughout the Season's nodes.",
    },
    {
      category: 'general',
      icon: Zap,
      popular: true,
      question: "What is a Season's Node?",
      answer:
        "Season's nodes are any, non-blacklisted, on-chain address that are generating yield by possessing at least the threshold amount of 10,000 tokens.",
    },
    {
      category: 'general',
      icon: Settings,
      question: 'Do I need to provide any Hardware/VPS to be a Node?',
      answer:
        'No. Nodes are the colloquial term used to classify all yield bearing wallet addresses; they do not function like layer 1 validator/node operators.',
    },
    {
      category: 'general',
      icon: Shield,
      question: 'Can I OPT out of the Yield System?',
      answer:
        'No; once an address holds 10,000 $SEAS tokens it will automatically activate the yield; in order to "opt out" users will have to bring their wallet balances below the 10,000 token level.',
    },
    {
      category: 'general',
      icon: BarChart3,
      question: "Are the Inclusion List Tier Weight's Final or can they be changed?",
      answer:
        'Tier weights are ascribed in proportion to their potential risk and return; in the first iteration they shall not be changed. However, they are absolutely susceptible to change at a later date, potential by community request via DAO.',
    },
    {
      category: 'general',
      icon: TrendingUp,
      popular: true,
      question:
        'How is the yield system sustainable? What happens if market activity grinds to a halt and nobody enters or exits?',
      answer:
        "As a means to mitigate reliance on any single vector for yield, Season's is implementing a baseline yield module in the following version of the product that will imbue token holders with a soft industry-standard yield. (more information shall be provided in the Yield System --> Stable Baseline section)",
    },
    {
      category: 'general',
      icon: Shield,
      question: "Why are some of the formula's not publicly shared?",
      answer:
        "Formula weights are not made easily accessible in order to mitigate any attempts by less than honest actors, namely projects that will attempt to falsify their data in order to qualify for inclusion. Nevertheless, at a certain point of the product's maturity it is anticipated that the community might be included to publicize it in the name of true openness; if/when they so decide to, the formulas will be provided via ZK for them to act upon it.",
    },
    {
      category: 'general',
      icon: Users,
      question: 'Do Social factors play a role in Yield Asset Selection?',
      answer:
        "Absolutely. Beyond the numeric/quantitative elements of audience size and engagements (which are now, more than ever more difficult to decipher with the AI bot nets), multiple qualitative measures are factored in, including but not limited to the reputation of the followers (KOL's beware!), types of posts, and other consistencies.",
    },
    {
      category: 'general',
      icon: HelpCircle,
      question: 'Can I recommend a project for Inclusion into Yield?',
      answer: 'Absolutely! Just fill out the Inclusion List Request Form',
    },

    // TOKEN FAQ's
    {
      category: 'token',
      icon: Coins,
      popular: true,
      question: 'How many tokens do I need to earn yield?',
      answer: 'Minimal threshold is 10,000 $SEAS token.',
    },
    {
      category: 'token',
      icon: Settings,
      question: 'Can I choose which assets I receive in yield?',
      answer: 'Not yet, but that feature is being developed.',
    },
    {
      category: 'token',
      icon: TrendingUp,
      question: 'Will Yield always be paid in Memecoins?',
      answer:
        'The default mechanism will always opt for Memecoins (due to the volatility profile which amplifies the APY potential), however, in the future users will be able to select a basket of assets in which they want to receive their yield (including stablecoins).',
    },
    {
      category: 'token',
      icon: BarChart3,
      popular: true,
      question: 'Why is there such a large tax on the buy/sell?',
      answer:
        'The tax is where Market trading revenue originates from. The tax is used to incentivize holding.',
    },
    {
      category: 'token',
      icon: Wallet,
      question: 'Where can i buy $SEAS',
      answer:
        '$SEAS token can be acquired on any/every decentralized exchange compatible with the Solana blockchain/SPL token standard.',
    },
    {
      category: 'token',
      icon: Zap,
      question: 'Will $SEAS tokens have more Utility beyond Yield?',
      answer:
        'Yes. At a later date they shall be imbued with DAO membership rights; giving holders direct ownership over the protocol.',
    },
    {
      category: 'token',
      icon: Shield,
      question: 'Will there be a Burning Mechanism for $SEAS?',
      answer:
        'No. Burning will not be a part of the token dynamics due to its already fixed supply weighed against a growing demand. Reductions in supply may create noisy signals in token price that drive short-term excitement, meanwhile restricting the wider population from joining the ecosystem.',
    },
    {
      category: 'token',
      icon: TrendingUp,
      question: 'Will there be a Buyback mechanism for $SEAS?',
      answer: 'Potentially via the treasury at a later date as to be determined by the community, at launch no.',
    },

    // PLATFORM FAQ's
    {
      category: 'platform',
      icon: Layout,
      popular: true,
      question: 'How do I navigate the Seasons dashboard?',
      answer:
        'The dashboard is organized into several key sections accessible via the sidebar: Overview (main dashboard), Yield (distribution metrics), Assets (portfolio breakdown), My Node (personal stats), Settings (account preferences), and FAQ. Click any menu item to view that section.',
    },
    {
      category: 'platform',
      icon: Eye,
      popular: true,
      question: 'Where can I see my yield earnings?',
      answer:
        'Your yield earnings are displayed in multiple places: (1) Overview page shows total earnings and 7/30/90-day breakdowns in the top hero section, (2) My Node page displays your personal node statistics, (3) Yield page shows platform-wide distribution history and metrics.',
    },
    {
      category: 'platform',
      icon: BarChart3,
      question: 'What does the Assets Inclusion page show?',
      answer:
        'The Assets Inclusion page displays the curated portfolio following the 6:3:1 distribution rule. You can see Blue Chips (60%), Underdogs (30%), and Rising Stars (10%) tiers, along with details about rotation schedules, current holdings, and performance metrics for each tier.',
    },
    {
      category: 'platform',
      icon: Settings,
      question: 'How do I connect my wallet?',
      answer:
        'Click the "Connect Wallet" button in the top-right corner or on the Overview page. Select your preferred Solana wallet (Phantom, Solflare, Backpack, etc.) from the modal. Once connected, your wallet address will be displayed in the top bar, and you can disconnect anytime via Settings.',
    },
    {
      category: 'platform',
      icon: TrendingUp,
      question: 'What information is shown on the Overview page?',
      answer:
        'The Overview page is your main dashboard showing: Current APY and platform stats, Your total yield earnings (7/30/90-day breakdowns), Portfolio composition with rebalancing status, Recent activity feed, Quick actions, and Referral program details.',
    },
    {
      category: 'platform',
      icon: FileText,
      question: 'Where can I find my transaction history?',
      answer:
        'Transaction history is available on the Yield page, which shows all platform-wide distributions including dates, amounts, recipient counts, and Solana transaction hashes. You can click on any transaction hash to view it on Solscan blockchain explorer.',
    },
    {
      category: 'platform',
      icon: Shield,
      question: 'What does "Node Status" mean in My Node page?',
      answer:
        'Node Status indicates whether your wallet qualifies as an active yield-earning node. "Active" means you hold 10,000+ $SEAS tokens and are earning yield. "Inactive" means your balance is below the threshold. The page also shows your node rank, total earned, and performance metrics.',
    },
    {
      category: 'platform',
      icon: HelpCircle,
      question: 'How do I check if my portfolio needs rebalancing?',
      answer:
        'On the Overview page, look for the Portfolio Auto Builder section. It shows your current allocation (Blue Chips, Underdogs, Rising Stars) vs target percentages. If any category is off-target, you\'ll see a delta percentage and a visual indicator. The system automatically rebalances, but you can track the status here.',
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
  }, [searchQuery, activeCategory, faqs]);

  // Get popular FAQs
  const popularFAQs = useMemo(() => {
    return faqs.filter((faq) => faq.popular);
  }, [faqs]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: faqs.length,
      general: faqs.filter((f) => f.category === 'general').length,
      token: faqs.filter((f) => f.category === 'token').length,
      platform: faqs.filter((f) => f.category === 'platform').length,
    };
  }, [faqs]);

  const copyLinkToFAQ = (index: number) => {
    const url = `${window.location.origin}${window.location.pathname}#faq-${index}`;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="display-md mb-2">
          Frequently Asked Questions
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--seasons-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          Everything you need to know about Seasons onchain yield platform
        </p>
      </div>

      {/* Search Bar */}
      <div
        className="mb-6 p-1.5 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
        }}
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
      <div
        className="mb-6 p-1.5 rounded-xl inline-flex gap-2"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
        }}
      >
        <button
          onClick={() => setActiveCategory('all')}
          className="px-4 py-2 rounded-lg transition-all relative overflow-hidden group"
          style={{
            background: activeCategory === 'all' ? 'var(--seasons-bg-card)' : 'transparent',
            border:
              activeCategory === 'all'
                ? '1px solid var(--seasons-border-subtle)'
                : '1px solid transparent',
            color:
              activeCategory === 'all'
                ? 'var(--seasons-text-primary)'
                : 'var(--seasons-text-tertiary)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {activeCategory === 'all' && (
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
              }}
            />
          )}
          <span className="relative flex items-center gap-2">
            All <span className="font-inter text-xs opacity-60">({categoryCounts.all})</span>
          </span>
        </button>

        <button
          onClick={() => setActiveCategory('general')}
          className="px-4 py-2 rounded-lg transition-all relative overflow-hidden group"
          style={{
            background: activeCategory === 'general' ? 'var(--seasons-bg-card)' : 'transparent',
            border:
              activeCategory === 'general'
                ? '1px solid var(--seasons-border-subtle)'
                : '1px solid transparent',
            color:
              activeCategory === 'general'
                ? 'var(--seasons-text-primary)'
                : 'var(--seasons-text-tertiary)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {activeCategory === 'general' && (
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2))',
              }}
            />
          )}
          <span className="relative flex items-center gap-2">
            General <span className="font-inter text-xs opacity-60">({categoryCounts.general})</span>
          </span>
        </button>

        <button
          onClick={() => setActiveCategory('token')}
          className="px-4 py-2 rounded-lg transition-all relative overflow-hidden group"
          style={{
            background: activeCategory === 'token' ? 'var(--seasons-bg-card)' : 'transparent',
            border:
              activeCategory === 'token'
                ? '1px solid var(--seasons-border-subtle)'
                : '1px solid transparent',
            color:
              activeCategory === 'token'
                ? 'var(--seasons-text-primary)'
                : 'var(--seasons-text-tertiary)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {activeCategory === 'token' && (
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Token <span className="font-inter text-xs opacity-60">({categoryCounts.token})</span>
          </span>
        </button>

        <button
          onClick={() => setActiveCategory('platform')}
          className="px-4 py-2 rounded-lg transition-all relative overflow-hidden group"
          style={{
            background: activeCategory === 'platform' ? 'var(--seasons-bg-card)' : 'transparent',
            border:
              activeCategory === 'platform'
                ? '1px solid var(--seasons-border-subtle)'
                : '1px solid transparent',
            color:
              activeCategory === 'platform'
                ? 'var(--seasons-text-primary)'
                : 'var(--seasons-text-tertiary)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {activeCategory === 'platform' && (
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Platform <span className="font-inter text-xs opacity-60">({categoryCounts.platform})</span>
          </span>
        </button>
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
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
        }}
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
              }}
            >
              No FAQs found
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--seasons-text-tertiary)',
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
                    }}
                  >
                    <div
                      className="pl-12 pr-4"
                      style={{
                        borderLeft: '2px solid var(--seasons-border-hair)',
                        marginLeft: '18px',
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

      {/* Still have questions */}
      <div
        className="mt-8 p-6 rounded-xl relative overflow-hidden"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
        }}
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
            }}
          >
            Join our community for support, discussions, and the latest updates
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://t.me/seasonsSolana"
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
              }}
            >
              Join Telegram
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <a
              href="https://discord.gg/seasonsSolana"
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
              }}
            >
              Join Discord
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
          }}
        >
          Showing <span className="font-inter font-semibold">{filteredFAQs.length}</span> of{' '}
          <span className="font-inter font-semibold">{faqs.length}</span> FAQs
        </div>
      )}
    </div>
  );
}