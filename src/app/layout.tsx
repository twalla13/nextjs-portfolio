import type { Metadata } from 'next';
import { Inter, Handlee } from 'next/font/google';
import Script from 'next/script';
import clsx from 'clsx';
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const handlee = Handlee({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-handlee',
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tonidocs.com'),
  title: {
    default: 'Toniann Wallace — Full-Stack Engineer',
    template: '%s · Toniann Wallace',
  },
  description:
    'Full-stack engineer with degrees in Mathematics and Software Engineering. ' +
    'Specialising in React, Next.js, TypeScript, and AWS cloud infrastructure.',
  keywords: ['full-stack engineer', 'React', 'Next.js', 'TypeScript', 'AWS', 'software engineer'],
  authors: [{ name: 'Toniann Wallace', url: 'https://tonidocs.com' }],
  openGraph: {
    type: 'website',
    url: 'https://tonidocs.com',
    siteName: 'Toniann Wallace',
    title: 'Toniann Wallace — Full-Stack Engineer',
    description: 'Full-stack engineer crafting scalable web applications and cloud infrastructure.',
    images: [{ url: '/images/og-mage.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toniann Wallace — Full-Stack Engineer',
    description: 'Full-stack engineer crafting scalable web applications and cloud infrastructure.',
    images: ['/images/og-mage.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={clsx(inter.variable, handlee.variable)}>
      <body className="flex flex-col min-h-screen bg-notebook-paper font-body antialiased">
        {/* Skip-to-content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                     focus:px-4 focus:py-2 focus:bg-notebook-yellow focus:border-2
                     focus:border-notebook-ink focus:rounded focus:font-body focus:font-semibold"
        >
          Skip to main content
        </a>

        <NavBar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Plausible analytics — privacy-friendly, no cookie banner required.
            Sign up at plausible.io and add tonidocs.com to get started. */}
        <Script
          defer
          data-domain="tonidocs.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
