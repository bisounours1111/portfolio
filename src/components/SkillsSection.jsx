import { useI18n } from '../i18n/I18nContext.jsx'
import ScrollReveal from './ScrollReveal'
import './SkillsSection.css'

export default function SkillsSection({ technicalSkills, languages, interests, softSkills }) {
  const { t } = useI18n()

  return (
    <section id="skills" className="section">
      <div className="container">
        <ScrollReveal as="header" className="section-header">
          <h2 className="section-title">{t('sections.skills')}</h2>
        </ScrollReveal>

        <div className="skills-grid">
          {technicalSkills.map((group, index) => (
            <ScrollReveal key={group.category} delay={index * 80} className="card skill-card">
              <h3 className="skill-card__title">{group.category}</h3>
              <div className="skill-card__chips">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="skills-secondary">
          <ScrollReveal delay={80} className="card skill-card">
            <h3 className="skill-card__title">{t('sections.languages')}</h3>
            <ul className="skill-list">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <span>{lang.name}</span>
                  <span className="chip chip--sm">{lang.level}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={160} className="card skill-card">
            <h3 className="skill-card__title">{t('sections.interests')}</h3>
            <div className="skill-card__chips">
              {interests.map((interest) => (
                <span key={interest} className="chip">
                  {interest}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="soft-skills">
          <ScrollReveal as="h3" className="soft-skills__heading">
            {t('sections.softSkills')}
          </ScrollReveal>
          <div className="soft-skills__grid">
            {softSkills.map((skill, index) => (
              <ScrollReveal key={skill.title} delay={index * 80} className="card soft-skill-card">
                <h4 className="soft-skill-card__title">{skill.title}</h4>
                <p className="soft-skill-card__text">{skill.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
