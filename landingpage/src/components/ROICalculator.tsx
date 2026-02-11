import React, { useMemo } from 'react';
import { Zap, HelpCircle, ArrowRight } from 'lucide-react';
import { useTryNowModal } from '../context/TryNowModalContext';
import { BOOKING_URL } from '../config/constants';

const ROICalculator: React.FC = () => {
    const [teamSize, setTeamSize] = React.useState<number>(5);
    const [hourlyRate, setHourlyRate] = React.useState<number>(30);
    const [hoursPerWeek, setHoursPerWeek] = React.useState<number>(15);
    const { openModal } = useTryNowModal();

    const results = useMemo(() => {
        const weeklyCost = teamSize * hoursPerWeek * hourlyRate;
        const monthlyCost = weeklyCost * 4.3;
        const annualCost = monthlyCost * 12;
        const potentialSavings = monthlyCost * 0.7; // AI typically saves 70% of manual task time
        const annualSavings = potentialSavings * 12;

        return {
            weeklyCost,
            monthlyCost,
            annualCost,
            potentialSavings,
            annualSavings,
            hoursSaved: teamSize * hoursPerWeek * 0.7
        };
    }, [teamSize, hourlyRate, hoursPerWeek]);

    const sliders = [
        {
            id: 'teamSize',
            label: 'Team Size',
            value: teamSize,
            set: setTeamSize,
            min: 1,
            max: 50,
            step: 1,
            unit: ' people'
        },
        {
            id: 'hourlyRate',
            label: 'Average Hourly Rate ($)',
            value: hourlyRate,
            set: setHourlyRate,
            min: 15,
            max: 150,
            step: 5,
            unit: '/hr'
        },
        { 
            id: 'hoursPerWeek',
            label: 'Hours/Week on Manual Tasks', 
            value: hoursPerWeek, 
            set: setHoursPerWeek, 
            min: 5, 
            max: 40, 
            step: 1, 
            unit: ' hrs'
        }
    ];

    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="roi">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                            ROI Calculator
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-dark leading-[0.9] mb-6 md:mb-8">
                            Calculate your <br className="hidden sm:block" />
                            <span className="text-gradient">time savings.</span>
                        </h2>
                        <p className="text-base md:text-lg text-text-muted font-medium leading-relaxed max-w-xl mb-6 md:mb-8">
                            See how much your team spends on repetitive tasks—and how much you could save with AI automation.
                        </p>

                        <div className="flex flex-col gap-6 md:gap-8">
                            {sliders.map((input) => (
                                <div key={input.id} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <label 
                                            htmlFor={input.id}
                                            className="text-xs font-black uppercase tracking-widest text-accent"
                                        >
                                            {input.label}
                                        </label>
                                        <span 
                                            className="text-2xl font-black text-primary"
                                            aria-live="polite"
                                        >
                                            {input.value.toLocaleString()}{input.unit}
                                        </span>
                                    </div>
                                    <input
                                        id={input.id}
                                        type="range"
                                        min={input.min}
                                        max={input.max}
                                        step={input.step}
                                        value={input.value}
                                        onChange={(e) => input.set(Number(e.target.value))}
                                        className="w-full h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-accent"
                                        aria-label={input.label}
                                        aria-valuemin={input.min}
                                        aria-valuemax={input.max}
                                        aria-valuenow={input.value}
                                        aria-valuetext={`${input.value}${input.unit}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 rounded-lg bg-surface border border-border">
                            <div className="flex items-start gap-2 text-text-muted">
                                <HelpCircle size={14} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-xs font-medium leading-relaxed">
                                    These estimates include data entry, report generation, email sorting, follow-ups, and other repetitive administrative tasks. Actual savings depend on your specific workflows.
                                </span>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="p-6 md:p-8 lg:p-10 rounded-3xl bg-surface-elevated border border-accent/20 text-text-default relative overflow-hidden flex flex-col justify-between min-h-[400px] lg:min-h-[500px]"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <div className="absolute inset-0 bg-grid-subtle opacity-[0.05] pointer-events-none" aria-hidden="true" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6 md:mb-8">
                                <Zap className="text-accent" size={18} fill="currentColor" aria-hidden="true" />
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Modeled Cost Impact</span>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                <div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2">Current Monthly Cost</div>
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-dark leading-none">
                                        ${(results.monthlyCost / 1000).toFixed(1)}k
                                    </div>
                                    <p className="text-xs text-text-muted mt-1">Manual task labor costs</p>
                                </div>
                                
                                <div className="w-full h-px bg-border" aria-hidden="true" />
                                
                                <div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Potential Monthly Savings</div>
                                    <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-primary leading-none mb-1 md:mb-2">
                                        ${(results.potentialSavings / 1000).toFixed(1)}k<span className="text-2xl">/mo</span>
                                    </div>
                                    <p className="text-sm font-medium text-text-muted">Based on 70% automation efficiency</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-dim mb-1">Hours Saved</div>
                                        <div className="text-xl sm:text-2xl font-black tracking-tighter text-dark">
                                            {results.hoursSaved.toFixed(0)}h
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-dim mb-1">Annual Impact</div>
                                        <div className="text-xl sm:text-2xl font-black tracking-tighter text-dark">
                                            ${(results.annualSavings / 1000).toFixed(0)}k
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-8 md:pt-10 flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={BOOKING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary rounded-full flex-1"
                                >
                                    Book a Strategy Call <ArrowRight size={16} aria-hidden="true" />
                                </a>
                                <button
                                    onClick={openModal}
                                    className="btn-secondary rounded-full flex-1"
                                >
                                    Free Workflow Audit
                                </button>
                            </div>

                            <div className="text-center">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Custom AI Solutions • 48h Implementation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
