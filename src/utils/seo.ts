import { allCalculators } from '../data';
import { getCalculatorBySlug, getCalculatorSlug } from './slugs';

export interface SeoPageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
}

const STATIC_PAGE_METADATA: Record<string, { title: string; description: string }> = {
  '': {
    title: 'Score Calculator - Free Exam Score Calculators & 2027 Scoring Curves',
    description:
      'Calculate and predict your scores for AP exams (2027 structure), SAT, ACT, GRE, GMAT, LSAT, MCAT, and more with accurate scoring curves and detailed breakdowns.'
  },
  'all-calculators': {
    title: `All ${allCalculators.length} Exam & Academic Score Calculators (2027) | Score Calculator`,
    description:
      `Explore all ${allCalculators.length} free exam and academic score calculators including AP exams, SAT, ACT, GRE, GMAT, GPA, and statistical tools.`
  },
  'about': {
    title: 'About Score Calculator | Free Exam Score Prediction & Curves',
    description:
      'Learn about Score Calculator, the free educational platform built to help students calculate AP, SAT, ACT, GRE, GMAT, LSAT & MCAT exam scores.'
  },
  'contact': {
    title: 'Contact Score Calculator | Student Support & Feedback',
    description:
      'Get in touch with the Score Calculator team for questions, feedback, calculator suggestions, or student support.'
  },
  'privacy': {
    title: 'Privacy Policy | Score Calculator',
    description:
      'Read the Score Calculator Privacy Policy. Learn what information we collect, how we handle client-side score privacy, and how we protect your data.'
  },
  'disclaimer': {
    title: 'Exam Disclaimers & Non-Affiliation Notice | Score Calculator',
    description:
      'Review our exam disclaimers, trademark notices, and non-affiliation statements for College Board, ACT, ETS, GMAC, and other testing agencies.'
  },
  'terms': {
    title: 'Terms of Service | Score Calculator',
    description:
      'Review the Terms of Service for using Score Calculator, our score estimations, user responsibilities, and website conditions.'
  },
  'sitemap': {
    title: 'Complete Exam Calculator Directory & Sitemap | Score Calculator',
    description:
      `Complete directory of all ${allCalculators.length} score calculators, academic tools, and educational resources on Score Calculator.`
  }
};

/**
 * Derives the complete canonical SEO metadata for any route pathname.
 */
export function getRouteSeoMetadata(pathname: string): SeoPageMetadata {
  const cleanPath = pathname.replace(/^\//, '').trim().toLowerCase();

  // 1. Check static core pages
  if (STATIC_PAGE_METADATA[cleanPath] !== undefined) {
    const staticMeta = STATIC_PAGE_METADATA[cleanPath];
    const canonicalUrl = cleanPath
      ? `https://scorecalculator.net/${cleanPath}`
      : 'https://scorecalculator.net/';
    return {
      title: staticMeta.title,
      description: staticMeta.description,
      canonicalUrl,
      ogType: 'website'
    };
  }

  // 2. Check calculator pages
  const calc = getCalculatorBySlug(cleanPath);
  if (calc) {
    const canonicalSlug = getCalculatorSlug(calc);
    return {
      title: calc.seoTitle,
      description: calc.metaDescription,
      canonicalUrl: `https://scorecalculator.net/${canonicalSlug}`,
      ogType: 'article'
    };
  }

  // 3. Fallback to homepage metadata
  return {
    title: 'Score Calculator - Free Exam Score Calculators',
    description:
      'Calculate and predict your scores for AP exams (2027 structure), SAT, ACT, GRE, GMAT, LSAT, MCAT, and more with accurate scoring curves and detailed breakdowns.',
    canonicalUrl: 'https://scorecalculator.net/',
    ogType: 'website'
  };
}

/**
 * Updates document title, meta tags, canonical link, and Open Graph tags synchronously upon route change.
 * Ensures exactly one canonical tag exists and prevents stale metadata leaking between views.
 */
export function updateRouteSeo(pathname: string): void {
  const metadata = getRouteSeoMetadata(pathname);

  // 1. Document Title
  document.title = metadata.title;

  // Helper to get or create a meta tag
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrVal);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // 2. Meta description
  setMetaTag('name', 'description', metadata.description);

  // 3. Open Graph metadata
  setMetaTag('property', 'og:site_name', 'Score Calculator');
  setMetaTag('property', 'og:title', metadata.title);
  setMetaTag('property', 'og:description', metadata.description);
  setMetaTag('property', 'og:url', metadata.canonicalUrl);
  setMetaTag('property', 'og:type', metadata.ogType);
  setMetaTag('property', 'og:locale', 'en_US');
  setMetaTag('property', 'og:image', 'https://scorecalculator.net/favicons/favicon-96x96.png');
  setMetaTag('property', 'og:image:alt', 'Score Calculator - Free Exam Score Calculators');

  // 4. Twitter Card metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', metadata.title);
  setMetaTag('name', 'twitter:description', metadata.description);
  setMetaTag('name', 'twitter:url', metadata.canonicalUrl);
  setMetaTag('name', 'twitter:image', 'https://scorecalculator.net/favicons/favicon-96x96.png');

  // 5. Search Engine Crawling & Indexing
  setMetaTag('name', 'robots', 'index, follow');

  // 6. Canonical Link Lifecycle: ensure exactly one canonical tag exists
  const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
  if (existingCanonicals.length > 0) {
    existingCanonicals[0].setAttribute('href', metadata.canonicalUrl);
    // Remove any duplicate canonical tags if present
    for (let i = 1; i < existingCanonicals.length; i++) {
      existingCanonicals[i].remove();
    }
  } else {
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', metadata.canonicalUrl);
    document.head.appendChild(canonicalLink);
  }
}
