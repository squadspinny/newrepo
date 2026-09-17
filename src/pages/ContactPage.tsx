import { useState, type FC, type FormEvent } from 'react';
import { Breadcrumbs } from '../components';
import { PageRoute } from '../types';
import { Send, CheckCircle2, Clock } from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (page: PageRoute, calcId?: string) => void;
}

export const ContactPage: FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[{ label: 'Contact Us', isCurrent: true }]}
        onNavigate={onNavigate}
      />

      <header className="border-b border-gray-200 pb-5 space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          Contact the Score Calculator Team
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-4xl leading-relaxed">
          Have feedback about an exam, a suggestion for a new calculator, or a question? We'd love to hear from you. Feel free to reach out.
        </p>
      </header>

      <div className="-mx-2 sm:mx-0 space-y-6">
        <section className="w-full">
          <div className="w-full bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 px-3 sm:px-6 py-2.5 sm:py-3.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Send Us a Message
            </h2>
          </div>
          <div className="w-full bg-white border border-gray-200 border-t-0 px-3 py-3.5 sm:p-6 lg:p-7 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Contact Form */}
              <div className="md:col-span-7">
                {submitted ? (
                  <div className="text-center py-10 space-y-3 border border-gray-200 p-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Message Received!</h3>
                    <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Score Calculator. Our academic team reviews every inquiry and typically responds within 24 to 48 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: 'General Question', message: '' });
                      }}
                      className="mt-4 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Alex Johnson"
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@school.edu"
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Subject / Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option>Bug Report / Input Issue</option>
                        <option>Request a New Exam Calculator</option>
                        <option>General Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Message Details
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you'd like to share or ask..."
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2.5 px-5 text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="md:col-span-5 space-y-4 text-xs text-gray-600">
                <div className="border border-gray-200 p-4 space-y-2.5 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-sm">Response Time</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Average turnaround: 24 - 48 hours</span>
                  </div>
                  <p className="leading-relaxed">
                    We respond to student questions 7 days a week, especially during the AP and standardized testing seasons.
                  </p>
                </div>

                <div className="border border-gray-200 p-4 space-y-2 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 text-sm">Academic Partnerships</h3>
                  <p className="leading-relaxed">
                    Are you an AP teacher, or test prep tutor? We’d love to hear your feedback about our calculators and how they can be useful for students and classrooms.  
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
