import { useState, type FC } from 'react';
import { SeoArticle, SeoBlock, SeoFaqItem } from '../../types';
import { ChevronDown } from 'lucide-react';

interface SeoArticleContentProps {
  article: SeoArticle;
}

interface SeoSection {
  heading?: { id?: string; title: string };
  blocks: SeoBlock[];
}

/**
 * Editorial FAQ Accordion.
 * - Only ONE FAQ item can be open at a time.
 * - Opening another FAQ automatically closes the previously open one.
 * - All FAQs are closed by default.
 * - Uses clean divider rules directly within the editorial flow (no nested cards).
 */
const SeoFaqAccordion: FC<{ items: SeoFaqItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-gray-200">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-3 first:pt-0 last:pb-0">
            <button
              id={`seo-faq-question-${index}`}
              type="button"
              onClick={() => toggleFaq(index)}
              className="w-full text-left flex items-center justify-between gap-3 text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer py-1"
              aria-expanded={isOpen}
              aria-controls={`seo-faq-answer-${index}`}
            >
              <span className="leading-snug">{faq.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>
            <div
              id={`seo-faq-answer-${index}`}
              role="region"
              aria-labelledby={`seo-faq-question-${index}`}
              className={`accordion-collapse-grid ${isOpen ? 'is-open' : ''}`}
            >
              <div className="accordion-collapse-inner">
                <div className="pt-2.5 pb-1 text-sm sm:text-base text-gray-700 leading-[2]">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SeoArticleContent: FC<SeoArticleContentProps> = ({ article }) => {
  // Group flat blocks into distinct sections separated by h2 headings
  const sections: SeoSection[] = [];
  let currentSection: SeoSection | null = null;

  for (const block of article.blocks) {
    if (block.type === 'h2') {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        heading: { id: block.id, title: block.title },
        blocks: []
      };
    } else {
      if (!currentSection) {
        currentSection = { blocks: [] };
      }
      currentSection.blocks.push(block);
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  const renderBlock = (block: SeoBlock, blockIndex: number) => {
    switch (block.type) {
      // Sub-headings inside a section content panel
      case 'h3':
        return (
          <h3
            key={blockIndex}
            id={block.id}
            className="text-base sm:text-lg font-bold text-gray-900 tracking-tight mt-5 mb-2.5 first:mt-0 scroll-mt-24"
          >
            {block.title}
          </h3>
        );

      case 'paragraph':
        return (
          <p key={blockIndex} className="text-sm sm:text-base text-gray-700 leading-[2] mb-3.5 last:mb-0">
            {block.text}
          </p>
        );

      case 'paragraphs':
        return (
          <div key={blockIndex} className="space-y-3.5 mb-3.5 last:mb-0">
            {block.texts.map((para, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-[2]">
                {para}
              </p>
            ))}
          </div>
        );

      case 'bulletList':
        return (
          <ul key={blockIndex} className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 leading-[2] my-3.5 last:mb-0">
            {block.items.map((item, iIdx) => (
              <li key={iIdx}>{item}</li>
            ))}
          </ul>
        );

      // Scoring calculation steps: clean flowing step list without nested cards
      case 'orderedList':
        return (
          <ol key={blockIndex} className="space-y-2.5 my-3.5 last:mb-0">
            {block.items.map((item, iIdx) => (
              <li key={iIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700 leading-[2]">
                <span className="font-bold text-blue-600 shrink-0 select-none">
                  Step {iIdx + 1}:
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );

      // Tables: natural flowing table with clean 1px borders directly within the content panel
      case 'table':
        return (
          <div key={blockIndex} id={block.id} className="overflow-x-auto my-4 last:mb-0">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-800 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                <tr>
                  {block.data.headers.map((header, hIdx) => (
                    <th key={hIdx} className="py-2.5 px-3.5 sm:px-4 border-r border-gray-200 last:border-r-0">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {block.data.rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`py-2.5 px-3.5 sm:px-4 border-r border-gray-200 last:border-r-0 ${
                          cIdx === 0 ? 'font-semibold text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      // Formula block: clean inline code/formula text without left border accent
      case 'formula':
        return (
          <div key={blockIndex} className="my-3.5 text-sm sm:text-base text-gray-800 leading-relaxed">
            {block.title && <span className="font-semibold text-gray-900 mr-2">{block.title}:</span>}
            <code className="bg-gray-100 text-gray-900 px-2.5 py-1 text-xs sm:text-sm font-mono border border-gray-200 rounded break-words inline-block">
              {block.formula}
            </code>
          </div>
        );

      // Callout note: clean left accent line without heavy nested card
      case 'callout':
        if (block.variant === 'formula') {
          return (
            <div key={blockIndex} className="my-3.5 text-sm sm:text-base text-gray-800 leading-relaxed">
              {block.title && <span className="font-semibold text-gray-900 mr-2">{block.title}:</span>}
              <code className="bg-gray-100 text-gray-900 px-2.5 py-1 text-xs sm:text-sm font-mono border border-gray-200 rounded break-words inline-block">
                {block.text}
              </code>
            </div>
          );
        }
        return (
          <div
            key={blockIndex}
            className="border-l-4 border-amber-400 pl-4 py-2.5 my-3.5 last:mb-0 text-xs sm:text-sm text-gray-700 leading-relaxed bg-amber-50/30"
          >
            {block.title && <strong className="font-bold text-gray-900 mr-1.5">{block.title}:</strong>}
            <span>{block.text}</span>
          </div>
        );

      // FAQs: single-open accordion with clean divider lines
      case 'faqs':
        return (
          <div key={blockIndex} className="my-2 last:mb-0">
            <SeoFaqAccordion items={block.items} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="seo-sections-wrapper space-y-6">
      {sections.map((section, sectionIdx) => (
        <section key={sectionIdx} className="w-full">
          {/* 1. Full-width light heading bar with a blue vertical accent on the left */}
          {section.heading && (
            <div
              className="section-heading-bar w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5 scroll-mt-24"
              data-section-id={section.heading.id}
            >
              <h2
                id={section.heading.id}
                className="text-base sm:text-lg font-bold text-gray-900 leading-snug scroll-mt-24"
              >
                {section.heading.title}
              </h2>
            </div>
          )}

          {/* 2. Section content directly below it inside a simple white area with only a thin 1px light border */}
          <div
            className={`w-full bg-white border border-gray-200 ${
              section.heading ? 'border-t-0' : ''
            } px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-[2]`}
          >
            {section.blocks.map((block, blockIdx) => renderBlock(block, blockIdx))}
          </div>
        </section>
      ))}
    </div>
  );
};
