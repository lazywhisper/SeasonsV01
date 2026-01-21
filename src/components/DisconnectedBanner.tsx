import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface DisconnectedBannerProps {
  onConnect: () => void;
}

export function DisconnectedBanner({ onConnect }: DisconnectedBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hoverConnect, setHoverConnect] = useState(false);
  const [hoverGotIt, setHoverGotIt] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div
        className="p-6 rounded-xl mb-6 relative"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
          boxShadow: 'var(--seasons-card-shadow)',
        }}
      >
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 p-1 hover:bg-white/5 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X size={16} style={{ color: 'var(--seasons-text-tertiary)' }} />
        </button>

        <h3
          style={{
            color: 'var(--seasons-text-primary)',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          Connect your wallet to start.
        </h3>
        <p
          style={{
            color: 'var(--seasons-text-secondary)',
            fontSize: '14px',
            marginBottom: '16px',
          }}
        >
          Hold 10,000+ $SEAS to access real-time, onchain yield.
        </p>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              onClick={onConnect}
              onMouseEnter={() => setHoverConnect(true)}
              onMouseLeave={() => setHoverConnect(false)}
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                color: '#FFFFFF',
                border: 'none',
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
              <span className="relative z-10">Connect Wallet</span>
            </Button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="hover:underline"
            style={{
              color: 'var(--seasons-text-secondary)',
              fontSize: '14px',
            }}
          >
            Why 10,000 $SEAS?
          </button>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--seasons-text-primary)' }}>
              Access Threshold
            </DialogTitle>
            <DialogDescription style={{ color: 'var(--seasons-text-secondary)' }}>
              Learn about the platform access requirements
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p style={{ color: 'var(--seasons-text-secondary)', fontSize: '14px' }}>
              Holding 10,000 $SEAS unlocks the platform.
            </p>
            <p style={{ color: 'var(--seasons-text-secondary)', fontSize: '14px' }}>
              Yield is funded by platform activity and fee flows.
            </p>
            <p style={{ color: 'var(--seasons-text-secondary)', fontSize: '14px' }}>
              No staking or manual claiming required.
            </p>
            <Button
              onClick={() => setShowModal(false)}
              onMouseEnter={() => setHoverGotIt(true)}
              onMouseLeave={() => setHoverGotIt(false)}
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                color: '#FFFFFF',
                border: 'none',
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                  opacity: hoverGotIt ? 1 : 0,
                  transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              <span className="relative z-10">Got it</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
