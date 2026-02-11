import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

const PLANS = [
    {
        name: 'Discovery',
        price: '$2,500',
        term: 'one-time',
        description: 'Workflow audit with prioritized automation roadmap. Typically recovers $15K+ in first 90 days.',
        features: [
            'Complete workflow audit',
            'ROI projections',
            'Implementation roadmap',
            '1-week delivery'
        ],
        cta: 'Start Discovery'
    },
    {
        name: 'Professional',
        price: '$5,000',
        term: 'one-time',
        description: 'Custom agent workflows with full integration. Most clients see 5x ROI within 90 days.',
        features: [
            '1-2 custom agent workflows',
            'Full tool integration',
            'Team training',
            '30-day support',
            '2-week delivery'
        ],
        featured: true,
        cta: 'Book Professional'
    },
    {
        name: 'Enterprise',
        price: '$10,000+',
        term: 'project',
        description: 'Full multi-agent systems with unlimited scaling for enterprise teams.',
        features: [
            'Multi-agent ecosystem',
            'Custom AI tools',
            'Ongoing optimization',
            'Priority support',
            '4-week delivery'
        ],
        cta: 'Contact Enterprise'
    }
];

const Pricing: React.FC = () => {
    return (
        <section className="container-wide section-padding bg-black border-t border-white/5" id="pricing">
            <div className="text-center mb-24">
                <div className="label-mono mb-8">Investment</div>
                <h2 className="text-heading mb-8">
                    Pricing that <br />
                    <span className="text-gradient">pays for itself.</span>
                </h2>
                <p className="text-xl text-white/50 max-w-2xl mx-auto">
                    Every plan includes 72-hour deployment. If you don't see measurable results in 90 days, we work for free until you do.
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
                            className={`w-full py-5 font-black text-xs uppercase tracking-widest text-center flex items-center justify-center gap-3 ${
                                plan.featured ? 'btn-double-layer' : 'btn-double-layer-outline'
                            }`}
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
