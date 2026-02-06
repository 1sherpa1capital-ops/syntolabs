import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail } from 'lucide-react';
import Logo from '../components/Logo';

const AboutTeam: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg">
            {/* Header */}
            <header className="px-6 md:px-12 py-6 border-b border-border">
                <div className="container-wide flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Logo className="w-8 h-8 text-primary" />
                        <div className="flex flex-col -gap-0.5">
                            <span className="text-2xl font-black tracking-tighter text-primary leading-none">SyntoLabs</span>
                            <span className="text-[9px] font-black tracking-[0.2em] text-accent uppercase leading-none mt-1">by synto labs</span>
                        </div>
                    </Link>
                    <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main id="main-content" className="px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-text mb-4">Meet the Team</h1>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            We're building the future of business communications—one voice at a time.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 mb-16">
                        <h2 className="text-2xl font-bold text-text mb-4">Our Mission</h2>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            At Synto Labs, we believe every inbound call matters. We're on a mission to ensure no business misses a lead, loses a customer, or drowns in administrative work. Our AI-powered voice agents handle the front desk so your team can focus on what matters most—growing your business.
                        </p>
                    </div>

                    {/* Team Members */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Rhigden Card */}
                        <div className="bg-surface border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-black text-white mb-6">
                                RS
                            </div>
                            <h3 className="text-xl font-bold text-text mb-1">Rhigden Sherpa</h3>
                            <p className="text-accent font-medium mb-4">Founder & Architect</p>
                            <p className="text-text-secondary mb-4 text-sm italic border-l-2 border-accent pl-3">
                                "I used to spend 90% of my time qualifying leads and only 10% actually selling. That operational inefficiency was the direct inspiration for Syntolabs."
                            </p>
                            <p className="text-text-secondary mb-6 text-sm">
                                Rhigden built the first version of Syntolabs to solve his own bottleneck. Now, he focuses on ensuring the AI engine maintains sub-second latency and human-level conversation fidelity.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="mailto:rhigden@syntolabs.xyz"
                                    className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email
                                </a>
                            </div>
                        </div>

                        {/* Sharad Card */}
                        <div className="bg-surface border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-3xl font-black text-white mb-6">
                                S
                            </div>
                            <h3 className="text-xl font-bold text-text mb-1">Sharad</h3>
                            <p className="text-accent font-medium mb-4">Founder & Growth</p>
                            <p className="text-text-secondary mb-4 text-sm italic border-l-2 border-accent pl-3">
                                "Scale shouldn't be a constraint of headcount. Syntolabs is the answer to that ceiling—infrastructure that grows as fast as your ambition."
                            </p>
                            <p className="text-text-secondary mb-6 text-sm">
                                Sharad leads growth and operational strategy at Syntolabs. He ensures seamless deployment, hitting the 72-hour guarantee while maintaining world-class service quality.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="mailto:rhigden@syntolabs.xyz"
                                    className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm"
                                >
                                    <Mail className="w-4 h-4" />
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-text mb-8 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'Customer First',
                                    description: 'Every decision we make prioritizes customer experience and outcomes.'
                                },
                                {
                                    title: 'Speed Matters',
                                    description: 'In business, every second counts. Our AI responds in under 500ms.'
                                },
                                {
                                    title: 'Trust & Security',
                                    description: 'HIPAA-compliant from day one. Your data is always protected.'
                                }
                            ].map((value, index) => (
                                <div key={index} className="bg-surface border border-border rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-text mb-2">{value.title}</h3>
                                    <p className="text-text-secondary text-sm">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutTeam;
