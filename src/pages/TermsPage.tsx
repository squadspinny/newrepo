import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components';
import { PageRoute } from '../types';

interface TermsPageProps {
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const TermsPage: FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[{ label: 'Terms of Service', isCurrent: true }]}
        onNavigate={onNavigate}
      />

      <header className="border-b border-gray-200 pb-5 space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Last Updated: September 15, 2026
        </p>
      </header>

      <div className="-mx-2 sm:mx-0 space-y-6">
        {/* Section 1: Acceptance of Terms */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              1. Acceptance of Terms
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              By using Score Calculator (the &ldquo;Service&rdquo;), you agree to these Terms of Service. If you do not agree with these terms, please do not use the website.
            </p>
          </div>
        </section>

        {/* Section 2: Educational & Informational Purpose */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              2. Educational &amp; Informational Purpose
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              All calculators, text, charts, formulas, and other content on Score Calculator are provided for <strong className="font-semibold text-gray-900">educational, informational, and self-study purposes only</strong>.
            </p>
            <p>
              Our calculators provide estimates and should not be treated as official academic certification, admissions advice, official test results, or test administration services.
            </p>
            <p>
              For important academic or exam-related decisions, users should verify information and official results with the relevant examination or educational organization.
            </p>
          </div>
        </section>

        {/* Section 3: Intellectual Property */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              3. Intellectual Property
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              The software code, website design, calculator interfaces, original text, graphics, and other original content created by Score Calculator belong to ScoreCalculator.net and are protected by applicable intellectual property laws.
            </p>
            <p>
              You may use our calculators and content for personal, non-commercial study or classroom demonstration.
            </p>
            <p>
              You may not copy, reproduce, republish, modify, sell, or redistribute our original website content or tools without prior permission.
            </p>
            <p>
              Exam names, trademarks, and other third-party intellectual property belong to their respective owners.
            </p>
          </div>
        </section>

        {/* Section 4: Limitation of Liability */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              4. Limitation of Liability
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              Score Calculator, its creators, and contributors are not responsible for decisions, losses, damages, academic outcomes, college admission outcomes, or testing results that may result from using or relying on information or calculator results provided on this website, to the extent permitted by applicable law.
            </p>
            <p>
              Calculator results are estimates and may differ from official results. Users are responsible for verifying important information before making academic, admission, or other decisions.
            </p>
          </div>
        </section>

        {/* Section 5: Website Availability */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              5. Website Availability
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              We make reasonable efforts to keep ScoreCalculator.net available and accurate, but we cannot guarantee that the website, calculators, or content will always be available, error-free, or completely up to date.
            </p>
            <p>
              We may update, modify, temporarily suspend, or discontinue any part of the website when necessary.
            </p>
          </div>
        </section>

        {/* Section 6: Changes to These Terms */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              6. Changes to These Terms
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              We may update these Terms of Service from time to time. When we make changes, we will update the <strong className="font-semibold text-gray-900">Last Updated</strong> date at the top of this page.
            </p>
            <p>
              By continuing to use ScoreCalculator.net after changes are posted, you agree to the updated Terms of Service.
            </p>
          </div>
        </section>

        {/* Section 7: Contact Us */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              7. Contact Us
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              If you have any questions about these Terms of Service, please contact us through our{' '}
              <Link
                to="/contact"
                onClick={() => onNavigate?.('contact')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Contact Us
              </Link>{' '}
              page.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
