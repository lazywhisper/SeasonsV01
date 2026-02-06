import { AlertCircle, Home, ArrowLeft, Search } from 'lucide-react';
import { cardStyles } from '../../styles/cardStyles';

interface NotFoundPageProps {
  onNavigateHome?: () => void;
  onNavigateBack?: () => void;
}

export function NotFoundPage({ onNavigateHome, onNavigateBack }: NotFoundPageProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* 404 Number with Gradient */}
        <div className="mb-8">
          <h1
            style={{
              fontSize: '120px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #E9C774, #F27783, #B44BCB, #4B80CB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1',
              letterSpacing: '-0.02em',
            }}
          >
            404
          </h1>
        </div>

        {/* Icon */}
        <div
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 199, 116, 0.1), rgba(242, 119, 131, 0.1))',
            border: '1px solid var(--seasons-border-hair)',
          }}
        >
          <Search
            size={40}
            style={{
              color: 'var(--seasons-brand-grad-start)',
            }}
          />
        </div>

        {/* Message */}
        <h2 className="display-md mb-4">
          Page Not Found
        </h2>

        <p
          className="mb-8"
          style={{
            fontSize: '16px',
            color: 'var(--seasons-text-secondary)',
            lineHeight: '1.6',
            maxWidth: '480px',
            margin: '0 auto 32px',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          The page you're looking for doesn't exist or has been moved. Check the URL or navigate back to the dashboard.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2 group"
            style={{
              background:
                'linear-gradient(135deg, var(--seasons-brand-grad-start), var(--seasons-brand-grad-mid1), var(--seasons-brand-grad-mid2), var(--seasons-brand-grad-end))',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif',
            }}
          >
            <Home size={16} />
            Go to Dashboard
          </button>

          <button
            onClick={onNavigateBack}
            className="px-6 py-3 rounded-lg transition-all hover:bg-white/5 flex items-center gap-2"
            style={{
              background: 'transparent',
              color: 'var(--seasons-text-secondary)',
              fontSize: '15px',
              fontWeight: 600,
              border: '1px solid var(--seasons-border-hair)',
              cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif',
            }}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div
          className="mt-12 p-6 rounded-xl"
          style={cardStyles.elevated}
        >
          <div className="flex items-start gap-3 text-left">
            <AlertCircle
              size={20}
              style={{
                color: 'var(--seasons-text-tertiary)',
                marginTop: '2px',
                flexShrink: 0,
              }}
            />
            <div>
              <h3
                className="mb-2"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--seasons-text-primary)',
                  fontFamily: 'Raleway, sans-serif',
                }}
              >
                Need Help?
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--seasons-text-tertiary)',
                  lineHeight: '1.6',
                  fontFamily: 'Raleway, sans-serif',
                }}
              >
                If you believe this is an error, please contact our support team via{' '}
                <a
                  href="https://t.me/SeasonsCommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--seasons-brand-grad-start)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Telegram
                </a>{' '}
                or{' '}
                <a
                  href="https://x.com/SEAS_onchain"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--seasons-brand-grad-start)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  X (Twitter)
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}