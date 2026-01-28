import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
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

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        
        // Log to analytics/error tracking service
        console.error('Error caught by boundary:', error, errorInfo);
        
        // You can add error reporting service here
        // e.g., Sentry.captureException(error);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 sm:px-6">
                    <div className="max-w-md w-full text-center">
                        {/* Error Icon */}
                        <div className="w-20 h-20 mx-auto bg-error/10 rounded-2xl flex items-center justify-center mb-6">
                            <AlertTriangle className="w-10 h-10 text-error" />
                        </div>

                        {/* Error Message */}
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-primary mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-text-muted text-base leading-relaxed mb-8">
                            We're sorry, but something unexpected happened. 
                            Please try refreshing the page or go back to the home page.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => {
                                    this.handleReset();
                                    window.location.reload();
                                }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-cta-text px-6 py-3.5 rounded-full font-black text-sm hover:bg-cta-hover transition-colors"
                            >
                                <RefreshCw size={16} />
                                Refresh Page
                            </button>
                            <Link
                                to="/"
                                onClick={this.handleReset}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-elevated border border-border text-text-default px-6 py-3.5 rounded-full font-bold text-sm hover:bg-muted-bg transition-colors"
                            >
                                <Home size={16} />
                                Go Home
                            </Link>
                        </div>

                        {/* Error Details (Dev only) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-8 text-left">
                                <summary className="text-xs font-bold uppercase tracking-widest text-accent cursor-pointer mb-2">
                                    Error Details
                                </summary>
                                <div className="p-4 bg-dark/5 rounded-lg overflow-auto">
                                    <pre className="text-xs text-text-muted whitespace-pre-wrap font-mono">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </div>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
