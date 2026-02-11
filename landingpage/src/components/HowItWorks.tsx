import React from 'react';
import { Clock } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  duration: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Discovery Call',
    description: 'We learn your business, identify opportunities, and estimate impact.',
    duration: '30 min'
  },
  {
    id: 2,
    title: 'Audit & Roadmap',
    description: 'Deep dive into your workflows. We map processes and calculate ROI with your team.',
    duration: '1 week'
  },
  {
    id: 3,
    title: 'Working Prototype',
    description: 'See automation in action within 48 hours. A functional agent tailored to your needs.',
    duration: '48 hours'
  },
  {
    id: 4,
    title: 'Full Deployment',
    description: 'Complete system deployed with team training and documentation.',
    duration: '2-3 weeks'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="how-it-works">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Our Process
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-primary mb-4">
            From Chaos to Clarity <span className="text-accent">in 4 Steps</span>
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
            Our process turns uncertainty about automation into a clear roadmap with working software.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
          {steps.map((step) => (
            <div
              key={step.id}
              className="card-feature flex flex-col h-full group bg-surface hover:border-accent/30 transition-all duration-300"
            >
              {/* Step Number Circle */}
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <span className="text-2xl font-black text-accent">{step.id}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-primary mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed mb-6 flex-1">
                {step.description}
              </p>

              {/* Duration */}
              <div className="flex items-center gap-2 text-sm text-accent font-medium">
                <Clock size={14} />
                <span>{step.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
