import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { ArrowLeft, Sparkles } from 'lucide-react';

const AgentsHeader: React.FC = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-8 left-0 right-0 z-[2000] px-6 md:px-12 flex justify-center">
            <div className="flex items-center gap-4 md:gap-6">
                {/* Back to Main Site */}
                <Link
                    to="/"
                    className="hidden md:flex items-center gap-2 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full px-4 py-2 h-10 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all"
                >
                    <ArrowLeft size={14} aria-hidden="true" />
                    Voice AI
                </Link>

                {/* Logo Pill */}
                <Link
                    to="/agents"
                    className="px-2 h-14 flex items-center gap-3 cursor-pointer group"
                    aria-label="Synto Agent Swarm - Home"
                >
                    <Logo className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex flex-col -gap-1">
                        <span className="text-xl font-black tracking-tighter text-primary leading-none">Synto</span>
                        <span className="text-[8px] font-black tracking-[0.2em] text-accent uppercase leading-none mt-0.5">Agent Swarm</span>
                    </div>
                </Link>

                {/* Center: Navigation Pill */}
                <nav 
                    className="hidden lg:flex items-center bg-bg/80 backdrop-blur-xl border border-gray-200 shadow-sm rounded-full px-3 py-1.5 h-14"
                    aria-label="Agent swarm navigation"
                >
                    {[
                        { name: 'Agents', action: () => scrollToSection('agents-grid') },
                        { name: 'Demo', action: () => scrollToSection('demo-section') },
                        { name: 'MFR', action: () => scrollToSection('mfr-section') },
                    ].map((link) => (
                        <button
                            key={link.name}
                            onClick={link.action}
                            className="px-5 h-full flex items-center text-[11px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>

                {/* Right: CTA Pill */}
                <a
                    href="https://calendly.com/syntolabs/synto-labs-discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent hover:bg-primary text-black hover:text-white px-5 md:px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
                >
                    <Sparkles size={14} aria-hidden="true" />
                    <span className="hidden sm:inline">Book Demo</span>
                </a>
            </div>
        </header>
    );
};

export default AgentsHeader;
