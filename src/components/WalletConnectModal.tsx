import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { CheckCircle2, Loader2, ExternalLink, ArrowLeft, Shield, Zap } from 'lucide-react';
import imgPhantom from "figma:asset/47f0574308704814d9f7ef4a604dc67336434d26.png";
import imgSolflare from "figma:asset/9aec66ed4a1aef1ece53f9b25fbfc52a3e450ffa.png";
import imgBackpack from "figma:asset/f259a7a098f6c648217586e4a928bade823b9395.png";
import imgLedger from "figma:asset/e0a8ca165420d697523449943b4722d65ab965f8.png";
import imgTrust from "figma:asset/a1b6cdbed516305ddfd91abbfcfec8c859a1332c.png";
import imgEllipal from "figma:asset/9f5bbff7c75d8030dd5392da1c08f5f4188f563f.png";
import imgTangem from "figma:asset/b1d7d7a9019ceaffe2294ce73ad2c7bbcf5841cd.png";
import imgTrezor from "figma:asset/62da71ee058ec4040e6dc639c52459a9021cf872.png";

interface WalletOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  popular?: boolean;
  type: 'hot' | 'cold';
}

const wallets: WalletOption[] = [
  {
    id: 'phantom',
    name: 'Phantom',
    description: 'Most popular Solana wallet',
    icon: imgPhantom,
    popular: true,
    type: 'hot',
  },
  {
    id: 'solflare',
    name: 'Solflare',
    description: 'Non-custodial Solana wallet',
    icon: imgSolflare,
    type: 'hot',
  },
  {
    id: 'backpack',
    name: 'Backpack',
    description: 'Crypto super app',
    icon: imgBackpack,
    type: 'hot',
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Multi-chain browser wallet',
    icon: imgTrust,
    type: 'hot',
  },
  {
    id: 'ledger',
    name: 'Ledger',
    description: 'Hardware wallet with enhanced security',
    icon: imgLedger,
    type: 'cold',
  },
  {
    id: 'trezor',
    name: 'Trezor',
    description: 'Hardware wallet with enhanced security',
    icon: imgTrezor,
    type: 'cold',
  },
  {
    id: 'ellipal',
    name: 'Ellipal Titan',
    description: 'Hardware wallet with enhanced security',
    icon: imgEllipal,
    type: 'cold',
  },
  {
    id: 'tangem',
    name: 'Tangem Wallet',
    description: 'Hardware wallet with enhanced security',
    icon: imgTangem,
    type: 'cold',
  },
];

type ConnectionStep = 'select' | 'connecting' | 'success';

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (walletId: string) => void;
}

export function WalletConnectModal({ open, onOpenChange, onConnect }: WalletConnectModalProps) {
  const [step, setStep] = useState<ConnectionStep>('select');
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
  const [activeTab, setActiveTab] = useState<'hot' | 'cold'>('hot');

  const handleWalletSelect = (wallet: WalletOption) => {
    setSelectedWallet(wallet);
    setStep('connecting');

    // Simulate connection process
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onConnect(wallet.id);
        handleClose();
      }, 750);
    }, 1000);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation
    setTimeout(() => {
      setStep('select');
      setSelectedWallet(null);
    }, 200);
  };

  const handleBack = () => {
    setStep('select');
    setSelectedWallet(null);
  };

  const handleOpenChange = (open: boolean) => {
    // Allow closing only if not in success state
    if (!open && step !== 'success') {
      onOpenChange(open);
      // Reset state after closing
      setTimeout(() => {
        setStep('select');
        setSelectedWallet(null);
      }, 200);
    } else if (!open && step === 'success') {
      // Close immediately if in success state
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[480px] p-0 gap-0"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
          borderRadius: '16px',
        }}
      >
        {step === 'select' && (
          <>
            <DialogHeader className="p-6 pb-4">
              <DialogTitle
                className="text-center"
                style={{ color: 'var(--seasons-text-primary)' }}
              >
                Connect Wallet
              </DialogTitle>
              <DialogDescription
                className="text-center mt-2"
                style={{ color: 'var(--seasons-text-secondary)', fontSize: '14px' }}
              >
                Choose your preferred Solana wallet to connect
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-6">
              {/* Tabs */}
              <div
                className="flex p-1 rounded-lg mb-4"
                style={{
                  background: 'var(--seasons-bg-base)',
                  border: '1px solid var(--seasons-border-hair)',
                }}
              >
                <button
                  onClick={() => setActiveTab('hot')}
                  className="flex-1 py-2.5 px-4 rounded-md transition-all relative"
                  style={{
                    background: activeTab === 'hot' 
                      ? 'var(--seasons-bg-elev)' 
                      : 'transparent',
                    border: activeTab === 'hot'
                      ? '1px solid var(--seasons-border-hair)'
                      : '1px solid transparent',
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Zap 
                      size={16} 
                      style={{ 
                        color: activeTab === 'hot' 
                          ? 'var(--seasons-brand-grad-mid1)' 
                          : 'var(--seasons-text-tertiary)' 
                      }} 
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: activeTab === 'hot'
                          ? 'var(--seasons-text-primary)'
                          : 'var(--seasons-text-tertiary)',
                      }}
                    >
                      Hot Wallets
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('cold')}
                  className="flex-1 py-2.5 px-4 rounded-md transition-all relative"
                  style={{
                    background: activeTab === 'cold' 
                      ? 'var(--seasons-bg-elev)' 
                      : 'transparent',
                    border: activeTab === 'cold'
                      ? '1px solid var(--seasons-border-hair)'
                      : '1px solid transparent',
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Shield 
                      size={16} 
                      style={{ 
                        color: activeTab === 'cold' 
                          ? 'var(--seasons-success)' 
                          : 'var(--seasons-text-tertiary)' 
                      }} 
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: activeTab === 'cold'
                          ? 'var(--seasons-text-primary)'
                          : 'var(--seasons-text-tertiary)',
                      }}
                    >
                      Cold Wallets
                    </span>
                    {activeTab === 'cold' && (
                      <span
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{
                          background: 'rgba(96, 211, 148, 0.1)',
                          color: 'var(--seasons-success)',
                          fontWeight: 600,
                          fontSize: '10px',
                        }}
                      >
                        Hardware
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {/* Wallet List */}
              <div className="grid gap-2.5">
                {wallets.filter(w => w.type === activeTab).map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleWalletSelect(wallet)}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: 'var(--seasons-bg-base)',
                      border: activeTab === 'cold'
                        ? '1px solid rgba(96, 211, 148, 0.15)'
                        : '1px solid var(--seasons-border-hair)',
                    }}
                  >
                    <div className="shrink-0 size-[36px] rounded-lg overflow-hidden bg-white">
                      <img 
                        src={wallet.icon} 
                        alt={wallet.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            color: 'var(--seasons-text-primary)',
                          }}
                        >
                          {wallet.name}
                        </span>
                        {wallet.popular && (
                          <span
                            className="px-2 py-0.5 rounded text-xs"
                            style={{
                              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1))',
                              color: '#FFFFFF',
                              fontWeight: 600,
                              fontSize: '10px',
                            }}
                          >
                            Popular
                          </span>
                        )}
                        {activeTab === 'cold' && (
                          <Shield
                            size={14}
                            style={{ color: 'var(--seasons-success)' }}
                          />
                        )}
                      </div>
                      <p
                        className="text-sm mt-0.5"
                        style={{ color: 'var(--seasons-text-tertiary)' }}
                      >
                        {wallet.description}
                      </p>
                    </div>
                    <ExternalLink
                      size={18}
                      style={{ color: 'var(--seasons-text-tertiary)' }}
                    />
                  </button>
                ))}
              </div>

              <p
                className="text-center mt-4 text-xs"
                style={{ color: 'var(--seasons-text-tertiary)' }}
              >
                By connecting, you agree to Seasons Terms of Service
              </p>
            </div>
          </>
        )}

        {step === 'connecting' && selectedWallet && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>Connecting Wallet</DialogTitle>
              <DialogDescription>Connecting to {selectedWallet.name}</DialogDescription>
            </DialogHeader>
            <div className="p-8">
              <button
                onClick={handleBack}
                className="mb-4 flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                style={{ color: 'var(--seasons-text-secondary)' }}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 size-[72px] rounded-xl overflow-hidden bg-white">
                  <img 
                    src={selectedWallet.icon} 
                    alt={selectedWallet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="mb-2"
                  style={{ color: 'var(--seasons-text-primary)' }}
                >
                  Connecting to {selectedWallet.name}
                </h3>
                <p
                  className="text-center mb-6 text-sm"
                  style={{ color: 'var(--seasons-text-secondary)' }}
                >
                  Please approve the connection in your wallet
                </p>
                <Loader2
                  size={32}
                  className="animate-spin"
                  style={{ color: 'var(--seasons-brand-grad-mid1)' }}
                />
              </div>
            </div>
          </>
        )}

        {step === 'success' && selectedWallet && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>Wallet Connected</DialogTitle>
              <DialogDescription>Successfully connected to {selectedWallet.name}</DialogDescription>
            </DialogHeader>
            <div className="p-8">
              <div className="flex flex-col items-center justify-center py-8">
                <div
                  className="mb-4 rounded-full p-3"
                  style={{ background: 'var(--seasons-success-bg)' }}
                >
                  <CheckCircle2
                    size={48}
                    style={{ color: 'var(--seasons-success)' }}
                  />
                </div>
                <h3
                  className="mb-2"
                  style={{ color: 'var(--seasons-text-primary)' }}
                >
                  Successfully Connected!
                </h3>
                <p
                  className="text-center text-sm"
                  style={{ color: 'var(--seasons-text-secondary)' }}
                >
                  Your {selectedWallet.name} wallet is now connected to Seasons
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}