<script setup>
import { computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import {
  profile,
  technicalSkills,
  languages,
  interests,
  softSkills,
  education,
  experiences,
  projects,
  getSocialLinks,
} from '../data/portfolio.js'

const socialLinks = computed(() => getSocialLinks(profile))

const navLinks = [
  { to: '#home', label: 'Home' },
  { to: '#skills', label: 'Skills' },
  { to: '#experience', label: 'Experience' },
  { to: '#projects', label: 'Projects' },
  { to: '#contact', label: 'Contact' },
  { to: '/cv.pdf', label: 'CV', class: 'button_cv', external: true },
]
</script>

<template>
  <AppHeader :links="navLinks" />
  <main>
    <HeroSection :profile="profile" />
    <SkillsSection
      :technical-skills="technicalSkills"
      :languages="languages"
      :interests="interests"
      :soft-skills="softSkills"
    />
    <ExperienceSection :experiences="experiences" :education="education" />
    <ProjectsSection :projects="projects" />
    <ContactSection :profile="profile" :social-links="socialLinks" />
  </main>
</template>
