import { Copy, Share2, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Referral } from '../../lib/mockData';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ReferralProgramProps {
  referrals: Referral[];
  isConnected: boolean;
  hasMinimumBalance: boolean;
}

export function ReferralProgram({ referrals, isConnected, hasMinimumBalance }: ReferralProgramProps) {
  const [copied, setCopied] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);

  const referralLink = 'https://app.seasons.wtf/invite?ref=YURI-8f1G';
  const referralCode = 'YURI-8f1G';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = referralLink;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        toast.error('Unable to copy link. Please copy manually.');
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Seasons',
          text: 'Join me on Seasons and start earning yield rewards on Solana!',
          url: referralLink,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  if (!isConnected || !hasMinimumBalance) {
    return (
      <div
        className="p-4 md:p-6 rounded-xl"
        style={{
          background: 'var(--seasons-bg-elev)',
          border: '1px solid var(--seasons-border-hair)',
          boxShadow: 'var(--seasons-card-shadow)',
        }}
      >
        <h2
          className="mb-2 text-base md:text-lg"
          style={{
            color: 'var(--seasons-text-primary)',
            fontWeight: 600,
            lineHeight: '1.3',
          }}
        >
          Invite friends
        </h2>
        <p
          className="mb-4 md:mb-6 text-xs md:text-sm"
          style={{
            color: 'var(--seasons-text-secondary)',
          }}
        >
          Share your link and earn rewards when friends join Seasons.
        </p>
        <div className="text-center py-8 md:py-12">
          <p className="text-sm" style={{ color: 'var(--seasons-text-secondary)' }}>
            {!isConnected ? 'Connect your wallet to access referrals.' : 'Hold ≥ 10,000 $SEAS to unlock referrals.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-4 md:p-6 rounded-xl"
      style={{
        background: 'var(--seasons-bg-elev)',
        border: '1px solid var(--seasons-border-hair)',
        boxShadow: 'var(--seasons-card-shadow)',
      }}
    >
      {/* Main referral card */}
      <div
        className="p-3 md:p-6 mb-4 md:mb-6"
        style={{
          background: 'var(--seasons-bg-card)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          border: '1px solid var(--seasons-border-hair)',
        }}
      >
        <h2
          className="mb-4"
          style={{
            color: 'var(--seasons-text-primary)',
          }}
        >
          Your Referral Link
        </h2>
        
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div
            className="flex-1 flex items-center gap-3 px-4 py-3"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--seasons-border-hair)',
              borderRadius: '10px',
            }}
          >
            <span
              className="flex-1 text-sm"
              style={{
                color: 'var(--seasons-text-primary)',
                fontFamily: 'monospace',
              }}
            >
              {referralLink}
            </span>
          </div>
          
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-6 py-3"
            style={{
              background: copied 
                ? 'var(--seasons-success)' 
                : 'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              border: 'none',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Link
              </>
            )}
          </button>
          
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-6 py-3"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--seasons-border-hair)',
              borderRadius: '10px',
              color: 'var(--seasons-text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--seasons-brand-grad-start)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--seasons-border-hair)';
            }}
          >
            <Share2 size={16} />
            Share
          </button>
        </div>

        <div
          className="p-4"
          style={{
            background: 'rgba(233, 199, 116, 0.1)',
            border: '1px solid var(--seasons-brand-grad-start)',
            borderRadius: '8px',
          }}
        >
          <p
            className="text-xs"
            style={{
              color: 'var(--seasons-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            💎 <strong>Your referral code:</strong> {referralCode} — Share this code or the link above. You'll earn 5% of your referral's first $SEAS purchase as a bonus reward!
          </p>
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={() => setShowReferrals(!showReferrals)}
        className="w-full py-2 hover:bg-white/5 transition-colors mb-4 md:mb-6 text-xs md:text-sm inline-flex items-center justify-center gap-2"
        style={{
          color: 'var(--seasons-text-secondary)',
          border: '1px solid var(--seasons-border-hair)',
          borderRadius: '10px',
        }}
      >
        {showReferrals ? (
          <>
            Hide referrals
            <ChevronUp size={16} />
          </>
        ) : (
          <>
            See my referrals
            <ChevronDown size={16} />
          </>
        )}
      </button>

      {/* Referral list */}
      {showReferrals && (
        <div
          className="overflow-hidden"
          style={{
            border: '1px solid var(--seasons-border-hair)',
            borderRadius: '12px',
          }}
        >
          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm" style={{ color: 'var(--seasons-text-secondary)' }}>
                No referrals yet — share your link and start inviting.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        background: 'var(--seasons-bg-card)',
                        borderBottom: '1px solid var(--seasons-border-hair)',
                      }}
                    >
                      <th
                        className="text-left py-3 px-4 text-xs"
                        style={{
                          color: 'var(--seasons-text-tertiary)',
                          fontWeight: 600,
                        }}
                      >
                        Address
                      </th>
                      <th
                        className="text-left py-3 px-4 text-xs"
                        style={{
                          color: 'var(--seasons-text-tertiary)',
                          fontWeight: 600,
                        }}
                      >
                        Status
                      </th>
                      <th
                        className="text-right py-3 px-4 text-xs"
                        style={{
                          color: 'var(--seasons-text-tertiary)',
                          fontWeight: 600,
                        }}
                      >
                        Purchased
                      </th>
                      <th
                        className="text-right py-3 px-4 text-xs"
                        style={{
                          color: 'var(--seasons-text-tertiary)',
                          fontWeight: 600,
                        }}
                      >
                        Rewarded
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((ref, idx) => (
                      <tr
                        key={idx}
                        style={{
                          background: 'var(--seasons-bg-base)',
                          borderBottom: '1px solid var(--seasons-border-hair)',
                        }}
                      >
                        <td
                          className="py-3 px-4 text-xs"
                          style={{
                            color: 'var(--seasons-text-primary)',
                          }}
                        >
                          <code>{ref.address}</code>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className="px-2 py-1 text-[10px]"
                            style={{
                              fontWeight: 600,
                              borderRadius: '6px',
                              background:
                                ref.status === 'Completed'
                                  ? 'rgba(96, 211, 148, 0.1)'
                                  : ref.status === 'Pending'
                                  ? 'rgba(233, 199, 116, 0.1)'
                                  : 'rgba(255, 255, 255, 0.1)',
                              color:
                                ref.status === 'Completed'
                                  ? 'var(--seasons-success)'
                                  : ref.status === 'Pending'
                                  ? 'var(--seasons-brand-grad-start)'
                                  : 'var(--seasons-text-secondary)',
                            }}
                          >
                            {ref.status}
                          </span>
                        </td>
                        <td
                          className="py-3 px-4 text-right text-xs"
                          style={{
                            color: 'var(--seasons-text-primary)',
                          }}
                        >
                          {ref.purchased.toLocaleString()} $SEAS
                        </td>
                        <td
                          className="py-3 px-4 text-right text-xs"
                          style={{
                            color: ref.rewarded > 0 ? 'var(--seasons-success)' : 'var(--seasons-text-tertiary)',
                          }}
                        >
                          {ref.rewarded > 0 ? `+${ref.rewarded} $SEAS` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden">
                {referrals.map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-3"
                    style={{
                      background: 'var(--seasons-bg-base)',
                      borderBottom: idx < referrals.length - 1 ? '1px solid var(--seasons-border-hair)' : 'none',
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <code
                        className="text-[10px] flex-1"
                        style={{
                          color: 'var(--seasons-text-primary)',
                          wordBreak: 'break-all',
                        }}
                      >
                        {ref.address}
                      </code>
                      <span
                        className="px-2 py-0.5 text-[9px] ml-2 flex-shrink-0"
                        style={{
                          fontWeight: 600,
                          borderRadius: '6px',
                          background:
                            ref.status === 'Completed'
                              ? 'rgba(96, 211, 148, 0.1)'
                              : ref.status === 'Pending'
                              ? 'rgba(233, 199, 116, 0.1)'
                              : 'rgba(255, 255, 255, 0.1)',
                          color:
                            ref.status === 'Completed'
                              ? 'var(--seasons-success)'
                              : ref.status === 'Pending'
                              ? 'var(--seasons-brand-grad-start)'
                              : 'var(--seasons-text-secondary)',
                        }}
                      >
                        {ref.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div>
                        <span style={{ color: 'var(--seasons-text-tertiary)' }}>Purchased: </span>
                        <span style={{ color: 'var(--seasons-text-primary)' }}>{ref.purchased.toLocaleString()} $SEAS</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--seasons-text-tertiary)' }}>Rewarded: </span>
                        <span style={{ color: ref.rewarded > 0 ? 'var(--seasons-success)' : 'var(--seasons-text-tertiary)' }}>
                          {ref.rewarded > 0 ? `+${ref.rewarded} $SEAS` : '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
