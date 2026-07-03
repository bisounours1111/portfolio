import { useMemo } from 'react'
import AppHeader from '../components/AppHeader'
import HeroSection from '../components/HeroSection'
import SkillsSection from '../components/SkillsSection'
import ExperienceSection from '../components/ExperienceSection'
import ProjectsSection from '../components/ProjectsSection'
import ContactSection from '../components/ContactSection'
import ScrollProgress from '../components/ScrollProgress'
import BackgroundEffects from '../components/BackgroundEffects'
import SeoHead from '../components/SeoHead'
import { profile, getSocialLinks } from '../data/portfolio.js'
import { useI18n } from '../i18n/I18nContext.jsx'

export default function HomePage() {
  const { messages, t } = useI18n()

  const socialLinks = useMemo(() => getSocialLinks(profile), [])

  const profileData = useMemo(
    () => ({
      ...profile,
      ...messages.profile,
    }),
    [messages.profile],
  )

  const navLinks = useMemo(
    () => [
      { to: '#home', label: t('nav.home') },
      { to: '#skills', label: t('nav.skills') },
      { to: '#experience', label: t('nav.experience') },
      { to: '#projects', label: t('nav.projects') },
      { to: '#contact', label: t('nav.contact') },
      { to: `${import.meta.env.BASE_URL}cv.pdf`, label: t('nav.cv'), className: 'button_cv', external: true },
    ],
    [t],
  )

  return (
    <>
      <SeoHead />
      <a href="#main-content" className="skip-link">
        {t('nav.skipToContent')}
      </a>
      <ScrollProgress />
      <BackgroundEffects />
      <AppHeader links={navLinks} />
      <main id="main-content">
        <HeroSection profile={profileData} />
        <SkillsSection
          technicalSkills={messages.technicalSkills}
          languages={messages.languages}
          interests={messages.interests}
          softSkills={messages.softSkills}
        />
        <ExperienceSection experiences={messages.experiences} education={messages.education} />
        <ProjectsSection projects={messages.projects} />
        <ContactSection profile={profileData} socialLinks={socialLinks} />
      </main>
    </>
  )
}
