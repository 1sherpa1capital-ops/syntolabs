import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Logo from '../components/Logo';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 sm:px-6">
            <div className="max-w-md w-full text-center">
                {/* Logo */}
                <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                    <Logo className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex flex-col -gap-1">
                        <span className="text-xl font-black tracking-tighter text-primary leading-none">SyntoLabs</span>
                        <span className="text-[8px] font-black tracking-[0.2em] text-accent uppercase leading-none mt-0.5">by synto labs</span>
                    </div>
                </Link>

                {/* 404 Display */}
                <div className="mb-8">
                    <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-primary/10 leading-none mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-primary mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-text-muted text-base leading-relaxed">
                        The page you're looking for doesn't exist or has been moved. 
                        Let's get you back on track.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-cta-text px-6 py-3.5 rounded-full font-black text-sm hover:bg-cta-hover transition-colors"
                    >
                        <Home size={16} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-elevated border border-border text-text-default px-6 py-3.5 rounded-full font-bold text-sm hover:bg-muted-bg transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                        Popular Pages
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {[
                            { name: 'Home', to: '/' },
                            { name: 'Agents', to: '/agents' },
                            { name: 'About', to: '/about' },
                            { name: 'Privacy', to: '/privacy' },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="text-sm font-semibold text-text-muted hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
