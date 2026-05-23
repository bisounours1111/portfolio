<script setup>
import { computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import ScrollProgress from '../components/ScrollProgress.vue'
import BackgroundEffects from '../components/BackgroundEffects.vue'
import { profile, getSocialLinks } from '../data/portfolio.js'
import { useI18n } from '../i18n'

const { messages, t } = useI18n()

const socialLinks = computed(() => getSocialLinks(profile))

const profileData = computed(() => ({
  ...profile,
  ...messages.value.profile,
}))

const navLinks = computed(() => [
  { to: '#home', label: t('nav.home') },
  { to: '#skills', label: t('nav.skills') },
  { to: '#experience', label: t('nav.experience') },
  { to: '#projects', label: t('nav.projects') },
  { to: '#contact', label: t('nav.contact') },
  { to: '/cv.pdf', label: t('nav.cv'), class: 'button_cv', external: true },
])
</script>

<template>
  <ScrollProgress />
  <BackgroundEffects />
  <AppHeader :links="navLinks" />
  <main>
    <HeroSection :profile="profileData" />
    <SkillsSection
      :technical-skills="messages.technicalSkills"
      :languages="messages.languages"
      :interests="messages.interests"
      :soft-skills="messages.softSkills"
    />
    <ExperienceSection
      :experiences="messages.experiences"
      :education="messages.education"
    />
    <ProjectsSection :projects="messages.projects" />
    <ContactSection :profile="profileData" :social-links="socialLinks" />
  </main>
</template>
