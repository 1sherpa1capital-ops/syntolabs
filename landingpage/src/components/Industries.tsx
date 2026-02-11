import React from 'react';
import { Briefcase, ShoppingCart, HeartPulse, Code, Megaphone, Building2, ArrowRight } from 'lucide-react';

const industries = [
    {
        icon: Briefcase,
        name: 'Professional Services',
        desc: 'Accounting, legal, and consulting firms automating client onboarding, document processing, and reporting workflows.',
        useCases: ['Client intake automation', 'Report generation', 'Document processing'],
        gradient: 'blue'
    },
    {
        icon: ShoppingCart,
        name: 'E-commerce & Retail',
        desc: 'Online stores and retail chains streamlining inventory management, customer service, and order processing.',
        useCases: ['Inventory tracking', 'Customer support', 'Order automation'],
        gradient: 'teal'
    },
    {
        icon: HeartPulse,
        name: 'Healthcare & Wellness',
        desc: 'Medical practices and wellness businesses automating appointment scheduling, patient follow-ups, and record management.',
        useCases: ['Appointment booking', 'Patient reminders', 'Data entry'],
        gradient: 'blue'
    },
    {
        icon: Code,
        name: 'Technology & SaaS',
        desc: 'Tech companies and startups automating user onboarding, data analysis, and internal tooling workflows.',
        useCases: ['User onboarding', 'Data analysis', 'Internal tools'],
        gradient: 'teal'
    },
    {
        icon: Megaphone,
        name: 'Marketing & Creative',
        desc: 'Agencies and creative teams automating content workflows, client reporting, and campaign management.',
        useCases: ['Content workflows', 'Client reporting', 'Campaign tracking'],
        gradient: 'blue'
    },
    {
        icon: Building2,
        name: 'Real Estate & Property',
        desc: 'Property managers and agents automating lead qualification, viewing schedules, and tenant communications.',
        useCases: ['Lead qualification', 'Schedule coordination', 'Tenant comms'],
        gradient: 'teal'
    }
];

const Industries: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-surface" id="industries">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 lg:mb-16 gap-4 md:gap-6">
                    <div className="max-w-4xl">
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-3 md:mb-4">Industry Solutions</div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-dark leading-[0.95] mb-3 md:mb-4">
                            AI automation for <br className="hidden sm:block" />
                            <span className="text-accent">every industry.</span>
                        </h2>
                        <p className="text-sm md:text-base text-text-muted font-medium">
                            From professional services to e-commerce, we build custom AI workflows that eliminate busywork across industries.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {industries.map((industry) => (
                        <div key={industry.name} className="card-feature flex flex-col h-full group">
                            {/* Visual Area - Icon Display */}
                            <div className={`card-visual ${industry.gradient === 'blue' ? 'card-gradient-blue' : 'card-gradient-teal'}`}>
                                <div className="w-20 h-20 rounded-2xl bg-surface-elevated shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                    <industry.icon className="w-10 h-10 text-accent" />
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="card-content flex flex-col flex-1">
                                <h3 className="text-lg font-black text-dark mb-2">{industry.name}</h3>
                                <p className="text-sm text-text-muted leading-relaxed flex-1">{industry.desc}</p>

                                {/* Use Cases Tags */}
                                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                                    {industry.useCases.map((useCase) => (
                                        <span 
                                            key={useCase}
                                            className="px-2 py-1 bg-muted-bg rounded text-[9px] font-bold uppercase tracking-wider text-text-muted border border-border"
                                        >
                                            {useCase}
                                        </span>
                                    ))}
                                </div>

                                <button className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                                    Learn more <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-text-muted">
                        Don't see your industry? <a href="#contact" className="text-accent hover:underline">Let's talk</a>—every workflow is unique.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Industries;
