import { useState } from 'react';
import { Copy, ExternalLink, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { toast } from 'sonner@2.0.3';

interface WalletDropdownProps {
  isConnected: boolean;
  walletAddress?: string;
  onDisconnectWallet: () => void;
  onConnectClick: () => void;
}

export function WalletDropdown({
  isConnected,
  walletAddress,
  onDisconnectWallet,
  onConnectClick,
}: WalletDropdownProps) {
  const [hoverConnect, setHoverConnect] = useState(false);

  const handleCopyAddress = async () => {
    if (walletAddress) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(walletAddress);
        } else {
          // Fallback method
          const textarea = document.createElement('textarea');
          textarea.value = walletAddress;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        toast.success('Address copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy address');
      }
    }
  };

  const handleViewOnSolscan = () => {
    if (walletAddress) {
      const address = walletAddress.replace('...', '');
      window.open(`https://solscan.io/account/${address}`, '_blank');
    }
  };

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            onMouseEnter={() => setHoverConnect(true)}
            onMouseLeave={() => setHoverConnect(false)}
            className="h-9 text-sm gap-2 hidden sm:flex"
            style={{
              background: 'var(--seasons-bg-base)',
              color: 'var(--seasons-text-primary)',
              border: '1px solid var(--seasons-border-hair)',
              fontFamily: 'Inter, monospace',
              fontSize: '13px',
            }}
            aria-label="View wallet & session options"
          >
            <span>{walletAddress}</span>
            <ChevronDown size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56"
          style={{
            background: 'var(--seasons-bg-elev)',
            border: '1px solid var(--seasons-border-hair)',
            borderRadius: '12px',
          }}
        >
          <DropdownMenuItem
            onClick={handleCopyAddress}
            className="cursor-pointer"
            style={{
              color: 'var(--seasons-text-primary)',
            }}
          >
            <Copy size={16} className="mr-2" style={{ color: 'var(--seasons-text-tertiary)' }} />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleViewOnSolscan}
            className="cursor-pointer"
            style={{
              color: 'var(--seasons-text-primary)',
            }}
          >
            <ExternalLink size={16} className="mr-2" style={{ color: 'var(--seasons-text-tertiary)' }} />
            View on Solscan
          </DropdownMenuItem>
          <DropdownMenuSeparator style={{ background: 'var(--seasons-border-hair)' }} />
          <DropdownMenuItem
            onClick={() => onDisconnectWallet?.()}
            className="cursor-pointer"
            style={{
              color: 'var(--seasons-error)',
            }}
          >
            <LogOut size={16} className="mr-2" />
            Disconnect Wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onConnectClick}
            onMouseEnter={() => setHoverConnect(true)}
            onMouseLeave={() => setHoverConnect(false)}
            className="h-9 text-sm relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              color: '#FFFFFF',
              border: 'none',
            }}
            aria-label="Connect wallet"
          >
            <span
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(210deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
                opacity: hoverConnect ? 1 : 0,
                transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            <span className="relative z-10">
              <span className="hidden sm:inline">Connect Wallet</span>
              <span className="sm:hidden">Connect</span>
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Connect to access your Seasons dashboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
