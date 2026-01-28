import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How much does it cost?',
    answer: 'Plans start at $2,500/month with a one-time setup fee. Most businesses recover this investment within 2-3 weeks through increased lead capture and conversion. We also offer a 7-day free trial so you can see results before committing.'
  },
  {
    question: 'What happens during the 7-day trial?',
    answer: 'We deploy a fully functional AI agent trained on your business. You\'ll see real results—actual calls answered, leads qualified, appointments booked. If you\'re not impressed with the results, you pay nothing.'
  },
  {
    question: 'How long until we\'re live?',
    answer: '72 hours from kickoff to first call. We handle all technical setup, voice training, and integration while you focus on running your business.'
  },
  {
    question: 'Will the AI sound robotic?',
    answer: 'Not at all. Modern AI voice technology uses natural language processing and can be trained with your specific tone, terminology, and brand voice. The AI sounds conversational and professional, with natural pauses and inflections.'
  },
  {
    question: 'What if the AI can\'t handle a call?',
    answer: 'The AI recognizes when it\'s outside its knowledge base and can transfer the call to your team with full context. You set the rules—transfer immediately, take a detailed message, or escalate via SMS/email to the appropriate team member.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16 lg:py-24 bg-bg" id="faq">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-4">
            Questions & Answers
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter text-primary leading-[0.95] mb-3 md:mb-4">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-text-muted font-medium max-w-2xl mx-auto">
            Everything you need to know about implementing AI voice agents for your business.
          </p>
        </div>

        <div className="space-y-0">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className="border-b border-border-subtle last:border-b-0"
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
                  <p className="pb-5 md:pb-6 text-sm md:text-base text-text-default leading-relaxed pr-8">
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
