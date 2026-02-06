import React, { useState } from 'react';
import { ArrowUp, X } from 'lucide-react';

const FOUNDERS = [
    {
        name: 'Rhigden Sherpa',
        role: 'Founder & AI Architect',
        statement: "I spent years watching businesses drown in repetitive tasks while AI sat on the sidelines. The problem wasn't lack of technology—it was lack of implementation. That's why we don't just recommend AI; we build it, train your team, and ensure it actually works.",
        bio: "Rhigden has built 5+ AI-powered products used by thousands. From voice agents to automation pipelines, he understands what it takes to implement AI that delivers real ROI. He leads technical architecture and ensures every solution is tailored to the client's specific workflow.",
        stats: [
            { label: '5+ AI Products', sub: 'Shipped' },
            { label: '100% Custom', sub: 'Solutions' }
        ],
        position: 'right'
    },
    {
        name: 'Sharad',
        role: 'Founder & Growth Lead',
        statement: "Most AI consultants leave you with a fancy demo and no results. We take the opposite approach—deep workflow analysis, practical implementation, and measurable outcomes. Your success is our success.",
        bio: "Sharad ensures every engagement delivers tangible business value. From initial audit to team training, he oversees the complete transformation process. His focus: making sure AI doesn't just work technically, but actually improves your bottom line.",
        stats: [
            { label: 'End-to-End', sub: 'Service' },
            { label: 'Measurable ROI', sub: 'Focus' }
        ],
        position: 'left'
    }
];

interface AboutProps {
    isOpen: boolean;
    onClose: () => void;
}

const About: React.FC<AboutProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl max-h-[95vh] bg-surface-elevated rounded-[24px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-muted-bg hover:bg-border transition-colors"
                >
                    <X size={20} className="text-primary" />
                </button>

                {/* Image Section - Hidden on mobile for cleaner UX */}
                <div className="hidden md:block md:w-[40%] bg-primary relative min-h-[400px]">
                    <img
                        src="/founders-duo.jpg"
                        alt="Syntolabs Founders"
                        className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-80" />

                    {/* Position Arrow */}
                    <div className={`absolute bottom-24 w-full px-12 transition-all duration-700 ease-in-out flex ${FOUNDERS[activeTab].position === 'left' ? 'justify-start' : 'justify-end'}`}>
                        <div className="flex flex-col items-center gap-1">
                            <div className="p-2 rounded-full bg-accent text-cta-text animate-bounce shadow-lg">
                                <ArrowUp size={16} strokeWidth={3} />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent">Active</span>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1">
                            {FOUNDERS[activeTab].role}
                        </div>
                        <div className="text-3xl font-black text-text-on-primary tracking-tighter">
                            {FOUNDERS[activeTab].name}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-12 overflow-y-auto max-h-[90vh] md:max-h-none">
                    <div className="flex gap-3 mb-8">
                        {FOUNDERS.map((founder, idx) => (
                            <button
                                key={founder.name}
                                onClick={() => setActiveTab(idx)}
                                className={`px-4 md:px-5 py-2 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all border-2 ${activeTab === idx
                                    ? 'bg-accent border-accent text-cta-text'
                                    : 'bg-transparent border-border-subtle text-text-muted hover:border-border'
                                    }`}
                            >
                                {founder.name}
                            </button>
                        ))}
                    </div>

                    <div className="badge-status mb-6">Executive Insight</div>

                    {FOUNDERS.map((founder, idx) => (
                        <div
                            key={founder.name}
                            className={`transition-all duration-500 ${idx === activeTab ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'
                                }`}
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-primary leading-tight mb-6 md:mb-8">
                                {idx === 0 ? <>Eliminate the <span className="text-accent">manual grind.</span></> : <>Remove the <span className="text-accent">growth ceiling.</span></>}
                            </h2>

                            <div className="space-y-6 text-base text-text-default font-medium leading-relaxed">
                                <p className="italic text-primary font-bold border-l-4 border-accent pl-4 py-1 bg-muted-bg/50">
                                    "{founder.statement}"
                                </p>
                                <p className="text-sm text-text-muted">{founder.bio}</p>
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-6">
                                {founder.stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="text-xl font-black text-primary tracking-tighter">{stat.label}</div>
                                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">{stat.sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
