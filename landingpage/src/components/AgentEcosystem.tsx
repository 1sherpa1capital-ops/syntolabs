import React from 'react';
import { Search, Mic, TrendingUp, BookOpen, ShieldCheck, Settings } from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    description: string;
    capability: string;
    icon: React.ElementType;
}

const agents: Agent[] = [
    {
        id: 'research',
        name: 'Research',
        description: 'Finds and qualifies prospects using web scraping and data enrichment.',
        capability: 'Crawl4AI • Firecrawl • Lead Discovery',
        icon: Search
    },
    {
        id: 'voice',
        name: 'Voice',
        description: 'Handles inbound/outbound calls with natural conversation and intent detection.',
        capability: 'Bland AI • Vapi.ai • Call Transcripts',
        icon: Mic
    },
    {
        id: 'sales',
        name: 'Sales',
        description: 'Manages pipeline, books meetings, and updates your CRM automatically.',
        capability: 'Cal.com • CRM APIs • Pipeline Mgmt',
        icon: TrendingUp
    },
    {
        id: 'knowledge',
        name: 'Knowledge',
        description: 'Retrieves relevant context from your documents and data for accurate responses.',
        capability: 'Vector DB • Context Injection • Memory',
        icon: BookOpen
    },
    {
        id: 'quality',
        name: 'Quality',
        description: 'Validates all outputs against business rules and style guides.',
        capability: 'Fact Checking • Style Guides • Validation',
        icon: ShieldCheck
    },
    {
        id: 'coordinator',
        name: 'Coordinator',
        description: 'Orchestrates multi-agent workflows and handles error recovery.',
        capability: 'Workflow Orchestration • Error Handling',
        icon: Settings
    }
];

const AgentEcosystem: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-surface-elevated" id="agent-ecosystem">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-dark mb-4">
                        Six Agents, <span className="text-gradient">One System</span>
                    </h2>
                    <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
                        Specialized agents coordinated through MFR Guardrails. Business logic guides behavior—not just LLM generation.
                    </p>
                </div>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
                    {agents.map((agent) => (
                        <div
                            key={agent.id}
                            className="group p-6 rounded-2xl border border-border bg-surface hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Icon and Name */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                    <agent.icon size={24} className="text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-dark">{agent.name} Agent</h3>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-text-muted leading-relaxed mb-4">
                                {agent.description}
                            </p>

                            {/* Capability Badge */}
                            <div className="flex items-center gap-2 pt-4 border-t border-border">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                                    {agent.capability}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MFR Guardrails Note */}
                <div className="text-center p-6 md:p-8 rounded-2xl bg-accent/5 border border-accent/10">
                    <p className="text-sm text-text-muted max-w-2xl mx-auto">
                        <strong className="text-primary">MFR Guardrails</strong> ensure business logic guides agent behavior.
                        Validation pipeline guarantees accuracy at every layer.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AgentEcosystem;
