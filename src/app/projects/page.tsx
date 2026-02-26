'use client';

import { useState } from 'react';
import { projects, type ProjectCategory } from '@/data/projects';
import ProjectCard from '../components/ProjectCard';
import type { Metadata } from 'next';

// Note: metadata export doesn't work in client components in Next.js.
// SEO for this page is handled by the default title template in layout.tsx.
// If you want page-specific metadata, convert this back to a server component
// and move the filter state into a child client component.

const categories: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all',   label: 'All' },
  { value: 'web',   label: 'Web Dev' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'oop',   label: 'OOP' },
  { value: 'other', label: 'Other' },
];

export default function ProjectsPage() {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all');

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-college-ruled min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        {/* Page header */}
        <div className="mb-10">
          <span className="custom-text text-3xl">My Projects</span>
          <p className="font-body text-slate-500 text-base mt-3 max-w-xl">
            Things I&apos;ve designed, built, and shipped — covering web development,
            cloud infrastructure, and software engineering.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter projects by category">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              role="tab"
              aria-selected={active === value}
              onClick={() => setActive(value)}
              className={`px-4 py-1.5 rounded-full font-body text-sm font-medium border-2 transition-colors ${
                active === value
                  ? 'bg-notebook-ink text-white border-notebook-ink'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-notebook-ink hover:text-notebook-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="font-body text-slate-500 text-center py-20">
            No projects in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
