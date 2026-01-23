import { AlertTriangle, ShieldAlert, Info } from 'lucide-react';
import { cardStyles } from '../../styles/cardStyles';

export function RisksDisclosurePage() {
  const risks = [
    {
      title: 'Smart Contract Risk',
      description: 'While our smart contracts have been designed with security in mind, all blockchain-based systems carry inherent risks. Bugs, exploits, or vulnerabilities could potentially lead to loss of funds. We recommend only investing what you can afford to lose.',
    },
    {
      title: 'Market Volatility Risk',
      description: 'The portfolio consists of memecoin assets which are highly volatile. Token prices can fluctuate dramatically in short periods. While the Portfolio Auto Builder aims to manage exposure, significant losses are possible during market downturns.',
    },
    {
      title: 'Impermanent Loss',
      description: 'Assets deployed in liquidity pools may experience impermanent loss when token prices diverge. While the platform aims to optimize returns, IL can reduce overall yields during certain market conditions.',
    },
    {
      title: 'Liquidity Risk',
      description: 'Some assets in the Inclusion Lists may have limited liquidity. During extreme market conditions, it may be difficult to exit positions at desired prices, potentially affecting yield distributions.',
    },
    {
      title: 'Regulatory Risk',
      description: 'Cryptocurrency regulations are evolving globally. Changes in laws or regulations could impact the platform\'s operations, your ability to access services, or the legal status of digital assets.',
    },
    {
      title: 'APY Fluctuation',
      description: 'Displayed APY is indicative and based on recent performance. It is not guaranteed and will fluctuate based on platform volume, velocity, fee generation, and inclusion list performance. Past performance does not guarantee future results.',
    },
    {
      title: 'Token Concentration Risk',
      description: 'The 10,000 $SEAS minimum requirement creates concentration risk. If you hold a significant portion of your portfolio in $SEAS, you may be exposed to higher volatility and correlation with the platform\'s performance.',
    },
    {
      title: 'Rebalancing Risk',
      description: 'Automatic portfolio rebalancing may occur at unfavorable times or prices. While designed to optimize long-term returns, short-term rebalancing actions might temporarily reduce yields.',
    },
    {
      title: 'Inclusion List Changes',
      description: 'Assets can be added or removed from Inclusion Lists based on performance criteria. Changes may happen during unfavorable market conditions, potentially affecting your yield generation.',
    },
    {
      title: 'No Insurance or Guarantees',
      description: 'Unlike traditional financial products, cryptocurrency holdings and DeFi yields are not insured by FDIC, SIPC, or any government agency. There are no guarantees of principal protection or yield generation.',
    },
    {
      title: 'Third-Party Dependencies',
      description: 'The platform relies on external protocols, DEXs, oracles, and other third-party services. Failures, outages, or exploits in these systems could affect platform operations and your ability to access or withdraw funds.',
    },
    {
      title: 'Wallet Security',
      description: 'You are solely responsible for the security of your wallet and private keys. Loss of access to your wallet or compromise of your private keys will result in permanent loss of funds. Always use secure wallet practices.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="display-md mb-2">
          Risk Disclosure
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--seasons-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          Important information about the risks associated with using Seasons platform. 
          Please read carefully before participating.
        </p>
      </div>

      {/* Important Notice */}
      <div
        className="mb-6 p-6 rounded-xl"
        style={{
          background: 'rgba(233, 199, 116, 0.06)',
          border: '1px solid rgba(233, 199, 116, 0.2)',
        }}
      >
        <div className="flex items-start gap-3">
          <Info size={20} style={{ color: 'var(--seasons-brand-grad-start)', marginTop: '2px' }} />
          <div>
            <h3
              className="mb-2"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
              }}
            >
              Important Notice
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
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
          {risks.map((risk, index) => (
            <div
              key={index}
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
                    }}
                  >
                    {risk.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--seasons-text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {risk.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
              }}
            >
              No Financial Advice
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
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
              }}
            >
              Geographic Restrictions
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
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
              }}
            >
              Platform Changes
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
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
              }}
            >
              User Responsibility
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--seasons-text-secondary)',
                lineHeight: '1.6',
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