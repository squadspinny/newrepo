import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../../types';
import { getCalculatorPath, getCalculatorSlug } from '../../utils/slugs';

export interface BreadcrumbItem {
  label: string;
  page?: PageRoute;
  calcId?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  const getItemHref = (item: BreadcrumbItem): string => {
    if (item.calcId) return getCalculatorPath(item.calcId);
    if (!item.page || item.page === 'home') return '/';
    return `/${item.page}`;
  };

  const getItemCanonicalUrl = (item: BreadcrumbItem): string => {
    if (item.calcId) return `https://scorecalculator.net/${getCalculatorSlug(item.calcId)}`;
    if (!item.page || item.page === 'home') return 'https://scorecalculator.net/';
    return `https://scorecalculator.net/${item.page}`;
  };

  // Generate JSON-LD schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://scorecalculator.net/'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: getItemCanonicalUrl(item)
      }))
    ]
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 -mx-2 sm:mx-0 bg-white border border-gray-200 px-3 py-2.5 sm:px-6 sm:py-3 text-[11px] text-gray-500 uppercase tracking-wider"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center flex-wrap gap-2">
        <li className="flex items-center gap-2">
          <Link
            to="/"
            onClick={() => onNavigate?.('home')}
            className="hover:text-blue-600 transition-colors font-medium cursor-pointer"
          >
            Home
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-gray-300 select-none">/</span>
            {item.isCurrent || (!item.page && !item.calcId) ? (
              <span className="text-gray-900 font-bold" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={getItemHref(item)}
                onClick={() => onNavigate?.(item.page || 'calculator', item.calcId)}
                className="hover:text-blue-600 transition-colors font-medium cursor-pointer"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
