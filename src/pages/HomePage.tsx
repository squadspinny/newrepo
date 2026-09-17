import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Award, CheckCircle2, ShieldCheck, Zap, X } from 'lucide-react';
import { allCalculators, getPopularCalculators, searchCalculators } from '../data';
import { ExamCategory, PageRoute } from '../types';
import { FaqAccordion, CalculatorCard } from '../components';
import { getCalculatorPath } from '../utils/slugs';

interface HomePageProps {
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const HomePage: FC<HomePageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ExamCategory>('all');

  const popular = getPopularCalculators();
  const searchResults = searchCalculators(searchQuery);

  const directoryCalculators = allCalculators.filter((calc) => {
    return activeCategory === 'all' || calc.category === activeCategory;
  });

  const generalFaqs = [
    {
      question: 'Are your AP Exam Calculators updated for the 2027 exam session?',
      answer: 'Yes, our AP exam calculator has been updated for the 2027 exams to reflect the current exam structure and scoring weights. Since the actual scoring and score conversion are determined by the College Board, the result provided by the calculator is an estimated score.'
    },
    {
      question: "Can my actual exam score be different from the calculator's estimate?",
      answer: "Yes, because the calculator provides results based on available scoring information, section weightings, and estimated score ranges. Since the final score is determined by the College Board, the calculator's results should not be considered an exact prediction."
    },
    {
      question: 'Is my test score data saved or sent to external servers?',
      answer: 'No. Score Calculator runs entirely in your web browser. Your test scores are neither sent to nor stored on any external server.'
    },
    {
      question: 'What is the passing score on an AP exam?',
      answer: 'There is officially no single "passing score" for AP exams. AP scores range from 1 to 5. Generally, scores of 3, 4, or 5 are considered qualifying scores, but policies regarding college credit or placement can vary by college and university.'
    },
    {
      question: 'Are the scores provided by these calculators official?',
      answer: 'No. Our calculators provide approximate results based on available exam information and estimated scoring ranges. Official scores are always issued directly by the respective testing organization.'
    }
  ];

  const homeFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1">
            <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Updated for the 2027 Official Exam Scoring Weights</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Free Online <span className="text-blue-600">Exam Score Calculators</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Estimate your AP exam scores and calculate Digital SAT, ACT, GRE, GMAT, LSAT, and MCAT scores with exam-specific calculators and estimated score ranges.
          </p>

          {/* Interactive Live Search Box */}
          <div className="max-w-2xl mx-auto relative pt-1">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                id="home-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g., AP Chemistry, Calculus BC, SAT, MCAT)..."
                className="w-full pl-11 pr-16 py-2.5 sm:py-3 text-sm font-medium text-gray-900 bg-white border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer flex items-center gap-1 transition-colors"
                  title="Clear search input"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Quick Suggestions Chips with clean 1px borders */}
            <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar mt-3.5 py-1">
              <div className="flex flex-nowrap lg:flex-wrap items-center justify-start lg:justify-center gap-2 text-xs text-gray-500 min-w-max lg:min-w-0 px-1 lg:px-0">
                <span className="font-bold uppercase tracking-wider text-[11px] text-gray-400 shrink-0">Popular:</span>
                {['ap-chemistry', 'sat', 'ap-calculus-ab', 'act', 'ap-biology', 'gre'].map((id) => {
                  const calc = allCalculators.find((c) => c.id === id);
                  if (!calc) return null;
                  return (
                    <Link
                      key={id}
                      to={getCalculatorPath(id)}
                      onClick={() => {
                        setSearchQuery('');
                        onNavigate?.('calculator', id);
                      }}
                      className="shrink-0 whitespace-nowrap px-3 py-1 bg-white hover:bg-blue-50 hover:text-blue-700 text-gray-700 border border-gray-200 transition-colors text-xs font-medium cursor-pointer no-underline"
                    >
                      {calc.shortName}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="-mx-2 sm:mx-0 space-y-6">
          {/* LIVE SEARCH RESULTS (Active when user types in search box) */}
          {searchQuery.trim() ? (
            <section id="live-search-results" className="w-full">
              <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  Live Search Results ({searchResults.length} {searchResults.length === 1 ? 'Calculator' : 'Calculators'} Found)
                </h2>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Clear Search &times;
                </button>
              </div>

              <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7">
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {searchResults.map((calc) => (
                      <CalculatorCard
                        key={calc.id}
                        id={`card-search-${calc.id}`}
                        calc={calc}
                        onClick={() => onNavigate?.('calculator', calc.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-10 h-10 bg-gray-100 text-gray-400 border border-gray-200 flex items-center justify-center mx-auto mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">No calculators found</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                      We couldn&rsquo;t find any score calculators matching &ldquo;<span className="font-semibold text-gray-700">{searchQuery}</span>&rdquo;. Try searching for another subject or test name.
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Clear Search & View All Calculators
                    </button>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <>
              {/* Popular Calculators Grid */}
              <section className="w-full">
                <div className="w-full bg-gray-50 border border-gray-200 px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    Popular Exam Calculators
                  </h2>
                  <Link
                    to="/all-calculators"
                    onClick={() => onNavigate?.('all-calculators')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer no-underline"
                  >
                    View All {allCalculators.length} Calculators <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {popular.slice(0, 6).map((calc) => (
                      <CalculatorCard
                        key={calc.id}
                        id={`card-popular-${calc.id}`}
                        calc={calc}
                        onClick={() => onNavigate?.('calculator', calc.id)}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Categories Directory */}
              <section className="w-full">
                <div className="w-full bg-gray-50 border border-gray-200 px-3 sm:px-6 py-2.5 sm:py-3.5">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    Explore by Exam Category
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Select an exam domain to quickly find your specific test calculation tool
                  </p>
                </div>

                <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 space-y-5">
                  {/* Filter Tabs */}
                  <div className="w-full overflow-x-auto no-scrollbar pb-1">
                    <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 min-w-max sm:min-w-0">
                      {[
                        { id: 'all', label: `All (${allCalculators.length})` },
                        { id: 'ap', label: `AP Exams (${allCalculators.filter(c => c.category === 'ap').length})` },
                        { id: 'standardized', label: `Standardized (${allCalculators.filter(c => c.category === 'standardized').length})` },
                        { id: 'college', label: `College Admissions (${allCalculators.filter(c => c.category === 'college').length})` },
                        { id: 'academic', label: `Academic (${allCalculators.filter(c => c.category === 'academic').length})` },
                        { id: 'math', label: `Math & Stats (${allCalculators.filter(c => c.category === 'math').length})` },
                        { id: 'grad', label: `Graduate (${allCalculators.filter(c => c.category === 'grad').length})` }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveCategory(tab.id as ExamCategory)}
                          className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer border ${activeCategory === tab.id
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-gray-200'
                            }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {directoryCalculators.map((calc) => (
                      <CalculatorCard
                        key={calc.id}
                        id={`card-cat-${calc.id}`}
                        calc={calc}
                        onClick={() => onNavigate?.('calculator', calc.id)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Why Choose Our Calculators */}
          <section className="w-full">
            <div className="w-full bg-gray-50 border border-gray-200 px-3 sm:px-6 py-2.5 sm:py-3.5">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                Why Students Trust Score Calculator
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Designed to make exam scoring simple, transparent, and reliable.
              </p>
            </div>

            <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="border border-gray-200 p-4 sm:p-5 space-y-2 bg-gray-50/50">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>2027 Exam Standards</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    We regularly update our calculators for the 2027 exam structure, question formats, and scoring weights using the latest available information.
                  </p>
                </div>

                <div className="border border-gray-200 p-4 sm:p-5 space-y-2 bg-gray-50/50">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base">
                    <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fast & Responsive</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    No unnecessary sign-ups, no extra steps, no waiting. Enter your scores and view your estimated result instantly.
                  </p>
                </div>

                <div className="border border-gray-200 p-4 sm:p-5 space-y-2 bg-gray-50/50">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Transparent Scoring Formulas</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Each calculator explains the scoring, section weights, and estimated score ranges so you can understand how the result is calculated.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Global Homepage FAQs */}
          <FaqAccordion
            faqs={generalFaqs}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about scaled scores, composite formulas, and college admissions thresholds."
            showAccentBorder={false}
          />
        </div>
      </div>
    </div>
  );
};
