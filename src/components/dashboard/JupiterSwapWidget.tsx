import { useEffect, useState } from 'react';
import { X, ExternalLink, Zap, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

// Token logos
import seasLogo from 'figma:asset/a05ba37d7326a8065a40e3c7ff0d46af03371b9e.png';
import solanaLogo from 'figma:asset/3d18d324ada815e2adde7001f9a3be563634ccf9.png';
import jupiterLogo from 'figma:asset/dc4bbb11677ddab8c8544a8db0d87aaf0bfaeba3.png';
import usdcLogo from 'figma:asset/024dbd2e78c43da80a61ca7d253af62add04e346.png';

interface JupiterSwapWidgetProps {
  onClose?: () => void;
}

// $SEAS Token Configuration
const SEAS_TOKEN_ADDRESS = '7GdpaeSzvkx1a78rRkU11KstM1x8naMmMmmpWQnQSEAS'; // Real $SEAS token mint address
const USDC_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC on Solana

type PaymentToken = 'SOL' | 'USDC';

export function JupiterSwapWidget({ onClose }: JupiterSwapWidgetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedToken, setSelectedToken] = useState<PaymentToken>('SOL');
  const [showTokenMenu, setShowTokenMenu] = useState(false);
  const [isEditingReceive, setIsEditingReceive] = useState(false); // Track which field is being edited
  
  // Mock current SEAS balance (in real app, get from wallet)
  const [currentSeasBalance] = useState(8750); // Example: user has 8,750 SEAS
  const NODE_ACTIVATION_THRESHOLD = 10000;
  
  // Real market prices (January 2026)
  const solPrice = 129; // USD per SOL
  const usdcPrice = 1; // USD per USDC
  const seasPrice = 0.28; // USD per SEAS
  const solToSeasRate = solPrice / seasPrice; // 460.71 SEAS per SOL
  const usdcToSeasRate = usdcPrice / seasPrice; // 3.57 SEAS per USDC

  // Platform fees
  const PLATFORM_FEE_BPS = 1000; // 10% = 1000 basis points
  const SERVICE_FEE_BPS = 150; // 1.5% = 150 basis points
  const TOTAL_FEE_BPS = PLATFORM_FEE_BPS + SERVICE_FEE_BPS; // 11.5% total
  
  const TOTAL_FEE_PERCENTAGE = TOTAL_FEE_BPS / 10000; // 0.115 = 11.5%

  const currentExchangeRate = selectedToken === 'SOL' ? solToSeasRate : usdcToSeasRate;
  const currentTokenPrice = selectedToken === 'SOL' ? solPrice : usdcPrice;
  const currentTokenLogo = selectedToken === 'SOL' ? solanaLogo : usdcLogo;

  useEffect(() => {
    // Only calculate from "You Pay" to "You Receive" if user is NOT editing "You Receive"
    if (!isEditingReceive && fromAmount && !isNaN(parseFloat(fromAmount))) {
      const amount = parseFloat(fromAmount);
      const beforeFee = amount * currentExchangeRate;
      const totalFeeAmount = beforeFee * TOTAL_FEE_PERCENTAGE;
      const afterFee = beforeFee - totalFeeAmount;
      setToAmount(afterFee.toFixed(2));
      setShowDetails(true);
    } else if (!fromAmount && !toAmount) {
      setShowDetails(false);
    }
  }, [fromAmount, selectedToken, currentExchangeRate, toAmount, isEditingReceive]);

  // Handle reverse calculation when user types in "You Receive"
  const handleToAmountChange = (value: string) => {
    // Allow empty string, digits, and ONE decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setIsEditingReceive(true); // Mark as editing
      setToAmount(value);
      
      // Only calculate reverse if we have a valid parseable number > 0
      if (value && value !== '.' && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
        const desiredSeas = parseFloat(value);
        const beforeFee = desiredSeas / (1 - TOTAL_FEE_PERCENTAGE);
        const requiredFromAmount = beforeFee / currentExchangeRate;
        // Limit to 4 decimal places for cleaner display
        setFromAmount(requiredFromAmount.toFixed(4));
        setShowDetails(true);
      } else if (!value || value === '.') {
        setFromAmount('');
        setShowDetails(false);
      }
    }
  };

  // Handle "You Pay" field changes
  const handleFromAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setIsEditingReceive(false); // Mark as NOT editing receive field
      setFromAmount(value);
    }
  };
  
  // Calculate node allocation (100% of received SEAS goes to node)
  const nodeAmount = toAmount ? parseFloat(toAmount) : 0;
  
  // Calculate node status
  const totalAfterPurchase = currentSeasBalance + nodeAmount;
  const isNodeAlreadyActive = currentSeasBalance >= NODE_ACTIVATION_THRESHOLD;
  const willNodeActivate = !isNodeAlreadyActive && totalAfterPurchase >= NODE_ACTIVATION_THRESHOLD;
  const remainingForNode = Math.max(0, NODE_ACTIVATION_THRESHOLD - totalAfterPurchase);
  const progressToNode = Math.min(100, (totalAfterPurchase / NODE_ACTIVATION_THRESHOLD) * 100);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--seasons-bg-elev)',
        border: '1px solid var(--seasons-border-hair)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Premium Header */}
      <div
        className="relative p-4 border-b"
        style={{
          borderColor: 'var(--seasons-border-hair)',
          background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.03), rgba(75, 128, 203, 0.03))',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-lg"
              style={{
                background: 'var(--seasons-bg-card)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <img src={jupiterLogo} alt="Jupiter" className="w-5 h-5" />
            </div>
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--seasons-text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                Buy $SEAS
              </h3>
              <p
                className="flex items-center gap-1"
                style={{
                  fontSize: '11px',
                  color: 'var(--seasons-text-tertiary)',
                  marginTop: '1px',
                }}
              >
                <span>Powered by</span>
                <span style={{ color: 'var(--seasons-brand-grad-start)', fontWeight: 600 }}>
                  Jupiter
                </span>
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-lg cursor-pointer"
              style={{
                background: 'var(--seasons-bg-card)',
                border: '1px solid var(--seasons-border-hair)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--seasons-bg-card)';
              }}
              aria-label="Close"
            >
              <X size={14} style={{ color: 'var(--seasons-text-secondary)' }} />
            </button>
          )}
        </div>
      </div>

      {/* Premium Swap Interface */}
      <div
        className="p-4"
        style={{
          background: 'var(--seasons-bg-card)',
        }}
      >
        <div className="space-y-4">
          {/* From Token - Premium Style */}
          <div>
            <label
              className="block mb-3 px-1"
              style={{
                fontSize: '10px',
                color: 'var(--seasons-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
              }}
            >
              You Pay
            </label>
            <div
              className="p-5 rounded-xl transition-all duration-200"
              style={{
                background: 'var(--seasons-bg-base)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <input
                  type="text"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  className="bg-transparent outline-none flex-1 min-w-0"
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: 'var(--seasons-text-primary)',
                    fontFeatureSettings: "'tnum' 1",
                    letterSpacing: '-0.02em',
                  }}
                />
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowTokenMenu(!showTokenMenu)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200"
                    style={{
                      background: 'var(--seasons-bg-elev)',
                      border: '1px solid var(--seasons-border-hair)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'var(--seasons-bg-elev)';
                    }}
                  >
                    <img
                      src={currentTokenLogo}
                      alt={selectedToken}
                      className="w-5 h-5 rounded-full"
                    />
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--seasons-text-primary)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {selectedToken}
                    </span>
                    <ChevronDown size={14} style={{ color: 'var(--seasons-text-tertiary)' }} />
                  </button>
                  
                  {/* Token Dropdown */}
                  {showTokenMenu && (
                    <div
                      className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden"
                      style={{
                        background: 'var(--seasons-bg-elev)',
                        border: '1px solid var(--seasons-border-hair)',
                        minWidth: '140px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      <button
                        className="flex items-center gap-2.5 px-4 py-2.5 w-full transition-all duration-200"
                        style={{
                          background: selectedToken === 'SOL' ? 'rgba(233, 199, 116, 0.1)' : 'transparent',
                          borderBottom: '1px solid var(--seasons-border-hair)',
                        }}
                        onClick={() => {
                          setSelectedToken('SOL');
                          setShowTokenMenu(false);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(233, 199, 116, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = selectedToken === 'SOL' ? 'rgba(233, 199, 116, 0.1)' : 'transparent';
                        }}
                      >
                        <img src={solanaLogo} alt="SOL" className="w-5 h-5 rounded-full" />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--seasons-text-primary)' }}>
                          SOL
                        </span>
                      </button>
                      <button
                        className="flex items-center gap-2.5 px-4 py-2.5 w-full transition-all duration-200"
                        style={{
                          background: selectedToken === 'USDC' ? 'rgba(233, 199, 116, 0.1)' : 'transparent',
                        }}
                        onClick={() => {
                          setSelectedToken('USDC');
                          setShowTokenMenu(false);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(233, 199, 116, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = selectedToken === 'USDC' ? 'rgba(233, 199, 116, 0.1)' : 'transparent';
                        }}
                      >
                        <img src={usdcLogo} alt="USDC" className="w-5 h-5 rounded-full" />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--seasons-text-primary)' }}>
                          USDC
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                {selectedToken === 'SOL' ? (
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'var(--seasons-text-tertiary)',
                      fontFeatureSettings: "'tnum' 1",
                    }}
                  >
                    ${fromAmount ? (parseFloat(fromAmount) * currentTokenPrice).toFixed(2) : '0.00'}
                  </span>
                ) : (
                  <span style={{ fontSize: '13px', color: 'transparent' }}>-</span>
                )}
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Balance: <span style={{ fontFeatureSettings: "'tnum' 1" }}>0.00</span>
                </span>
              </div>
            </div>
          </div>

          {/* To Token - Premium Style with Gradient Border */}
          <div>
            <label
              className="block mb-3 px-1"
              style={{
                fontSize: '10px',
                color: 'var(--seasons-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
              }}
            >
              You Receive
            </label>
            <div
              className="p-5 rounded-xl transition-all duration-200 relative"
              style={{
                background: 'var(--seasons-bg-base)',
                border: '1px solid rgba(233, 199, 116, 0.3)',
              }}
            >
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.05), rgba(75, 128, 203, 0.05))',
                }}
              />
              <div className="relative flex items-center justify-between mb-3">
                <input
                  type="text"
                  placeholder="0.00"
                  value={toAmount}
                  onChange={(e) => handleToAmountChange(e.target.value)}
                  className="bg-transparent outline-none flex-1 min-w-0"
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: 'var(--seasons-text-primary)',
                    fontFeatureSettings: "'tnum' 1",
                    letterSpacing: '-0.02em',
                  }}
                />
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl relative overflow-hidden pointer-events-none flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.15), rgba(75, 128, 203, 0.15))',
                    border: '1px solid rgba(233, 199, 116, 0.4)',
                  }}
                >
                  <img
                    src={seasLogo}
                    alt="SEAS"
                    className="w-5 h-5 rounded-full"
                  />
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--seasons-text-primary)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    SEAS
                  </span>
                </div>
              </div>
              <div className="relative flex items-center justify-between">
                <span
                  style={{
                    fontSize: '13px',
                    color: 'var(--seasons-text-tertiary)',
                    fontFeatureSettings: "'tnum' 1",
                  }}
                >
                  ${toAmount ? (parseFloat(toAmount) * seasPrice).toFixed(2) : '0.00'}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--seasons-text-tertiary)',
                  }}
                >
                  Balance: <span style={{ fontFeatureSettings: "'tnum' 1" }}>0.00</span>
                </span>
              </div>
            </div>
          </div>

          {/* Premium Route Details */}
          {showDetails && (
            <div
              className="p-3 rounded-xl"
              style={{
                background: 'var(--seasons-bg-base)',
                border: '1px solid var(--seasons-border-hair)',
              }}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '12px', color: 'var(--seasons-text-tertiary)' }}>
                    Rate
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--seasons-text-primary)',
                      fontFeatureSettings: "'tnum' 1",
                    }}
                  >
                    1 {selectedToken} ≈ {currentExchangeRate.toLocaleString('en-US', { maximumFractionDigits: 2 })} SEAS
                  </span>
                </div>
                
                {/* Compact Fees Display */}
                <div className="flex items-center justify-between py-1.5 border-y" style={{ borderColor: 'var(--seasons-border-hair)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--seasons-text-tertiary)' }}>
                    Fees <span style={{ fontSize: '11px', opacity: 0.7 }}>(10% + 1.5%)</span>
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--seasons-brand-grad-start)',
                      fontFeatureSettings: "'tnum' 1",
                    }}
                  >
                    11.5%
                  </span>
                </div>
                
                {/* Node Allocation - Compact Display */}
                <div
                  className="p-2 rounded-lg my-1.5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.08), rgba(75, 128, 203, 0.08))',
                    border: '1px solid rgba(233, 199, 116, 0.2)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontSize: '11px', color: 'var(--seasons-text-secondary)', fontWeight: 600 }}>
                      Allocated to Yield
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--seasons-brand-grad-start)',
                        fontFeatureSettings: "'tnum' 1",
                      }}
                    >
                      {nodeAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })} SEAS
                    </span>
                  </div>
                  
                  {/* Dynamic Node Status */}
                  {isNodeAlreadyActive ? (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--seasons-success)' }} />
                      <span style={{ fontSize: '9px', color: 'var(--seasons-success)', fontWeight: 600 }}>
                        Yield Node Active
                      </span>
                    </div>
                  ) : willNodeActivate ? (
                    <div className="mt-1.5">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Zap size={10} style={{ color: 'var(--seasons-success)' }} />
                        <span style={{ fontSize: '9px', color: 'var(--seasons-success)', fontWeight: 700 }}>
                          Yield Node Activated!
                        </span>
                      </div>
                      <span style={{ fontSize: '8px', color: 'var(--seasons-text-tertiary)' }}>
                        Total: {totalAfterPurchase.toLocaleString('en-US', { maximumFractionDigits: 0 })} / {NODE_ACTIVATION_THRESHOLD.toLocaleString()} SEAS
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1.5">
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ fontSize: '8px', color: 'var(--seasons-text-tertiary)' }}>
                          {totalAfterPurchase.toLocaleString('en-US', { maximumFractionDigits: 0 })} / {NODE_ACTIVATION_THRESHOLD.toLocaleString()} SEAS
                        </span>
                        <span style={{ fontSize: '8px', color: 'var(--seasons-text-tertiary)', fontWeight: 600 }}>
                          {progressToNode.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${progressToNode}%`,
                            background: 'linear-gradient(90deg, #E9C774, #F27783)',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '8px', color: 'var(--seasons-text-tertiary)', marginTop: '2px', display: 'block' }}>
                        {remainingForNode.toLocaleString('en-US', { maximumFractionDigits: 0 })} more SEAS for Yield Node
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '12px', color: 'var(--seasons-text-tertiary)' }}>
                    Price Impact
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--seasons-success)',
                      fontFeatureSettings: "'tnum' 1",
                    }}
                  >
                    {'<'}0.1%
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t" style={{ borderColor: 'var(--seasons-border-hair)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--seasons-text-tertiary)' }}>
                    Route
                  </span>
                  <div className="flex items-center gap-1.5">
                    <img src={currentTokenLogo} alt={selectedToken} className="w-4 h-4 rounded-full" />
                    <ChevronDown size={10} style={{ color: 'var(--seasons-text-tertiary)', transform: 'rotate(-90deg)' }} />
                    <img src={seasLogo} alt="SEAS" className="w-4 h-4 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Premium Swap Button */}
          <Button
            size="lg"
            disabled={!fromAmount || isLoading}
            onClick={(e) => {
              e.preventDefault();
              if (fromAmount && !isLoading) {
                window.open(`https://jup.ag/swap/${selectedToken === 'SOL' ? 'SOL' : USDC_TOKEN_ADDRESS}-${SEAS_TOKEN_ADDRESS}`, '_blank');
              }
            }}
            className="w-full relative overflow-hidden group transition-all duration-300 flex items-center justify-center"
            style={{
              background: fromAmount 
                ? 'linear-gradient(135deg, #E9C774, #F27783, #B44BCB, #4B80CB)'
                : 'var(--seasons-bg-base)',
              color: fromAmount ? '#FFFFFF' : 'var(--seasons-text-tertiary)',
              border: fromAmount ? 'none' : '1px solid var(--seasons-border-hair)',
              padding: '16px',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              cursor: fromAmount ? 'pointer' : 'not-allowed',
              boxShadow: fromAmount ? '0 8px 24px rgba(233, 199, 116, 0.3)' : 'none',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              if (fromAmount) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(233, 199, 116, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (fromAmount) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(233, 199, 116, 0.3)';
              }
            }}
          >
            {fromAmount && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
                }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: '#fff', borderTopColor: 'transparent' }}
                  />
                  Swapping...
                </>
              ) : fromAmount ? (
                'Swap on Jupiter'
              ) : (
                'Enter an amount'
              )}
            </span>
          </Button>
        </div>
      </div>

      {/* Premium Footer */}
      <div
        className="px-6 py-4 border-t flex items-center justify-between"
        style={{
          borderColor: 'var(--seasons-border-hair)',
          background: 'var(--seasons-bg-base)',
        }}
      >
        <a
          href={`https://solscan.io/token/${SEAS_TOKEN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-all duration-200"
          style={{
            fontSize: '12px',
            color: 'var(--seasons-text-tertiary)',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--seasons-text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--seasons-text-tertiary)';
          }}
        >
          View on Solscan
          <ExternalLink size={11} />
        </a>
        <a
          href="https://jup.ag"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-all duration-200"
          style={{
            fontSize: '12px',
            color: 'var(--seasons-text-tertiary)',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--seasons-brand-grad-start)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--seasons-text-tertiary)';
          }}
        >
          <img src={jupiterLogo} alt="Jupiter" className="w-3 h-3" />
          Powered by Jupiter
        </a>
      </div>
    </div>
  );
}