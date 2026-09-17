import type { FC } from 'react';
import {
  FlaskConical,
  Dna,
  Atom,
  SquareRadical,
  Infinity as InfinityIcon,
  TrendingUp,
  Laptop,
  Leaf,
  Globe,
  Scroll,
  Landmark,
  Brain,
  PenTool,
  BookOpen,
  GraduationCap,
  Target,
  Briefcase,
  Scale,
  Stethoscope,
  Calculator,
  ArrowRight,
  Languages,
  Percent,
  BarChart3,
  Dice5,
  Coins
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CalculatorConfig } from '../../types';
import { getCardDescription } from '../../data';
import { getCalculatorPath } from '../../utils/slugs';

export function getExamIcon(id: string) {
  if (id.includes('chem')) return <FlaskConical className="w-4 h-4 text-slate-700" />;
  if (id.includes('bio')) return <Dna className="w-4 h-4 text-slate-700" />;
  if (id.includes('phys')) return <Atom className="w-4 h-4 text-slate-700" />;
  if (id === 'ap-calculus-ab') return <SquareRadical className="w-4 h-4 text-slate-700" />;
  if (id === 'ap-calculus-bc') return <InfinityIcon className="w-4 h-4 text-slate-700" />;
  if (id.includes('precalculus')) return <SquareRadical className="w-4 h-4 text-slate-700" />;
  if (id.includes('stat')) return <TrendingUp className="w-4 h-4 text-slate-700" />;
  if (id.includes('macro') || id.includes('micro')) return <Coins className="w-4 h-4 text-slate-700" />;
  if (id.includes('computer') || id.includes('csp')) return <Laptop className="w-4 h-4 text-slate-700" />;
  if (id === 'ielts' || id === 'pte') return <Languages className="w-4 h-4 text-slate-700" />;
  if (id.includes('environment')) return <Leaf className="w-4 h-4 text-slate-700" />;
  if (id.includes('geo')) return <Globe className="w-4 h-4 text-slate-700" />;
  if (id.includes('world-history')) return <Scroll className="w-4 h-4 text-slate-700" />;
  if (id.includes('us-history') || id.includes('gov')) return <Landmark className="w-4 h-4 text-slate-700" />;
  if (id.includes('psych')) return <Brain className="w-4 h-4 text-slate-700" />;
  if (id.includes('lang')) return <PenTool className="w-4 h-4 text-slate-700" />;
  if (id.includes('lit')) return <BookOpen className="w-4 h-4 text-slate-700" />;
  if (id === 'sat' || id === 'psat') return <GraduationCap className="w-4 h-4 text-slate-700" />;
  if (id === 'act') return <Target className="w-4 h-4 text-slate-700" />;
  if (id === 'gre') return <GraduationCap className="w-4 h-4 text-slate-700" />;
  if (id === 'gmat') return <Briefcase className="w-4 h-4 text-slate-700" />;
  if (id === 'lsat') return <Scale className="w-4 h-4 text-slate-700" />;
  if (id === 'mcat') return <Stethoscope className="w-4 h-4 text-slate-700" />;
  if (id === '5e-point-buy') return <Dice5 className="w-4 h-4 text-slate-700" />;
  if (id.includes('grade') || id.includes('gpa') || id.includes('marks')) return <Percent className="w-4 h-4 text-slate-700" />;
  if (id.includes('deviation') || id.includes('iqr')) return <BarChart3 className="w-4 h-4 text-slate-700" />;
  return <Calculator className="w-4 h-4 text-slate-700" />;
}

interface CalculatorCardProps {
  calc: CalculatorConfig;
  onClick?: () => void;
  id?: string;
}

export const CalculatorCard: FC<CalculatorCardProps> = ({ calc, onClick, id }) => {
  return (
    <Link
      to={getCalculatorPath(calc)}
      id={id || `calc-card-${calc.id}`}
      onClick={onClick}
      className="bg-white border border-gray-200 hover:border-blue-500 p-4 sm:p-5 transition-colors cursor-pointer flex flex-col justify-between h-full group no-underline text-inherit"
    >
      <div>
        {/* Header: Small Icon on Left, Calculator Title beside it */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-slate-700 shrink-0 border border-gray-200">
            {getExamIcon(calc.id)}
          </div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
            {calc.title}
          </h3>
        </div>

        {/* Short 2-line description below */}
        <p className="text-xs text-gray-500 line-clamp-2 mt-3 leading-relaxed h-9">
          {getCardDescription(calc)}
        </p>
      </div>

      {/* "Calculate →" at the bottom-left */}
      <div className="pt-4 mt-auto">
        <span className="text-blue-600 font-bold text-xs flex items-center gap-1 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all">
          Calculate <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};
