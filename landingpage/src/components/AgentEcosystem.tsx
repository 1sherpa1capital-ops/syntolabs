import React from 'react';
import { Bot, Mic, TrendingUp, Database, ShieldCheck, BookOpen, Video, Sparkles } from 'lucide-react';

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
    name: 'Research Agent',
    description: 'Web scraping and strategy deck generation. Scrapes URLs, processes data, outputs structured PDFs.',
    capability: 'Crawl4AI • Firecrawl • Strategy Decks',
    icon: Database
  },
  {
    id: 'voice',
    name: 'Voice Agent',
    description: 'Conversational AI for phone qualification. Handles inbound/outbound calls with intent detection.',
    capability: 'Bland AI • Vapi.ai • Call Transcripts',
    icon: Mic
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    description: 'Pipeline management and meeting booking. Updates CRM, schedules calls via Cal.com integration.',
    capability: 'Cal.com • CRM APIs • Pipeline Mgmt',
    icon: TrendingUp
  },
  {
    id: 'enrichment',
    name: 'Enrichment Agent',
    description: 'Contact discovery and tech stack analysis. Completes partial lead data with multiple API lookups.',
    capability: 'Multi-API • Contact Discovery • Signals',
    icon: Bot
  },
  {
    id: 'quality',
    name: 'Quality Agent',
    description: 'Output validation and brand guard. Ensures all content meets style guides and business rules.',
    capability: 'Style Guides • Fact DB • Validation',
    icon: ShieldCheck
  },
  {
    id: 'knowledge',
    name: 'Knowledge Agent',
    description: 'Context injection and memory retrieval. Searches vector DB for relevant passages and context.',
    capability: 'Qdrant Vector DB • Context Retrieval',
    icon: BookOpen
  },
  {
    id: 'video',
    name: 'Video Agent',
    description: 'Avatar generation and script writing. Creates personalized video content at scale.',
    capability: 'HeyGen • Tavus • Video Scripts',
    icon: Video
  },
  {
    id: 'brand',
    name: 'Brand Agent',
    description: 'Voice cloning and style enforcement. Ensures all communications match brand guidelines.',
    capability: 'Voice Models • Style DB • Brand Guard',
    icon: Sparkles
  }
];

const AgentEcosystem: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-surface-elevated" id="agent-ecosystem">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-medium mb-4">
            <Bot size={12} />
            <span className="text-accent font-bold">8 Core Agents</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-primary mb-4">
            Multi-Agent <span className="text-accent">Ecosystem</span>
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
            Eight specialized agents coordinated through MFR Guardrails. No-hallucination guarantee through
            validation pipelines at every layer.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group p-6 rounded-2xl border border-border-subtle bg-surface hover:border-accent/30 transition-all duration-300"
            >
              {/* Icon and Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <agent.icon size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-primary">{agent.name}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                {agent.description}
              </p>

              {/* Capability Badge */}
              <div className="flex items-center gap-2 pt-4 border-t border-border-subtle">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  {agent.capability}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* MFR Guardrails Section */}
        <div className="text-center p-8 md:p-10 rounded-3xl bg-primary border border-accent/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShieldCheck size={28} className="text-accent" />
            <h3 className="text-2xl md:text-3xl font-black text-white">
              MFR Guardrails
            </h3>
          </div>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Model-First Reasoning ensures business logic guides agent behavior, not just LLM generation.
            Our validation pipeline guarantees no hallucinations ship to clients.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Business Logic Validator',
              'Fact Verifier',
              'Brand Voice Guard',
              'Output Formatter'
            ].map((guardrail) => (
              <span
                key={guardrail}
                className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-xs font-bold text-accent"
              >
                {guardrail}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentEcosystem;
