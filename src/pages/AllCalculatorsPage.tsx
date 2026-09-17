import { useState, type FC } from 'react';
import { Search, Calculator, X } from 'lucide-react';
import { allCalculators, searchCalculators } from '../data';
import { ExamCategory, PageRoute } from '../types';
import { Breadcrumbs, CalculatorCard } from '../components';

interface AllCalculatorsPageProps {
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const AllCalculatorsPage: FC<AllCalculatorsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ExamCategory>('all');

  const baseCalculators = search.trim() ? searchCalculators(search) : allCalculators;

  const filtered = baseCalculators.filter((c) => {
    return activeCategory === 'all' || c.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'All Calculators', isCurrent: true }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
          <Calculator className="w-4 h-4" /> Exam Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          All Exam Score Calculators (2027)
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
          Browse our complete catalog of {allCalculators.length} verified calculators for Advanced Placement (AP), college admissions (Digital SAT, ACT, PSAT), standardized language tests (IELTS, PTE), academic grades, and math & statistics.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[5px] border border-gray-200 shadow-sm">
        {/* Category Pills with responsive horizontal scroll on mobile/tablet */}
        <div className="w-full md:w-auto overflow-x-auto md:overflow-visible no-scrollbar py-0.5">
          <div className="flex flex-nowrap md:flex-wrap items-center gap-2 min-w-max md:min-w-0">
            {[
              { id: 'all', label: `All (${allCalculators.length})` },
              { id: 'ap', label: `AP Exams (${allCalculators.filter(c => c.category === 'ap').length})` },
              { id: 'standardized', label: `Standardized (${allCalculators.filter(c => c.category === 'standardized').length})` },
              { id: 'college', label: `College (${allCalculators.filter(c => c.category === 'college').length})` },
              { id: 'academic', label: `Academic (${allCalculators.filter(c => c.category === 'academic').length})` },
              { id: 'math', label: `Math & Stats (${allCalculators.filter(c => c.category === 'math').length})` },
              { id: 'grad', label: `Graduate (${allCalculators.filter(c => c.category === 'grad').length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as ExamCategory)}
                className={`shrink-0 whitespace-nowrap px-4 py-1.5 rounded-[5px] text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input with 5px border-radius */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter calculators..."
            className="w-full pl-9 pr-9 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-[5px] cursor-pointer"
              title="Clear filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((calc) => (
          <CalculatorCard
            key={calc.id}
            id={`calc-list-card-${calc.id}`}
            calc={calc}
            onClick={() => onNavigate?.('calculator', calc.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center bg-white border border-gray-200 rounded-[5px] p-6 shadow-sm">
          <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-[5px] flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-gray-800">No calculators found matching your search</p>
          <p className="text-xs text-gray-500 mt-1">Try another keyword or reset the filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[5px] text-xs font-bold transition-colors cursor-pointer"
          >
            Clear Filters & Search
          </button>
        </div>
      )}
    </div>
  );
};
