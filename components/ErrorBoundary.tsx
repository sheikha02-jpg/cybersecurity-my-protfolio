'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';

/**
 * ErrorBoundary Component
 * ═══════════════════════════════════════════════════════════════════
 * 
 * SYSTEM ANALYST REQUIREMENT #14: Error Handling & Fallbacks
 * 
 * PURPOSE:
 * - Catch JavaScript errors anywhere in child component tree
 * - Log error details for debugging
 * - Display fallback UI instead of crashing the entire app
 * - Provide user-friendly error message with recovery options
 * 
 * USAGE:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 * 
 * FEATURES:
 * - Production-safe error logging
 * - Graceful degradation (shows error UI instead of blank screen)
 * - Reset functionality (allows user to retry)
 * - Stack trace capture for debugging
 * - Responsive design matching site theme
 * 
 * LIMITATIONS:
 * - Only catches errors in render phase, lifecycle methods, constructors
 * - Does NOT catch: event handlers, async code, server-side errors, errors in ErrorBoundary itself
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when error occurs
   * This method is called during the "render" phase
   */
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  /**
   * Log error details for debugging
   * This method is called during the "commit" phase
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }

    // In production, send to error tracking service (e.g., Sentry, LogRocket)
    // Example:
    // logErrorToService(error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  /**
   * Reset error boundary state
   * Allows user to retry rendering
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * Reload the page (last resort recovery)
   */
  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="max-w-2xl w-full bg-neutral-900 border border-red-500/30 rounded-lg p-8 shadow-2xl">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-white text-center mb-4">
              Oops! Something went wrong
            </h1>

            {/* Error Description */}
            <p className="text-neutral-400 text-center mb-6">
              We encountered an unexpected error. This has been logged and we'll
              look into it. Please try refreshing the page or contact support if
              the problem persists.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mb-6 bg-neutral-950 border border-neutral-800 rounded-lg p-4">
                <summary className="cursor-pointer text-red-400 font-mono text-sm mb-2">
                  Error Details (Dev Mode)
                </summary>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Error Message:
                    </p>
                    <p className="text-sm text-red-400 font-mono break-all">
                      {error.toString()}
                    </p>
                  </div>
                  {errorInfo && (
                    <div>
                      <p className="text-xs text-neutral-500 uppercase mb-1">
                        Component Stack:
                      </p>
                      <pre className="text-xs text-neutral-400 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors duration-200 font-medium"
                aria-label="Try to recover from error"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
                aria-label="Reload the page"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors duration-200 font-medium text-center"
                aria-label="Go back to homepage"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
