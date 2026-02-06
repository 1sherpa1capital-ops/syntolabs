import React, { useState } from 'react';
import { Plus, Minus, Quote, Star, ArrowRight, Sparkles, Users } from 'lucide-react';
import { BOOKING_URL } from '../config/constants';

export const Testimonials: React.FC = () => {
    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="testimonials">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-8 md:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                        <Sparkles size={14} />
                        Client Success Stories
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-primary mb-4">
                        Why Businesses Are <span className="text-accent">Switching to AI</span>
                    </h2>
                    <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
                        We're helping service businesses capture more leads and automate their workflows. Here's what our clients are saying.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Quote Placeholder 1 */}
                    <div className="card-feature flex flex-col h-full">
                        <div className="card-visual card-gradient-green-soft">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-muted-bg flex items-center justify-center mx-auto mb-3">
                                    <Quote size={24} className="text-text-muted" />
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-text-muted">
                                    Client Feedback
                                </div>
                            </div>
                        </div>
                        <div className="card-content flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 rounded-lg bg-accent/10 text-accent">
                                    <Quote size={14} fill="currentColor" />
                                </div>
                                <div className="flex gap-0.5 text-border">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                </div>
                            </div>
                            <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1 italic">
                                "The ability to qualify leads before they even hit our calendar has been a game changer. We used to spend hours calling back no-shows; now our AI assistant just books the serious ones."
                            </p>
                            <div className="pt-4 border-t border-border-subtle">
                                <div className="font-bold text-text-muted mb-0.5">Business Owner</div>
                                <div className="text-xs text-text-muted">
                                    Service Business · Miami, FL
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modeled Scenario Card */}
                    <div className="card-feature flex flex-col h-full border-2 border-accent/20">
                        <div className="card-visual card-gradient-teal">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-2">
                                    $15k
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-accent">
                                    Projected Monthly Recovery
                                </div>
                            </div>
                        </div>
                        <div className="card-content flex flex-col flex-1">
                            <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-4 w-fit">
                                Projected Results
                            </div>
                            <p className="text-text-default text-sm leading-relaxed mb-6 flex-1">
                                <span className="font-bold">Example scenario:</span> A professional services firm recovering an estimated $15k per month in opportunities that used to be lost to missed calls and slow follow-up.
                            </p>
                            <div className="pt-4 border-t border-border-subtle">
                                <p className="text-[10px] text-text-muted italic">
                                    Based on internal estimates. Actual results will vary by business.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Early Access CTA Card */}
                    <div className="card-feature flex flex-col h-full bg-primary">
                        <div className="card-visual bg-primary/50 border-b border-text-on-primary/10">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                                    <Users size={24} className="text-cta-text" />
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-accent">
                                    Limited Availability
                                </div>
                            </div>
                        </div>
                        <div className="card-content flex flex-col flex-1 bg-primary">
                            <h3 className="text-lg font-bold text-text-on-primary mb-3">Start Your Free Trial</h3>
                            <p className="text-text-on-primary/70 text-sm leading-relaxed mb-6 flex-1">
                                We're accepting a limited number of new clients each month to ensure quality implementation and support.
                            </p>
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-accent text-cta-text px-6 py-3 rounded-full text-sm font-bold hover:bg-surface-elevated transition-colors w-full"
                            >
                                Start Your Free Trial <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-text-muted">
                        All placeholders will be replaced with real testimonials as early access partners share results.
                    </p>
                </div>
            </div>
        </section>
    );
};

export const FAQ: React.FC = () => {
    const faqs = [
        {
            q: "Can the AI answer questions about my specific products or services?",
            a: "Yes. We train the AI on your specific offerings, pricing (if you want it shared), and availability. It handles questions about your products, services, and business details—just like your best team member would."
        },
        {
            q: "How does the AI integrate with my existing systems?",
            a: "Our AI integrates with popular calendar tools like Cal.com and Calendly, plus CRMs and workflow systems via Zapier or API. Setup typically takes under 72 hours, and we handle the configuration for you."
        },
        {
            q: "What happens if someone needs to speak to a human?",
            a: "The AI can detect urgency or specific requests (like VIP clients or complex issues) and warm-transfer the call to your team or a designated number. You're always in control."
        },
        {
            q: "Does this work with leads from paid advertising?",
            a: "Absolutely. Our AI answers calls from your ad campaigns and can follow up with form submissions from social media, search ads, and other lead sources—so no lead goes cold while your team is busy."
        },
        {
            q: "How is pricing structured?",
            a: "We offer usage-based plans with no per-seat fees. Book a demo to discuss what fits your business's call volume and workflow needs. Early access partners receive preferred pricing."
        },
        {
            q: "How long does setup take?",
            a: "Most businesses are live within 72 hours. We handle the training and configuration—you just provide your business info, calendar access, and any specific qualification criteria you want."
        }
    ];

    const [openIdx, setOpenIdx] = useState<number | null>(0);

    // Schema Markup for SEO
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };

    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-muted-bg" id="faq">
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <div className="max-w-[900px] mx-auto">
                <div className="text-center mb-8 md:mb-12 lg:mb-16">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-3 md:mb-4">Common Questions</div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-primary">
                        Questions from <span className="text-accent">business owners.</span>
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((f, i) => (
                        <div
                            key={i}
                            className={`card-feature transition-all duration-300 ${openIdx === i ? 'ring-2 ring-accent/20' : ''}`}
                        >
                            <button
                                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                aria-expanded={openIdx === i}
                                aria-controls={`faq-answer-${i}`}
                                className="w-full p-5 md:p-6 flex items-center justify-between text-left group"
                            >
                                <span className="text-base md:text-lg font-bold text-primary pr-4">{f.q}</span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIdx === i ? 'bg-accent text-text-on-primary' : 'bg-accent/10 text-accent'}`} aria-hidden="true">
                                    {openIdx === i ? (
                                        <Minus size={16} strokeWidth={3} />
                                    ) : (
                                        <Plus size={16} strokeWidth={3} />
                                    )}
                                </div>
                            </button>
                            <div 
                                id={`faq-answer-${i}`}
                                role="region"
                                className={`transition-all duration-300 ease-in-out ${openIdx === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                            >
                                <div className="px-5 md:px-6 pb-5 md:pb-6 text-text-muted leading-relaxed border-t border-border-subtle pt-4">
                                    {f.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
