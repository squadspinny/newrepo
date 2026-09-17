import type { FC } from 'react';
import { Breadcrumbs } from '../components';
import { PageRoute } from '../types';
import { ShieldCheck, Layers, Eye, Users } from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const AboutPage: FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[{ label: 'About Us', isCurrent: true }]}
        onNavigate={onNavigate}
      />

      {/* Section 1: About */}
      <header className="border-b border-gray-200 pb-5 space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          About Score Calculator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-4xl leading-relaxed">
          Score Calculator is an educational website that helps students and test-takers calculate their exam scores. It offers free score calculators for a wide range of exams, making it easy to convert your marks into an estimated composite score.
        </p>
      </header>

      <div className="-mx-2 sm:mx-0 space-y-6">
        {/* Section 2: Our Goal */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Our Goal
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              The goal of the score calculator is simple: to make the scoring process easier so students don't have to solve complex formulas to find out their scores.
            </p>
            <p>
              We designed our calculators with a user-friendly interface and clear information, so you can calculate your score without any unnecessary steps.
            </p>
          </div>
        </section>

        {/* Section 3: Our Core Values */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Our Core Values
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Client-Side Privacy</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We collect zero student records. All calculation math runs client-side in your browser, keeping your scores private.
                </p>
              </div>

              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base mb-1">
                  <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Simplicity</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We design every calculator to be straightforward and easy to use — enter your answers, get your score. No accounts, no extra steps.
                </p>
              </div>

              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base mb-1">
                  <Eye className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Transparency</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We publish the exact section weights, composite point formulas, and historical score distribution for every exam.
                </p>
              </div>

              <div className="border border-gray-200 p-4">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base mb-1">
                  <Users className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>User First</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every decision we make  from design to data  is guided by what is best for students using our tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Why Trust ScoreCalculator.net? */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Why Trust Score Calculator?
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              You can trust scorecalculator.net for these reasons:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed pt-1">
              <li>
                <strong>Clear Calculations</strong> &ndash; The calculation method is openly explained.
              </li>
              <li>
                <strong>Updated Information</strong> &ndash; Calculators are updated based on the latest available exam structure and scoring details.
              </li>
              <li>
                <strong>Privacy-Focused</strong> &ndash; No unnecessary personal information is required to use the calculator.
              </li>
              <li>
                <strong>No False Claims</strong> &ndash; Estimated scores are not presented as official scores.
              </li>
              <li>
                <strong>Simple &amp; Easy to Use</strong> &ndash; The calculator is designed to be straightforward for students.
              </li>
              <li>
                <strong>Transparent Approach</strong> &ndash; Wherever a score is an estimate, it is clearly stated that the result is an estimate.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Meet the Founder */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Meet the Founder
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              Score Calculator was founded by{' '}
              <a
                href="https://www.instagram.com/hello_pradeep/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Pradeep Bijarniya
              </a>
              , a BCA graduate, with a simple idea: make exam score calculations easier for students. Instead of spending time working through formulas and different scoring rules, students can use simple calculators to get a quick score estimate.
            </p>
            <p>
              A small idea is growing into a useful collection of score calculators for different exams. Pradeep focuses on keeping the website simple, clear, and easy to use, while continuing to add and improve tools that can help students with their exam scores.
            </p>
          </div>
        </section>

        {/* Section 6: Important Note About Score Estimates */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-amber-500 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Important Note About Score Estimates
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              The results shown on the score calculator are estimates. These are not official exam scores and do not guarantee the actual result.
            </p>
            <p>
              Our calculators are not affiliated with, endorsed by, or sponsored by any testing organization. For official scores, final results, and exam information, please check with the relevant exam organization.
            </p>
          </div>
        </section>

        {/* Section 7: Contact Us */}
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Contact Us
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3.5">
            <p>
              Have a question, found an error, or want to suggest a new calculator? We’d love to hear from you. We usually respond within 24–48 hours.
            </p>
            <p>
              Email us at{' '}
              <a
                href="mailto:contact@scorecalculator.net"
                className="text-blue-600 hover:underline font-medium"
              >
                contact@scorecalculator.net
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
