import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { allCalculators, getCalculatorBySlug, getCalculatorSlug, getCalculatorPath } from './data';
import { updateRouteSeo } from './utils/seo';
import { Header, Footer, SearchModal } from './components';
import {
  HomePage,
  AllCalculatorsPage,
  CalculatorPage,
  AboutPage,
  ContactPage,
  PrivacyPage,
  DisclaimerPage,
  TermsPage,
  SitemapPage
} from './pages';

/**
 * Wrapper for dynamic calculator routes (/:slug).
 * Handles canonical redirects if an alias or raw ID is accessed (e.g. /ap-chemistry -> /ap-chemistry-score-calculator).
 */
function CalculatorRouteWrapper() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const calc = slug ? getCalculatorBySlug(slug) : undefined;

  useEffect(() => {
    if (calc && slug) {
      const canonicalSlug = getCalculatorSlug(calc);
      if (slug !== canonicalSlug) {
        navigate(`/${canonicalSlug}`, { replace: true });
      }
    }
  }, [calc, slug, navigate]);

  if (!calc) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[5px] flex items-center justify-center mx-auto text-2xl font-bold">
          ?
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Calculator Not Found</h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          The score calculator you requested could not be located or may have been renamed.
        </p>
        <div className="pt-2">
          <Link
            to="/all-calculators"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-[5px] text-xs font-bold transition-colors shadow-xs no-underline"
          >
            Browse All {allCalculators.length} Calculators
          </Link>
        </div>
      </div>
    );
  }

  return <CalculatorPage config={calc} />;
}

/**
 * Redirects legacy /calculator/:calcId URLs to the new clean canonical slug.
 */
function LegacyCalculatorRedirect() {
  const { calcId } = useParams<{ calcId: string }>();
  const calc = calcId ? getCalculatorBySlug(calcId) : undefined;
  const targetPath = calc ? getCalculatorPath(calc) : '/all-calculators';
  return <Navigate to={targetPath} replace />;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle legacy hash-based URLs (e.g. #/calculator/ap-chemistry -> /ap-chemistry-score-calculator)
  useEffect(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return;

    const parts = hash.split('/');
    let targetPath = '/';

    if (parts[0] === 'calculator' && parts[1]) {
      const found = getCalculatorBySlug(parts[1]);
      if (found) {
        targetPath = getCalculatorPath(found);
      }
    } else if (['all-calculators', 'about', 'contact', 'privacy', 'disclaimer', 'terms', 'sitemap'].includes(parts[0])) {
      targetPath = `/${parts[0]}`;
    } else if (parts[0]) {
      const found = getCalculatorBySlug(parts[0]);
      if (found) {
        targetPath = getCalculatorPath(found);
      }
    }

    // Replace browser URL cleanly without reload and remove hash
    window.history.replaceState(null, '', targetPath);
    navigate(targetPath, { replace: true });
  }, [navigate]);

  // Centralized SEO metadata and canonical synchronization upon route change
  useEffect(() => {
    updateRouteSeo(location.pathname);
    // Scroll to top upon page navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleSelectCalculatorFromSearch = (calcId: string) => {
    navigate(getCalculatorPath(calcId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] text-[#2d3748] font-sans antialiased selection:bg-blue-100 selection:text-blue-900 w-full max-w-full overflow-x-hidden">
      {/* Header with Navigation */}
      <Header onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-calculators" element={<AllCalculatorsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />

          {/* Backward compatibility: /calculator/:calcId -> /:slug */}
          <Route path="/calculator/:calcId" element={<LegacyCalculatorRedirect />} />

          {/* Clean SEO Calculator Slugs */}
          <Route path="/:slug" element={<CalculatorRouteWrapper />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCalculator={handleSelectCalculatorFromSearch}
      />
    </div>
  );
}
