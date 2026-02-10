import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

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

    const scrollToWaitlist = (e: React.MouseEvent) => {
        e.preventDefault();
        const waitlistSection = document.getElementById('waitlist');
        if (waitlistSection) {
            waitlistSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
            {/* 3D Background - pointer-events-none to ensure it doesn't block interactions */}
            <div className="absolute inset-0 pointer-events-none">
                <ThreeBackground variant="particles" intensity={0.8} />
            </div>
            
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

            {/* Main content */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-24 pb-16 w-full">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Main heading */}
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                        <span className="block animate-reveal" style={{ animationDelay: '0.2s' }}>Automate the</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-[#f97316] animate-reveal" style={{ animationDelay: '0.3s' }}>
                            Repetitive Work
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="text-xl sm:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl mx-auto mb-10 animate-reveal"
                        style={{ animationDelay: '0.4s' }}
                    >
                        Your team spends 15+ hours/week on busywork. We build custom agent swarms to fix it. <span className="text-[#f97316] font-bold">48-hour delivery.</span>
                    </p>

                    {/* CTA Button */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-reveal"
                        style={{ animationDelay: '0.5s' }}
                    >
                        <a
                            href="#waitlist"
                            onClick={scrollToWaitlist}
                            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#f97316] hover:bg-orange-600 text-white font-black text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105"
                        >
                            Join Waitlist
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Stats Bar (Social Proof) */}
                    <div
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-reveal"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <span className="text-sm sm:text-base font-bold text-white/80 tracking-wide">
                            4 Products Shipped <span className="mx-3 text-white/20">•</span> 10,000+ Hours Saved
                        </span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-[#f97316] rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
