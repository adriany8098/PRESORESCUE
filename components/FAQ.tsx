
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Is this just AI or do real people help?",
      answer: "It's a tag-team effort. Our AI handles the initial structure and content logic, then a professional human designer takes over to polish the visuals, fix the charts, and ensure everything looks high-end. You get the speed of AI with the 'vibe check' of a human."
    },
    {
      question: "What if my slides are literally just a mess of notes?",
      answer: "That's exactly what we're here for! Just dump your rough notes, bullet points, or even a picture of your notebook. Our team will build a professional narrative from scratch."
    },
    {
      question: "Can my teacher tell I used this service?",
      answer: "We don't use generic templates. Every deck is custom-built to look like YOU spent hours on it. We focus on professional clarity, which is exactly what teachers look for in top-tier students."
    },
    {
      question: "What if I need changes after I get it back?",
      answer: "Our Express plan includes unlimited revisions. If something isn't perfect, just tell us and we'll fix it until you're ready to present with 100% confidence."
    },
    {
      question: "What file formats do you accept?",
      answer: "Everything. PPTX, Google Slides links, PDFs, Word docs, or even just plain text. We deliver the final product as a fully editable PowerPoint (.pptx) and a high-res PDF."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase mb-4 border border-indigo-500/20">
            <HelpCircle className="w-4 h-4" />
            Common Concerns
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Everything you need to know</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`glass rounded-3xl border border-white/5 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'border-indigo-500/30 bg-white/[0.05]' : 'hover:border-white/20'}`}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex justify-between items-center text-left"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors ${activeIndex === index ? 'text-indigo-400' : 'text-white'}`}>
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-8 transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-400 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background glow for the section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>
    </section>
  );
};

export default FAQ;
