import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

const Hero: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 pb-12 md:pb-16 pt-24 md:pt-32">
            <div className="max-w-[1400px] mx-auto">
                {/* Clean, centered layout inspired by Agent-N */}
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge - 48-Hour Delivery Promise */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">48-Hour Delivery • Working Prototype Guaranteed</span>
                    </div>

                    {/* Main Heading - Workflow Automation Focus */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-primary leading-[0.9] mb-6">
                        Automate the<br />
                        <span className="text-accent">Repetitive</span><br />
                        Work
                    </h1>

                    {/* Subheadline - Brand Voice from Guidelines */}
                    <p className="text-lg sm:text-xl md:text-2xl text-text-muted font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                        Custom AI workflows built in 48 hours. No cookie-cutter solutions.
                        Average client saves <span className="text-primary font-bold">$4,200/month in labor costs</span>.
                    </p>

                    {/* CTA Buttons - Value-Focused */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-cta-text font-black text-sm uppercase tracking-wider rounded-full hover:bg-cta-hover transition-all shadow-lg shadow-accent/20"
                        >
                            Book Free Strategy Call
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <button
                            onClick={() => {
                                // Open demo video modal
                                const modal = document.getElementById('demo-modal');
                                if (modal) modal.classList.remove('hidden');
                            }}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-surface-elevated border border-border text-primary font-bold text-sm rounded-full hover:border-primary/30 transition-all group"
                        >
                            <Play size={16} className="text-accent group-hover:scale-110 transition-transform" />
                            See Our Work
                        </button>
                    </div>

                    {/* Risk Reversal */}
                    <p className="mt-4 text-xs text-text-muted">
                        Free 30-min consultation • No obligation • 15+ hours/week saved
                    </p>
                </div>

                {/* Social Proof Bar */}
                <div className="mt-12 mb-12 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                        10,000+ hours saved to date across shipped AI products
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                        {['Multi-Agent Systems', 'MFR Guardrails', 'Workflow Automation', 'Custom AI Tools'].map((tech, i) => (
                            <span key={i} className="text-sm font-medium text-text-muted">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Visual Element - Stats with Context */}
                <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                    {[
                        { value: '$4.2K', label: 'Avg Monthly Savings', context: 'Per client in labor costs' },
                        { value: '10K+', label: 'Hours Saved', context: 'Across all shipped products' },
                        { value: '48h', label: 'Delivery Time', context: 'From kickoff to prototype' },
                        { value: '100%', label: 'Custom Built', context: 'No cookie-cutter solutions' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-6 bg-surface-elevated border border-border-subtle rounded-2xl hover:border-accent/30 transition-colors">
                            <div className="text-3xl md:text-4xl font-black text-accent mb-1">{stat.value}</div>
                            <div className="text-xs font-bold uppercase tracking-wider text-text-muted">{stat.label}</div>
                            <div className="text-[10px] text-text-muted mt-1">{stat.context}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
