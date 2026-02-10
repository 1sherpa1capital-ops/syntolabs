import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import Logo from './Logo';
import { useTryNowModal } from '../context/TryNowModalContext';
import { BOOKING_URL } from '../config/constants';
import WaitlistSection from './WaitlistSection';

interface FooterProps {
    onOpenTeam?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenTeam }) => {
    const currentYear = new Date().getFullYear();
    const { openModal } = useTryNowModal();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        message: ''
    });

    const links = [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Contact', href: 'mailto:rhigden@syntolabs.xyz' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form is presentational - no actual submission logic
        console.log('Form submitted:', formData);
    };

    return (
        <footer>
            <section className="px-4 sm:px-6 md:px-12 py-6 md:py-8 bg-bg">
                {/* CTA Banner replaced with Waitlist */}
                <div className="rounded-xl overflow-hidden mb-6 md:mb-8">
                    <WaitlistSection id="footer-waitlist" className="rounded-xl" />
                </div>

                {/* Contact Section - Let's Talk! */}
                <div className="container-wide mb-12 md:mb-16">
                    <div className="bg-surface-elevated rounded-2xl border border-border p-8 md:p-12 lg:p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Left Column - Email Contact */}
                            <div className="flex flex-col justify-center">
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-primary mb-4">
                                    Get Your Free Workflow Audit
                                </h3>
                                <p className="text-text-muted text-base md:text-lg mb-8 max-w-md">
                                    Ready to see how much time your team spends on repetitive tasks? We'll analyze your workflows and show you exactly where AI automation can save you 15+ hours per week.
                                </p>
                                
                                <div className="space-y-6">
                                    <a 
                                        href="mailto:rhigden@syntolabs.xyz"
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-muted-bg border border-border-subtle hover:border-primary/30 transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Mail size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">Email us directly</p>
                                            <p className="text-lg font-bold text-primary">rhigden@syntolabs.xyz</p>
                                        </div>
                                    </a>
                                    
                                    <div className="flex items-center gap-2 text-sm text-text-muted">
                                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                        <span>Typically responds within 24 hours</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Contact Form */}
                            <div>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-default placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-default placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="website" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2">
                                            Company Website
                                        </label>
                                        <input
                                            type="url"
                                            id="website"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="https://yourcompany.com"
                                            className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-default placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Tell us about your business and what challenges you're facing..."
                                            rows={4}
                                            className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-default placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                        />
                                    </div>

                                     <button
                                        type="submit"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-dark text-text-on-primary px-8 py-4 rounded-lg font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                                    >
                                        <Send size={16} />
                                        Book Free Strategy Call
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6 py-6 md:py-8">
                    <div className="flex items-center gap-3">
                        <Logo className="w-8 h-8 text-primary" />
                        <div className="flex flex-col -gap-0.5">
                            <span className="text-2xl font-black tracking-tighter text-primary leading-none">SyntoLabs</span>
                        </div>
                    </div>
                    <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8" aria-label="Footer navigation">
                        {onOpenTeam && (
                            <button
                                onClick={onOpenTeam}
                                className="text-xs font-black text-text-muted hover:text-primary tracking-[0.2em] uppercase transition-colors"
                            >
                                About Team
                            </button>
                        )}
                        {links.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs font-black text-text-muted hover:text-primary tracking-[0.2em] uppercase transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <p className="text-xs text-text-muted">
                        © {currentYear} Synto Labs. All rights reserved.
                    </p>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
