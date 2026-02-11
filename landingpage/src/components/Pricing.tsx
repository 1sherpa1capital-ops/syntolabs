import React from 'react';
import { Check, Star, ArrowRight, Zap } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

const PLANS = [
    {
        name: 'Discovery',
        price: '$2,500',
        term: 'one-time',
        description: 'Workflow audit with prioritized automation roadmap.',
        features: [
            'Complete workflow audit',
            'ROI projections',
            'Implementation roadmap',
            '1-week delivery'
        ],
        cta: 'Get Started'
    },
    {
        name: 'Implementation',
        price: '$5,000+',
        term: 'one-time',
        description: 'Custom agent workflows with full integration.',
        features: [
            '1-2 custom agent workflows',
            'Full tool integration',
            'Team training',
            '30-day support',
            '2-week delivery'
        ],
        featured: true,
        cta: 'Get Started'
    },
    {
        name: 'Infrastructure',
        price: '$10,000+',
        term: 'project',
        description: 'Full multi-agent systems and ongoing optimization.',
        features: [
            'Multi-agent ecosystem',
            'Custom AI tools',
            'Ongoing optimization',
            'Priority support',
            '4-week delivery'
        ],
        cta: 'Book Call'
    }
];

const Pricing: React.FC = () => {
    return (
        <section className="container-wide section-padding bg-black border-t border-white/5" id="pricing">
            <div className="text-center mb-24">
                <div className="label-mono mb-8">Investment</div>
                <h2 className="text-heading mb-8">
                    Value-driven <br />
                    <span className="text-gradient">pricing.</span>
                </h2>
                <p className="text-xl text-white/50 max-w-2xl mx-auto">
                    Clear, results-based pricing for high-performance AI integration.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                {PLANS.map((plan, idx) => (
                    <div
                        key={plan.name}
                        className={`p-12 md:p-16 flex flex-col h-full bg-black transition-all duration-700 hover:bg-zinc-950 group ${plan.featured ? 'z-10 ring-1 ring-white/20' : ''}`}
                    >
                        <div className="label-mono mb-12 group-hover:text-white transition-colors">{plan.name}</div>
                        
                        <div className="mb-12">
                            <div className="text-6xl font-black text-white tracking-tighter mb-2">{plan.price}</div>
                            <div className="text-xs uppercase tracking-widest text-white/30">{plan.term}</div>
                        </div>

                        <p className="text-base text-white/60 mb-12 leading-relaxed h-12">
                            {plan.description}
                        </p>

                        <ul className="space-y-6 mb-16 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex gap-4 items-center text-sm text-white/70">
                                    <div className="w-1 h-1 bg-white/40 group-hover:bg-white transition-colors" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full py-5 font-black text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center gap-3 ${plan.featured ? 'bg-white text-black' : 'border border-white/10 text-white hover:bg-white hover:text-black'}`}
                        >
                            {plan.cta} <ArrowRight size={14} />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pricing;
