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
        <section id={id} className={`py-16 md:py-24 bg-black relative overflow-hidden ${className}`}>
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black opacity-50" />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
                        Limited Capacity
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        Secure Your Spot.
                    </h2>
                    
                    <p className="text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
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
                                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-36 text-white placeholder:text-white/20 focus:outline-none focus:border-[#f97316]/50 focus:bg-white/10 transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status !== 'idle' || !email}
                                className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-[#f97316] hover:bg-orange-600 text-white font-bold text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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
                                className="absolute -bottom-12 left-0 right-0 text-emerald-500 text-sm font-medium"
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
