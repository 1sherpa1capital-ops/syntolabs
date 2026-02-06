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

// Lazy load Three.js components
export const LazyThreeHero = React.lazy(() => import('./ThreeHero'));
export const LazyThreeBackground = React.lazy(() => import('./ThreeBackground'));
export const LazyData3DVis = React.lazy(() => import('./Data3DVis'));
export const LazyScroll3DSection = React.lazy(() => import('./Scroll3DSection'));
export const LazyFloatingOrb = React.lazy(() => import('./FloatingOrb'));
export const LazyThreeCard = React.lazy(() => import('./ThreeCard'));

// Wrapped components with Suspense boundaries
export const ThreeHeroWrapper: React.FC = () => (
    <Suspense fallback={<ThreeLoadingFallback minHeight="100vh" />}>
        <LazyThreeHero />
    </Suspense>
);

interface ThreeBackgroundWrapperProps {
    variant?: 'particles' | 'waves' | 'network';
    intensity?: number;
}

export const ThreeBackgroundWrapper: React.FC<ThreeBackgroundWrapperProps> = (props) => (
    <Suspense fallback={<div className="absolute inset-0 bg-bg" aria-hidden="true" />}>
        <LazyThreeBackground {...props} />
    </Suspense>
);

interface Data3DVisWrapperProps {
    dataPoints: number[];
    labels?: string[];
    color?: string;
    height?: string;
}

export const Data3DVisWrapper: React.FC<Data3DVisWrapperProps> = (props) => (
    <Suspense fallback={<ThreeLoadingFallback minHeight={props.height || '300px'} />}>
        <LazyData3DVis {...props} />
    </Suspense>
);

interface Scroll3DSectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'spiral' | 'wave' | 'helix';
}

export const Scroll3DSectionWrapper: React.FC<Scroll3DSectionWrapperProps> = (props) => (
    <Suspense fallback={<div className={props.className}>{props.children}</div>}>
        <LazyScroll3DSection {...props} />
    </Suspense>
);

interface FloatingOrbWrapperProps {
    color?: string;
    size?: number;
    position?: { x: number; y: number };
    className?: string;
    pulseSpeed?: number;
}

export const FloatingOrbWrapper: React.FC<FloatingOrbWrapperProps> = (props) => (
    <Suspense fallback={<div className={props.className} style={{ width: 200, height: 200 }} aria-hidden="true" />}>
        <LazyFloatingOrb {...props} />
    </Suspense>
);

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
