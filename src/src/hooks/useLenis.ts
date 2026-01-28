import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

interface UseLenisOptions {
    /** Whether smooth scrolling is enabled */
    enabled?: boolean;
    /** Duration of the scroll animation */
    duration?: number;
    /** Whether to respect prefers-reduced-motion */
    respectReducedMotion?: boolean;
}

interface UseLenisReturn {
    /** Stop smooth scrolling (useful for modals) */
    stop: () => void;
    /** Start smooth scrolling */
    start: () => void;
    /** Scroll to a specific element or position */
    scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

export const useLenis = (options: UseLenisOptions = {}): UseLenisReturn => {
    const { 
        enabled = true, 
        duration = 1.2,
        respectReducedMotion = true 
    } = options;
    
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!enabled || (respectReducedMotion && prefersReducedMotion)) {
            return;
        }

        // Initialize Lenis
        const lenis = new Lenis({
            duration,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        // Listen for reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleMotionPreference = (e: MediaQueryListEvent) => {
            if (e.matches) {
                lenis.stop();
            } else {
                lenis.start();
            }
        };

        mediaQuery.addEventListener('change', handleMotionPreference);

        // Clean up
        return () => {
            cancelAnimationFrame(rafId);
            mediaQuery.removeEventListener('change', handleMotionPreference);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [enabled, duration, respectReducedMotion]);

    const stop = useCallback(() => {
        lenisRef.current?.stop();
    }, []);

    const start = useCallback(() => {
        lenisRef.current?.start();
    }, []);

    const scrollTo = useCallback((
        target: string | number | HTMLElement, 
        options?: { offset?: number; duration?: number }
    ) => {
        lenisRef.current?.scrollTo(target, options);
    }, []);

    return { stop, start, scrollTo };
};

export default useLenis;
