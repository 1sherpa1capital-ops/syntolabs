import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { BOOKING_URL } from '../config/constants';

interface HeaderProps {
    onOpenTeam: () => void;
}

interface NavLink {
    name: string;
    href?: string;
    to?: string;
}

const navLinks: NavLink[] = [
    { name: 'Problem', href: '#problem' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', to: '/about' },
];

const Header: React.FC<HeaderProps> = ({ onOpenTeam }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-8 px-6 md:px-12">
            <div className={`max-w-[1400px] mx-auto flex items-center justify-between transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border border-white/10 p-4 px-8' : 'bg-transparent p-0'}`}>
                <Link to="/" className="flex items-center gap-4 group">
                    <Logo className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                    <span className="text-xl font-black tracking-tighter text-white">SyntoLabs</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link) => (
                        link.to ? (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
                            >
                                {link.name}
                            </a>
                        )
                    ))}
                    <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors"
                    >
                        Book Demo
                    </a>
                </nav>

                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-white p-2"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-12 lg:hidden">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href || link.to}
                            className="text-2xl font-black uppercase tracking-[0.4em] text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a 
                        href={BOOKING_URL}
                        className="text-2xl font-black uppercase tracking-[0.4em] text-white border-b-2 border-white"
                    >
                        Book Demo
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
