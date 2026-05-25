export default {
  meta: {
    title: 'Yanis DAÏ — Développeur Full-Stack',
    description: 'Portfolio de Yanis DAÏ — Développeur Full-Stack.',
  },
  nav: {
    home: 'Accueil',
    skills: 'Compétences',
    experience: 'Expérience',
    projects: 'Projets',
    contact: 'Contact',
    cv: 'CV',
    toggleMenu: 'Ouvrir le menu',
  },
  hero: {
    badge: 'Disponible pour une nouvelle tâche en freelance',
    scrollHint: 'Défiler',
    projects: 'Projets',
    contact: 'Contact',
    cv: 'CV',
  },
  sections: {
    skills: 'Compétences',
    languages: 'Langues',
    interests: 'Centres d\'intérêt',
    softSkills: 'Soft Skills',
    experienceEducation: 'Expérience & Formation',
    professionalExperience: 'Expérience professionnelle',
    educationCertifications: 'Formation & Certifications',
    projects: 'Projets',
    contact: 'Me contacter',
  },
  contact: {
    location: 'Localisation',
    email: 'E-mail',
    phone: 'Téléphone',
    name: 'Nom',
    message: 'Message',
    send: 'Envoyer le message',
    sending: 'Envoi en cours...',
    success: 'Message envoyé avec succès !',
    error: 'Une erreur est survenue. Veuillez réessayer.',
  },
  projectLink: {
    view: 'Voir',
  },
  projectsCarousel: {
    prev: 'Projet précédent',
    next: 'Projet suivant',
    goTo: 'Aller au projet',
  },
  projectModal: {
    close: 'Fermer',
    details: 'En savoir plus',
    gallery: 'Captures',
    projectBio: 'À propos du projet',
    imageCaption: 'À propos de cette capture',
    noProjectBio: 'Aucune description disponible.',
    visit: 'Visiter le projet',
  },
  profile: {
    title: 'Développeur Full-Stack',
    location: 'Lille, France',
    heroText: 'Étudiant en Master Développement Full Stack à Ynov Lille.',
  },
  technicalSkills: [
    {
      category: 'Langages de programmation',
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
      category: 'Outils & Plateformes',
      items: ['Git', 'GitHub / GitLab', 'Docker', 'macOS Shell (zsh/bash)'],
    },
  ],
  languages: [
    { name: 'Français', level: 'Natif' },
    { name: 'Anglais', level: 'B2' },
    { name: 'Allemand', level: 'A2' },
  ],
  interests: [
    'Tennis de table',
    'Anime & Culture japonaise',
    'Développement logiciel',
    'Jeux vidéo FPS & Course',
  ],
  softSkills: [
    {
      title: 'Communication',
      description:
        'Habitué à expliquer clairement des concepts techniques et des détails de projet lors de réunions avec clients et équipes commerciales.',
    },
    {
      title: 'Travail d\'équipe',
      description:
        'Capable de collaborer efficacement au sein d\'équipes pluridisciplinaires sur des projets variés, contribuant à des résultats concrets.',
    },
    {
      title: 'Gestion du temps',
      description:
        'Capacité démontrée à gérer plusieurs tâches et échéances, en conciliant alternance et qualité de livraison.',
    },
    {
      title: 'Adaptabilité',
      description:
        'Rapide à apprendre de nouvelles technologies et à s\'adapter aux évolutions des exigences projet.',
    },
  ],
  education: [
    {
      year: 'Prévu 2027',
      title: 'Master Développement Full Stack',
      description: 'Ynov Lille, France',
    },
    {
      year: '2022 – 2025',
      title: 'Licence Informatique',
      description: 'Ynov Lille, France',
    },
    {
      year: '2024',
      title: 'Certification Python – CodinGame',
      description: 'Classé dans le top 0,8 % des utilisateurs de la plateforme',
    },
  ],
  experiences: [
    {
      year: 'Sept. 2024 – Aujourd\'hui',
      title: 'Développeur Full Stack (Alternance)',
      company: 'CustomsBridge',
      stack: 'Vue.js (Composition API) avec Quasar, FastAPI, Apache Airflow, PostgreSQL',
      highlights: [
        'Contribution au développement d\'outils internes et de tableaux de bord pour l\'automatisation des processus.',
        'Optimisation des flux de données avec des DAGs Airflow et des intégrations d\'API REST.',
      ],
    },
    {
      year: 'Juil. 2024 – Août 2024',
      title: 'Développeur Full Stack (Stage)',
      company: 'CustomsBridge',
      stack: 'Vue.js, FastAPI, Airflow, PostgreSQL',
      highlights: [
        'Arrivé en stage puis embauché en alternance suite aux performances.',
        'Participation au développement de composants riches et de services back-end.',
        'Collaboration étroite avec le tech lead pour améliorer la qualité du code et les pratiques CI/CD.',
      ],
    },
  ],
  projects: [
    {
      image: '/cover.jpg',
      year: '2024',
      title: 'Plateforme d\'apprentissage Python',
      technologies: 'Python, HTML, CSS, JavaScript, MySQL, AWS',
      description:
        'Développement d\'une plateforme web avec IDE intégré et tests de code en temps réel. Panneau d\'administration pour gérer les niveaux de cours et suivre la progression des apprenants.',
    },
    {
      image: '/coverblindhub.png',
      year: '2024',
      title: 'BlindTest Web App',
      technologies: 'Python, JavaScript, HTML, CSS, MySQL, Socket.IO, AWS',
      description:
        'Application de quiz musical multijoueur : salles, hôte de partie et playlists Spotify pour des questions dynamiques.',
      link: 'https://www.youtube.com/watch?v=Z_WZ0Orbqj8',
    },
    {
      image: '/cover.jpg',
      year: '2025 – 2026',
      title: 'BetterInvest Web App',
      technologies: 'FastAPI, React, Ollama, Supabase, Stripe, Resend',
      description:
        'Plateforme d\'apprentissage en investissement avec IA : simulation de portefeuille (actions, ETF, crypto), modules personnalisés, résumés d\'actualités et insights contextuels via Ollama.',
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
      title: 'Plugin Minecraft',
      technologies: 'Java, MySQL, VPS',
    },
  ],
}
