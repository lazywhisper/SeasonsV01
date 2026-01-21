import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { WalletConnectModal } from '../WalletConnectModal';

interface WalletConnectWidgetProps {
  onConnectWallet: (walletId?: string) => void;
}

export function WalletConnectWidget({ onConnectWallet }: WalletConnectWidgetProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleWalletConnect = (walletId: string) => {
    onConnectWallet(walletId);
  };

  return (
    <>
      <div
        className="rounded-2xl p-12 flex flex-col items-center justify-center text-center"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
          minHeight: '500px',
        }}
      >
        <div className="max-w-md">
          <h2
            className="mb-3"
            style={{
              color: 'var(--seasons-text-primary)',
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: '40px',
            }}
          >
            Connect your wallet to start.
          </h2>
          <p
            className="mb-8"
            style={{
              color: 'var(--seasons-text-secondary)',
              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            Hold 10,000+ $SEAS to access real-time, onchain yield.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => setWalletModalOpen(true)}
              className="px-6 py-3 rounded-lg transition-all duration-200 hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #E9C774 0%, #F27783 33%, #B44BCB 66%, #4B80CB 100%)',
                color: 'white',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Connect Wallet
            </button>

            <button
              onClick={() => setShowDialog(true)}
              className="px-6 py-3 rounded-lg transition-all duration-200 hover:brightness-110"
              style={{
                background: 'transparent',
                color: 'var(--seasons-text-secondary)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Why 10,000 $SEAS?
            </button>
          </div>
        </div>
      </div>

      <WalletConnectModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
        onConnect={handleWalletConnect}
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
            color: 'var(--seasons-text-primary)',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--seasons-text-primary)' }}>
              Why 10,000 $SEAS?
            </DialogTitle>
            <DialogDescription style={{ color: 'var(--seasons-text-secondary)' }}>
              Access to Seasons platform features is gated to ensure a committed community of holders.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4" style={{ color: 'var(--seasons-text-secondary)' }}>
            <div>
              <h3 style={{ color: 'var(--seasons-text-primary)', marginBottom: '8px' }}>
                Exclusive Access
              </h3>
              <p>
                The 10,000 $SEAS threshold grants you access to real-time yield metrics, 
                portfolio analytics, governance participation, and all platform features.
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--seasons-text-primary)', marginBottom: '8px' }}>
                Aligned Incentives
              </h3>
              <p>
                By requiring a meaningful stake, we ensure that all platform users are 
                genuinely invested in the success and growth of the Seasons ecosystem.
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--seasons-text-primary)', marginBottom: '8px' }}>
                Enhanced Rewards
              </h3>
              <p>
                Holders above the threshold benefit from enhanced yield opportunities, 
                early access to new features, and participation in community governance decisions.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
