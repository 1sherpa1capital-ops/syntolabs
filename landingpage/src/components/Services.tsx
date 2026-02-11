import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

interface Service {
    id: number;
    title: string;
    price: string;
    description: string;
    features: string[];
}

const services: Service[] = [
    {
        id: 1,
        title: 'Workflow Discovery',
        price: '$2,500',
        description: 'Audit processes, identify automation opportunities, ROI roadmap.',
        features: ['Complete workflow audit', 'Automation opportunities identified', 'ROI projections', 'Implementation roadmap']
    },
    {
        id: 2,
        title: 'Multi-Agent Sales Automation',
        price: '$5,000+',
        description: 'Scout → Research → Writer → Sender agent workflows. Full integration with CRM/Email.',
        features: ['Scout → Research → Writer → Sender', 'CRM and email integration', 'Team training', '30-day support']
    },
    {
        id: 3,
        title: 'Custom AI Tools',
        price: '$5,000+',
        description: 'Bespoke dashboards, chatbots, and automation tools tailored to your workflows.',
        features: ['Custom dashboards', 'Chatbot development', 'Automation tools', 'API integrations']
    },
    {
        id: 4,
        title: 'Voice AI/Phone Agents',
        price: '$7,500+',
        description: 'Inbound qualification and outbound follow-up calls with natural conversation.',
        features: ['Inbound call handling', 'Outbound follow-ups', 'Intent detection', 'CRM integration']
    }
];

const Services: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-surface" id="services">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Our Services
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-dark mb-4">
                        Custom automation, <span className="text-gradient">built to order.</span>
                    </h2>
                    <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
                        We don't sell pre-packaged software. Every workflow is designed around your unique processes, tools, and goals. Choose your starting point.
                    </p>
                </div>

                {/* How We Work Process */}
                <div className="mb-12 bg-bg rounded-2xl p-8 border border-border">
                    <h3 className="text-xl font-black text-dark mb-6">How We Work</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-black text-accent mb-2">1</div>
                            <div className="text-sm font-bold mb-1">Discovery</div>
                            <p className="text-text-muted text-sm">Audit your workflows, identify opportunities</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-accent mb-2">2</div>
                            <div className="text-sm font-bold mb-1">Prototype</div>
                            <p className="text-text-muted text-sm">Build working agent in 48 hours</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-accent mb-2">3</div>
                            <div className="text-sm font-bold mb-1">Build</div>
                            <p className="text-text-muted text-sm">Full deployment with training</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-accent mb-2">4</div>
                            <div className="text-sm font-bold mb-1">Optimize</div>
                            <p className="text-text-muted text-sm">Continuous improvement cycles</p>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
                    {services.map((service) => (
                        <div key={service.id} className="card-feature flex flex-col h-full group bg-surface">
                            {/* Title and Price */}
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
