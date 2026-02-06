import { useState } from 'react';
import { 
  Wallet, 
  Bell, 
  Shield, 
  Settings as SettingsIcon,
  LogOut,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { cardStyles } from '../../styles/cardStyles';

interface SettingsPageProps {
  isConnected?: boolean;
  walletAddress?: string;
  onDisconnect?: () => void;
}

export function SettingsPage({
  isConnected = true,
  walletAddress = 'yuri...8f1G',
  onDisconnect,
}: SettingsPageProps) {
  const [copied, setCopied] = useState(false);
  
  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [rebalanceAlerts, setRebalanceAlerts] = useState(true);
  const [yieldAlerts, setYieldAlerts] = useState(true);
  const [governanceAlerts, setGovernanceAlerts] = useState(false);
  
  // Security
  const [sessionTimeout, setSessionTimeout] = useState(60); // minutes
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleCopyAddress = async () => {
    const fullAddress = 'yuriF8g3...m2k8f1G';
    
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullAddress);
        setCopied(true);
        toast.success('Address copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = fullAddress;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          textArea.remove();
          setCopied(true);
          toast.success('Address copied to clipboard');
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          textArea.remove();
          toast.error('Failed to copy address', {
            description: 'Please copy the address manually',
          });
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy address', {
        description: 'Please copy the address manually',
      });
    }
  };

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
      toast.success('Wallet disconnected');
    }
  };

  const handle2FAToggle = (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    if (enabled) {
      toast.success('2FA enabled', {
        description: 'Two-factor authentication has been enabled for your account',
      });
    } else {
      toast.info('2FA disabled', {
        description: 'Two-factor authentication has been disabled',
      });
    }
  };

  const SettingSection = ({ 
    icon: Icon, 
    title, 
    description, 
    children 
  }: { 
    icon: any; 
    title: string; 
    description: string; 
    children: React.ReactNode;
  }) => (
    <div
      className="rounded-xl p-6 mb-5"
      style={cardStyles.elevated}
    >
      <div className="flex items-start gap-4 mb-6">
        <div
          className="p-2.5 rounded-lg"
          style={{
            background: 'var(--seasons-bg-base)',
            color: 'var(--seasons-text-secondary)',
          }}
        >
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--seasons-text-primary)',
              marginBottom: '4px',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--seasons-text-tertiary)',
              lineHeight: '1.5',
            }}
          >
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );

  const SettingRow = ({ 
    label, 
    description, 
    children 
  }: { 
    label: string; 
    description?: string; 
    children: React.ReactNode;
  }) => (
    <div className="flex items-start justify-between py-4 gap-6">
      <div className="flex-1">
        <Label
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--seasons-text-primary)',
            marginBottom: description ? '4px' : 0,
            display: 'block',
          }}
        >
          {label}
        </Label>
        {description && (
          <p
            style={{
              fontSize: '12px',
              color: 'var(--seasons-text-tertiary)',
              marginTop: '4px',
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div
          className="rounded-xl p-8 text-center"
          style={cardStyles.elevated}
        >
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background: 'var(--seasons-bg-base)',
              color: 'var(--seasons-text-tertiary)',
            }}
          >
            <SettingsIcon size={32} />
          </div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--seasons-text-primary)',
              marginBottom: '8px',
            }}
          >
            Connect Wallet to Access Settings
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--seasons-text-secondary)',
              marginBottom: '24px',
            }}
          >
            You need to connect your wallet to manage settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="display-md mb-2">
          Settings
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--seasons-text-secondary)',
          }}
        >
          Manage your account preferences and security
        </p>
      </div>

      {/* Wallet Management */}
      <SettingSection
        icon={Wallet}
        title="Wallet Management"
        description="Manage your connected wallet and addresses"
      >
        <div className="space-y-4">
          <div
            className="p-4 rounded-lg flex items-center justify-between"
            style={{
              background: 'var(--seasons-bg-base)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--seasons-text-tertiary)',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Connected Wallet
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--seasons-text-primary)',
                  fontFamily: 'Inter, monospace',
                }}
              >
                {walletAddress}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="gap-2"
              style={{
                color: 'var(--seasons-text-secondary)',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="w-full gap-2"
            style={{
              borderColor: 'var(--seasons-border-hair)',
              color: 'var(--seasons-text-secondary)',
            }}
          >
            <ExternalLink size={14} />
            View on Explorer
          </Button>
        </div>
      </SettingSection>

      {/* Notifications */}
      <SettingSection
        icon={Bell}
        title="Notifications"
        description="Manage your notification preferences and alerts"
      >
        <div className="space-y-1">
          <SettingRow
            label="Email Notifications"
            description="Receive notifications via email (requires email setup)"
          >
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </SettingRow>
          
          <Separator style={{ background: 'var(--seasons-border-hair)' }} />
          
          <SettingRow
            label="Rebalance Alerts"
            description="Get notified when portfolio is rebalanced"
          >
            <Switch
              checked={rebalanceAlerts}
              onCheckedChange={setRebalanceAlerts}
            />
          </SettingRow>
          
          <Separator style={{ background: 'var(--seasons-border-hair)' }} />
          
          <SettingRow
            label="Yield Distribution Alerts"
            description="Get notified when yield is distributed to your node"
          >
            <Switch
              checked={yieldAlerts}
              onCheckedChange={setYieldAlerts}
            />
          </SettingRow>
          
          <Separator style={{ background: 'var(--seasons-border-hair)' }} />
          
          <SettingRow
            label="Governance Proposals"
            description="Get notified about new governance proposals"
          >
            <Switch
              checked={governanceAlerts}
              onCheckedChange={setGovernanceAlerts}
            />
          </SettingRow>
        </div>
      </SettingSection>

      {/* Security */}
      <SettingSection
        icon={Shield}
        title="Security"
        description="Manage security settings and authentication preferences"
      >
        <div className="space-y-1">
          <SettingRow
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
          >
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handle2FAToggle}
            />
          </SettingRow>

          <Separator style={{ background: 'var(--seasons-border-hair)' }} />

          <SettingRow
            label="Session Timeout"
            description="Automatically disconnect after period of inactivity"
          >
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg"
              style={{
                background: 'var(--seasons-bg-base)',
                border: '1px solid var(--seasons-border-hair)',
                color: 'var(--seasons-text-primary)',
                fontSize: '13px',
              }}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={0}>Never</option>
            </select>
          </SettingRow>
        </div>
      </SettingSection>

      {/* Disconnect Wallet */}
      <div
        className="rounded-xl p-6"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-danger)',
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className="p-2.5 rounded-lg"
            style={{
              background: 'rgba(242, 119, 131, 0.1)',
              color: 'var(--seasons-danger)',
            }}
          >
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1">
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
                marginBottom: '4px',
              }}
            >
              Disconnect Wallet
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--seasons-text-tertiary)',
                lineHeight: '1.5',
              }}
            >
              This will disconnect your wallet from the platform. Your portfolio and settings will remain saved and can be accessed again by reconnecting.
            </p>
          </div>
        </div>
        
        <Button
          variant="destructive"
          className="w-full gap-2"
          onClick={handleDisconnect}
          style={{
            background: 'var(--seasons-danger)',
            color: 'white',
          }}
        >
          <LogOut size={14} />
          Disconnect Wallet
        </Button>
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />
    </div>
  );
}