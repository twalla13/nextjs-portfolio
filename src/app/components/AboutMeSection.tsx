import Image from 'next/image';

const skills = [
  {
    id: 'cloud',
    title: 'Cloud Services',
    body: 'Utilize AWS and Azure to design scalable, cost-efficient cloud architectures.',
    img: '/imgs/optimized/cloud.webp',
    alt: 'Cloud services illustration',
    bg: 'bg-notebook-yellow',
    border: 'border-notebook-yellow-dark',
    tag: 'bg-notebook-blue',
    rotate: '-rotate-2',
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    body: 'Develop maintainable, scalable software with Java, C++, and Python.',
    img: '/imgs/optimized/computer.webp',
    alt: 'Computer programming illustration',
    bg: 'bg-notebook-blue',
    border: 'border-notebook-blue-dark',
    tag: 'bg-notebook-yellow',
    rotate: 'rotate-2',
  },
  {
    id: 'web',
    title: 'Web Development',
    body: 'Build responsive, dynamic web apps with React, Next.js, Node.js, and TypeScript.',
    img: '/imgs/optimized/html.webp',
    alt: 'HTML and CSS illustration',
    bg: 'bg-notebook-pink',
    border: 'border-notebook-pink-dark',
    tag: 'bg-notebook-yellow',
    rotate: '-rotate-1',
  },
];

const AboutMeSection = () => (
  <section id="about" className="py-16 px-4 sm:px-6">
    <div className="container mx-auto">
      {/* Section heading */}
      <div className="mb-12 text-center md:text-left">
        <span className="custom-text text-2xl">What I do</span>
        <p className="font-body text-slate-500 text-sm mt-2 ml-0.5">
          My core areas of expertise
        </p>
      </div>

      {/* Skill cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {skills.map(({ id, title, body, img, alt, bg, border, tag, rotate }) => (
          <div
            key={id}
            className={`sticky-note ${bg} border-2 ${border} ${rotate}
                        hover:rotate-0 flex flex-col min-h-64`}
          >
            {/* Title tag — positioned like a sticky label */}
            <span
              className={`custom-text ${tag} absolute -top-4 right-4 text-sm shadow-sm`}
            >
              {title}
            </span>

            {/* Body text */}
            <p className="font-body text-base text-notebook-ink mt-6 leading-relaxed flex-1">
              {body}
            </p>

            {/* Decorative image */}
            <div className="flex justify-end mt-4 opacity-90">
              <Image
                src={img}
                alt={alt}
                width={96}
                height={96}
                loading="lazy"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutMeSection;
