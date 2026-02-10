import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        question: 'How much does it cost?',
        answer: 'Plans start at $2,500 for Workflow Discovery. Most businesses recover this investment within 2-3 weeks through time savings. Implementation starts at $5,000, with full automation available at $10,000+.'
    },
    {
        question: 'How long until we\'re live?',
        answer: '48 hours from kickoff to working prototype. We handle all technical setup, training, and integration while you focus on running your business.'
    },
    {
        question: 'What tools do you integrate with?',
        answer: 'We connect AI workflows to your existing tools—CRM (HubSpot, Salesforce, Pipedrive), email (Gmail, Outlook), calendars (Google Cal, Cal.com), databases, and custom APIs. No rip-and-replace required.'
    },
    {
        question: 'Do I need technical expertise?',
        answer: 'Not at all. We handle everything from discovery to deployment. You get trained documentation and ongoing support. Your team just uses the workflows we build.'
    },
    {
        question: 'What if my needs change?',
        answer: 'All plans include 30-day support, and Full Automation includes quarterly reviews and updates. We build for adaptability—your workflows evolve as your business grows.'
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-surface-elevated" id="faq">
            <div className="max-w-[900px] mx-auto">
                <div className="text-center mb-8 md:mb-12">
                    <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">
                        Questions & Answers
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-dark mb-4">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                    <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto">
                        Everything you need to know about implementing custom AI workflows.
                    </p>
                </div>

                <div className="space-y-0">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="border-b border-border last:border-b-0"
                            >
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="w-full py-5 md:py-6 flex items-start justify-between gap-4 text-left group transition-colors"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <span className="text-base md:text-lg font-bold text-primary group-hover:text-accent transition-colors pr-4">
                                        {item.question}
                                    </span>
                                    <span className="flex-shrink-0 mt-0.5 text-accent">
                                        {isOpen ? (
                                            <ChevronUp size={20} strokeWidth={2.5} />
                                        ) : (
                                            <ChevronDown size={20} strokeWidth={2.5} />
                                        )}
                                    </span>
                                </button>

                                <div
                                    id={`faq-answer-${index}`}
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                    aria-hidden={!isOpen}
                                >
                                    <p className="pb-5 md:pb-6 text-sm md:text-base text-text-muted leading-relaxed pr-8">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
