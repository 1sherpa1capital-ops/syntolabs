import React from 'react';
import { PhoneIncoming, Users, Calendar, Clock, ArrowRight, Zap, CheckCircle2, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThreeCardWrapper } from './LazyThreeComponents';

const DemoCards: React.FC = () => {
    const navigate = useNavigate();
    const cards = [
        {
            title: 'Never Miss a Lead',
            description: "After-hours inquiry? Weekend question? Our AI answers instantly—no voicemail, no missed revenue.",
            cta: 'Learn more',
            ctaType: 'outline',
            gradient: 'green',
            visual: (
                <div className="relative flex items-center justify-center">
                    {/* Central Hub */}
                    <div className="relative z-10 bg-surface-elevated rounded-2xl shadow-lg px-5 py-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent" />
                        <span className="font-bold text-text-default">24/7 Coverage</span>
                    </div>
                    {/* Orbiting Icons */}
                    <div className="absolute -top-8 -right-4 bg-surface-elevated rounded-xl shadow-md p-2.5 border border-border-subtle">
                        <PhoneIncoming className="w-5 h-5 text-primary" />
                    </div>
                    <div className="absolute -bottom-6 -left-8 bg-surface-elevated rounded-xl shadow-md p-2.5 border border-border-subtle">
                        <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <div className="absolute top-2 -left-12 bg-surface-elevated rounded-xl shadow-md p-2.5 border border-border-subtle">
                        <Users className="w-5 h-5 text-primary" />
                    </div>
                    {/* Connection Lines (dots) */}
                    <div className="absolute w-full h-full">
                        <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-dashed border-border rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>
            )
        },
        {
            title: 'Qualify by Intent & Budget',
            description: 'Not all leads are equal. Our AI asks about interest, timeline, and budget—so your calendar fills with high-intent prospects.',
            cta: 'See how',
            ctaType: 'outline',
            gradient: 'teal',
            visual: (
                <div className="relative flex flex-col gap-3 items-end pr-4">
                    {/* Notification Cards */}
                    <div className="bg-surface-elevated rounded-xl shadow-md p-3 border border-border-subtle flex items-start gap-3 transform -rotate-1">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                            <Bell className="w-4 h-4 text-cta-text" />
                        </div>
                        <div>
                            <div className="font-bold text-text-default text-sm">High-Value Lead</div>
                            <div className="text-xs text-text-muted">$1,800 • Ready to book</div>
                        </div>
                    </div>
                    <div className="bg-surface-elevated rounded-xl shadow-md p-3 border border-border-subtle flex items-start gap-3 transform rotate-1 mr-4">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-cta-text" />
                        </div>
                        <div>
                            <div className="font-bold text-text-default text-sm">Consultation</div>
                            <div className="text-xs text-text-muted">Booked for 2pm Today</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Scale Without Hiring',
            description: 'Handle 50+ simultaneous calls during a flash sale or promo. No hold times, no hiring sprees, no overtime.',
            cta: 'Learn more',
            ctaType: 'link',
            gradient: 'green',
            visual: (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {/* Central Hub */}
                    <div className="z-10 bg-surface-elevated/90 backdrop-blur border border-accent/30 rounded-full p-3 shadow-xl">
                        <Zap className="w-6 h-6 text-accent" />
                    </div>

                    {/* Radiating Circles */}
                    <div className="absolute w-48 h-48 border border-accent/10 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute w-32 h-32 border border-accent/20 rounded-full animate-[spin_8s_linear_infinite_reverse]" />

                    {/* Floating Callers */}
                    <div className="absolute top-4 right-10 bg-white shadow-sm p-1.5 rounded-lg flex gap-1.5 items-center animate-bounce-gentle">
                        <PhoneIncoming size={10} className="text-primary" />
                        <div className="w-8 h-1 bg-border rounded-full" />
                    </div>
                    <div className="absolute bottom-6 left-10 bg-white shadow-sm p-1.5 rounded-lg flex gap-1.5 items-center animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
                        <PhoneIncoming size={10} className="text-primary" />
                        <div className="w-6 h-1 bg-border rounded-full" />
                    </div>
                    
                    {/* Success Badge */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-cta-text px-2 py-0.5 rounded text-[9px] font-bold shadow-sm">
                        No Hold Time
                    </div>
                </div>
            )
        },
        {
            title: 'Book Directly to Calendar',
            description: "Cal.com, Calendly, or your existing scheduler. Qualified leads get booked instantly—no back-and-forth with your team.",
            cta: 'See demo',
            ctaType: 'outline',
            gradient: 'teal',
            visual: (
                <div className="flex flex-col items-center gap-4">
                    {/* Time Slot Cards */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-surface-elevated rounded-full py-2 px-4 shadow-md border border-border-subtle">
                            <div className="w-6 h-3 rounded-full bg-accent" />
                            <span className="text-sm font-semibold text-text-default">Meeting</span>
                            <span className="text-text-muted">•</span>
                            <span className="text-sm font-semibold text-text-default">2:00 pm</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-surface-elevated rounded-full py-2 px-4 shadow-md border border-border-subtle">
                            <div className="w-6 h-3 rounded-full bg-border" />
                            <span className="text-sm font-semibold text-text-default">Demo</span>
                            <span className="text-text-muted">•</span>
                            <span className="text-sm font-semibold text-text-default">4:30 pm</span>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-muted-bg" id="services">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12 lg:mb-16">
                    <div className="flex items-center justify-center gap-2 mb-2 md:mb-3 text-accent font-bold text-[10px] uppercase tracking-widest">
                        <Zap size={12} /> What We Do
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-primary leading-[0.95]">
                        Your business's <span className="text-accent">AI partner.</span>
                    </h2>
                </div>

                {/* Cards Grid - Compact 4-Column Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {cards.map((card, i) => (
                        <ThreeCardWrapper key={i} className="flex flex-col">
                            <div className="flex flex-col h-full bg-surface-elevated rounded-xl overflow-hidden">
                                {/* Visual Area - Compact Height */}
                                <div className={`relative h-32 md:h-40 flex items-center justify-center p-4 overflow-hidden rounded-t-xl ${card.gradient === 'green' ? 'card-gradient-green' : 'card-gradient-teal'} group-hover:scale-[1.02] transition-transform duration-500`}>
                                    {card.visual}
                                </div>

                                {/* Content Area - Tighter Padding */}
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-base md:text-lg font-bold text-primary mb-2 leading-tight">{card.title}</h3>
                                    <p className="text-sm text-text-muted mb-4 leading-relaxed line-clamp-3">{card.description}</p>

                                    <div className="mt-auto pt-2">
                                        {card.ctaType === 'link' ? (
                                            <button
                                                onClick={() => {
                                                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="text-accent hover:text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
                                            >
                                                {card.cta} <ArrowRight size={12} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="text-xs font-bold px-4 py-2 rounded-full border border-border text-text-muted hover:text-primary hover:border-primary transition-colors"
                                            >
                                                {card.cta}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ThreeCardWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DemoCards;
