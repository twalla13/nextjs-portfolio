import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Toniann Wallace — full-stack engineer with degrees in Mathematics and Software Engineering.',
};

export default function AboutPage() {
  return (
    <div className="bg-college-ruled min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <div className="mb-16">
          <span className="custom-text text-3xl">About Me</span>
          <div className="space-y-4 font-body text-slate-700 mt-5 leading-relaxed">
            <p>
              Hi, I&apos;m <strong>Toniann Wallace</strong> — a full-stack software engineer
              with degrees in <strong>Mathematics</strong> and{' '}
              <strong>Software Engineering</strong>.
            </p>
            <p>
              I specialise in building scalable web applications and cloud infrastructure.
              My go-to stack is React, Next.js, TypeScript, and AWS, but I&apos;m comfortable
              across the whole stack — from database design to UI polish.
            </p>
            <p>
              I&apos;m outgoing, detail-oriented, and always looking for interesting problems to
              solve. Whether it&apos;s designing a REST API, optimising a slow database query,
              or building a pixel-perfect component — I love shipping things that work well.
            </p>
          </div>

          <div className="flex gap-3 mt-7 flex-wrap">
            <Link href="/contact" className="btn-primary text-sm">
              Hire Me
            </Link>
            <a href="/resume.pdf" download className="btn-outline text-sm">
              Download Resume ↓
            </a>
          </div>
        </div>

        <div>
          <span className="custom-text text-2xl">Education</span>
          <div className="mt-8 space-y-4">
            {[
              { degree: 'B.S. Software Engineering', where: 'Arizonia State University', year: '2024' },
              { degree: 'B.S. Mathematics', where: 'SUNY Old Westbury', year: '2020' },
            ].map(({ degree, where, year }) => (
              <div
                key={degree}
                className="flex items-start gap-4 p-5 bg-white border-2 border-gray-200 rounded-xl"
              >
                <span
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-notebook-yellow border-2 border-notebook-yellow-dark rounded-lg text-lg"
                  aria-hidden="true"
                >
                  🎓
                </span>
                <div>
                  <p className="font-body font-semibold text-notebook-ink">{degree}</p>
                  <p className="font-body text-sm text-slate-500">{where} · {year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
