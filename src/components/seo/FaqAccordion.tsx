import { useState, type FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { CalculatorFaq } from '../../types';

interface FaqAccordionProps {
  faqs: CalculatorFaq[];
  title?: string;
  subtitle?: string;
  showAccentBorder?: boolean;
}

export const FaqAccordion: FC<FaqAccordionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Expert answers regarding scoring curves, college credit, and testing policies.',
  showAccentBorder = true
}) => {
  // All FAQs closed by default, only one open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  // Structured Data FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  return (
    <section className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div
        className={`w-full bg-gray-50 border border-gray-200 ${
          showAccentBorder ? 'border-l-4 border-l-blue-600' : ''
        } px-3 sm:px-6 py-2.5 sm:py-3.5`}
      >
        <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
          {title}
        </h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed">
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                <button
                  id={`faq-question-${idx}`}
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer py-1"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="text-sm md:text-base leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`accordion-collapse-grid ${isOpen ? 'is-open' : ''}`}
                >
                  <div className="accordion-collapse-inner">
                    <div className="pt-2.5 pb-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
