import React from 'react';
import {
    Link as LinkIcon, Settings,
    Cpu, Mic2, Globe, Zap, ShieldAlert, FileAudio,
    MessageSquare, BookOpen, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdditionalFeatures: React.FC = () => {
    // Voice Platform Capabilities
    const platformCapabilities = [
        { icon: Cpu, title: "50+ Concurrent Calls", desc: "Massive scale with zero latency drop." },
        { icon: Mic2, title: "Brand Voice Cloning", desc: "Identical human-like voice replication." },
        { icon: Globe, title: "32+ Languages", desc: "Auto-detection & seamless response." },
        { icon: Zap, title: "Real-time CRM Sync", desc: "Native HubSpot & SFDC orchestration." },
        { icon: Settings, title: "MFR Guardrails", desc: "Zero-hallucination logic enforcement." },
        { icon: LinkIcon, title: "Short Booking Links", desc: "Native Cal.com scheduling engine." },
        { icon: ShieldAlert, title: "Spam Filtering", desc: "AI-powered junk call detection." },
        { icon: FileAudio, title: "Full Call Logs", desc: "Recordings, transcripts & insights." },
        { icon: MessageSquare, title: "Web Chat Widget", desc: "24/7 site visitor capture & chat." },
        { icon: BookOpen, title: "Custom Training", desc: "Syncs with your site & docs instantly." }
    ];

    const FeatureCard = ({ feature, index }: { feature: { icon: React.ElementType; title: string; desc: string }; index: number }) => {
        const Icon = feature.icon;
        return (
            <div
                className="bg-surface-elevated rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow border border-border-subtle animate-fade-in-up"
                style={{ animationDelay: `${index * 0.03}s` }}
            >
                <div className="w-10 h-10 rounded-xl bg-muted-bg flex items-center justify-center mb-3 border border-border-subtle">
                    <Icon size={18} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xs font-bold text-primary leading-tight mb-1">
                    {feature.title}
                </h3>
                <p className="text-[9px] text-text-muted leading-relaxed">
                    {feature.desc}
                </p>
            </div>
        );
    };

    return (
        <section className="px-4 sm:px-6 md:px-12 py-16 md:py-24 bg-muted-bg" id="features">
            <div className="max-w-[1200px] mx-auto">
                {/* Voice Platform Section */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-3">Voice AI Capabilities</div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-primary">
                        ...and so much more!
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {platformCapabilities.map((feature, i) => (
                        <FeatureCard key={i} feature={feature} index={i} />
                    ))}
                </div>

                {/* Subtle link to other services */}
                <div className="text-center mt-12">
                    <Link
                        to="/agents"
                        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors group"
                    >
                        Check Synto Labs other services
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AdditionalFeatures;
