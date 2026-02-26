import Link from 'next/link';
import { BiBookmarkHeart } from 'react-icons/bi';

const Footer = () => (
  <footer className="bg-notebook-ink text-white mt-auto">
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <BiBookmarkHeart className="text-notebook-pink text-xl" aria-hidden="true" />
            <span className="font-display text-xl font-semibold">Toniann Wallace</span>
          </div>
          <p className="font-body text-sm text-gray-400 max-w-xs">
            Full-stack engineer crafting digital solutions with React, Next.js, and AWS.
          </p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation" className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <Link href="/" className="font-body text-sm text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="font-body text-sm text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/projects" className="font-body text-sm text-gray-300 hover:text-white transition-colors">Projects</Link>
          <Link href="/contact" className="font-body text-sm text-gray-300 hover:text-white transition-colors">Contact</Link>
        </nav>

        {/* Social links */}
        <div className="flex gap-5">
          <a
            href="https://github.com/toniwallace"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-gray-300 hover:text-white transition-colors"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/toniann-wallace"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-gray-300 hover:text-white transition-colors"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
          <a
            href="mailto:toniwallace97@outlook.com"
            className="font-body text-sm text-gray-300 hover:text-white transition-colors"
            aria-label="Send email"
          >
            Email
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 pt-6 text-center">
        <p className="font-body text-xs text-gray-500">
          © 2025 Toniann Wallace · Built with Next.js · Hosted on AWS
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
