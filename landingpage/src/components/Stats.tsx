import React from 'react';

interface StatItem {
    value: string;
    label: string;
    context?: string;
}

const stats: StatItem[] = [
    { value: '$4.2K', label: 'Projected Monthly Savings', context: 'Per client in labor costs' },
    { value: '15+', label: 'Hours Saved', context: 'Per team member weekly' },
    { value: '48h', label: 'Delivery Time', context: 'From kickoff to prototype' },
    { value: '100%', label: 'Custom Built', context: 'No cookie-cutter solutions' },
];

const Stats: React.FC = () => {
    return (
        <section className="section-padding bg-surface">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="group relative p-6 bg-surface-elevated/50 backdrop-blur border border-border rounded-2xl transition-all duration-500 hover:border-accent/30 animate-reveal"
                            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                        >
                            {/* Corner accent */}
                            <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden rounded-tl-2xl">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-accent transform origin-left rotate-45 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-8" />
                            </div>

                            <div className="text-4xl md:text-5xl font-black text-accent mb-2">{stat.value}</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{stat.label}</div>
                            {stat.context && (
                                <div className="text-[9px] text-text-dim mt-1">{stat.context}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
