import React, { useEffect, useState, useCallback } from 'react';
import { useLenis } from '../hooks/useLenis';
import AgentsHeader from '../components/agents/AgentsHeader';
import AgentsFooter from '../components/agents/AgentsFooter';

import {
    Bot, Sparkles, Zap, Shield, Cpu,
    X, Check, FileText, Send, Loader2,
    ShieldCheck, Terminal, Search, Video, Palette, Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection, MagneticButton, AnimatedNumber } from '../components/GSAPAnimations';

// ===== STATIC DATA HOISTED =====
const PAIN_POINTS_LIBRARY = [
    'Manual client acquisition bottleneck',
    'Inconsistent proposal conversion rates',
    'Time-intensive lead qualification process',
    'Scattered outreach across multiple channels',
    'No systematic follow-up workflow',
    'Limited visibility into pipeline metrics',
];

const SAVINGS_RANGES = [3200, 3800, 4200, 4600, 5100, 5500, 6200, 4900];
const DECISION_MAKER_COUNTS = [2, 3, 3, 4, 2, 5, 3, 4];
const PAGE_COUNTS = [32, 47, 28, 56, 41, 63, 38, 52];

// ===== UTILS HOISTED =====
const validateUrl = (url: string): boolean => {
    try {
        const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
        return !!parsed.hostname.includes('.');
    } catch {
        return false;
    }
};

const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
};

const getCompanyName = (url: string): string => {
    try {
        const hostname = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
        const name = hostname.split('.')[0];
        return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
    } catch {
        return 'Acme Inc';
    }
};

const getDemoData = (url: string) => {
    const hash = hashString(url);
    return {
        companyName: getCompanyName(url),
        painPoint: PAIN_POINTS_LIBRARY[hash % PAIN_POINTS_LIBRARY.length],
        savings: SAVINGS_RANGES[hash % SAVINGS_RANGES.length],
        decisionMakers: DECISION_MAKER_COUNTS[hash % DECISION_MAKER_COUNTS.length],
        pages: PAGE_COUNTS[hash % PAGE_COUNTS.length],
    };
};

const Agents: React.FC = () => {
    const navigate = useNavigate();
    const { stop, start } = useLenis();

    // ===== INTERACTIVE DEMO STATE =====
    const [demoUrl, setDemoUrl] = useState('https://acme-inc.com');
    const [demoRunning, setDemoRunning] = useState(false);
    const [demoComplete, setDemoComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showProposalModal, setShowProposalModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [urlValid, setUrlValid] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [progressPercent, setProgressPercent] = useState(100);
    const [emailCopied, setEmailCopied] = useState(false);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setDemoUrl(newUrl);
        setUrlValid(validateUrl(newUrl) || newUrl === '');
    };

    const demoData = React.useMemo(() => getDemoData(demoUrl), [demoUrl]);

    const runDemo = useCallback(() => {
        if (!validateUrl(demoUrl)) {
            setUrlValid(false);
            return;
        }

        setDemoRunning(true);
        setDemoComplete(false);
        setCurrentStep(0);
        setProgressPercent(0);
        setElapsedTime(0);

        const stepDurations = [1200, 900, 600, 2000];
        const totalDuration = stepDurations.reduce((a, b) => a + b, 0);
        let stepIndex = 1;
        const startTime = Date.now();

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            setElapsedTime(elapsed / 1000);
            setProgressPercent(Math.min(100, (elapsed / totalDuration) * 100));
        }, 50);

        const advanceStep = () => {
            setCurrentStep(stepIndex);
            stepIndex++;
            if (stepIndex <= 4) {
                setTimeout(advanceStep, stepDurations[stepIndex - 1]);
            } else {
                clearInterval(progressInterval);
                setDemoRunning(false);
                setDemoComplete(true);
                setProgressPercent(100);
                setElapsedTime(totalDuration / 1000);
            }
        };

        setCurrentStep(1);
        setTimeout(advanceStep, stepDurations[0]);
    }, [demoUrl]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !demoRunning) {
            runDemo();
        }
    };

    const copyEmailToClipboard = () => {
        const emailText = `Subject: Built this for ${demoData.companyName} — took 3 mins, might save you $${demoData.savings.toLocaleString()}/mo

Hey —

I was researching ${demoData.companyName} and noticed something that felt familiar: ${demoData.painPoint.toLowerCase()}.

So I ran your site through our proposal engine just to see what it would spit out.

Result: a personalized 12-page strategy deck in 181 seconds. Scraped ${demoData.pages} pages, found ${demoData.decisionMakers} decision makers, and calculated ~$${demoData.savings.toLocaleString()}/month in potential savings.

The demo is attached. No pitch, no calendar link, no follow-up sequence. Just wanted you to see what's possible.

If it's useful, reply and I'll explain how we built it. If not, no worries — keep the demo.

— Rhigden
Founder, Synto Labs
P.S. This email also took under 60 seconds to generate.`;

        navigator.clipboard.writeText(emailText);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    useEffect(() => {
        if (showProposalModal || showEmailModal) {
            stop();
            document.body.style.overflow = 'hidden';
        } else {
            start();
            document.body.style.overflow = '';
        }

        window.scrollTo(0, 0);

        return () => {
            document.body.style.overflow = '';
        };
    }, [showProposalModal, showEmailModal, stop, start]);

    return (
        <div className="bg-bg min-h-screen">
            <AgentsHeader />

            {/* PROPOSAL MODAL */}
            {showProposalModal && (
                <div
                    className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 md:p-6"
                    onClick={() => setShowProposalModal(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="proposal-modal-title"
                >
                    <div
                        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-auto p-8 md:p-12 border-[3px] border-primary shadow-[12px_12px_0] shadow-primary"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 id="proposal-modal-title" className="text-2xl font-black text-primary">The {demoData.companyName} Opportunity</h3>
                            <button 
                                onClick={() => setShowProposalModal(false)} 
                                className="text-gray-400 hover:text-black"
                                aria-label="Close modal"
                            >
                                <X size={24} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="space-y-8 text-sm md:text-base leading-relaxed text-gray-600">
                            <section>
                                <p className="text-lg font-black text-primary mb-2 uppercase tracking-tight">1. The Problem You Already Know</p>
                                <p>Right now, {demoData.companyName} is burning <strong className="text-red-600">20-40 hours per month</strong> on proposal writing. Work that doesn&apos;t close deals—it just hopes to.</p>
                                <p className="mt-4">We identified your core bottleneck: <strong>{demoData.painPoint}</strong>.</p>
                            </section>

                            <section className="bg-red-50 p-6 border-2 border-red-100">
                                <p className="font-black text-red-900 mb-4 uppercase tracking-tight">2. What Happens If Nothing Changes?</p>
                                <ul className="space-y-3 font-bold text-red-800">
                                    <li className="flex gap-2"><span>•</span> <span>$<AnimatedNumber value={demoData.savings * 12} /> on labor for proposal writing annually.</span></li>
                                    <li className="flex gap-2"><span>•</span> <span>Approx. <AnimatedNumber value={demoData.pages * 5} /> hours of senior time per year not closing.</span></li>
                                </ul>
                            </section>

                            <section>
                                <p className="text-lg font-black text-primary mb-4 uppercase tracking-tight">3. How Synto Changes the Math</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 border border-gray-200">
                                        <p className="text-[10px] font-black text-primary uppercase mb-1">↑ Outcome</p>
                                        <p className="font-bold text-primary">15h Research → 3min</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 border border-gray-200">
                                        <p className="text-[10px] font-black text-primary uppercase mb-1">↑ Precision</p>
                                        <p className="font-bold text-primary">{demoData.decisionMakers} Decision Makers</p>
                                    </div>
                                </div>
                            </section>

                            <div className="bg-primary p-8 text-white rounded-none">
                                <p className="text-xl font-black mb-2">Projected Impact: $<AnimatedNumber value={demoData.savings} />/month reclaimed</p>
                                <p className="text-white/70 text-sm">Generated in 181 seconds from <AnimatedNumber value={demoData.pages} /> pages of data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EMAIL MODAL */}
            {showEmailModal && (
                <div
                    className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
                    onClick={() => setShowEmailModal(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="email-modal-title"
                >
                    <div
                        className="bg-white max-w-xl w-full p-8 border-[3px] border-primary shadow-[12px_12px_0] shadow-primary"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 id="email-modal-title" className="text-xl font-black text-primary">Value-First Email Protocol</h3>
                            <button onClick={() => setShowEmailModal(false)} aria-label="Close modal">
                                <X size={24} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="font-mono text-xs bg-gray-50 p-6 border border-gray-200 leading-relaxed mb-8">
                            <p className="text-gray-400 mb-2">To: team@{demoData.companyName.toLowerCase().replace(/\s+/g, '')}.com</p>
                            <p className="text-gray-400 mb-4 pb-4 border-b border-gray-200">Subject: Built this for {demoData.companyName} — might save you ${demoData.savings.toLocaleString()}/mo</p>

                            <p className="mb-4">Hey —</p>
                            <p className="mb-4">I was researching {demoData.companyName} and noticed something: {demoData.painPoint.toLowerCase()}.</p>
                            <p className="mb-4">So I ran your site through our engine. Result: a 12-page strategy deck in 181s. Scraped {demoData.pages} pages, found {demoData.decisionMakers} decision makers, calculated ~${demoData.savings.toLocaleString()}/mo in potential savings.</p>
                            <p>Attachment: The {demoData.companyName} Proposal</p>
                        </div>

                        <button
                            onClick={copyEmailToClipboard}
                            className={`w-full py-4 text-sm font-black uppercase tracking-widest transition-all ${emailCopied ? 'bg-accent text-black' : 'bg-primary text-white hover:bg-black'}`}
                        >
                            {emailCopied ? 'Copied to Clipboard!' : 'Copy Email Script'}
                        </button>
                    </div>
                </div>
            )}

            <main id="main-content" className="pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <AnimatedSection animation="fadeUp" className="max-w-3xl mb-16 md:mb-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-accent/20">
                            <Sparkles size={12} aria-hidden="true" />
                            Multi-Agent Ecosystem
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-primary leading-[0.9] mb-8">
                            Autonomous <br />
                            <span className="text-gray-400">Agent Swarm.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium max-w-2xl">
                            We deploy parallel agent swarms that automate every phase of your B2B operations—research, outreach, and closing—with perfect logic and infinite scale.
                        </p>
                    </AnimatedSection>

                    <div className="mb-24">
                        <AnimatedSection animation="fadeUp" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: "Research Agent",
                                    icon: Bot,
                                    description: "Scours the web for deep business intelligence and generates high-conversion strategy decks.",
                                    features: ["Neural Web Scraping", "Hormozi Value Layer", "Automated PDFs"]
                                },
                                {
                                    title: "Voice Agent",
                                    icon: Cpu,
                                    description: "Ultra-low latency conversational AI handles inbound qualification and outbound follow-ups 24/7.",
                                    features: ["0.2s Response Time", "50+ Concurrent Calls", "CRM Native"]
                                },
                                {
                                    title: "Sales Agent",
                                    icon: Zap,
                                    description: "Manages pipeline, qualifies intent, and books meetings directly via native integrations.",
                                    features: ["Cal.com Native", "Intent Scoring", "Persistence Logic"]
                                },
                                {
                                    title: "Enrichment Agent",
                                    icon: Search,
                                    description: "Uncovers hidden contacts, tech stacks, and intent signals from sparse data points.",
                                    features: ["Waterfall Enrichment", "Tech Stack Analysis", "Intent Verification"]
                                },
                                {
                                    title: "Quality Agent",
                                    icon: ShieldCheck,
                                    description: "Critiques and refines every output against your brand guidelines before it ships.",
                                    features: ["Brand Voice Guard", "Fact Verification", "Tone Analysis"]
                                },
                                {
                                    title: "Knowledge Agent",
                                    icon: Brain,
                                    description: "Ingests URLs and docs to build a dynamic knowledge base for context-aware decisions.",
                                    features: ["Vector Memory", "Real-time Learning", "Context Injection"]
                                },
                                {
                                    title: "Video Agent",
                                    icon: Video,
                                    description: "Generates personalized video scripts and avatars for hyper-engaging outreach.",
                                    features: ["Avatar Generation", "Script Personalization", "HeyGen Integration"]
                                },
                                {
                                    title: "Brand Agent",
                                    icon: Palette,
                                    description: "Defines and enforces your unique voice across all automated communications.",
                                    features: ["Voice Cloning", "Style Guide Enforcement", "Persona Mgmt"]
                                }
                            ].map((agent, i) => {
                                const Icon = agent.icon;
                                return (
                                    <div key={i} className="gsap-stagger-child bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <Icon className="text-primary" size={32} aria-hidden="true" />
                                            </div>
                                            <div className="px-2 py-1 bg-gray-50 text-gray-400 text-[8px] font-black uppercase tracking-widest rounded-full border border-gray-100">
                                                Core Agent
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-black text-primary mb-4 uppercase tracking-tight">{agent.title}</h3>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-6">
                                            {agent.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {agent.features.map((feature, j) => (
                                                <span key={j} className="px-2.5 py-1 bg-accent/5 text-primary text-[9px] font-bold rounded-full border border-accent/10">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </AnimatedSection>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-24 items-start">
                        {/* Left: Interactive Demo (2/3 width on desktop) */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <div className="mb-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-primary/10">
                                        Live Simulation
                                    </div>
                                    <h3 className="text-3xl font-black text-primary mb-2 uppercase tracking-tight">The Proposal Engine</h3>
                                    <p className="text-gray-500 text-sm">Experience the speed: Agent 01 building a personalized 12-page strategy deck from a URL.</p>
                                </div>

                                <div className="bg-dark rounded-[3rem] border-4 border-primary shadow-[24px_24px_0] shadow-bg overflow-hidden">
                                    {/* Dashboard Header */}
                                    <div className="bg-primary p-5 flex justify-between items-center border-b border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${demoRunning ? 'bg-yellow-400 animate-pulse' : 'bg-accent'}`} />
                                            <span className="text-white text-[10px] font-black uppercase tracking-widest">
                                                SYNTO AGENT • {demoRunning ? 'RUNNING' : 'ONLINE'}
                                            </span>
                                        </div>
                                        <Terminal size={14} className="text-white/30" aria-hidden="true" />
                                    </div>

                                    {/* URL Input Bar */}
                                    <div className="p-6 bg-dark border-b border-white/5">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1 relative">
                                                <label htmlFor="demo-url" className="sr-only">Prospect website URL</label>
                                                <input
                                                    id="demo-url"
                                                    type="text"
                                                    value={demoUrl}
                                                    onChange={handleUrlChange}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="Enter prospect website (e.g. acme-inc.com)"
                                                    className={`w-full bg-black border-2 ${!urlValid ? 'border-red-500' : 'border-white/10'} p-4 text-white font-mono text-sm outline-none focus:border-accent transition-all`}
                                                    aria-invalid={!urlValid}
                                                    aria-describedby={!urlValid ? "url-error" : undefined}
                                                />
                                                {!urlValid && <p id="url-error" className="text-red-500 text-[10px] absolute -bottom-5 left-0">Please enter a valid URL</p>}
                                            </div>
                                            <button
                                                onClick={runDemo}
                                                disabled={demoRunning || !urlValid}
                                                className={`px-8 h-14 font-black uppercase tracking-widest text-xs transition-all ${demoRunning || !urlValid ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-accent text-black hover:bg-white'}`}
                                            >
                                                {demoRunning ? 'PRODUCING...' : 'RUN'}
                                            </button>
                                        </div>

                                        {/* Progress Bar */}
                                        {(demoRunning || demoComplete) && (
                                            <div className="mt-8 space-y-2" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
                                                <div className="flex justify-between items-center text-[10px] text-white/40 font-mono">
                                                    <span>PIPE_STATUS: {progressPercent.toFixed(0)}%</span>
                                                    <span>ELAPSED: {elapsedTime.toFixed(1)}s</span>
                                                </div>
                                                <div className="h-1 bg-white/5 overflow-hidden">
                                                    <div
                                                        className="h-full bg-accent transition-all duration-100"
                                                        style={{ width: `${progressPercent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pipeline Steps */}
                                    <div className="p-8 space-y-6">
                                        {[
                                            { id: 1, title: 'Scanning Website', desc: demoComplete || currentStep >= 1 ? `Found ${demoData.decisionMakers} decision makers` : 'Waiting...' },
                                            { id: 2, title: 'Extracting Pain Points', desc: demoComplete || currentStep >= 2 ? `Mapped: ${demoData.painPoint}` : 'Waiting...' },
                                            { id: 3, title: 'Quantifying ROI', desc: demoComplete || currentStep >= 3 ? `Projected: $${demoData.savings.toLocaleString()}/mo` : 'Waiting...' },
                                            { id: 4, title: 'Logic Construction', desc: demoComplete || currentStep >= 4 ? '12-page strategy deck finalized' : 'Waiting...' }
                                        ].map((step) => (
                                            <div key={step.id} className={`flex gap-4 items-start transition-opacity duration-500 ${currentStep >= step.id || demoComplete ? 'opacity-100' : 'opacity-20'}`}>
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 ${currentStep === step.id && demoRunning ? 'border-accent text-accent' : currentStep > step.id || demoComplete ? 'bg-accent border-accent text-black' : 'border-white/20 text-white/20'}`}>
                                                    {currentStep > step.id || demoComplete ? <Check size={14} aria-hidden="true" /> : (currentStep === step.id && demoRunning ? <Loader2 size={12} className="animate-spin" aria-hidden="true" /> : <span>{step.id}</span>)}
                                                </div>
                                                <div>
                                                    <p className="text-white text-xs font-black uppercase tracking-widest mb-1">{step.title}</p>
                                                    <p className="text-white/40 text-[10px] font-mono">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Result Buttons */}
                                        {demoComplete && (
                                            <div className="pt-8 flex flex-col md:flex-row gap-4 animate-fade-in">
                                                <button
                                                    onClick={() => setShowProposalModal(true)}
                                                    className="flex-1 bg-white p-4 h-14 text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-accent transition-all"
                                                >
                                                    <FileText size={16} aria-hidden="true" /> View Custom Proposal
                                                </button>
                                                <button
                                                    onClick={() => setShowEmailModal(true)}
                                                    className="flex-1 bg-transparent border-2 border-white/20 p-4 h-14 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all"
                                                >
                                                    <Send size={16} aria-hidden="true" /> Send Email Protocol
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right: Technical Specs & Guardrails */}
                        <div className="lg:sticky lg:top-40 space-y-12">
                            <AnimatedSection animation="fadeIn" className="bg-white p-10 rounded-[3rem] border-4 border-primary shadow-[12px_12px_0] shadow-bg relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 opacity-5" aria-hidden="true">
                                    <Shield size={200} />
                                </div>
                                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-6">
                                    <ShieldCheck size={16} aria-hidden="true" />
                                    System Integrity
                                </div>
                                <h3 className="text-2xl font-black text-primary mb-4">MFR Guardrails</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                    Every agent action is filtered through our Model-First Reasoning (MFR) layer. This ensures infinite scale without sacrificing the logic of your business.
                                </p>
                                <ul className="space-y-4 mb-10">
                                    {[
                                        "No-Hallucination Guarantee",
                                        "Adaptive Outcome Logic",
                                        "Deep Context Retention"
                                    ].map((check, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-primary">
                                            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                                                <Check size={10} strokeWidth={4} aria-hidden="true" />
                                            </div>
                                            {check}
                                        </li>
                                    ))}
                                </ul>
                                <MagneticButton className="w-full">
                                    <button className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-black transition-all">
                                        Technical Protocol
                                    </button>
                                </MagneticButton>
                            </AnimatedSection>

                            <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-200">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Availability Status</p>
                                <div className="flex items-center gap-4 text-sm font-bold text-primary">
                                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse" aria-hidden="true" />
                                    Open Beta: Infrastructure scaling to 10k seats.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AgentsFooter />
        </div>
    );
};

export default Agents;
