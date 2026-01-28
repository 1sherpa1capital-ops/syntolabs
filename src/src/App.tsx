import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { TryNowModalProvider } from './context/TryNowModalContext';
import ErrorBoundary from './components/ErrorBoundary';
import { CustomCursor, NoiseOverlay } from './components/CursorEffects';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Agents = React.lazy(() => import('./pages/Agents'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const AboutTeam = React.lazy(() => import('./pages/AboutTeam'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
    <div 
        className="flex items-center justify-center min-h-screen bg-bg"
        role="status"
        aria-label="Loading page"
    >
        <Loader2 className="w-10 h-10 text-accent animate-spin" aria-hidden="true" />
        <span className="sr-only">Loading...</span>
    </div>
);

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Router>
                <TryNowModalProvider>
                    {/* Global 3D Effects */}
                    <CustomCursor color="#6366f1" size={20} trailLength={5} />
                    <NoiseOverlay opacity={0.03} />

                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/agents" element={<Agents />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/about" element={<AboutTeam />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </TryNowModalProvider>
            </Router>
        </ErrorBoundary>
    );
};

export default App;
