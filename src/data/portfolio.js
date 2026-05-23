export const profile = {
  name: 'Yanis DAÏ',
  title: 'Full-Stack Developer',
  location: 'Lille, France',
  email: 'yan.dai@outlook.fr',
  phone: '+33 6 46 53 09 03',
  phoneHref: 'tel:+33646530903',
  linkedin: 'https://www.linkedin.com/in/yanis-da%C3%AF-834443257/',
  github: '',
  heroText: 'Master\'s student in Full Stack Development at Ynov Lille.',
}

export const technicalSkills = [
  {
    category: 'Programming Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Front-end',
    items: [
      'Vue.js (Composition API) w/ Quasar',
      'React.js w/ Material-UI',
    ],
  },
  {
    category: 'Back-end',
    items: ['Node.js', 'Flask', 'FastAPI', 'PostgreSQL', 'Firebase', 'Supabase'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'GitHub / GitLab', 'Docker', 'macOS Shell (zsh/bash)'],
  },
]

export const languages = [
  { name: 'French', level: 'Native' },
  { name: 'English', level: 'B2' },
  { name: 'Deutsch', level: 'A2' },
]

export const interests = [
  'Table Tennis',
  'Anime & Japanese Culture',
  'Software Development',
  'FPS & Racing Video Games',
]

export const softSkills = [
  {
    title: 'Communication',
    description:
      'Experienced in explaining technical concepts and project details clearly during meetings with clients and sales teams to ensure shared understanding.',
  },
  {
    title: 'Teamwork',
    description:
      'Skilled at collaborating effectively within cross-functional teams on diverse projects, contributing to successful outcomes.',
  },
  {
    title: 'Time Management',
    description:
      'Proven ability to manage multiple tasks and deadlines efficiently, balancing work-study commitments while maintaining high-quality results.',
  },
  {
    title: 'Adaptability',
    description:
      'Quick to learn new technologies and adjust to evolving project requirements in dynamic environments.',
  },
]

export const education = [
  {
    year: 'Expected 2027',
    title: 'Master\'s Degree in Full Stack Development',
    description: 'Ynov Lille, France',
  },
  {
    year: '2022 – 2025',
    title: 'Bachelor\'s Degree in Computer Science',
    description: 'Ynov Lille, France',
  },
  {
    year: '2024',
    title: 'Python Programming Certification – CodinGame',
    description: 'Ranked in top 0.8% of platform users',
  },
]

export const experiences = [
  {
    year: 'Sept. 2024 – Present',
    title: 'Full Stack Developer (Apprenticeship)',
    company: 'CustomsBridge',
    stack: 'Vue.js (Composition API) with Quasar, FastAPI, Apache Airflow, PostgreSQL',
    highlights: [
      'Contributed to the development of internal tools and dashboards for process automation.',
      'Optimized data workflows with Airflow DAGs and RESTful API integrations.',
    ],
  },
  {
    year: 'July 2024 – Aug. 2024',
    title: 'Full Stack Developer (Internship)',
    company: 'CustomsBridge',
    stack: 'Vue.js, FastAPI, Airflow, PostgreSQL',
    highlights: [
      'Initially joined as an intern and transitioned into an apprenticeship based on performance.',
      'Participated in the development of feature-rich components and backend services.',
      'Worked closely with the tech lead to improve code quality and CI/CD practices.',
    ],
  },
]

export const projects = [
  {
    image: '/cover.jpg',
    year: '2024',
    title: 'Python Learning Platform',
    technologies: 'Python, HTML, CSS, JavaScript, MySQL, AWS',
    description:
      'Developed a web platform with an integrated IDE and real-time code testing. Includes an admin panel to manage course levels and track learner progress.',
  },
  {
    image: '/coverblindhub.png',
    year: '2024',
    title: 'BlindTest Web App',
    technologies: 'Python, JavaScript, HTML, CSS, MySQL, Socket.IO, AWS',
    description:
      'Created a multiplayer music quiz app where users can join rooms, host games, and use Spotify playlists for dynamic question sets.',
    link: 'https://www.youtube.com/watch?v=Z_WZ0Orbqj8',
  },
  {
    image: '/cover.jpg',
    year: '2025 – 2026',
    title: 'BetterInvest Web App',
    technologies: 'FastAPI, React, Ollama, Supabase, Stripe, Resend',
    description:
      'Developed an AI-powered investment learning platform featuring portfolio simulation for stocks, ETFs, and cryptocurrencies. Integrated Ollama AI models to provide personalized learning modules, financial news summaries, and contextual portfolio insights.',
  },
  {
    image: '/cover.jpg',
    year: '2025 – 2026',
    title: 'Coach Me',
    technologies: 'Vue.js, Supabase, Stripe, Resend',
    description:
      'Application pour mettre en relation des coachs et des apprentis avec un système de commission interne à l\'app. Basé sur l\'esport.',
  },
  {
    image: '/coverhow.png',
    year: '2023',
    title: 'Escape Game (How ?!)',
    technologies: 'Unity, AWS, MySQL, NetCode',
    link: 'https://www.youtube.com/watch?v=Z_WZ0Orbqj8',
  },
  {
    image: '/cover.jpg',
    year: '2023',
    title: 'Tower Defense',
    technologies: 'Roblox Studio, Lua',
  },
  {
    image: '/cover.jpg',
    year: '2022',
    title: 'Minecraft Plugin',
    technologies: 'Java, MySQL, VPS',
  },
]

export function getSocialLinks(profileData) {
  const links = [
    { href: `mailto:${profileData.email}`, icon: 'bx bx-mail-send' },
    { href: profileData.linkedin, icon: 'bx bxl-linkedin-square', external: true },
    { href: profileData.phoneHref, icon: 'bx bx-phone-call' },
  ]

  if (profileData.github) {
    links.splice(2, 0, {
      href: profileData.github,
      icon: 'bx bxl-github',
      external: true,
    })
  }

  return links
}
