import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components';
import { PageRoute } from '../types';

interface PrivacyPageProps {
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const PrivacyPage: FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[{ label: 'Privacy Policy', isCurrent: true }]}
        onNavigate={onNavigate}
      />

      <header className="border-b border-gray-200 pb-5 space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Last Updated: September 14, 2026
        </p>
        <p className="text-sm sm:text-base text-gray-600 max-w-4xl leading-relaxed">
          At <strong className="font-semibold text-gray-900">Score Calculator</strong>, we respect your privacy. This Privacy Policy explains what information we collect, how we use it, and what happens when you use our website.
        </p>
      </header>

      <div className="-mx-2 sm:mx-0 space-y-6">
        {/* Section 1: Information You Provide */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              1. Information We Collect
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              You can use our calculators without creating an account or providing personal information.
            </p>
            <p>
              If you contact us through our Contact Us form, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-700 leading-relaxed">
              <li>Name</li>
              <li>Email address</li>
              <li>Subject</li>
              <li>Message</li>
            </ul>
            <p>
              We use this information to respond to your questions, feedback, and suggestions.
            </p>
          </div>
        </section>

        {/* Section 2: Calculator Information */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              2. Calculator Information
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              Our calculators may ask you to enter marks, exam scores, or other information needed to calculate your result.
            </p>
            <p>
              Your calculator inputs are used to calculate the result and <strong className="font-semibold text-gray-900">are not stored as personal information by us</strong>.
            </p>
          </div>
        </section>

        {/* Section 3: Information Collected Automatically */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              3. Information Collected Automatically
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              When you visit Score Calculator, some basic technical information may be collected automatically. This can include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-700 leading-relaxed">
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Operating system</li>
              <li>Pages you visit</li>
              <li>Date and time of your visit</li>
              <li>General website usage information</li>
            </ul>
            <p>
              This information helps us maintain, secure, and improve the website.
            </p>
          </div>
        </section>

        {/* Section 4: Cookies */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              4. Cookies
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              Score Calculator and some third-party services may use cookies or similar technologies.
            </p>
            <p>
              Cookies are small files stored on your device that help websites work properly and understand how visitors use them.
            </p>
            <p>
              You can manage or delete cookies through your browser settings.
            </p>
          </div>
        </section>

        {/* Section 5: How We Use Information */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              5. How We Use Information
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              We may use collected information to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-700 leading-relaxed">
              <li>Respond to your messages</li>
              <li>Improve our website and calculators</li>
              <li>Fix technical problems</li>
              <li>Keep the website secure</li>
              <li>Understand general website usage</li>
            </ul>
            <p>
              We do not sell the personal information you provide through our Contact Us form.
            </p>
          </div>
        </section>

        {/* Section 6: Third-Party Websites */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              6. Third-Party Websites
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              Our website may contain links to other websites. These websites have their own privacy policies, and we are not responsible for how they collect or use information.
            </p>
          </div>
        </section>

        {/* Section 7: Children's Privacy */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              7. Children&apos;s Privacy
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              Our website provides educational calculators and information for students and other users.
            </p>
            <p>
              We do not knowingly collect personal information from children. If you believe a child has provided personal information through our website, please contact us so we can review it.
            </p>
          </div>
        </section>

        {/* Section 8: Changes to This Privacy Policy */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              8. Changes to This Privacy Policy
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              We may update this Privacy Policy when our website, services, or third-party providers change.
            </p>
            <p>
              Any updates will be posted on this page with a new <strong className="font-semibold text-gray-900">Last Updated</strong> date.
            </p>
          </div>
        </section>

        {/* Section 9: Contact Us */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              9. Contact Us
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              If you have questions about this Privacy Policy or how we handle information, please contact us through our{' '}
              <Link
                to="/contact"
                onClick={() => onNavigate?.('contact')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Contact Us
              </Link>{' '}
              page.
            </p>
            <div className="pt-2 text-sm sm:text-base text-gray-700 leading-relaxed space-y-1 border-t border-gray-100">
              <p>
                <strong className="font-bold text-gray-900">Score Calculator</strong>
              </p>
              <p>
                Website:{' '}
                <a
                  href="https://scorecalculator.net"
                  className="text-blue-600 hover:underline font-medium"
                >
                  scorecalculator.net
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
