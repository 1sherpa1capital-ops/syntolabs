import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

const PLANS = [
    {
        name: 'Discovery Prototype',
        tierLabel: 'Tier 1',
        price: '$2,500',
        term: 'one-time',
        description: 'Detailed Audit + Working Prototype. Prove value in 48 hours.',
        features: [
            'Complete workflow audit',
            'Working prototype (1 agent)',
            'ROI projections',
            'Implementation roadmap'
        ],
        deliverable: 'Working prototype + ROI roadmap',
        timeline: '48 hours',
        example: '"Client had a working lead research agent by day 2"',
        cta: 'Start Discovery'
    },
    {
        name: 'Production Implementation',
        tierLabel: 'Tier 2',
        price: '$5,000',
        term: 'one-time',
        description: 'Full Multi-Agent System (Scout → Research → Writer). Integration + Training + 30-day Support.',
        features: [
            'Multi-agent system (3+ agents)',
            'CRM/Email integration',
            'Team training and documentation',
            '30-day support included'
        ],
        deliverable: 'Full 3-agent system deployed',
        timeline: '2-3 weeks',
        example: '"Client automated 80% of outreach within 4 weeks"',
        featured: true,
        cta: 'Book Implementation'
    },
    {
        name: 'Full Automation Ecosystem',
        tierLabel: 'Tier 3',
        price: '$10,000+',
        term: 'project',
        description: 'Complex system with multiple workflows, custom UI, Voice AI. Ongoing optimization included.',
        features: [
            'Multi-agent ecosystem',
            'Custom AI dashboards',
            'Voice AI capabilities',
            'Quarterly performance reviews',
            'Priority support'
        ],
        deliverable: 'Multi-workflow system with custom UI',
        timeline: '3-6 weeks',
        example: '"Client replaced 3 FTEs with agent workflows"',
        cta: 'Contact Us'
    }
];

const Pricing: React.FC = () => {
    return (
        <section className="container-wide section-padding bg-black border-t border-white/5" id="pricing">
            <div className="text-center mb-24">
                <div className="label-mono mb-8">Investment</div>
                <h2 className="text-heading mb-8">
                    Custom work,<br />
                    <span className="text-gradient">clear pricing.</span>
                </h2>
                <p className="text-xl text-white/50 max-w-2xl mx-auto">
                    Every project is built around your needs. We don't sell subscriptions or pre-packaged software—you own what we build.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                {PLANS.map((plan, idx) => (
                    <div
                        key={plan.name}
                        className={`p-12 md:p-16 flex flex-col h-full bg-black transition-all duration-700 hover:bg-zinc-950 group ${plan.featured ? 'z-10 ring-1 ring-white/20' : ''}`}
                    >
                        <div className="mb-12">
                            <div className="label-mono mb-2 group-hover:text-white transition-colors">{plan.tierLabel}</div>
                            <div className="text-2xl font-black text-white mb-2">{plan.name}</div>
                            <div className="text-6xl font-black text-white tracking-tighter mb-2">{plan.price}</div>
                            <div className="text-xs uppercase tracking-widest text-white/30">{plan.term}</div>
                        </div>

                        <p className="text-base text-white/60 mb-12 leading-relaxed h-12">
                            {plan.description}
                        </p>

                        {/* Outcome Info */}
                        <div className="mb-8 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-accent font-bold">Deliverable:</span>
                                <span className="text-white/70">{plan.deliverable}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-white/40">Timeline:</span>
                                <span className="text-white/70">{plan.timeline}</span>
                            </div>
                        </div>

                        <ul className="space-y-6 mb-16 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex gap-4 items-center text-sm text-white/70">
                                    <div className="w-1 h-1 bg-white/40 group-hover:bg-white transition-colors" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Example Result */}
                        <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-sm text-white/50 italic">{plan.example}</p>
                        </div>

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
