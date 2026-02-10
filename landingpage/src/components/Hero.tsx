import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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

    const stats = [
        { value: '15+', label: 'Hours Saved Weekly', context: 'Per team member' },
        { value: '48h', label: 'Delivery Time', context: 'From kickoff to prototype' },
        { value: '100%', label: 'Custom Built', context: 'Tailored to your needs' },
        { value: '$4.2K', label: 'Avg Monthly Savings', context: 'In labor costs' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noise">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-accent" />
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Floating accent orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            {/* Main content */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-24 pb-16">
                <div className="text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-8 animate-reveal"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <Sparkles size={14} className="text-accent animate-pulse" />
                        <span className="label-mono">48-Hour Delivery • Working Prototype Guaranteed</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-display mb-6">
                        <span className="block animate-reveal" style={{ animationDelay: '0.2s' }}>Automate the</span>
                        <span className="block text-gradient animate-reveal" style={{ animationDelay: '0.3s' }}>Repetitive</span>
                        <span className="block animate-reveal text-dark" style={{ animationDelay: '0.4s' }}>Work</span>
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="text-lg sm:text-xl md:text-2xl text-text-muted font-medium leading-relaxed max-w-2xl mx-auto mb-10 animate-reveal"
                        style={{ animationDelay: '0.5s' }}
                    >
                        Custom AI workflows that save <span className="text-primary font-bold">15+ hours per week</span>.
                        Built in <span className="text-accent font-bold">48 hours</span>. Yours forever.
                    </p>

                    {/* CTA Button - Single */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-reveal"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Book Strategy Call
                            <ArrowRight size={18} />
                        </a>
                    </div>

                    {/* Trust indicator */}
                    <p
                        className="text-xs text-text-dim animate-reveal"
                        style={{ animationDelay: '0.7s' }}
                    >
                        Free 30-min consultation • No obligation
                    </p>
                </div>

                {/* Stats grid - Merged from standalone Stats component */}
                <div
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-reveal"
                    style={{ animationDelay: '0.8s' }}
                >
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="group relative p-6 bg-surface/80 backdrop-blur border border-border rounded-2xl transition-all duration-500 hover:border-accent/40 shadow-sm hover:shadow-md"
                            style={{ animationDelay: `${0.9 + i * 0.1}s` }}
                        >
                            <div className="text-4xl md:text-5xl font-black text-gradient mb-2">{stat.value}</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-primary">{stat.label}</div>
                            <div className="text-[9px] text-text-muted mt-1">{stat.context}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-text-dim rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
