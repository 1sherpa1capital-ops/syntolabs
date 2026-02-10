import React from 'react';
import { Check, Star, ArrowRight, Zap } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

const PLANS = [
    {
        name: 'Discovery',
        priceRange: '$2,500',
        monthly: 'one-time',
        description: 'Workflow audit with prioritized automation roadmap and ROI projections',
        features: [
            'Complete workflow audit and analysis',
            'Automation opportunity identification',
            'ROI projections with time savings estimates',
            'Implementation roadmap',
            '1-week delivery'
        ],
        bestFor: 'Teams ready to identify automation opportunities',
        featured: false,
        cta: 'Get Started'
    },
    {
        name: 'Implementation',
        priceRange: '$5,000–$10,000',
        monthly: 'one-time',
        description: '1-2 custom agent workflows with integration, training, and 30-day support',
        features: [
            'Discovery + 1-2 agent workflows',
            'Integration with existing tools (CRM, email, calendar)',
            'Team training and documentation',
            'MFR Guardrails for quality assurance',
            '30-day support included',
            '2-3 week delivery'
        ],
        bestFor: 'Businesses ready to deploy their first AI workflows',
        featured: true,
        badge: 'Most Popular',
        cta: 'Get Started'
    },
    {
        name: 'Full Automation',
        priceRange: '$10,000+',
        monthly: 'project',
        description: 'Multi-agent system with custom AI tools and ongoing optimization',
        features: [
            'Discovery + multi-agent system',
            'Custom AI tools (dashboards, chatbots)',
            'Ongoing optimization and updates',
            'Quarterly performance reviews',
            'Priority support',
            '3-4 week delivery'
        ],
        bestFor: 'Companies needing comprehensive AI infrastructure',
        featured: false,
        cta: 'Book Consultation'
    }
];

const Pricing: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="pricing">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-8 md:mb-12 lg:mb-16 max-w-3xl mx-auto">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-4">
                        Investment & Scale
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter text-primary leading-[0.95] mb-3 md:mb-4">
                        ROI-based <span className="text-accent">scale pricing.</span>
                    </h2>
                    <p className="text-sm md:text-base text-text-muted font-medium">Clear, performance-based pricing. Every plan includes our 5x ROI guarantee—if you don't see results in 90 days, we'll work for free until you do.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch max-w-5xl mx-auto">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`bg-surface-elevated rounded-3xl p-6 md:p-8 flex flex-col h-full relative border ${plan.featured ? 'border-accent shadow-xl shadow-accent/10' : 'border-border-subtle'}`}
                        >
                            {plan.featured ? (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-cta-text px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg whitespace-nowrap z-10">
                                    <Star size={10} fill="currentColor" /> {plan.badge}
                                </div>
                            ) : null}

                            {/* Plan Name */}
                            <div className="text-xs font-bold uppercase tracking-widest text-accent mb-4 italic">
                                {plan.name}
                            </div>

                            {/* Price Display */}
                            <div className={`rounded-2xl p-6 mb-6 ${plan.featured ? 'bg-gradient-to-br from-accent/20 to-accent/5' : 'bg-muted-bg'}`}>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
                                        {plan.priceRange}
                                    </span>
                                    {plan.monthly && (
                                        <span className="text-base font-medium text-text-muted">/{plan.monthly}</span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm font-medium text-text-default mb-4">
                                {plan.description}
                            </p>

                            {/* Best For */}
                            <p className="text-xs text-text-muted mb-6 italic">
                                {plan.bestFor}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex gap-2.5 items-start text-sm text-text-default">
                                        <div className="mt-0.5 p-0.5 rounded bg-accent/10 text-accent">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full py-3.5 rounded-full font-bold text-sm transition-all text-center block ${plan.featured ? 'bg-accent text-cta-text hover:bg-cta-hover' : 'border-2 border-border text-text-default hover:border-primary hover:text-primary'}`}
                            >
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/5 rounded-full text-sm font-semibold text-primary border border-accent/10">
                        <Zap size={16} className="text-accent" />
                        All plans include 72-hour deployment • Enterprise SLAs available
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
