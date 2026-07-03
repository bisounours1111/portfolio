export default {
  meta: {
    title: 'Yanis DAÏ — Full-Stack Developer | Portfolio Lille',
    description:
      'Portfolio of Yanis DAÏ, Full-Stack Developer based in Lille, France. React, Vue.js, Python, FastAPI, PostgreSQL. Open to freelance opportunities.',
    keywords:
      'Yanis DAÏ, full-stack developer, web developer Lille, React, Vue.js, Python, FastAPI, developer portfolio, freelance Lille, Ynov',
    jobTitle: 'Full-Stack Developer',
    skills: [
      'Web development',
      'React',
      'Vue.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'JavaScript',
      'TypeScript',
    ],
  },
  nav: {
    home: 'Home',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    cv: 'CV',
    toggleMenu: 'Toggle menu',
    skipToContent: 'Skip to main content',
  },
  hero: {
    badge: 'Available for freelance work',
    scrollHint: 'Scroll',
    projects: 'Projects',
    contact: 'Contact',
    cv: 'CV',
  },
  sections: {
    skills: 'Skills',
    languages: 'Languages',
    interests: 'Interests',
    softSkills: 'Soft Skills',
    experienceEducation: 'Experience & Education',
    professionalExperience: 'Professional Experience',
    educationCertifications: 'Education & Certifications',
    projects: 'Projects',
    contact: 'Get in touch',
  },
  contact: {
    location: 'Location',
    email: 'Email',
    phone: 'Phone',
    name: 'Name',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Something went wrong. Please try again.',
  },
  projectLink: {
    view: 'View',
  },
  projectsCarousel: {
    prev: 'Previous project',
    next: 'Next project',
    goTo: 'Go to project',
  },
  projectModal: {
    close: 'Close',
    details: 'Learn more',
    gallery: 'Screenshots',
    projectBio: 'About the project',
    imageCaption: 'About this screenshot',
    noProjectBio: 'No description available.',
    visit: 'Visit project',
  },
  profile: {
    title: 'Full-Stack Developer',
    location: 'Lille, France',
    heroText: "Master's student in Full Stack Development at Ynov Lille.",
  },
  technicalSkills: [
    {
      category: 'Programming Languages',
      items: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
      category: 'Front-end',
      items: ['Vue.js (Composition API) w/ Quasar', 'React.js w/ Material-UI'],
    },
    {
      category: 'Back-end',
      items: ['Node.js', 'Flask', 'FastAPI', 'PostgreSQL', 'Firebase', 'Supabase'],
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'GitHub / GitLab', 'Docker', 'macOS Shell (zsh/bash)'],
    },
  ],
  languages: [
    { name: 'French', level: 'Native' },
    { name: 'English', level: 'B2' },
    { name: 'Deutsch', level: 'A2' },
  ],
  interests: [
    'Table Tennis',
    'Anime & Japanese Culture',
    'Software Development',
    'FPS & Racing Video Games',
  ],
  softSkills: [
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
  ],
  education: [
    {
      year: 'Expected 2027',
      title: "Master's Degree in Full Stack Development",
      description: 'Ynov Lille, France',
    },
    {
      year: '2022 – 2025',
      title: "Bachelor's Degree in Computer Science",
      description: 'Ynov Lille, France',
    },
    {
      year: '2024',
      title: 'Python Programming Certification – CodinGame',
      description: 'Ranked in top 0.8% of platform users',
    },
  ],
  experiences: [
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
  ],
  projects: [
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
        'Application connecting coaches and apprentices with an in-app commission system, focused on esports.',
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
  ],
}
