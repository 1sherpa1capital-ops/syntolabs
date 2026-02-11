import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const WaitlistSection: React.FC<{ className?: string; id?: string }> = ({ className = '', id = 'waitlist' }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1000);
    };

    return (
        <section id={id} className={`py-24 bg-bg relative overflow-hidden ${className}`}>
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface-elevated/50 via-bg to-bg opacity-50" />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 text-text-muted text-xs font-medium uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Limited Capacity
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-text-default tracking-tight mb-6">
                        Secure Your Spot.
                    </h2>
                    
                    <p className="text-xl text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
                        We accept 4 clients per month to ensure quality.
                        <br className="hidden sm:block" />
                        Join the waitlist to get early access.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="work@email.com"
                                disabled={status === 'success'}
                                className="w-full bg-surface border border-white/10 rounded-full py-4 pl-6 pr-36 text-text-default placeholder:text-text-dim focus:outline-none focus:border-accent/50 focus:bg-surface-elevated transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status !== 'idle' || !email}
                                className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-accent hover:bg-cta-hover text-text-on-accent font-bold text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {status === 'loading' ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : status === 'success' ? (
                                    <>
                                        <Check size={16} />
                                        <span>Joined</span>
                                    </>
                                ) : (
                                    <>
                                        Join
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-12 left-0 right-0 text-primary text-sm font-medium"
                            >
                                You're on the list. We'll be in touch.
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default WaitlistSection;
