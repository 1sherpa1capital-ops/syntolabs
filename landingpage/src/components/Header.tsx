import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTryNowModal } from '../context/TryNowModalContext';
import Logo from './Logo';

import { BOOKING_URL } from '../config/constants';

interface HeaderProps {
    onOpenTeam: () => void;
}

interface NavLink {
    name: string;
    href?: string;
    to?: string;
    onClick?: () => void;
}

const navLinks: NavLink[] = [
    { name: 'About', href: '#problem' },
    { name: 'Services', href: '#services' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
];

const Header: React.FC<HeaderProps> = ({ onOpenTeam }) => {
    const { openModal } = useTryNowModal();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    const handleNavClick = (link: NavLink, e: React.MouseEvent) => {
        if (link.href && location.pathname !== '/') {
            e.preventDefault();
            navigate('/' + link.href);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Skip to main content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[3000] focus:px-4 focus:py-2 focus:bg-accent focus:text-cta-text focus:rounded-lg focus:font-bold focus:ring-2 focus:ring-primary"
            >
                Skip to main content
            </a>

            <header className="fixed top-4 sm:top-8 left-0 right-0 z-[2000] px-4 sm:px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    {/* Left: Logo Pill */}
                    <Link
                        to="/"
                        className="px-2 h-14 flex items-center gap-3 cursor-pointer group"
                        aria-label="SyntoLabs - Home"
                    >
                        <Logo className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <div className="flex flex-col -gap-1">
                            <span className="text-xl font-black tracking-tighter text-primary leading-none">SyntoLabs</span>
                        </div>
                    </Link>

                    {/* Center: Navigation Pill - Desktop */}
                    <nav 
                        className="hidden lg:flex items-center bg-bg/80 backdrop-blur-xl border border-border shadow-sm rounded-full px-3 py-1.5 h-14 absolute left-1/2 -translate-x-1/2"
                        aria-label="Main navigation"
                    >
                        {navLinks.map((link: NavLink) => (
                            link.onClick ? (
                                <button
                                    key={link.name}
                                    onClick={link.onClick}
                                    className="px-5 h-full flex items-center text-[11px] font-black uppercase tracking-widest text-primary/60 hover:text-accent transition-colors"
                                >
                                    {link.name}
                                </button>
                            ) : link.to ? (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    className={`px-5 h-full flex items-center text-[11px] font-black uppercase tracking-widest transition-colors ${location.pathname === link.to ? 'text-accent' : 'text-primary/60 hover:text-primary'}`}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(link, e)}
                                    className="px-5 h-full flex items-center text-[11px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </nav>

                    {/* Right: CTA Buttons + Mobile Menu Toggle */}
                    <div className="flex items-center gap-2">
                        {/* CTA Buttons - Desktop/Tablet */}
                        <div className="hidden sm:flex items-center bg-bg/80 backdrop-blur-xl border border-border shadow-sm rounded-full p-1.5 h-14">
                            <button
                                onClick={openModal}
                                className="px-6 h-full flex items-center text-[11px] font-black uppercase tracking-widest text-primary hover:text-accent transition-colors rounded-full bg-surface-elevated shadow-sm"
                            >
                                Hear It Live
                            </button>
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-double-layer flex px-6 h-full items-center ml-1.5"
                            >
                                Book Demo
                            </a>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-bg/80 backdrop-blur-xl border border-border shadow-sm rounded-full"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMobileMenuOpen ? (
                                <X size={20} className="text-primary" aria-hidden="true" />
                            ) : (
                                <Menu size={20} className="text-primary" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[1999] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
                    isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <nav
                id="mobile-menu"
                className={`fixed top-0 right-0 bottom-0 z-[2001] w-full max-w-sm bg-surface-elevated shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                aria-label="Mobile navigation"
                aria-hidden={!isMobileMenuOpen}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <Link
                            to="/"
                            className="flex items-center gap-3"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Logo className="w-8 h-8 text-primary" />
                            <span className="text-lg font-black tracking-tighter text-primary">SyntoLabs</span>
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted-bg transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={20} className="text-primary" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Mobile Nav Links */}
                    <div className="flex-1 overflow-y-auto py-6">
                        <ul className="space-y-1 px-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    {link.to ? (
                                        <Link
                                            to={link.to}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                                                location.pathname === link.to
                                                    ? 'bg-accent/10 text-accent'
                                                    : 'text-primary hover:bg-muted-bg'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleNavClick(link, e)}
                                            className="block px-4 py-3 rounded-xl text-base font-bold text-primary hover:bg-muted-bg transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    )}
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => {
                                        onOpenTeam();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-primary hover:bg-muted-bg transition-colors"
                                >
                                    About Team
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu Footer - CTAs */}
                    <div className="p-6 border-t border-border space-y-3">
                        <button
                            onClick={() => {
                                openModal();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-surface-elevated border border-border text-primary font-bold text-sm hover:bg-muted-bg transition-colors"
                        >
                            Hear It Live
                        </button>
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-accent text-cta-text font-black text-sm hover:bg-cta-hover transition-colors"
                        >
                            Book Demo
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
