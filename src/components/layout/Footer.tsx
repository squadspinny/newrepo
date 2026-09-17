import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../../types';
import { getCalculatorPath } from '../../utils/slugs';
import logoImg from '../../assets/images/logo.png';

interface FooterProps {
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const Footer: FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 text-sm w-full max-w-full">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="sm:col-span-3 lg:col-span-4 space-y-4 lg:pr-6">
            <Link
              to="/"
              onClick={() => onNavigate?.('home')}
              className="inline-block select-none no-underline group"
            >
              <img
                src={logoImg}
                alt="Score Calculator - Free Exam Score Calculators"
                width="210"
                height="36"
                loading="lazy"
                decoding="async"
                className="h-8 sm:h-9 w-auto object-contain max-w-[200px] sm:max-w-[230px]"
              />
            </Link>
            <p className="text-gray-600 text-xs leading-relaxed max-w-sm">
              Score Calculator helps students estimate AP scores and calculate SAT, ACT, GRE, GMAT, LSAT, and MCAT scores using the latest available exam information and estimated score ranges.
            </p>
            <div className="pt-1">
              <Link
                id="footer-btn-all-calcs"
                to="/all-calculators"
                onClick={() => onNavigate?.('all-calculators')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold tracking-wide transition-all cursor-pointer min-h-[42px] no-underline shadow-xs group"
              >
                <span>Browse All Calculators</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* AP STEM Exams */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h4 className="text-gray-900 font-bold text-xs tracking-wider uppercase mb-3.5">
              AP STEM (2027)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to={getCalculatorPath('ap-chemistry')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Chemistry Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-biology')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Biology Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-physics')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Physics 1 Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-calculus-ab')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Calculus AB Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-calculus-bc')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Calculus BC Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-statistics')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Statistics Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-computer-science-a')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Computer Science A
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-environmental-science')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Environmental Science
                </Link>
              </li>
            </ul>
          </div>

          {/* AP Humanities & History */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="text-gray-900 font-bold text-xs tracking-wider uppercase mb-3.5">
              AP Humanities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to={getCalculatorPath('ap-us-history')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP U.S. History (APUSH)
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-world-history')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP World History Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-human-geography')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Human Geography
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-psychology')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP Psychology (75 MCQ)
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-english-language')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP English Language
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('ap-english-literature')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  AP English Literature
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions & Graduate */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h4 className="text-gray-900 font-bold text-xs tracking-wider uppercase mb-3.5">
              College & Graduate
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to={getCalculatorPath('sat')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  Digital SAT Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('act')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  ACT Composite Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('gre')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  GRE General Test Score
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('gmat')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  GMAT Focus Edition (205-805)
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('lsat')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  LSAT Score Calculator
                </Link>
              </li>
              <li>
                <Link to={getCalculatorPath('mcat')} className="text-gray-600 hover:text-blue-600 transition-colors inline-block py-0.5 no-underline">
                  MCAT Score Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Trademark Section */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-600">
              <Link to="/about" className="hover:text-blue-600 transition-colors no-underline text-gray-600 font-medium">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors no-underline text-gray-600 font-medium">
                Contact Us
              </Link>
              <Link to="/privacy" className="hover:text-blue-600 transition-colors no-underline text-gray-600 font-medium">
                Privacy Policy
              </Link>
              <Link to="/disclaimer" className="hover:text-blue-600 transition-colors no-underline text-gray-600 font-medium">
                Disclaimer
              </Link>
              <Link to="/terms" className="hover:text-blue-600 transition-colors no-underline text-gray-600 font-medium">
                Terms of Use
              </Link>
              <Link to="/sitemap" className="hover:text-blue-600 transition-colors no-underline text-gray-600 font-medium">
                HTML Sitemap
              </Link>
            </div>
            <p className="text-gray-500 shrink-0">
              &copy; 2026 Score Calculator. All rights reserved.
            </p>
          </div>

          <div className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
            <strong className="font-semibold text-gray-700">Disclaimer of Non-Affiliation:</strong> AP&reg;, Advanced Placement&reg;, SAT&reg;, and College Board&reg; are registered trademarks of the College Board. ACT&reg; is a registered trademark of ACT, Inc. GRE&reg; is a registered trademark of Educational Testing Service (ETS). GMAT&reg; is a registered trademark of the Graduate Management Admission Council (GMAC). LSAT&reg; is a registered trademark of the Law School Admission Council (LSAC). MCAT&reg; is a registered trademark of the Association of American Medical Colleges (AAMC). None of these trademark holders are affiliated with, sponsor, or endorse Score Calculator. All results are estimates intended for self-study and practice purposes.
          </div>
        </div>
      </div>
    </footer>
  );
};
