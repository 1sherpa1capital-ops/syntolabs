import React from 'react';
import { Search, Bot, Zap, ArrowRight, Workflow } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

interface Service {
    id: number;
    title: string;
    price: string;
    description: string;
    icon: React.ElementType;
    features: string[];
}

const services: Service[] = [
    {
        id: 1,
        title: 'Workflow Discovery',
        price: '$2,500',
        description: 'We find the busywork eating your team\'s time. You get a prioritized automation roadmap with ROI projections.',
        icon: Search,
        features: ['Complete workflow audit', 'Automation opportunities', 'ROI projections', 'Implementation roadmap']
    },
    {
        id: 2,
        title: 'Agent Implementation',
        price: '$5K–$10K',
        description: 'We build custom agents. MFR Guardrails prevent hallucinations. Integrated with your existing tools. Delivered in 48 hours.',
        icon: Bot,
        features: ['1-2 custom agent workflows', 'CRM, email, calendar integration', 'Team training & documentation', '30-day support included']
    },
    {
        id: 3,
        title: 'Full Automation',
        price: '$10K+',
        description: 'Full multi-agent infrastructure. Continuous optimization. Complete AI stack for teams ready to scale.',
        icon: Zap,
        features: ['Multi-agent system', 'Custom AI dashboards & tools', 'Quarterly performance reviews', 'Priority support']
    }
];

const Services: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-surface" id="services">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-medium mb-4">
                        <Workflow size={12} />
                        Our Services
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-dark mb-4">
                        Three ways to <span className="text-gradient">get started</span>
                    </h2>
                    <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
                        Choose the level of engagement that fits your needs. Every solution is custom-built with MFR Guardrails
                        for quality assurance and integrated with your existing tools.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="card-feature flex flex-col h-full group">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                <service.icon size={28} className="text-accent" />
                            </div>

                            {/* Title & Price */}
                            <h3 className="text-xl font-black text-dark mb-1">{service.title}</h3>
                            <div className="text-2xl font-black text-gradient mb-4">{service.price}</div>

                            {/* Description */}
                            <p className="text-sm text-text-muted leading-relaxed mb-6 flex-1">
                                {service.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-primary">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-double-layer-outline inline-flex items-center gap-2"
                            >
                                Get Started
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
