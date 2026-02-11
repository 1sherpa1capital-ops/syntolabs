import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Loading fallback for 3D components
const ThreeLoadingFallback: React.FC<{ minHeight?: string }> = ({ minHeight = '300px' }) => (
    <div
        className="flex items-center justify-center bg-bg/50 rounded-xl"
        style={{ minHeight }}
        role="status"
        aria-label="Loading 3D experience"
    >
        <Loader2 className="w-8 h-8 text-accent animate-spin" aria-hidden="true" />
        <span className="sr-only">Loading 3D experience...</span>
    </div>
);

// Lazy load Three.js components - only ThreeCard is actually used
const LazyThreeCard = React.lazy(() => import('./ThreeCard'));

interface ThreeCardWrapperProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export const ThreeCardWrapper: React.FC<ThreeCardWrapperProps> = (props) => (
    <Suspense fallback={<div className={props.className}>{props.children}</div>}>
        <LazyThreeCard {...props} />
    </Suspense>
);

export default ThreeLoadingFallback;
