'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiBookmarkHeart, BiMenu, BiX } from 'react-icons/bi';

const navLinks = [
  { href: '/',         label: 'Home'     },
  { href: '/about',    label: 'About'    },
  { href: '/projects', label: 'Projects' },
  { href: '/contact',  label: 'Contact'  },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-notebook-paper/95 backdrop-blur-sm shadow-sm border-b border-gray-200'
          : 'bg-notebook-paper border-b border-transparent'
      }`}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 hover:opacity-75 transition-opacity focus-visible:rounded"
          aria-label="Toniann Wallace — home"
        >
          <BiBookmarkHeart className="text-notebook-pink-dark text-xl" aria-hidden="true" />
          <span className="font-display text-xl font-semibold text-notebook-ink">Toniann</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 font-body text-sm font-medium rounded transition-colors ${
                  active
                    ? 'text-notebook-ink bg-notebook-yellow/60'
                    : 'text-slate-600 hover:text-notebook-ink hover:bg-gray-100'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}

          {/* Resume download — only shown if the file exists at /public/resume.pdf */}
          <a
            href="/resume.pdf"
            download
            className="ml-3 btn-outline text-sm py-1.5 px-4"
          >
            Resume ↓
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded text-notebook-ink hover:bg-gray-100 transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <BiX className="text-2xl" /> : <BiMenu className="text-2xl" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-200 bg-notebook-paper px-4 pb-5 pt-3 space-y-1 animate-fade-in"
        >
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2.5 font-body text-base rounded transition-colors ${
                  active
                    ? 'text-notebook-ink bg-notebook-yellow/60 font-semibold'
                    : 'text-slate-700 hover:text-notebook-ink hover:bg-gray-100'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
          <a
            href="/resume.pdf"
            download
            className="block px-3 py-2.5 font-body text-base text-slate-700 hover:text-notebook-ink transition-colors"
          >
            Resume ↓
          </a>
        </div>
      )}
    </header>
  );
};

export default NavBar;
