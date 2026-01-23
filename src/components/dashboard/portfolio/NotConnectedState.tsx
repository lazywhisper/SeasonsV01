import { cardStyles } from '../../../styles/cardStyles';
import solanaLogo from 'figma:asset/5633c08b2dd5db21c15725009af45cc34535287a.png';
import wifLogo from 'figma:asset/695464c4e114211df8930e790b5f1354e020512b.png';
import bonkLogo from 'figma:asset/cabe639e074a7696ad20c8b76102cc7130648803.png';
import penguLogo from 'figma:asset/11dd47e096a75ab72a7e500bcdba8d0d4772e45b.png';
import fartcoinLogo from 'figma:asset/501ffda46bf5d1c0917ca63d14c5b266867ac2e7.png';
import jbmbLogo from 'figma:asset/5f7d06d332fd284477eac1ceb01e315d9b508091.png';

export function NotConnectedState() {
  const yieldAssets = [
    { 
      symbol: '$WIF', 
      name: 'Dogwifhat', 
      category: 'BLUE CHIPS', 
      categoryColor: '#E9C774',
      allocation: 20,
      logo: wifLogo 
    },
    { 
      symbol: '$BONK', 
      name: 'Bonk', 
      category: 'BLUE CHIPS', 
      categoryColor: '#E9C774',
      allocation: 20,
      logo: bonkLogo 
    },
    { 
      symbol: '$PENGU', 
      name: 'Pudgy Penguins', 
      category: 'BLUE CHIPS', 
      categoryColor: '#E9C774',
      allocation: 20,
      logo: penguLogo 
    },
    { 
      symbol: '$FARTCOIN', 
      name: 'Fartcoin', 
      category: 'UNDERDOGS', 
      categoryColor: '#B44BCB',
      allocation: 30,
      logo: fartcoinLogo 
    },
    { 
      symbol: '$JBMB', 
      name: 'Just Be More Bullish', 
      category: 'RISING STARS', 
      categoryColor: '#4B80CB',
      allocation: 10,
      logo: jbmbLogo 
    },
  ];

  return (
    <div
      className="p-4 md:p-6 rounded-xl"
      style={cardStyles.elevated}
    >
      <h2
        className="mb-6 text-base md:text-lg"
        style={{
          color: 'var(--seasons-text-primary)',
          fontWeight: 600,
          lineHeight: '1.3',
        }}
      >
        Seasons Composition
      </h2>
      
      {/* Yield Assets Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        {yieldAssets.map((asset, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-3 md:p-4 rounded-lg transition-all duration-200 hover:bg-white/[0.02]"
            style={{
              background: 'var(--seasons-bg-card)',
              border: '1px solid var(--seasons-border-hair)',
            }}
          >
            {/* Logo with Solana Badge */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 mb-3 flex-shrink-0">
              <img
                src={asset.logo}
                alt={asset.symbol}
                className="w-full h-full rounded-full object-cover"
              />
              <img
                src={solanaLogo}
                alt="Solana"
                className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2"
                style={{ 
                  transform: 'translate(20%, 20%)',
                  borderColor: 'var(--seasons-bg-card)',
                }}
              />
            </div>
            
            {/* Symbol */}
            <div
              className="mb-1 text-center"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--seasons-text-primary)',
              }}
            >
              {asset.symbol}
            </div>

            {/* Name (if exists) */}
            {asset.name && (
              <div
                className="mb-2 text-center"
                style={{
                  fontSize: '10px',
                  color: 'var(--seasons-text-tertiary)',
                  fontWeight: 400,
                  lineHeight: '1.3',
                }}
              >
                {asset.name}
              </div>
            )}

            {/* Category */}
            <div
              className="mb-3"
              style={{
                fontSize: '9px',
                color: asset.categoryColor,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 600,
              }}
            >
              {asset.category}
            </div>

            {/* Allocation */}
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--seasons-success)',
                fontFeatureSettings: "'tnum' 1",
              }}
            >
              {asset.allocation}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
