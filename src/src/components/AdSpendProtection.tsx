import React from 'react';
import { Zap, Clock, Users, DollarSign, ArrowRight, AlertTriangle } from 'lucide-react';

const AdSpendProtection: React.FC = () => {
    const painPoints = [
        {
            icon: Clock,
            text: "Team spends 15+ hours/week on repetitive data entry and manual tasks"
        },
        {
            icon: Users,
            text: "Hiring more people just to handle growing admin workload"
        },
        {
            icon: DollarSign,
            text: "Manual processes cost $2,000+/month in labor at $30/hour"
        },
        {
            icon: AlertTriangle,
            text: "Human error rates of 5-10% in repetitive reporting tasks"
        }
    ];

    const solutions = [
        "Audit your workflows to identify automation opportunities",
        "Build custom AI agents tailored to your specific processes",
        "Integrate with your existing tools—no rip-and-replace needed",
        "Deploy in 48 hours with full team training and support"
    ];

    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-muted-bg" id="efficiency">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                        <Zap size={14} />
                        Workflow Efficiency
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-primary leading-[0.95] mb-4 md:mb-6">
                        Stop the Hidden Cost of <br className="hidden sm:block" />
                        <span className="text-accent">Manual Work</span>
                    </h2>
                    <p className="text-base md:text-lg text-text-default font-medium leading-relaxed max-w-2xl mx-auto">
                        Every hour your team spends on repetitive tasks is an hour not spent on growth. 
                        Manual processes don't just cost money—they create bottlenecks that limit your scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Pain Points Card */}
                    <div className="p-6 md:p-8 rounded-xl border border-border-subtle bg-surface-elevated">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-red-400/50" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-text-muted uppercase">The Productivity Trap</span>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-extrabold text-primary mb-6 leading-tight">
                            Where Your Team's Time Disappears
                        </h3>
                        
                        <div className="space-y-4">
                            {painPoints.map((point, i) => (
                                <div key={i} className="flex items-start gap-4 pb-4 border-b border-border-subtle last:border-0 last:pb-0">
                                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                                        <point.icon size={18} className="text-red-400" />
                                    </div>
                                    <p className="text-sm md:text-base text-text-default font-medium leading-relaxed pt-2">
                                        {point.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 rounded-lg bg-red-50/50 border border-red-100">
                            <p className="text-xs text-red-600/80 font-medium">
                                <span className="font-black">The math:</span> A 5-person team spending 15 hrs/week on manual tasks = $117,000/year in labor costs.
                            </p>
                        </div>
                    </div>

                    {/* Solution Card */}
                    <div className="p-6 md:p-8 rounded-xl bg-primary relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-subtle opacity-[0.05] invert pointer-events-none" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">How We Help</span>
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-extrabold text-accent mb-6 leading-tight">
                                Automate the Repetitive, Scale the Strategic
                            </h3>
                            
                            <div className="space-y-4 mb-8">
                                {solutions.map((solution, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-black text-primary">{i + 1}</span>
                                        </div>
                                        <p className="text-sm md:text-base text-text-on-primary font-medium leading-relaxed">
                                            {solution}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-text-on-primary/10">
                                <p className="text-sm text-text-on-primary/70 font-medium mb-4">
                                    Reclaim 15+ hours/week. Let your team focus on what actually grows the business.
                                </p>
                                <a
                                    href="https://cal.com/rhigden-sonam-sherpa-624tui/ai-discovery"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-accent text-cta-text px-6 py-3 rounded-full text-sm font-black hover:bg-surface-elevated transition-colors"
                                >
                                    Get Your Free Audit <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stat Bar */}
                <div className="mt-8 md:mt-12 p-6 md:p-8 rounded-xl bg-surface-elevated border border-border-subtle">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-2xl md:text-3xl font-black text-primary mb-1">
                                15+<span className="text-accent"> hrs/week</span>
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
                                Average time saved per team member with AI automation
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span className="font-medium">Based on typical workflows: reporting, data entry, email sorting, follow-ups</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdSpendProtection;
