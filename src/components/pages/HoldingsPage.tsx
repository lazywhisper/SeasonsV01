import { PortfolioBuilder } from './PortfolioBuilder';

export function HoldingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="display-md mb-2">
          Assets Inclusion
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--seasons-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          Curated portfolio following the 6:3:1 distribution rule across Blue Chips, Underdogs, and Rising Stars
        </p>
      </div>

      {/* Portfolio Auto Builder Section */}
      <PortfolioBuilder />
    </div>
  );
}