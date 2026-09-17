import { useEffect, useMemo, useState, type FC } from 'react';
import { CalculatorConfig, PageRoute } from '../types';
import { Breadcrumbs, CalculatorWidget, SeoArticleContent, CalculatorSidebar } from '../components';
import { getRelatedCalculators, getCalculatorSeoArticle } from '../data';
import { getCalculatorSlug } from '../utils/slugs';
import { scrollToHeading } from '../utils/scroll';
import { List, ChevronDown, ChevronRight } from 'lucide-react';

interface CalculatorPageProps {
  config: CalculatorConfig;
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

/**
 * Collapsible "In This Guide" component specifically for mobile and tablet views.
 * Displayed directly below the calculator and before the main SEO content.
 * Closed by default.
 */
const MobileInThisGuide: FC<{ toc: { id: string; label: string }[] }> = ({ toc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (id: string) => {
    const panel = document.getElementById('mobile-toc-panel');
    const collapsingEl = isOpen ? panel : null;
    setIsOpen(false);
    scrollToHeading(id, { adjustForCollapsingElement: collapsingEl });
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between text-left font-bold text-sm text-gray-900 hover:bg-gray-100/80 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-blue-600 shrink-0" />
          <span>In This Guide</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      <div
        id="mobile-toc-panel"
        role="region"
        aria-label="Table of contents"
        className={`accordion-collapse-grid ${isOpen ? 'is-open' : ''}`}
      >
        <div className="accordion-collapse-inner">
          <div className="w-full bg-white border border-gray-200 border-t-0 p-3.5 sm:p-4">
            <nav className="space-y-1" aria-label="Mobile table of contents">
              {toc.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className="w-full text-left flex items-center justify-between py-1.5 px-2 text-xs font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors group cursor-pointer"
                >
                  <span className="truncate pr-2">{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 shrink-0" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CalculatorPage: FC<CalculatorPageProps> = ({ config, onNavigate }) => {
  const related = useMemo(() => getRelatedCalculators(config), [config]);
  const seoArticle = useMemo(() => getCalculatorSeoArticle(config), [config]);

  // Update meta keywords for calculator
  useEffect(() => {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    const keywordsList = (config.keywords && config.keywords.length > 0)
      ? config.keywords.join(', ')
      : `${config.shortName}, ${config.title}, ${config.categoryLabel}, score calculator, 2027 curve, raw to scaled score`;
    metaKeywords.setAttribute('content', keywordsList);
  }, [config]);

  // Handle initial anchor link if present in URL
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        scrollToHeading(hashId);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [config.id]);

  // Generate structured JSON-LD schemas
  const slug = getCalculatorSlug(config);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.title,
    description: config.metaDescription,
    url: `https://scorecalculator.net/${slug}`,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'Score Calculator',
      url: 'https://scorecalculator.net/'
    }
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Schema.org Structured Data */}
      {config.faqs && config.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: 'All Calculators', page: 'all-calculators' },
          { label: config.shortName, calcId: config.id, isCurrent: true }
        ]}
        onNavigate={onNavigate}
      />

      {/* Page Header: Title and Introduction outside the calculator */}
      <header className="border-b border-gray-200 pb-5 space-y-2 mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {config.title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-4xl leading-relaxed">
          {config.overview}
        </p>
      </header>

      {/* 1. CALCULATOR TOOL */}
      <section id="calculator-section" aria-label="Calculator Tool" className="mb-8 -mx-2 sm:mx-0">
        <CalculatorWidget config={config} />
      </section>

      {/* 2. MOBILE/TABLET ONLY: Collapsible "In This Guide" Dropdown */}
      {seoArticle.tableOfContents && seoArticle.tableOfContents.length > 0 && (
        <div className="lg:hidden mb-8 -mx-2 sm:mx-0">
          <MobileInThisGuide toc={seoArticle.tableOfContents} />
        </div>
      )}

      {/* 3. TWO-COLUMN SEO CONTENT & SIDEBAR SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / FIRST: SEO Content Sections */}
        <div
          id="seo-article"
          className="lg:col-span-8 -mx-2 sm:mx-0"
        >
          <SeoArticleContent article={seoArticle} />
        </div>

        {/* RIGHT / SECOND: Reusable Sidebar Component (Stacks after SEO content on mobile/tablet) */}
        <aside
          aria-label="Calculator Navigation & Related Tools"
          className="lg:col-span-4 space-y-6 -mx-2 sm:mx-0"
        >
          <CalculatorSidebar
            currentCalc={config}
            relatedCalcs={related}
            toc={seoArticle.tableOfContents}
            onNavigate={onNavigate}
          />
        </aside>
      </div>
    </article>
  );
};
