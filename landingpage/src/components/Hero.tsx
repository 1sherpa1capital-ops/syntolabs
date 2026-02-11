import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simple parallax on mouse move
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * 20;

            heroRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid bg-bg">
            {/* Pure CSS background with subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />

            {/* Main content */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-24 pb-16 w-full">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Main heading */}
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.95]">
                        <span className="block animate-reveal" style={{ animationDelay: '0.2s' }}>Turn Chaos</span>
                        <span className="block text-accent animate-reveal" style={{ animationDelay: '0.3s' }}>
                            into Clarity
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="text-xl sm:text-2xl text-text-muted font-medium leading-relaxed max-w-3xl mx-auto mb-10 animate-reveal"
                        style={{ animationDelay: '0.4s' }}
                    >
                        Custom AI workflows that eliminate your team's busiest work—built in 48 hours, not weeks. Stop trading senior time for busywork.
                    </p>

                    {/* CTA Button */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-reveal"
                        style={{ animationDelay: '0.5s' }}
                    >
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-double-layer group relative inline-flex items-center gap-3 text-lg"
                        >
                            Book Strategy Call
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Urgency Badge */}
                    <div
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-surface/50 border border-white/10 backdrop-blur-md animate-reveal mb-8"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <span className="text-sm font-bold text-text-default tracking-wide">
                            Limited to 5 new clients per month
                        </span>
                    </div>

                    {/* Stats Bar (Social Proof) */}
                    <div
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-surface/50 border border-white/10 backdrop-blur-md animate-reveal"
                        style={{ animationDelay: '0.7s' }}
                    >
                        <span className="text-sm sm:text-base font-bold text-text-default tracking-wide">
                            15+ Hours Saved Weekly <span className="mx-3 text-text-muted">•</span> 48-Hour Prototypes <span className="mx-3 text-text-muted">•</span> $2.5M+ Revenue Delivered
                        </span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
                <div className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
