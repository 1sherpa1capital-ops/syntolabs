import React from 'react';
import { X, Check } from 'lucide-react';

const Comparison: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="comparison">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-8 md:mb-12 lg:mb-16 max-w-4xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-primary leading-[0.9] mb-4 md:mb-6">
                        Why Service Businesses are <br className="hidden sm:block" />
                        <span className="text-accent">switching to AI automation.</span>
                    </h2>
                    <p className="text-base md:text-lg text-text-default font-medium">
                        Free your team from repetitive manual tasks. Let AI handle inbound inquiries while your team focuses on delivering value.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
                    {/* Traditional Approach - Muted & Dated */}
                    <div className="p-6 md:p-8 rounded-2xl border border-border-subtle bg-surface-elevated/50 flex flex-col group hover:bg-surface-elevated transition-colors duration-300 opacity-90 hover:opacity-100">
                        <div className="flex items-center gap-2 mb-6 md:mb-8 opacity-70">
                            <span className="w-2 h-2 rounded-full bg-text-muted" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-text-muted uppercase">Current Process</span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-text-muted mb-3 md:mb-4 leading-tight group-hover:text-primary transition-colors">The Old Way</h3>
                        <p className="text-sm md:text-base text-text-muted mb-6 md:mb-8 leading-relaxed">Front desk is overwhelmed. Leads slip through the cracks.</p>

                        <ul className="space-y-5 flex-1">
                            {[
                                'Team spends 15+ hours/week on data entry and repetitive tasks',
                                'Manual processes create 5-10% error rates in reporting',
                                'Growth means hiring more people for the same busywork',
                                'Your best people are stuck in admin instead of strategy'
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 items-start text-sm text-text-muted/80 font-medium pb-5 border-b border-border-subtle last:border-0">
                                    <div className="w-6 h-6 rounded-full bg-muted-bg flex items-center justify-center text-text-muted/50 flex-shrink-0 mt-0.5">
                                        <X size={14} strokeWidth={2.5} />
                                    </div>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mercer Approach - Highlighted & Modern */}
                    <div className="p-6 md:p-8 rounded-2xl bg-primary flex flex-col relative overflow-hidden shadow-2xl transform md:scale-[1.02] border border-accent/20">
                        {/* Subtle background texture */}
                        <div className="absolute inset-0 bg-grid-subtle opacity-[0.08] invert pointer-events-none" />
                        
                        {/* "Best Choice" Badge */}
                        <div className="absolute top-0 right-0 bg-accent text-cta-text text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-xl shadow-lg z-20">
                            Recommended
                        </div>

                        <div className="flex items-center gap-2 mb-6 md:mb-8 relative z-10">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">With AI Automation</span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4 leading-tight relative z-10">The AI Advantage</h3>
                        <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8 leading-relaxed relative z-10">Every inquiry answered. Every lead qualified. Every booking confirmed.</p>

                        <ul className="space-y-5 flex-1 relative z-10">
                            {[
                                'AI agents handle repetitive tasks while your team focuses on growth',
                                'Automated workflows eliminate errors and ensure consistency',
                                'Scale operations without proportional hiring increases',
                                'Your best people work on strategy, innovation, and high-value relationships'
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 items-start text-sm text-white font-bold pb-5 border-b border-white/10 last:border-0">
                                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-primary flex-shrink-0 mt-0.5 shadow-lg shadow-accent/20">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
