const skills = [
  {
    id: 'cloud',
    title: 'Frontend',
    img: '/imgs/optimized/cloud.webp',
    alt: 'Cloud services illustration',
    bg: 'bg-notebook-yellow',
    border: 'border-notebook-yellow-dark',
    tag: 'bg-notebook-blue',
    rotate: '-rotate-2',
    radius: '24px 38px 22px 34px',
    doodle: '⋯⋯',
    items: [
      'JavaScript',
      'TypeScript',
      'React',
      'React Native',
      'Expo',
      'Bootstrap',
      'Tailwind',
    ],
  },
  {
    id: 'oop',
    title: 'Backend',
    img: '/imgs/optimized/computer.webp',
    alt: 'Computer programming illustration',
    bg: 'bg-notebook-blue',
    border: 'border-notebook-blue-dark',
    tag: 'bg-notebook-yellow',
    rotate: 'rotate-2',
    radius: '34px 22px 36px 20px',
    doodle: '≈≈',
    items: ['Java', 'C', 'C++', 'Python', 'Node.js', 'REST APIs'],
  },
  {
    id: 'web',
    title: 'Cloud & Tools',
    img: '/imgs/optimized/html.webp',
    alt: 'HTML and CSS illustration',
    bg: 'bg-notebook-pink',
    border: 'border-notebook-pink-dark',
    tag: 'bg-notebook-yellow',
    rotate: '-rotate-1',
    radius: '28px 30px 20px 42px',
    doodle: '✦✦',
    items: [
      'Git / GitHub',
      'AWS',
      'Azure',
      'CI/CD Pipelines',
      'CodePipeline',
      'Docker',
    ],
  },
];

const SkillsTechSection = () => (
  <section id="about" className="py-16 px-4 sm:px-6">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {skills.map(({ id, title, img, alt, bg, border, tag, rotate, items, radius, doodle }, index) => (
          <div
            key={id}
            className={`sticky-note skill-doodle-card float-card ${bg} border-2 ${border} ${rotate} hover:rotate-0 flex flex-col min-h-[17.5rem] md:min-h-[18.5rem] overflow-hidden`}
            style={{ animationDelay: `${index * 0.5}s`, borderRadius: radius }}
          >
            <span className="skill-doodle-mark" aria-hidden="true">
              {doodle}
            </span>
            <span className="skill-doodle-ring" aria-hidden="true" />
            <span className="skill-doodle-ring skill-doodle-ring-2" aria-hidden="true" />

            <span
              className={`custom-text floating-label ${tag} absolute top-4 left-4 text-xl sm:text-2xl shadow-sm px-3 py-1`}
              style={{ animationDelay: `${0.2 + index * 0.35}s` }}
            >
              {title}
            </span>

            <div className="mt-20 flex flex-wrap justify-center content-start gap-3 flex-1 pr-14 pl-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="skill-chip px-3 py-1.5 bg-white/75 border border-white/60 text-notebook-ink text-sm sm:text-base font-medium font-body rounded-xl leading-none text-center"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="absolute right-3 bottom-3 opacity-95">
              <div className="skill-sticker">
                <img
                  src={img}
                  alt={alt}
                  width={96}
                  height={96}
                  className="w-20 h-20 object-contain motion-safe:animate-pulse"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsTechSection;
