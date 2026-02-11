import React from 'react';

interface Metric {
  id: number;
  value: string;
  label: string;
  context: string;
}

const metrics: Metric[] = [
  {
    id: 1,
    value: '15+',
    label: 'Hours saved per week',
    context: 'Average across our clients'
  },
  {
    id: 2,
    value: '48h',
    label: 'From kickoff to working prototype',
    context: 'Our delivery guarantee'
  },
  {
    id: 3,
    value: '$2.5M+',
    label: 'Revenue impact delivered',
    context: 'Total across all client work'
  }
];

const Results: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-surface" id="results">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Results
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-primary mb-4">
            Measurable Results, <span className="text-accent">Not Empty Promises</span>
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
            Real numbers from real projects. We track impact and deliver outcomes you can measure.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="card-feature flex flex-col items-center text-center h-full group bg-surface hover:border-accent/30 transition-all duration-300"
            >
              {/* Large Number */}
              <div className="text-5xl md:text-6xl font-black text-accent mb-4 group-hover:scale-105 transition-transform duration-300">
                {metric.value}
              </div>

              {/* Metric Label */}
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
                {metric.label}
              </h3>

              {/* Context */}
              <p className="text-sm text-text-muted">
                {metric.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
