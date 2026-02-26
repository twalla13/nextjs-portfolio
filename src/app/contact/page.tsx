import type { Metadata } from 'next';
import ContactForm from '../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Toniann Wallace — available for freelance projects, full-time opportunities, and collaborations.',
};

export default function ContactPage() {
  return (
    <div className="bg-college-ruled min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <span className="custom-text text-3xl">Get In Touch</span>
            <p className="font-body text-slate-600 mt-4 leading-relaxed">
              Have a project in mind, an opportunity to discuss, or just want to say hello?
              Fill out the form below — I typically respond within 24 hours.
            </p>
            <p className="font-body text-sm text-slate-500 mt-2">
              Or email me directly at{' '}
              <a
                href="mailto:toniwallace97@outlook.com"
                className="text-notebook-blue-dark hover:text-notebook-ink underline underline-offset-2 transition-colors"
              >
                toniwallace97@outlook.com
              </a>
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-7 shadow-sm">
            <ContactForm />
          </div>

          {/* Social links below */}
          <div className="mt-8 flex gap-6 justify-center">
            <a
              href="https://github.com/toniwallace"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-slate-500 hover:text-notebook-ink transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/toniann-wallace"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-slate-500 hover:text-notebook-ink transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
