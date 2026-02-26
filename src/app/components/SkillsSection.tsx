const skillGroups = [
  {
    title: 'Frontend',
    bg:     'bg-warm-blush',
    border: 'border-warm-coral',
    dot:    'bg-warm-coral',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML / CSS'],
  },
  {
    title: 'Backend',
    bg:     'bg-warm-teal-light',
    border: 'border-warm-teal',
    dot:    'bg-warm-teal',
    skills: ['Node.js', 'Java', 'Python', 'C++', 'REST APIs'],
  },
  {
    title: 'Cloud & Tools',
    bg:     'bg-warm-sage-light',
    border: 'border-warm-sage',
    dot:    'bg-warm-sage',
    skills: ['AWS', 'Azure', 'Git / GitHub', 'Docker', 'CI/CD'],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-16 px-4 sm:px-6">
    <div className="container mx-auto">

      <div className="mb-10 text-center md:text-left">
        <span className="custom-text text-2xl">Skills &amp; Technologies</span>
        <p className="font-body text-warm-muted text-sm mt-2">
          My core areas of expertise
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {skillGroups.map(({ title, bg, border, dot, skills }) => (
          <div
            key={title}
            className={`sticky-note ${bg} border-2 ${border}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2.5 h-2.5 rounded-full ${dot}`} aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-warm-ink">{title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-white/70 border border-white/50 text-warm-ink
                             text-xs font-body rounded-full shadow-subtle"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default SkillsSection;
