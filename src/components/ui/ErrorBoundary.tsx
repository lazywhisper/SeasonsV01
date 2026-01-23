import React, { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { cardStyles, textStyles } from '../../styles/cardStyles';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component for catching React errors
 * Wraps dashboard sections to prevent full app crashes
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console or monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return <DashboardErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

/**
 * Default error fallback UI for dashboard
 */
function DashboardErrorFallback({ error }: { error: Error | null }) {
  return (
    <div
      className="p-4 md:p-6 rounded-xl"
      style={cardStyles.elevated}
    >
      <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
        <div
          className="mb-4 p-3 rounded-full"
          style={{
            background: 'rgba(242, 119, 131, 0.1)',
          }}
        >
          <AlertCircle 
            size={32} 
            style={{ color: 'var(--seasons-brand-grad-mid1)' }} 
          />
        </div>
        
        <h3
          className="mb-2 text-base md:text-lg"
          style={{
            ...textStyles.heading,
          }}
        >
          Something went wrong
        </h3>
        
        <p
          className="mb-4 text-sm max-w-md"
          style={{
            ...textStyles.secondary,
          }}
        >
          We encountered an error loading this section. Please try refreshing the page.
        </p>

        {error && process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left w-full max-w-md">
            <summary
              className="cursor-pointer text-xs mb-2"
              style={{
                color: 'var(--seasons-text-tertiary)',
              }}
            >
              Error details (dev only)
            </summary>
            <pre
              className="text-xs p-3 rounded overflow-auto"
              style={{
                background: 'var(--seasons-bg-base)',
                color: 'var(--seasons-text-secondary)',
                maxHeight: '200px',
              }}
            >
              {error.toString()}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

/**
 * Specialized error boundary for dashboard sections
 */
export function DashboardErrorBoundary({ children, fallback, onError }: Props) {
  return (
    <ErrorBoundary
      fallback={fallback}
      onError={(error, errorInfo) => {
        // You can send this to your monitoring service (Sentry, LogRocket, etc.)
        console.error('Dashboard error:', error, errorInfo);
        
        if (onError) {
          onError(error, errorInfo);
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
