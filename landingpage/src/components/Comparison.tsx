import React from 'react';
import { X, Check } from 'lucide-react';

const Comparison: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-surface" id="comparison">
            <div className="max-w-[1000px] mx-auto">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-dark mb-4">
                        The <span className="text-gradient">Synto Labs</span> Difference
                    </h2>
                    <p className="text-base text-text-muted">
                        Why service businesses choose custom AI over cookie-cutter solutions.
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            label: 'Speed',
                            them: '3-6 months',
                            you: '48 hours',
                            description: 'From kickoff to working prototype'
                        },
                        {
                            label: 'Customization',
                            them: 'Template-based',
                            you: '100% tailored',
                            description: 'Built for your specific workflows'
                        },
                        {
                            label: 'Ownership',
                            them: 'Monthly rental',
                            you: 'Yours forever',
                            description: 'Full source code and IP transfer'
                        }
                    ].map((row, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-[120px_1fr_1fr] gap-4 p-4 md:p-6 rounded-xl border border-border bg-surface-elevated"
                        >
                            {/* Label */}
                            <div className="text-sm font-bold text-primary uppercase tracking-wider">
                                {row.label}
                            </div>

                            {/* Them */}
                            <div className="flex items-center gap-3">
                                <X size={18} className="text-text-dim flex-shrink-0" />
                                <div>
                                    <div className="text-sm font-medium text-text-muted line-through">{row.them}</div>
                                </div>
                            </div>

                            {/* You */}
                            <div className="flex items-center gap-3">
                                <Check size={18} className="text-accent flex-shrink-0" />
                                <div>
                                    <div className="text-sm font-bold text-primary">{row.you}</div>
                                    <div className="text-xs text-text-muted">{row.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Comparison;
