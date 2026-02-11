import React from 'react';
import { Zap, Cpu, Eye, User } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

interface Differentiator {
  id: string;
  icon: React.ElementType;
  title: string;
  ourAdvantage: string;
  theirApproach: string;
}

const differentiators: Differentiator[] = [
  {
    id: 'speed',
    icon: Zap,
    title: '48-Hour Delivery',
    ourAdvantage: 'Working prototype in 48 hours from kickoff',
    theirApproach: '3-6 month development cycles'
  },
  {
    id: 'custom',
    icon: Cpu,
    title: 'Custom Built',
    ourAdvantage: 'Every solution tailored to your workflows',
    theirApproach: 'Cookie-cutter templates and one-size-fits-all'
  },
  {
    id: 'transparency',
    icon: Eye,
    title: 'Build-in-Public',
    ourAdvantage: 'Transparent process, visible progress, IP you own',
    theirApproach: 'Black box development, hidden methodology'
  },
  {
    id: 'personal',
    icon: User,
    title: 'Founder-Led',
    ourAdvantage: 'Rhigden leads every engagement directly',
    theirApproach: 'Faceless agencies with junior staff'
  }
];

const WhyUs: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="why-us">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-medium mb-4">
            <Zap size={12} />
            <span className="text-accent font-bold">Why Synto Labs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-primary mb-4">
            What Makes Us <span className="text-accent">Different</span>
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
            Most agencies talk about AI—we ship it. Here's how we compare to traditional development shops
            and other AI consultants.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 mb-12">
          {differentiators.map((item) => (
            <div
              key={item.id}
              className="p-6 md:p-8 rounded-3xl bg-surface-elevated border border-border-subtle hover:border-accent/30 transition-all duration-300"
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <item.icon size={28} className="text-accent" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-primary">{item.title}</h3>
              </div>

              {/* Comparison */}
              <div className="space-y-4">
                {/* Our Advantage */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary mb-1">Synto Labs</p>
                    <p className="text-sm text-text-muted">{item.ourAdvantage}</p>
                  </div>
                </div>

                {/* Their Approach */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-text-muted text-xs">✗</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-muted mb-1">Others</p>
                    <p className="text-sm text-text-muted">{item.theirApproach}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-surface-elevated rounded-xl p-6 border border-border hover:border-accent/30 transition-all duration-300">
                <h4 className="font-black text-lg mb-2 text-primary">No Black Box Solutions</h4>
                <p className="text-text-muted text-sm">Every workflow is built in open-source tools you own. No vendor lock-in, full control over your automation stack.</p>
            </div>
            <div className="bg-surface-elevated rounded-xl p-6 border border-border hover:border-accent/30 transition-all duration-300">
                <h4 className="font-black text-lg mb-2 text-primary">Risk-Free Validation</h4>
                <p className="text-text-muted text-sm">See your automation working before we build the full system. Pay only for results that move the needle.</p>
            </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
          <h3 className="text-2xl md:text-3xl font-black text-primary mb-4">
            Ready to see the difference?
          </h3>
          <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto mb-6">
            Book a free strategy call. We'll identify your top 3 automation opportunities,
            estimate time/cost savings, and prioritize by ROI. No obligation.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-cta-text font-black text-sm uppercase tracking-wider rounded-full hover:bg-cta-hover transition-all shadow-lg shadow-accent/20"
          >
            Book Free Strategy Call
          </a>
          <p className="mt-4 text-xs text-text-muted">
            30-min consultation • Custom roadmap • No obligation
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
