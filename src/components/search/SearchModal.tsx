import { useState, useEffect, useRef, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { allCalculators, searchCalculators, getCardDescription } from '../../data';
import { getExamIcon } from '../calculator/CalculatorCard';
import { getCalculatorPath } from '../../utils/slugs';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (calcId: string) => void;
}

export const SearchModal: FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCalculator
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? searchCalculators(query)
    : allCalculators.slice(0, 8);

  const handleSelect = (id: string) => {
    onSelectCalculator(id);
    navigate(getCalculatorPath(id));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white rounded-[5px] border border-slate-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exam calculators (e.g. AP Chemistry, SAT, MCAT, GRE)..."
            className="w-full text-base font-semibold text-slate-900 bg-transparent border-none focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-[5px] text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              No calculators found matching &ldquo;<span className="font-semibold text-gray-700">{query}</span>&rdquo;.
            </div>
          ) : (
            filtered.map((calc) => (
              <div
                key={calc.id}
                onClick={() => handleSelect(calc.id)}
                className="p-3 hover:bg-slate-50 rounded-[5px] cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 pr-4">
                  <div className="w-8 h-8 rounded-[5px] bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    {getExamIcon(calc.id)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {calc.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {getCardDescription(calc)}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-2.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center px-4">
          <span>{allCalculators.length} exams available</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded-[5px] text-[10px] font-mono shadow-2xs">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
};
