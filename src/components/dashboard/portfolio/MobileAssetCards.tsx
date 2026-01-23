import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { formatters } from '../../../utils/formatters';
import { Asset } from '../../../lib/mockData';
import { categoryColors } from './types';
import solanaLogo from 'figma:asset/5633c08b2dd5db21c15725009af45cc34535287a.png';

interface MobileAssetCardsProps {
  filteredAssets: Asset[];
}

export function MobileAssetCards({ filteredAssets }: MobileAssetCardsProps) {
  return (
    <div className="md:hidden space-y-3">
      {filteredAssets.map((asset, idx) => (
        <div
          key={idx}
          className="p-3 rounded-lg"
          style={{
            background: 'var(--seasons-bg-card)',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <div className="flex items-start gap-3 mb-2">
            {asset.logo && (
              <div className="relative w-10 h-10 flex-shrink-0">
                <ImageWithFallback
                  src={asset.logo}
                  alt={asset.symbol}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <img
                  src={solanaLogo}
                  alt="Solana"
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                  style={{ transform: 'translate(25%, 25%)' }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: categoryColors[asset.category] }}
                />
                <span className="text-sm" style={{ color: 'var(--seasons-text-primary)', fontWeight: 600 }}>
                  {asset.symbol}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span style={{ color: 'var(--seasons-text-secondary)' }}>
                  {asset.weightPct}%
                </span>
                <span
                  style={{
                    color: asset.change24hPct > 0 ? 'var(--seasons-success)' : 'var(--seasons-danger)',
                  }}
                >
                  {asset.change24hPct > 0 ? '+' : ''}{asset.change24hPct}%
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs mb-1" style={{ color: 'var(--seasons-text-tertiary)' }}>
                APY
              </div>
              <div className="text-sm" style={{ color: 'var(--seasons-text-secondary)' }}>
                {asset.aprRange}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--seasons-border-hair)' }}>
            <span className="text-xs" style={{ color: 'var(--seasons-text-tertiary)' }}>
              7d Rewards
            </span>
            <span className="text-sm" style={{ color: 'var(--seasons-text-primary)', fontWeight: 600 }}>
              {formatters.currency(asset.rewards7dUsd, 2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
