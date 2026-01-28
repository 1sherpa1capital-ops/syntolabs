import React from 'react';
import { ArrowRight, Link } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

const Problem: React.FC = () => {
    const stats = [
        { label: 'Time Wasted Weekly', value: '15+ hrs', desc: 'Average time teams spend on repetitive manual tasks that could be automated with AI workflows.' },
        { label: 'Cost of Busywork', value: '$2K/mo', desc: 'Monthly cost of manual work at $30/hr—money that could be reinvested in growth activities.' },
        { label: 'Error Rate', value: '5-10%', desc: 'Human error rate in repetitive data entry and processing tasks that AI eliminates completely.' },
        { label: 'Growth Opportunity', value: '3x', desc: 'Potential productivity multiplier when your team focuses on high-value work instead of admin tasks.' }
    ];

    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="problem">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                    <div className="lg:sticky lg:top-32">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                            The Problem
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-primary leading-[0.9] mb-6 md:mb-8">
                            Your team is drowning<br className="hidden sm:block" />
                            <span className="text-accent">in repetitive busywork.</span>
                        </h2>

                        <div className="space-y-4 md:space-y-6 text-base md:text-lg text-text-default font-medium leading-relaxed max-w-xl">
                            <p>
                                Data entry. Report generation. Email sorting. Follow-up reminders. <span className="text-primary font-black">Your best people spend 15+ hours/week on tasks that don't require human judgment.</span>
                            </p>
                            <p>
                                The worst part? This busywork scales linearly with your growth. More customers = more admin work = less time for strategy, sales, and innovation.
                            </p>

                            <div className="pt-4">
                                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-accent font-bold text-lg hover:gap-5 transition-all group uppercase tracking-widest bg-primary px-8 py-4 rounded-full shadow-lg">
                                    Find Your Automation Opportunities <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <p className="mt-3 text-xs text-text-muted">Free workflow audit • No obligation</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="relative p-5 md:p-6 bg-primary border border-text-on-primary/5 rounded-xl group transition-all duration-500 flex flex-col justify-between min-h-[220px] md:min-h-[260px]">
                                {/* Corner Brackets */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-accent/20 -translate-x-1 -translate-y-1 group-hover:border-accent group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-accent/20 translate-x-1 translate-y-1 group-hover:border-accent group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                                        <div className="w-4 h-4 rounded-sm bg-accent/10 flex items-center justify-center text-accent">
                                            <Link size={8} />
                                        </div>
                                        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-text-on-primary/40 group-hover:text-accent transition-colors">
                                            {stat.label}
                                        </div>
                                    </div>

                                    <div className="text-3xl md:text-4xl font-black text-text-on-primary tracking-tighter mb-3 md:mb-4 group-hover:translate-x-1 transition-transform">
                                        {stat.value}
                                    </div>

                                    <div className="w-6 h-px bg-text-on-primary/10 mb-3 md:mb-4" />

                                    <p className="text-xs text-text-on-primary/60 font-medium leading-relaxed">
                                        {stat.desc}
                                    </p>
                                </div>

                                <a href="#roi" className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-accent hover:text-text-on-primary transition-colors">
                                    VIEW IMPACT <ArrowRight size={12} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Disclaimer */}
                <div className="mt-8 text-center">
                    <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">
                        Stats based on internal estimates and industry research. Actual results vary by business.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Problem;
