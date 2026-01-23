import { useState } from 'react';
import { memo } from 'react';
import { Button } from '../../ui/button';
import { CTASectionProps } from './types';
import { formatters } from '../../../utils/formatters';

export const CTASection = memo(function CTASection({ stats, onConnectWallet }: CTASectionProps) {
  const [hoverConnect, setHoverConnect] = useState(false);

  return (
    <div
      className="p-8 md:p-12 rounded-xl text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.05), rgba(242, 119, 131, 0.05), rgba(180, 75, 203, 0.05), rgba(75, 128, 203, 0.05))',
        border: '1px solid var(--seasons-border-hair)',
      }}
    >
      <h2 className="display-md mb-3">
        Ready to Start Earning?
      </h2>
      <p
        className="mb-6 max-w-xl mx-auto"
        style={{
          fontSize: '16px',
          color: 'var(--seasons-text-secondary)',
          lineHeight: '1.6',
        }}
      >
        Join {formatters.number(stats.activeNodes, 0)} active nodes earning {stats.currentAPY}% APY through automated yield distribution
      </p>
      <Button
        onClick={onConnectWallet}
        onMouseEnter={() => setHoverConnect(true)}
        onMouseLeave={() => setHoverConnect(false)}
        size="lg"
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
          color: '#FFFFFF',
          border: 'none',
          padding: '16px 32px',
          transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <span
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
            opacity: hoverConnect ? 1 : 0,
            transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <span className="relative z-10 flex items-center gap-2">
          Connect Wallet to Start
        </span>
      </Button>
    </div>
  );
});