'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactModal from './ContactModal';

const HomeSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="container mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        {/* Hero image */}
        <div className="relative flex-shrink-0 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
          {/* Decorative sticky-note label */}
          <div className="absolute -top-3 left-6 z-10 flex items-center gap-2">
            <span className="custom-text bg-notebook-yellow text-sm">toni</span>
            <Image
              src="/imgs/arrow.svg"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
              className="rotate-[-70deg] scale-x-[-1] opacity-80"
            />
          </div>

          <Image
            src="/imgs/optimized/hero-lg.webp"
            alt="Toniann Wallace at a computer"
            width={768}
            height={768}
            priority
            className="w-full h-full object-cover rounded-2xl"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, white 55%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, white 55%, transparent 100%)',
            }}
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left max-w-xl animate-slide-up">
          {/* Availability chip */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            <span className="font-body text-xs font-medium text-green-700">Available for opportunities</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-notebook-ink mb-4 leading-tight">
            Toniann Wallace:
            <br />
            <span className="text-notebook-blue-dark">Crafting Digital Solutions</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
            With degrees in Mathematics and Software Engineering, I build scalable web
            applications and cloud infrastructure — clean, fast, and built to last.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary text-base"
            >
              Hire Me
            </button>
            <Link href="/projects" className="btn-outline text-base">
              View My Work
            </Link>
          </div>
        </div>
      </section>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default HomeSection;
