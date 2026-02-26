import Link from 'next/link';

const HireMeSection = () => (
  <section
    id="contact"
    className="py-20 px-4 sm:px-6 bg-notebook-yellow border-y-2 border-notebook-yellow-dark"
  >
    <div className="container mx-auto text-center max-w-2xl">
      <span className="custom-text text-2xl bg-notebook-pink mb-6 inline-block">
        Let&apos;s build something together
      </span>

      <p className="font-body text-base sm:text-lg text-slate-700 mt-6 mb-8 leading-relaxed">
        I&apos;m open to freelance projects, full-time opportunities, and interesting
        collaborations. If you have an idea or a role that could be a fit, let&apos;s talk.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/contact" className="btn-primary text-base">
          Open contact form
        </Link>
        <a
          href="mailto:toniwallace97@outlook.com"
          className="btn-outline text-base"
        >
          Send a direct email
        </a>
      </div>
    </div>
  </section>
);

export default HireMeSection;
