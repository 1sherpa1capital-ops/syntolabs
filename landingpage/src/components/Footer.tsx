import React from 'react';
import { Mail, Send } from 'lucide-react';
import Logo from './Logo';
import { BOOKING_URL } from '../config/constants';
import WaitlistSection from './WaitlistSection';

interface FooterProps {
    onOpenTeam?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenTeam }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/5 pt-32 pb-16">
            <div className="container-wide">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-48">
                    <div className="max-w-xl">
                        <h3 className="text-display mb-12">
                            Ready to <br />
                            <span className="text-gradient">automate?</span>
                        </h3>
                        <p className="text-xl text-white/50 mb-16 font-medium">
                            Scale your business without increasing overhead. Let our agents handle the noise while you focus on the future.
                        </p>
                        
                        <a 
                            href="mailto:rhigden@syntolabs.xyz"
                            className="group inline-flex items-center gap-6 p-1 border-b border-white/20 hover:border-white transition-all pb-4"
                        >
                            <span className="text-2xl font-black text-white">rhigden@syntolabs.xyz</span>
                            <Send size={24} className="text-white/40 group-hover:text-white transition-colors" />
                        </a>
                    </div>

                    <div className="bg-zinc-950 border border-white/5 p-12">
                        <div className="label-mono mb-12">Join the Future</div>
                        <WaitlistSection id="footer-waitlist" className="bg-transparent" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-16 border-t border-white/5">
                    <div className="flex items-center gap-4 group">
                        <Logo className="w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="text-lg font-black tracking-tighter text-white/40 group-hover:text-white transition-colors">SyntoLabs</span>
                    </div>
                    
                    <nav className="flex flex-wrap items-center justify-center gap-12">
                        {onOpenTeam && (
                            <button
                                onClick={onOpenTeam}
                                className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
                            >
                                About Team
                            </button>
                        )}
                        <a href="/privacy" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">Privacy</a>
                        <a href="/terms" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">Terms</a>
                    </nav>

                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                        © {currentYear} Synto Labs
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
