import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Phone, Calendar, Zap, Shield, ArrowRight,
    MessageSquare, Clock, Users, ChevronLeft, ChevronRight
} from 'lucide-react';
import { ThreeCardWrapper } from './LazyThreeComponents';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
    id: number;
    step: string;
    title: string;
    description: string;
    icon: React.ElementType;
    illustration: React.ReactNode;
}

const PlayfulFeatureCards: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const cards: FeatureCard[] = [
        {
            id: 1,
            step: '01',
            title: 'AI Workflow Audit',
            description: "We analyze your current operations to identify repetitive tasks, bottlenecks, and opportunities where AI can deliver immediate impact.",
            icon: Phone,
            illustration: (
                <div className="relative w-full h-32 flex items-center justify-center">
                    {/* Central Analytics Icon */}
                    <div className="relative z-10 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg animate-float-slow">
                        <Zap className="text-text-on-primary" size={28} />
                    </div>
                    {/* Orbiting dots */}
                    <div className="absolute w-24 h-24 rounded-full border border-dashed border-border animate-spin-slow" />
                    <div className="absolute top-2 right-1/4 w-3 h-3 bg-accent rounded-full animate-pulse" />
                    <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-accent/50 rounded-full animate-bounce-gentle" />
                </div>
            )
        },
        {
            id: 2,
            step: '02',
            title: 'Custom AI Implementation',
            description: "We build tailored AI solutions—voice agents, automation workflows, or intelligent systems—that integrate seamlessly with your existing tools.",
            icon: Calendar,
            illustration: (
                <div className="w-full space-y-2 px-2">
                    {/* Integration flow */}
                    {[
                        { tool: 'CRM', status: 'Connected' },
                        { tool: 'Email', status: 'Automated' },
                        { tool: 'Calendar', status: 'Synced' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-4 bg-muted-bg rounded flex items-center justify-center flex-shrink-0">
                                    <div className="w-3 h-2 bg-accent rounded-sm" />
                                </div>
                                <span className="text-text-muted w-12">{item.tool}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-accent font-medium whitespace-nowrap">{item.status}</span>
                            </div>
                            <span className="text-text-muted/50 w-4 text-right">✓</span>
                        </div>
                    ))}
                </div>
            )
        },
        {
            id: 3,
            step: '03',
            title: 'Team Training & Enablement',
            description: "We train your team to work alongside AI effectively. From prompt engineering to workflow optimization, we ensure adoption and success.",
            icon: Zap,
            illustration: (
                <div className="relative w-full h-32 flex items-center justify-center gap-6">
                    {/* Training flow diagram */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted-bg rounded-xl flex items-center justify-center">
                            <Users size={20} className="text-text-muted" />
                        </div>
                        <div className="w-8 h-0.5 bg-accent relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-accent border-y-4 border-y-transparent" />
                        </div>
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                            <MessageSquare size={20} className="text-accent" />
                        </div>
                        <div className="w-8 h-0.5 bg-accent relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-accent border-y-4 border-y-transparent" />
                        </div>
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                            <Zap size={20} className="text-text-on-primary" />
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 4,
            step: '04',
            title: 'Ongoing Optimization',
            description: "AI isn't set-and-forget. We continuously monitor performance, refine prompts, and optimize workflows to ensure you get maximum ROI.",
            icon: Users,
            illustration: (
                <div className="w-full flex items-center justify-center gap-8">
                    {/* Performance metrics */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-full bg-muted-bg flex items-center justify-center">
                            <span className="text-xs font-bold text-text-muted">85%</span>
                        </div>
                        <div className="w-8 h-1 bg-border rounded" />
                        <span className="text-[8px] text-text-muted">Before</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent">
                            <span className="text-xs font-bold text-accent">95%</span>
                        </div>
                        <div className="w-8 h-1 bg-accent rounded" />
                        <span className="text-[8px] text-accent">After</span>
                    </div>
                    {/* Growth indicator */}
                    <div className="absolute bottom-2 right-4 flex items-center gap-1 text-[10px] text-accent font-bold">
                        <span>+40% ROI</span>
                    </div>
                </div>
            )
        }
    ];

    // GSAP scroll entrance animation
    useGSAP(() => {
        if (!containerRef.current) return;

        const cardElements = cardsRef.current.filter(Boolean);

        gsap.set(cardElements, {
            opacity: 0,
            y: 50,
            scale: 0.95
        });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(cardElements, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: 'power2.out'
                });
            },
            once: true
        });

    }, { scope: containerRef });

    // Navigate to next/prev card (for stacked view on mobile or as a deck)
    const navigateCard = (direction: 'next' | 'prev') => {
        if (isAnimating) return;
        setIsAnimating(true);

        const cardElements = cardsRef.current.filter(Boolean);
        const currentCard = cardElements[activeIndex];
        const nextIndex = direction === 'next'
            ? (activeIndex + 1) % cards.length
            : (activeIndex - 1 + cards.length) % cards.length;

        // Animate current card out
        gsap.to(currentCard, {
            x: direction === 'next' ? -100 : 100,
            opacity: 0,
            rotation: direction === 'next' ? -5 : 5,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                // Reset current card position
                gsap.set(currentCard, { x: 0, rotation: 0 });

                setActiveIndex(nextIndex);
                setIsAnimating(false);
            }
        });
    };

    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="features">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted-bg text-text-default text-xs font-medium mb-4">
                        <Clock size={12} />
                        Our Process
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-primary mb-4">
                        AI implementation <span className="text-accent">that actually works</span>
                    </h2>
                    <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
                        From workflow audit to team training—we guide you through every step of AI transformation. No generic solutions, only what works for your business.
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <a
                            href="https://cal.com/rhigden-sonam-sherpa-624tui/mercer-ai-discovery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-primary text-text-on-primary text-sm font-bold rounded-full flex items-center gap-2 hover:bg-accent hover:text-cta-text transition-colors"
                        >
                            Book a Strategy Call <ArrowRight size={14} />
                        </a>
                        <a
                            href="#roi"
                            className="px-4 py-2 border border-border text-text-default text-sm font-medium rounded-full flex items-center gap-2 hover:border-primary/30 transition-colors"
                        >
                            Calculate Your ROI <ArrowRight size={14} />
                        </a>
                    </div>
                </div>

                {/* Cards Grid - Desktop: 4 columns, Tablet: 2 columns, Mobile: Stacked Deck */}
                <div ref={containerRef}>
                    {/* Desktop/Tablet Grid */}
                    <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.map((card, i) => (
                            <ThreeCardWrapper
                                key={card.id}
                                className="group cursor-pointer flex flex-col h-full"
                            >
                                <div
                                    ref={(el) => { cardsRef.current[i] = el; }}
                                    className="relative p-6 md:p-8"
                                >
                                    {/* Step Badge */}
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-muted-bg text-text-muted text-sm font-bold mb-6 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                        {card.step}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-text-default mb-3 group-hover:text-primary transition-colors">
                                        {card.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-text-muted leading-relaxed mb-8 flex-grow">
                                        {card.description}
                                    </p>

                                    {/* Illustration Area */}
                                    <div className="relative min-h-[140px] bg-muted-bg/50 rounded-xl p-4 overflow-hidden mt-auto group-hover:bg-muted-bg/80 transition-colors">
                                        {card.illustration}
                                    </div>

                                    {/* Hover Arrow */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                        <ArrowRight size={20} className="text-accent" />
                                    </div>
                                </div>
                            </ThreeCardWrapper>
                        ))}
                    </div>

                    {/* Mobile Stacked Deck */}
                    <div className="sm:hidden relative">
                        {/* Card Stack */}
                        <div className="relative h-[480px]">
                            {cards.map((card, i) => {
                                const isActive = i === activeIndex;
                                const offset = i - activeIndex;
                                const absOffset = Math.abs(offset);

                                return (
                                    <div
                                        key={card.id}
                                        className={`absolute inset-x-0 top-0 bg-surface-elevated border border-border-subtle rounded-2xl p-6 transition-all duration-300 ${isActive ? 'z-10 shadow-xl' : 'z-0 shadow-md'}`}
                                        style={{
                                            transform: `
                                                translateY(${offset * 8}px) 
                                                scale(${1 - absOffset * 0.05}) 
                                                rotateZ(${offset * 2}deg)
                                            `,
                                            opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3
                                        }}
                                    >
                                        {/* Step Badge */}
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-muted-bg text-text-muted text-sm font-bold mb-5">
                                            {card.step}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-text-default mb-3">
                                            {card.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-text-muted leading-relaxed mb-6">
                                            {card.description}
                                        </p>

                                        {/* Illustration Area */}
                                        <div className="relative min-h-[160px] bg-muted-bg/50 rounded-xl p-4 overflow-hidden">
                                            {card.illustration}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-center gap-6 mt-8">
                            <button
                                onClick={() => navigateCard('prev')}
                                disabled={isAnimating}
                                className="w-10 h-10 rounded-full bg-muted-bg flex items-center justify-center text-text-default hover:bg-accent hover:text-cta-text transition-colors disabled:opacity-50"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {cards.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-accent' : 'bg-border'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => navigateCard('next')}
                                disabled={isAnimating}
                                className="w-10 h-10 rounded-full bg-muted-bg flex items-center justify-center text-text-default hover:bg-accent hover:text-cta-text transition-colors disabled:opacity-50"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Case Study Block */}
                <div className="mt-12 md:mt-16">
                    <div className="text-center mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                            <MessageSquare size={12} />
                            Client Result
                        </span>
                    </div>
                    <div className="max-w-2xl mx-auto bg-surface-elevated border border-border-subtle rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-primary px-4 py-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-on-primary/70">Medical Spa — 3 Month Transformation</span>
                        </div>
                        <div className="p-4 md:p-6 space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted-bg flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-text-muted">B</span>
                                </div>
                                <div className="bg-muted-bg rounded-lg rounded-tl-none px-4 py-3 max-w-[85%]">
                                    <p className="text-sm text-text-default">"We were losing 40% of leads to missed calls. Our team was overwhelmed."</p>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className="bg-primary/10 rounded-lg rounded-tr-none px-4 py-3 max-w-[85%]">
                                    <p className="text-sm text-text-default">"We implemented an AI voice agent that handles inquiries 24/7. It qualifies leads and books appointments automatically."</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-cta-text">S</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted-bg flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-text-muted">B</span>
                                </div>
                                <div className="bg-muted-bg rounded-lg rounded-tl-none px-4 py-3 max-w-[85%]">
                                    <p className="text-sm text-text-default">"What were the actual results?"</p>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className="bg-primary/10 rounded-lg rounded-tr-none px-4 py-3 max-w-[85%]">
                                    <p className="text-sm text-text-default">"85% of calls now answered immediately. 3x increase in qualified leads. Team focuses on high-value work instead of phone tag."</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-cta-text">S</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted-bg flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-text-muted">B</span>
                                </div>
                                <div className="bg-muted-bg rounded-lg rounded-tl-none px-4 py-3 max-w-[85%]">
                                    <p className="text-sm text-text-default">"That's exactly what we need."</p>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className="bg-accent/20 border border-accent/30 rounded-lg rounded-tr-none px-4 py-3 max-w-[85%]">
                                    <p className="text-sm text-text-default font-medium">"Every business is different. We start with an audit to find your specific bottlenecks, then build AI that solves them."</p>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-accent font-bold">
                                        <Calendar size={12} />
                                        Book your audit
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-cta-text">S</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-muted-bg/50 px-4 py-3 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Real client results — actual outcomes may vary</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlayfulFeatureCards;
