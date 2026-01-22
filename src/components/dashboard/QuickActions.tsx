import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

interface QuickActionsProps {
  onBuySeas: () => void;
  onRebalance: () => void;
  canRebalance?: boolean;
}

export function QuickActions({ onBuySeas, onRebalance, canRebalance = true }: QuickActionsProps) {
  const [showHoldToEarn, setShowHoldToEarn] = useState(false);
  const [hoverBuySeas, setHoverBuySeas] = useState(false);
  const [hoverHoldToEarn, setHoverHoldToEarn] = useState(false);
  const [hoverRebalance, setHoverRebalance] = useState(false);
  const [hoverOkay, setHoverOkay] = useState(false);

  return (
    <>
      <div
        className="p-6 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
          boxShadow: 'var(--seasons-card-shadow)',
        }}
      >
        {/* Header */}
        <h2
          className="mb-6"
          style={{
            color: 'var(--seasons-text-primary)',
            fontWeight: 600,
            fontSize: '17px',
            lineHeight: '1.3',
          }}
        >
          Quick Actions
        </h2>

        {/* Metrics Stack */}
        <div className="space-y-3 mb-6">
          {/* Total Rewards */}
          <div
            className="p-4 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="flex items-center justify-center rounded-md"
                style={{
                  width: '28px',
                  height: '28px',
                  background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
                }}
              >
                <DollarSign size={16} style={{ color: '#FFFFFF' }} />
              </div>
              <div
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                Total rewards
              </div>
            </div>
            <div
              className="font-inter"
              style={{
                color: 'var(--seasons-text-primary)',
                fontSize: '22px',
                fontWeight: 600,
                lineHeight: '1.2',
              }}
            >
              $5645.69
            </div>
          </div>

          {/* Average APY */}
          <div
            className="p-4 rounded-lg"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="flex items-center justify-center rounded-md"
                style={{
                  width: '28px',
                  height: '28px',
                  background: 'linear-gradient(135deg, var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                }}
              >
                <TrendingUp size={16} style={{ color: '#FFFFFF' }} />
              </div>
              <div
                style={{
                  color: 'var(--seasons-text-tertiary)',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                Average APY
              </div>
            </div>
            <div
              className="font-inter"
              style={{
                color: 'var(--seasons-text-primary)',
                fontSize: '22px',
                fontWeight: 600,
                lineHeight: '1.2',
              }}
            >
              11.9%
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          {/* Buy $SEAS and Hold-to-Earn in one row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Buy $SEAS Button */}
            <Button
              onClick={onBuySeas}
              className="w-full relative overflow-hidden"
              onMouseEnter={() => setHoverBuySeas(true)}
              onMouseLeave={() => setHoverBuySeas(false)}
              style={{
                background:
                  'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                height: '40px',
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                  opacity: hoverBuySeas ? 1 : 0,
                  transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              <span className="relative z-10 text-[14px]">Buy $SEAS</span>
            </Button>

            {/* Hold-to-Earn Button */}
            <button
              onClick={() => setShowHoldToEarn(true)}
              onMouseEnter={() => setHoverHoldToEarn(true)}
              onMouseLeave={() => setHoverHoldToEarn(false)}
              className="w-full px-4 py-2 rounded-md relative inline-flex items-center justify-center transition-all"
              style={{
                background: 'var(--seasons-bg-elev)',
                color: 'var(--seasons-text-primary)',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '14px',
                fontWeight: 500,
                height: '40px',
              }}
            >
              {/* Border gradient */}
              <span
                className="absolute inset-0 rounded-md"
                style={{
                  background:
                    'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                  padding: '1px',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
              {/* Hover gradient */}
              <span
                className="absolute inset-0 rounded-md"
                style={{
                  background:
                    'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                  padding: '1px',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: hoverHoldToEarn ? 1 : 0,
                  transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              <span className="relative z-10">Hold-to-Earn</span>
            </button>
          </div>

          {/* Rebalance Portfolio Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onRebalance}
                  onMouseEnter={() => setHoverRebalance(true)}
                  onMouseLeave={() => setHoverRebalance(false)}
                  disabled={!canRebalance}
                  className="w-full px-4 py-2 rounded-md relative inline-flex items-center justify-center transition-all"
                  style={{
                    background: 'transparent',
                    color: canRebalance ? 'var(--seasons-text-secondary)' : 'var(--seasons-text-tertiary)',
                    border: '1px solid var(--seasons-border-hair)',
                    position: 'relative',
                    overflow: 'hidden',
                    fontSize: '14px',
                    fontWeight: 500,
                    height: '40px',
                    opacity: canRebalance ? 1 : 0.5,
                    cursor: canRebalance ? 'pointer' : 'not-allowed',
                  }}
                >
                  {/* Hover gradient border */}
                  {canRebalance && (
                    <span
                      className="absolute inset-0 rounded-md"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                        padding: '1px',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        opacity: hoverRebalance ? 1 : 0,
                        transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {canRebalance ? 'Rebalance Portfolio' : 'Rebalanced'}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  {canRebalance 
                    ? 'If enabled, system auto-rotates assets using QA criteria.' 
                    : 'Portfolio already rebalanced. Check back later.'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Footer Note */}
        <p
          className="text-center"
          style={{
            color: 'var(--seasons-text-secondary)',
            fontSize: '11px',
            lineHeight: '1.4',
          }}
        >
          Distribution happens direct-to-wallet every 2-3 days.
        </p>
      </div>

      {/* Hold-to-Earn Dialog */}
      <Dialog open={showHoldToEarn} onOpenChange={setShowHoldToEarn}>
        <DialogContent
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--seasons-text-primary)' }}>
              Hold-to-Earn
            </DialogTitle>
            <DialogDescription style={{ color: 'var(--seasons-text-secondary)' }}>
              Learn how onchain rewards work
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p style={{ color: 'var(--seasons-text-secondary)', fontSize: '14px' }}>
              Eligible holders receive rewards from platform activity. No staking or claiming
              required.
            </p>
            <Button
              onClick={() => setShowHoldToEarn(false)}
              onMouseEnter={() => setHoverOkay(true)}
              onMouseLeave={() => setHoverOkay(false)}
              className="relative overflow-hidden w-full"
              style={{
                background:
                  'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                  opacity: hoverOkay ? 1 : 0,
                  transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              <span className="relative z-10">Okay</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}