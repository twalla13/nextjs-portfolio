/**
 * Project data — add your projects here.
 * Each project shows up on the /projects page.
 * Set featured: true to show it on the homepage (max 3).
 */

export type ProjectCategory = 'web' | 'cloud' | 'oop' | 'other';

export interface Project {
  id: string;
  title: string;
  /** One-line summary shown on cards */
  summary: string;
  /** Full description shown on the project detail (future) */
  description: string;
  techStack: string[];
  github?: string;
  liveUrl?: string;
  /** Path relative to /public, e.g. "/imgs/projects/my-app.webp" */
  screenshot?: string;
  whatILearned: string;
  featured: boolean;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    summary: 'The site you\'re looking at — built with Next.js, TypeScript, and Tailwind CSS, deployed on AWS.',
    description:
      'A fast, accessible portfolio showcasing my work. Built with Next.js App Router, TypeScript, Tailwind CSS. Statically exported and served via S3 + CloudFront. Contact form handled by AWS Lambda + SES.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'CloudFront', 'Lambda', 'SES'],
    github: 'https://github.com/toniwallace',
    liveUrl: 'https://tonidocs.com',
    screenshot: undefined,
    whatILearned:
      'Sharpened my skills in static site optimization, AWS deployment pipelines, Core Web Vitals tuning, and building accessible React components.',
    featured: true,
    category: 'web',
  },
  {
    id: 'cloud-project',
    title: 'Cloud Services Project',
    summary: 'Add a short one-line description of what this project does.',
    description: 'Replace this with a full description — what problem it solves, how it works, and key decisions made.',
    techStack: ['AWS', 'Node.js', 'React'],
    github: undefined,
    liveUrl: undefined,
    screenshot: undefined,
    whatILearned: 'Add what you learned building this project.',
    featured: true,
    category: 'cloud',
  },
  {
    id: 'oop-project',
    title: 'OOP Application',
    summary: 'Add a short one-line description of what this project does.',
    description: 'Replace this with a full description.',
    techStack: ['Java', 'Python', 'C++'],
    github: undefined,
    liveUrl: undefined,
    screenshot: undefined,
    whatILearned: 'Add what you learned building this project.',
    featured: true,
    category: 'oop',
  },
];
