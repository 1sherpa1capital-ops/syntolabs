import React from 'react';
import { Briefcase, ShoppingCart, HeartPulse, Code, Megaphone, Building2, ArrowRight } from 'lucide-react';

const industries = [
    {
        icon: Code,
        name: 'B2B SaaS',
        desc: 'SaaS companies ($1M-$3M ARR) automating lead qualification, proposal generation, and outbound scaling.',
        useCases: ['Lead qualification', 'Proposal automation', 'Outbound scaling'],
        before: 'SREs spending 20+ hours/week on manual research',
        after: 'Qualified leads increased 3x, proposal volume doubled',
        gradient: 'blue'
    },
    {
        icon: Megaphone,
        name: 'Digital Agencies',
        desc: 'Agencies ($500k-$2M ARR) automating client onboarding, reporting, and workflow optimization.',
        useCases: ['Client onboarding', 'Automated reporting', 'Workflow optimization'],
        before: 'Teams drowning in client deliverables',
        after: '95% of onboarding automated, 10+ hours/week saved',
        gradient: 'teal'
    },
    {
        icon: Briefcase,
        name: 'Professional Services',
        desc: 'Consulting and coaching firms automating inbox triage, scheduling, and CRM workflows.',
        useCases: ['Inbox triage', 'Scheduling automation', 'CRM updates'],
        before: 'Founders losing 30% of leads to slow follow-up',
        after: '100% of leads followed up within 5 minutes, inbox zero maintained',
        gradient: 'blue'
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
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

                                {/* Before/After Comparison */}
                                <div className="mt-4 pt-4 border-t border-border">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Transformation</div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-start gap-2">
                                            <span className="text-text-muted shrink-0">Before:</span>
                                            <span className="text-text-muted">{industry.before}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-accent shrink-0 font-bold">After:</span>
                                            <span className="text-primary">{industry.after}</span>
                                        </div>
                                    </div>
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
