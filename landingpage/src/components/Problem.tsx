import React from 'react';
import { ArrowRight, Link } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

const Problem: React.FC = () => {
    const stats = [
        { label: 'Time Wasted Weekly', value: '15+ hrs', desc: 'Average time teams spend on repetitive manual tasks that could be automated.' },
        { label: 'Cost of Busywork', value: '$2K/mo', desc: 'Monthly cost of manual work at $30/hr—money that could be reinvested.' },
        { label: 'Error Rate', value: '5-10%', desc: 'Human error rate in repetitive data entry that AI eliminates completely.' },
        { label: 'Growth Opportunity', value: '3x', desc: 'Potential productivity multiplier when your team focuses on high-value work.' }
    ];

    return (
        <section className="container-wide section-padding bg-black" id="problem">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
                <div className="lg:sticky lg:top-48">
                    <div className="label-mono mb-8">The Challenge</div>
                    <h2 className="text-display mb-12">
                        Your team is <br />
                        drowning in <br />
                        <span className="text-gradient">busywork.</span>
                    </h2>

                    <div className="space-y-8 text-xl text-white/60 font-medium leading-relaxed max-w-xl">
                        <p>
                            Data entry. Report generation. Email sorting. <span className="text-white">Your best people spend 15+ hours/week on tasks that don't require human judgment.</span>
                        </p>
                        <p>
                            As you grow, so does the administrative burden. We stop the cycle by deploying custom AI agents that handle the mundane.
                        </p>

                        <div className="pt-8">
                            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary group">
                                Start Audit <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="group p-10 border border-white/5 bg-zinc-950 transition-all duration-700 hover:border-white/20">
                            <div className="flex justify-between items-start mb-8">
                                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors">
                                    {stat.label}
                                </div>
                                <div className="p-2 border border-white/10 rounded-full">
                                    <Link size={12} className="text-white/40" />
                                </div>
                            </div>

                            <div className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
                                {stat.value}
                            </div>

                            <p className="text-sm text-white/50 leading-relaxed max-w-md">
                                {stat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problem;
