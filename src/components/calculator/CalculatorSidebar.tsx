import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { CalculatorConfig, PageRoute } from '../../types';
import { getCalculatorPath } from '../../utils/slugs';
import { scrollToHeading } from '../../utils/scroll';
import {
  List,
  ChevronRight,
  Calculator,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CalculatorSidebarProps {
  currentCalc: CalculatorConfig;
  relatedCalcs: CalculatorConfig[];
  toc: { id: string; label: string }[];
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const CalculatorSidebar: FC<CalculatorSidebarProps> = ({
  currentCalc,
  relatedCalcs,
  toc,
  onNavigate
}) => {
  const handleScrollTo = (id: string) => {
    scrollToHeading(id);
  };

  return (
    <div className="space-y-6">
      {/* 1. Quick Navigation / Table of Contents - Shown in sidebar on desktop only */}
      {toc && toc.length > 0 && (
        <section className="hidden lg:block w-full">
          {/* Light heading bar with blue vertical accent */}
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-4 py-2.5 sm:py-3 flex items-center gap-2">
            <List className="w-4 h-4 text-blue-600 shrink-0" />
            <h3 className="text-sm font-bold text-gray-900 leading-snug">In This Guide</h3>
          </div>

          {/* Connected white content panel */}
          <div className="w-full bg-white border border-gray-200 border-t-0 p-4">
            <nav className="space-y-1" aria-label="Table of contents">
              {toc.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleScrollTo(item.id)}
                  className="w-full text-left flex items-center justify-between py-1.5 px-2 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/60 transition-colors group cursor-pointer"
                >
                  <span className="truncate pr-2">{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </nav>
          </div>
        </section>
      )}

      {/* 2. Related Calculators Widget */}
      {relatedCalcs && relatedCalcs.length > 0 && (
        <section className="w-full">
          {/* Light heading bar with blue vertical accent */}
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-4 py-2.5 sm:py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
              <h3 className="text-sm font-bold text-gray-900 leading-snug">Related Calculators</h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              {currentCalc.categoryLabel}
            </span>
          </div>

          {/* Connected white content panel */}
          <div className="w-full bg-white border border-gray-200 border-t-0 p-4">
            <div className="space-y-2">
              {relatedCalcs.map((calc) => (
                <Link
                  key={calc.id}
                  to={getCalculatorPath(calc)}
                  onClick={() => onNavigate?.('calculator', calc.id)}
                  className="block p-2.5 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all group no-underline"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                      {calc.shortName}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      {calc.categoryLabel}
                    </span>
                    <span className="text-[10px] text-gray-400">Score Estimator</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 text-center">
              <Link
                to="/all-calculators"
                onClick={() => onNavigate?.('all-calculators')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 no-underline"
              >
                <span>Browse All Calculators</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. Explore Categories - Displayed ONE PER ROW */}
      <section className="w-full">
        {/* Light heading bar with blue vertical accent */}
        <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-4 py-2.5 sm:py-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 shrink-0" />
          <h3 className="text-sm font-bold text-gray-900 leading-snug">Explore Categories</h3>
        </div>

        {/* Connected white content panel */}
        <div className="w-full bg-white border border-gray-200 border-t-0 p-4">
          <div className="space-y-2">
            <Link
              to="/all-calculators"
              onClick={() => onNavigate?.('all-calculators')}
              className="p-2.5 flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-colors no-underline group"
            >
              <div>
                <div className="text-xs font-bold text-gray-800 group-hover:text-blue-700">AP Exams</div>
                <div className="text-[10px] text-gray-500 mt-0.5">20+ Subjects</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
            </Link>

            <Link
              to="/all-calculators"
              onClick={() => onNavigate?.('all-calculators')}
              className="p-2.5 flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-colors no-underline group"
            >
              <div>
                <div className="text-xs font-bold text-gray-800 group-hover:text-blue-700">College & Grad</div>
                <div className="text-[10px] text-gray-500 mt-0.5">SAT, ACT & More</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
            </Link>

            <Link
              to="/all-calculators"
              onClick={() => onNavigate?.('all-calculators')}
              className="p-2.5 flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-colors no-underline group"
            >
              <div>
                <div className="text-xs font-bold text-gray-800 group-hover:text-blue-700">Academic & GPA</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Weighted & Final</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
            </Link>

            <Link
              to="/all-calculators"
              onClick={() => onNavigate?.('all-calculators')}
              className="p-2.5 flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-colors no-underline group"
            >
              <div>
                <div className="text-xs font-bold text-gray-800 group-hover:text-blue-700">Math & Stats</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Standard Dev & IQR</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
