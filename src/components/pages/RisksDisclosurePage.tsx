import { AlertTriangle, Shield, TrendingDown, DollarSign, Clock, Zap, FileText, ExternalLink } from 'lucide-react';
import { cardStyles } from '../../styles/cardStyles';
import { PageHeader } from '../ui/PageHeader';

export function RisksDisclosurePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Risk Disclosure"
        description="Important information about the risks associated with using Seasons platform. Please read carefully before participating."
      />

      {/* Important Notice */}
      <div
        className="mb-6 p-6 rounded-xl"
        style={{
          background: 'rgba(233, 199, 116, 0.06)',
          border: '1px solid rgba(233, 199, 116, 0.2)',
        }}
      >
        <div className="flex items-start gap-3">
          <FileText size={20} style={{ color: 'var(--seasons-brand-grad-start)', marginTop: '2px' }} />
          <div>
            <h3
              className="mb-2"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Important Notice
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Cryptocurrency investments carry substantial risk. The Seasons platform deals with 
              highly volatile memecoin assets and experimental DeFi mechanisms. You should only 
              participate with funds you can afford to lose entirely. This is not financial advice, 
              and we strongly recommend consulting with a qualified financial advisor before making 
              any investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Risks List */}
      <div
        className="p-6 rounded-xl mb-6"
        style={cardStyles.elevated}
      >
        <h2
          className="mb-6"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--seasons-text-primary)',
          }}
        >
          Key Risks to Consider
        </h2>

        <div className="space-y-4">
          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Smart Contract Risk
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  While our smart contracts have been designed with security in mind, all blockchain-based systems carry inherent risks. Bugs, exploits, or vulnerabilities could potentially lead to loss of funds. We recommend only investing what you can afford to lose.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <TrendingDown 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Market Volatility Risk
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  The portfolio consists of memecoin assets which are highly volatile. Token prices can fluctuate dramatically in short periods. While the Portfolio Auto Builder aims to manage exposure, significant losses are possible during market downturns.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <Zap 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Impermanent Loss
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Assets deployed in liquidity pools may experience impermanent loss when token prices diverge. While the platform aims to optimize returns, IL can reduce overall yields during certain market conditions.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <Clock 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Liquidity Risk
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Some assets in the Inclusion Lists may have limited liquidity. During extreme market conditions, it may be difficult to exit positions at desired prices, potentially affecting yield distributions.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <Shield 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Regulatory Risk
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Cryptocurrency regulations are evolving globally. Changes in laws or regulations could impact the platform\'s operations, your ability to access services, or the legal status of digital assets.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <DollarSign 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  APY Fluctuation
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Displayed APY is indicative and based on recent performance. It is not guaranteed and will fluctuate based on platform volume, velocity, fee generation, and inclusion list performance. Past performance does not guarantee future results.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Token Concentration Risk
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  The 10,000 $SEAS minimum requirement creates concentration risk. If you hold a significant portion of your portfolio in $SEAS, you may be exposed to higher volatility and correlation with the platform\'s performance.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <Clock 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Rebalancing Risk
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Automatic portfolio rebalancing may occur at unfavorable times or prices. While designed to optimize long-term returns, short-term rebalancing actions might temporarily reduce yields.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <ExternalLink 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Inclusion List Changes
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Assets can be added or removed from Inclusion Lists based on performance criteria. Changes may happen during unfavorable market conditions, potentially affecting your yield generation.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  No Insurance or Guarantees
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Unlike traditional financial products, cryptocurrency holdings and DeFi yields are not insured by FDIC, SIPC, or any government agency. There are no guarantees of principal protection or yield generation.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <ExternalLink 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Third-Party Dependencies
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  The platform relies on external protocols, DEXs, oracles, and other third-party services. Failures, outages, or exploits in these systems could affect platform operations and your ability to access or withdraw funds.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle 
                size={18} 
                style={{ 
                  color: 'var(--seasons-brand-grad-mid1)', 
                  marginTop: '2px',
                  flexShrink: 0,
                }} 
              />
              <div>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--seasons-text-primary)',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  Wallet Security
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--seasons-text-secondary)',
                    lineHeight: '1.6',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  You are solely responsible for the security of your wallet and private keys. Loss of access to your wallet or compromise of your private keys will result in permanent loss of funds. Always use secure wallet practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Disclaimers */}
      <div
        className="p-6 rounded-xl"
        style={cardStyles.elevated}
      >
        <h2
          className="mb-4"
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--seasons-text-primary)',
          }}
        >
          Additional Disclaimers
        </h2>

        <div className="space-y-4">
          <div>
            <h3
              className="mb-2"
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              No Financial Advice
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Nothing on this platform constitutes financial, investment, legal, or tax advice. 
              All information is provided for informational purposes only. Always conduct your 
              own research and consult with qualified professionals.
            </p>
          </div>

          <div>
            <h3
              className="mb-2"
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Geographic Restrictions
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              The Seasons platform may not be available or suitable for users in certain 
              jurisdictions. It is your responsibility to ensure that your use of the platform 
              complies with local laws and regulations.
            </p>
          </div>

          <div>
            <h3
              className="mb-2"
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Platform Changes
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              The platform, its features, tokenomics, and yield mechanisms may change at any time. 
              While we strive to communicate changes transparently, we reserve the right to modify, 
              suspend, or discontinue any aspect of the platform.
            </p>
          </div>

          <div>
            <h3
              className="mb-2"
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              User Responsibility
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              By using Seasons, you acknowledge that you understand these risks and accept 
              full responsibility for your decisions. You confirm that you are using the platform 
              at your own risk and that you will not hold the platform, its developers, or 
              contributors liable for any losses.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Warning */}
      <div
        className="mt-6 p-6 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(242, 119, 131, 0.06), rgba(255, 122, 122, 0.06))',
          border: '1px solid rgba(242, 119, 131, 0.15)',
        }}
      >
        <div className="flex items-start gap-3">
          <ShieldAlert size={20} style={{ color: 'var(--seasons-brand-grad-mid1)', marginTop: '2px' }} />
          <div>
            <h3
              className="mb-2"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              By Continuing, You Acknowledge
            </h3>
            <ul
              className="space-y-2"
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
                paddingLeft: '20px',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              <li>You have read and understood all risks disclosed on this page</li>
              <li>You are solely responsible for your investment decisions</li>
              <li>You can afford to lose your entire investment</li>
              <li>Past performance does not guarantee future results</li>
              <li>APY and yields are variable and not guaranteed</li>
              <li>You will not hold Seasons liable for any losses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}