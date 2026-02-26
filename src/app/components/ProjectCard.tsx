import Link from 'next/link';
import Image from 'next/image';
import { type Project, type ProjectCategory } from '@/data/projects';

const categoryStyles: Record<ProjectCategory, string> = {
  web:   'bg-notebook-pink   text-notebook-ink border-notebook-pink-dark',
  cloud: 'bg-notebook-blue   text-notebook-ink border-notebook-blue-dark',
  oop:   'bg-notebook-yellow text-notebook-ink border-notebook-yellow-dark',
  other: 'bg-gray-100        text-gray-700      border-gray-300',
};

const categoryLabel: Record<ProjectCategory, string> = {
  web:   'Web Dev',
  cloud: 'Cloud',
  oop:   'OOP',
  other: 'Other',
};

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group flex flex-col bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-notebook-lg hover:-translate-y-1 transition-all duration-300">
      {/* Screenshot or placeholder */}
      {project.screenshot ? (
        <div className="relative h-44 w-full overflow-hidden bg-gray-100">
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className={`h-44 w-full flex items-center justify-center border-b-2 border-gray-200 ${categoryStyles[project.category]}`}
          aria-hidden="true"
        >
          <span className="font-display text-4xl opacity-40">
            {project.category === 'web' ? '🌐' : project.category === 'cloud' ? '☁️' : '⚙️'}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        {/* Category badge */}
        <span className={`self-start px-2.5 py-0.5 text-xs font-semibold font-body rounded border mb-3 ${categoryStyles[project.category]}`}>
          {categoryLabel[project.category]}
        </span>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-notebook-ink mb-2 group-hover:text-notebook-blue-dark transition-colors">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="font-body text-sm text-slate-600 mb-4 flex-1 line-clamp-3">
          {project.summary}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-gray-100">
          {project.github ? (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium text-slate-600 hover:text-notebook-ink underline underline-offset-2 transition-colors"
            >
              GitHub ↗
            </Link>
          ) : null}
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium text-notebook-blue-dark hover:text-notebook-ink underline underline-offset-2 transition-colors"
            >
              Live Demo ↗
            </Link>
          ) : null}
          {!project.github && !project.liveUrl && (
            <span className="font-body text-sm text-slate-400 italic">Coming soon</span>
          )}
        </div>
      </div>
    </article>
  );
}
