import { useState, useEffect, useRef, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, BookOpen, GraduationCap, Award, Compass } from 'lucide-react';
import { getCalculatorPath } from '../../utils/slugs';
import logoImg from '../../assets/images/logo.png';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: FC<HeaderProps> = ({
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Scroll listener for header slide-up (scroll down) and slide-down (scroll up)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Header must remain visible when the user is at the top of the page
      if (currentScrollY <= 10) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // If mobile navigation drawer is open, keep header visible
      if (mobileMenuOpen) {
        setVisible(true);
        return;
      }

      // When user scrolls DOWN from the top, smoothly hide header with slide-up
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // When user scrolls UP even slightly, immediately/smoothly show header again with slide-down
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const pathname = location.pathname;
  const isHome = pathname === '/';
  const isAllCalcs = pathname === '/all-calculators';
  const isAp = pathname.includes('ap-');
  const isSatAct = pathname.includes('sat') || pathname.includes('act');
  const isGrad = pathname.includes('gre') || pathname.includes('gmat') || pathname.includes('lsat') || pathname.includes('mcat');
  const isAbout = pathname === '/about';

  return (
    <header
      id="site-header"
      className={`bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs w-full max-w-full transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <Link
            id="brand-logo"
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center select-none shrink-0 min-h-[44px] no-underline"
          >
            <img
              src={logoImg}
              alt="Score Calculator - Free Exam Score Calculators"
              width="210"
              height="40"
              decoding="async"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain max-w-[190px] xs:max-w-[220px] sm:max-w-[250px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-600">
            <Link
              id="nav-home"
              to="/"
              className={`transition-colors min-h-[44px] flex items-center no-underline ${
                isHome
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              id="nav-all-calcs"
              to="/all-calculators"
              className={`transition-colors min-h-[44px] flex items-center no-underline ${
                isAllCalcs
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              All Calculators
            </Link>
            <Link
              id="nav-ap-chemistry"
              to={getCalculatorPath('ap-chemistry')}
              className={`transition-colors min-h-[44px] flex items-center no-underline ${
                isAp
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              AP Exams
            </Link>
            <Link
              id="nav-sat"
              to={getCalculatorPath('sat')}
              className={`transition-colors min-h-[44px] flex items-center no-underline ${
                isSatAct
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              SAT/ACT
            </Link>
            <Link
              id="nav-gre"
              to={getCalculatorPath('gre')}
              className={`transition-colors min-h-[44px] flex items-center no-underline ${
                isGrad
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Grad Exams
            </Link>
            <Link
              id="nav-about"
              to="/about"
              className={`transition-colors min-h-[44px] flex items-center no-underline ${
                isAbout
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right Action: Search Icon Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon Button (Desktop & Mobile: opens search modal) */}
            <button
              id="btn-header-search"
              type="button"
              onClick={onOpenSearch}
              aria-label="Search exam calculators"
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-[5px] text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[5px] text-gray-700 hover:bg-gray-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-3 rounded-[5px] text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 min-h-[44px] no-underline"
          >
            <Compass className="w-5 h-5 text-blue-600" /> Home
          </Link>
          <Link
            to="/all-calculators"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-3 rounded-[5px] text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 min-h-[44px] no-underline"
          >
            <BookOpen className="w-5 h-5 text-blue-600" /> All Calculators
          </Link>
          <Link
            to={getCalculatorPath('ap-chemistry')}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-3 rounded-[5px] text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 min-h-[44px] no-underline"
          >
            <Award className="w-5 h-5 text-blue-600" /> AP Exam Calculators (2027)
          </Link>
          <Link
            to={getCalculatorPath('sat')}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-3 rounded-[5px] text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 min-h-[44px] no-underline"
          >
            <GraduationCap className="w-5 h-5 text-blue-600" /> SAT & ACT Score Calculators
          </Link>
          <Link
            to={getCalculatorPath('gre')}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-3 rounded-[5px] text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 min-h-[44px] no-underline"
          >
            <GraduationCap className="w-5 h-5 text-blue-600" /> GRE, GMAT, LSAT & MCAT
          </Link>
          <div className="pt-2 border-t border-gray-200 flex flex-col gap-1 text-sm font-medium text-gray-600">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-left px-3 py-2 hover:text-blue-600 min-h-[44px] flex items-center no-underline text-gray-600">About Us</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-left px-3 py-2 hover:text-blue-600 min-h-[44px] flex items-center no-underline text-gray-600">Contact Us</Link>
            <Link to="/disclaimer" onClick={() => setMobileMenuOpen(false)} className="text-left px-3 py-2 hover:text-blue-600 min-h-[44px] flex items-center no-underline text-gray-600">Exam Disclaimer</Link>
          </div>
        </div>
      )}
    </header>
  );
};
