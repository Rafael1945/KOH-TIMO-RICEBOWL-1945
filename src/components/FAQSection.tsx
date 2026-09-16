import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { DEMO_FAQS } from '../data/faq';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-01');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FFF7E8] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-black uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Tanya Jawab
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#241A14] tracking-tight mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-base sm:text-lg text-[#57463A]">
            Punya pertanyaan seputar cara pemesanan, dine-in, atau menu Koh Timo? Cek jawabannya di bawah ini.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3.5">
          {DEMO_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={faq.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#241A14]/10 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D04]"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-[#241A14]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#E85D04] text-white' : 'bg-[#FFF7E8] text-[#241A14]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-ans-${faq.id}`}
                    className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#57463A] leading-relaxed border-t border-[#241A14]/5 animate-in fade-in slide-in-from-top-1 duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs text-[#57463A] inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#241A14]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>*Informasi di atas merupakan konten demo simulasi</span>
          </span>
        </div>
      </div>
    </section>
  );
};
