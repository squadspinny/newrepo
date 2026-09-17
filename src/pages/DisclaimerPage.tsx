import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components';
import { PageRoute } from '../types';

interface DisclaimerPageProps {
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const DisclaimerPage: FC<DisclaimerPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[{ label: 'Disclaimer & Non-Affiliation', isCurrent: true }]}
        onNavigate={onNavigate}
      />

      <header className="border-b border-gray-200 pb-5 space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          Disclaimer &amp; Non-Affiliation
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Last Updated: September 15, 2026
        </p>
      </header>

      <div className="-mx-2 sm:mx-0 space-y-6">
        {/* Section 1: Independent Tool */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Independent Tool
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              Score Calculator is an <strong className="font-semibold text-gray-900">independent educational website</strong>. Our calculators are independently developed and are not official scoring tools of any examination board, testing agency, or educational organization.
            </p>
            <p>
              Score Calculator is <strong className="font-semibold text-gray-900">not affiliated with, sponsored by, endorsed by, or officially connected with</strong> the organizations mentioned on this website.
            </p>
          </div>
        </section>

        {/* Section 2: Score Estimates */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Score Estimates
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              All results provided by Score Calculator are <strong className="font-semibold text-gray-900">estimates for informational purposes only</strong>. They may not match the actual score reported by the relevant examination organization.
            </p>
            <p>
              Exam formats, weights, and score boundaries can change over time. We make reasonable efforts to keep our calculators updated, but we do not guarantee that the results will exactly match official scores.
            </p>
            <p>
              For official scores and the latest examination information, users should refer to the relevant examination organization&apos;s official resources.
            </p>
          </div>
        </section>

        {/* Section 3: Trademark Notices */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Trademark Notices
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              The following names and marks are trademarks or registered trademarks of their respective owners. Their use on Score Calculator is only for identification and does not imply affiliation or endorsement.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700 leading-relaxed">
              <li>
                <strong className="font-semibold text-gray-900">College Board®:</strong> AP®, Advanced Placement®, SAT®, PSAT/NMSQT®, and CLEP® are registered trademarks of the College Board.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">ACT®:</strong> ACT® is a registered trademark of ACT, Inc.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">ETS®:</strong> GRE® and TOEFL® are registered trademarks of the Educational Testing Service.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">GMAC®:</strong> GMAT® and GMAT Focus Edition® are registered trademarks of the Graduate Management Admission Council.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">LSAC®:</strong> LSAT® is a registered trademark of the Law School Admission Council.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">AAMC®:</strong> MCAT® is a registered trademark of the Association of American Medical Colleges.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Accuracy & Updates */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Accuracy &amp; Updates
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              We aim to provide accurate and useful information, but ScoreCalculator.net does not guarantee that all content or calculations will always be complete, current, or error-free.
            </p>
            <p>
              If you notice an incorrect trademark reference or other issue with this page, please contact us through our{' '}
              <Link
                to="/contact"
                onClick={() => onNavigate?.('contact')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Contact Us
              </Link>{' '}
              page.
            </p>
            <div className="pt-3 border-t border-gray-100">
              <p className="font-semibold text-gray-900">
                Score Calculator is an independent educational tool and is not affiliated with or endorsed by the organizations whose examinations or trademarks are referenced on this website.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
