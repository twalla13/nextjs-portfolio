import Link from 'next/link';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

const PortfolioSection = () => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="portfolio" className="py-16 px-4 sm:px-6 bg-white/60">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <div>
            <span className="custom-text text-3xl sm:text-4xl">My Work</span>
            <p className="font-body text-slate-600 text-base mt-2">
              A selection of things I&apos;ve built
            </p>
          </div>
          <Link
            href="/projects"
            className="font-body text-base font-medium text-notebook-blue-dark hover:text-notebook-ink underline underline-offset-4 transition-colors self-start sm:self-auto"
          >
            View all projects →
          </Link>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
