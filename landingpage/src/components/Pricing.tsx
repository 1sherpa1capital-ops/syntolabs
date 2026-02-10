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
        <section className="section-padding bg-surface relative" id="pricing">
            {/* Background grid */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 relative">
                <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
                    <div className="label-mono text-accent mb-4 animate-reveal">
                        Investment & Scale
                    </div>
                    <h2 className="text-heading mb-4 animate-reveal" style={{ animationDelay: '0.1s' }}>
                        ROI-based <span className="text-gradient">scale pricing.</span>
                    </h2>
                    <p className="text-base text-text-muted font-medium animate-reveal" style={{ animationDelay: '0.2s' }}>
                        Clear, performance-based pricing. Every plan includes our 5x ROI guarantee—if you don't see results in 90 days, we'll work for free until you do.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch max-w-5xl mx-auto">
                    {PLANS.map((plan, idx) => (
                        <div
                            key={plan.name}
                            className={`card-feature rounded-3xl p-6 md:p-8 flex flex-col h-full relative ${plan.featured ? 'border-accent/50' : ''} animate-reveal`}
                            style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                        >
                            {plan.featured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-text-on-accent px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg whitespace-nowrap z-10">
                                    <Star size={10} fill="currentColor" /> {plan.badge}
                                </div>
                            )}

                            {/* Plan Name */}
                            <div className="label-mono text-accent mb-4 italic">
                                {plan.name}
                            </div>

                            {/* Price Display */}
                            <div className={`rounded-2xl p-6 mb-6 ${plan.featured ? 'bg-accent/10' : 'bg-muted-bg'}`}>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
                                        {plan.priceRange}
                                    </span>
                                    {plan.monthly && (
                                        <span className="text-sm font-medium text-text-muted">/{plan.monthly}</span>
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
                                        <div className="mt-0.5 p-0.5 rounded bg-accent/10 text-accent flex-shrink-0">
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
                                className={`w-full py-3.5 rounded-full font-bold text-sm transition-all text-center block flex items-center justify-center gap-2 ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {plan.cta}
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center animate-reveal" style={{ animationDelay: '0.7s' }}>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/5 rounded-full text-sm font-semibold text-primary border border-accent/10">
                        <Zap size={16} className="text-accent" />
                        All plans include 48-hour delivery • Enterprise SLAs available
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
