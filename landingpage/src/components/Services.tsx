import React from 'react';
import { Phone, Filter, Calendar, Database, Workflow, ArrowRight } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  illustration: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Workflow Discovery',
    description: 'We audit your current processes and identify the repetitive tasks eating up your team\'s time. $2,500 investment. You get a prioritized automation roadmap with ROI projections.',
    icon: Workflow,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Process Flow Diagram */}
        <div className="flex items-center gap-2">
          {/* Steps */}
          {[
            { icon: '1', label: 'Audit', active: true },
            { icon: '2', label: 'Identify', active: true },
            { icon: '3', label: 'Prioritize', active: true },
            { icon: '4', label: 'Build', active: false },
          ].map((step, i) => (
            <React.Fragment key={i}>
              <div className={`flex flex-col items-center gap-1 ${step.active ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                  step.active ? 'bg-primary' : 'bg-muted-bg'
                }`}>
                  <span className={`text-xs font-bold ${step.active ? 'text-text-on-primary' : 'text-text-muted'}`}>
                    {step.icon}
                  </span>
                </div>
                <span className="text-[7px] text-text-muted font-medium">{step.label}</span>
              </div>
              {i < 3 && (
                <div className="flex flex-col items-center -mt-4">
                  <div className="w-6 h-0.5 bg-accent relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-accent border-y-4 border-y-transparent" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Automation Badge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-accent/10 rounded-full border border-accent/20">
          <span className="text-[7px] text-accent font-bold">Free Audit</span>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'Multi-Agent Systems',
    description: 'We build coordinated AI agents with MFR Guardrails for no-hallucination guarantee. $5,000+ investment. Scout → Research → Writer → Sender workflows at scale.',
    icon: Filter,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Multi-Agent Flow */}
        <div className="space-y-2 w-44">
          {[
            { q: 'Scout Agent', status: 'active', delay: 0 },
            { q: 'Research Agent', status: 'active', delay: 0.1 },
            { q: 'Writer Agent', status: 'active', delay: 0.2 },
            { q: 'Sender Agent', status: 'ready', delay: 0.3 },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-surface-elevated rounded-lg p-2 shadow-sm border border-border animate-fade-in-up"
              style={{ animationDelay: `${item.delay}s` }}
            >
              <span className="text-[9px] text-text-muted">{item.q}</span>
              <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold ${
                item.status === 'active' ? 'bg-accent/10 text-accent' : 'bg-muted-bg text-text-muted'
              }`}>
                {item.status === 'active' ? '●' : '○'}
              </div>
            </div>
          ))}
          {/* System Badge */}
          <div className="flex justify-end pt-1">
            <div className="bg-primary text-text-on-primary px-2 py-1 rounded-full text-[9px] font-bold shadow-md">
              Multi-Agent System
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'AI Integration',
    description: 'We connect AI to your existing tools—CRM, email, calendars, databases. No rip-and-replace. Your workflows get smarter while your team keeps using familiar tools.',
    icon: Database,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Connected Apps */}
        <div className="relative flex items-center gap-4">
          {/* Hub */}
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg z-10">
            <Database size={20} className="text-text-on-primary" />
          </div>
          {/* Connection Lines */}
          <div className="absolute left-7 top-1/2 w-24 h-0.5 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2" />
          {/* Connected Apps */}
          <div className="flex flex-col gap-2 ml-8">
            {[
              { name: 'CRM', color: 'bg-accent', delay: 0 },
              { name: 'Email', color: 'bg-accent/70', delay: 0.15 },
              { name: 'Calendar', color: 'bg-accent/50', delay: 0.3 },
            ].map((app, i) => (
              <div
                key={i}
                className={`w-10 h-10 ${app.color} rounded-xl flex items-center justify-center shadow-md animate-fade-in-up`}
                style={{ animationDelay: `${app.delay}s` }}
              >
                <span className="text-[7px] font-bold text-cta-text">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Sync Indicator */}
        <div className="absolute top-0 right-4 flex items-center gap-1 px-2 py-0.5 bg-accent/10 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[7px] text-accent font-bold">Live</span>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'Custom AI Tools',
    description: 'From sentiment analysis dashboards to automated report generation, we build bespoke AI tools tailored to your specific business needs. No cookie-cutter solutions.',
    icon: Calendar,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Tool Interface */}
        <div className="bg-surface-elevated rounded-xl shadow-lg p-3 w-44 border border-border">
          {/* Tool Header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-text-default">AI Dashboard</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-accent/20 flex items-center justify-center text-[8px] text-accent">AI</div>
            </div>
          </div>
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {[
              { label: 'Sentiment', value: '+24%', color: 'text-accent' },
              { label: 'Efficiency', value: '85%', color: 'text-accent' },
              { label: 'Tasks', value: '1.2k', color: 'text-text-default' },
              { label: 'Time Saved', value: '40h', color: 'text-accent' },
            ].map((metric, i) => (
              <div key={i} className="bg-muted-bg rounded p-2 text-center">
                <div className={`text-[10px] font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-[6px] text-text-muted uppercase">{metric.label}</div>
              </div>
            ))}
          </div>
          {/* Status Bar */}
          <div className="flex gap-1 justify-center">
            <div className="px-2 py-1 bg-accent/10 rounded text-[8px] text-accent font-medium">Processing</div>
            <div className="px-2 py-1 bg-muted-bg rounded text-[8px] text-text-muted">Auto</div>
          </div>
        </div>
        {/* Checkmark */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
          <span className="text-cta-text text-xs">✓</span>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: 'End-to-End Implementation',
    description: 'From initial audit to deployment and training, we handle everything. You get working AI workflows in 48 hours, not months. Plus ongoing support as your needs evolve.',
    icon: Phone,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Implementation Timeline */}
        <div className="relative bg-surface-elevated rounded-2xl shadow-xl p-4 w-40 border border-border">
          {/* Timeline */}
          <div className="space-y-2">
            {[
              { day: 'Day 1', task: 'Audit & Plan', done: true },
              { day: 'Day 2', task: 'Build & Test', done: true },
              { day: 'Day 3', task: 'Deploy & Train', done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.done ? 'bg-accent' : 'bg-muted-bg'}`} />
                <span className="text-[8px] text-text-muted w-10">{item.day}</span>
                <span className="text-[8px] text-text-default">{item.task}</span>
              </div>
            ))}
          </div>
          {/* Progress Bar */}
          <div className="mt-3 h-1 bg-muted-bg rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-accent rounded-full" />
          </div>
        </div>
        {/* Floating Elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
          <span className="text-[8px] font-bold text-cta-text">48h</span>
        </div>
      </div>
    )
  }
];

const Services: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="services">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted-bg text-text-default text-xs font-medium mb-4">
            <Workflow size={12} />
            Our Process
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-primary mb-4">
            From <span className="text-accent">audit to deployment</span> in 48 hours
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
            We don't just consult—we build. Every solution is custom-tailored with MFR Guardrails for quality assurance,
            integrated with your existing tools, and delivered in 48 hours.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <div key={service.id} className="card-feature flex flex-col h-full group">
              {/* Visual Area */}
              <div className="card-visual card-gradient-green-soft">
                {service.illustration}
              </div>

              {/* Content Area */}
              <div className="card-content flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <service.icon size={20} className="text-accent" />
                  </div>
                  <h3 className="card-title mb-0">{service.title}</h3>
                </div>
                <p className="card-description flex-1">{service.description}</p>

                <button className="btn-learn-more mt-auto">
                  Learn more <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Risk Reversal */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-sm text-text-muted mb-4">
            Not sure where to start? Get a free workflow audit.
          </p>
          <a
            href="https://cal.com/rhigden-sonam-sherpa-624tui/mercer-ai-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-cta-text text-sm font-bold rounded-full hover:bg-cta-hover transition-colors shadow-lg shadow-accent/20"
          >
            Book Free Strategy Call <ArrowRight size={16} />
          </a>
          <p className="mt-3 text-xs text-text-muted">
            30-min consultation • Custom roadmap • No obligation
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
