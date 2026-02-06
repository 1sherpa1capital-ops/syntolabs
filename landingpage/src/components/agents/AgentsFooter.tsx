import React from 'react';
import Logo from '../Logo';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentsFooter: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-6 md:py-8 bg-bg">
            {/* Final CTA Container */}
            <div className="section-padding bg-primary rounded-xl overflow-hidden mb-6 md:mb-8 relative">
                <div className="absolute inset-0 bg-grid-subtle opacity-[0.05] invert pointer-events-none" aria-hidden="true" />

                <div className="container-wide relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-[10px] font-black uppercase tracking-widest mb-6 border border-accent/20">
                            <Sparkles size={12} aria-hidden="true" />
                            B2B Agent Automation
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black tracking-tighter text-white leading-[0.85] mb-6 md:mb-8">
                            Deploy your <br className="hidden sm:block" />
                            <span className="text-accent">autonomous swarm.</span>
                        </h2>
                        <p className="text-sm md:text-base lg:text-lg text-white/70 font-medium mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed">
                            Launch a parallel workforce of specialized agents in under 72 hours. Automate research, proposal generation, enrichment, and outreach with precision logic and infinite scale.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                            <a
                                href="https://calendly.com/syntolabs/synto-labs-discovery-call"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-accent hover:bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-black transition-all shadow-lg shadow-black/20 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                            >
                                <Sparkles size={16} aria-hidden="true" />
                                Schedule Strategy Call
                            </a>
                            <Link
                                to="/"
                                className="border-2 border-white/20 hover:border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-black transition-all w-full sm:w-auto inline-flex items-center justify-center gap-2"
                            >
                                Explore Voice AI
                                <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Shell */}
            <footer className="py-6 md:py-8 px-4 md:px-6">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <Link to="/agents" className="flex items-center gap-3 group cursor-pointer">
                        <Logo className="w-8 h-8 text-primary" />
                        <div className="flex flex-col -gap-1">
                            <span className="text-2xl font-black tracking-tighter text-primary leading-none">Synto</span>
                            <span className="text-[9px] font-black tracking-[0.2em] text-accent uppercase leading-none mt-1">Agent Swarm</span>
                        </div>
                    </Link>

                    <div className="text-xs font-black tracking-[0.3em] text-gray-400 uppercase">
                        © 2026 Syntolabs • B2B Automation Infrastructure
                    </div>


                </div>
            </footer>
        </section>
    );
};

export default AgentsFooter;
