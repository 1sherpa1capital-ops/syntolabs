import React from 'react';
import { ArrowRight, ExternalLink, Bot, Brain, Briefcase, BookOpen } from 'lucide-react';

interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  metrics: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'musashi',
    name: 'Musashi',
    tagline: 'AI Sales Automation',
    description: 'Multi-agent sales pipeline that discovers leads, researches companies, and automates personalized outreach. 95%+ scraping success rate with 4-tier progressive web scraping.',
    tags: ['Multi-Agent', 'Web Scraping', 'Gmail Automation'],
    icon: Bot,
    metrics: '10+ hours saved per campaign'
  },
  {
    id: 'chessy',
    name: 'Chessy',
    tagline: 'AI Chess Analysis',
    description: 'Psychological profiling system that analyzes chess games and classifies players into archetypes. Features immersive 3D visualizations and blindspot detection.',
    tags: ['AI Analysis', '3D Viz', 'Psychological Profiling'],
    icon: Brain,
    metrics: 'Deep insights from game data'
  },
  {
    id: 'getbeezy',
    name: 'GetBeezy',
    tagline: 'Job Hunt Automation',
    description: 'Complete job hunting toolkit with multi-agent discovery, resume tailoring, contact finding, and outreach automation. Open-source with CRM pipeline tracking.',
    tags: ['Automation', 'Resume AI', 'Outreach'],
    icon: Briefcase,
    metrics: 'End-to-end job search automation'
  },
  {
    id: 'writo',
    name: 'Writo',
    tagline: 'AI Journal Companion',
    description: 'Sentiment analysis and thematic categorization for journaling. Features 25+ mood tracking options, smart prompts, and AI-generated summaries with end-to-end encryption.',
    tags: ['Sentiment Analysis', 'Privacy', 'NLP'],
    icon: BookOpen,
    metrics: 'Emotional pattern tracking'
  }
];

const CaseStudies: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="case-studies">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted-bg text-text-default text-xs font-medium mb-4">
            <Bot size={12} />
            Our Work
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-primary mb-4">
            4 AI Products <span className="text-accent">Shipped to Production</span>
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
            We don't just talk about AI—we build it. From multi-agent sales automation to psychological profiling systems, 
            we've shipped real solutions that save time and deliver results.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
          {caseStudies.map((study) => (
            <div 
              key={study.id}
              className="group p-6 md:p-8 rounded-2xl border border-border-subtle bg-surface-elevated hover:border-accent/30 transition-all duration-300"
            >
              {/* Icon and Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <study.icon size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-primary">{study.name}</h3>
                    <p className="text-xs text-accent font-bold uppercase tracking-wider">{study.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                {study.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {study.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-muted-bg rounded text-[10px] font-bold uppercase tracking-wider text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metric */}
              <div className="flex items-center gap-2 pt-4 border-t border-border-subtle">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-bold text-primary">{study.metrics}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="text-center p-8 md:p-12 rounded-2xl bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-[0.05] invert pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              See the Full Portfolio
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Explore detailed case studies, technical deep-dives, and live demos of our AI implementations. 
              From concept to deployment—see how we build.
            </p>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-accent text-cta-text px-8 py-4 rounded-full text-sm font-black hover:bg-surface-elevated transition-colors"
            >
              View Complete Portfolio
              <ExternalLink size={16} />
            </a>
            <p className="mt-4 text-xs text-white/50">
              Includes technical architecture, code samples, and implementation details
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
