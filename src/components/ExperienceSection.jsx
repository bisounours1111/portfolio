import { useI18n } from '../i18n/I18nContext.jsx'
import ScrollReveal from './ScrollReveal'
import './ExperienceSection.css'

export default function ExperienceSection({ experiences, education }) {
  const { t } = useI18n()

  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <ScrollReveal as="header" className="section-header">
          <h2 className="section-title">{t('sections.experienceEducation')}</h2>
        </ScrollReveal>

        <div className="timeline-grid">
          <ScrollReveal direction="left" className="timeline-column">
            <h3 className="timeline-column__title">{t('sections.professionalExperience')}</h3>
            <div className="timeline">
              {experiences.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 100} className="timeline-item card">
                  <div className="timeline-item__marker" />
                  <time className="timeline-item__date">{item.year}</time>
                  <h4 className="timeline-item__title">{item.title}</h4>
                  <p className="timeline-item__company">{item.company}</p>
                  <p className="timeline-item__stack">{item.stack}</p>
                  <ul className="timeline-item__list">
                    {item.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="timeline-column">
            <h3 className="timeline-column__title">{t('sections.educationCertifications')}</h3>
            <div className="timeline">
              {education.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 100} className="timeline-item card">
                  <div className="timeline-item__marker" />
                  <time className="timeline-item__date">{item.year}</time>
                  <h4 className="timeline-item__title">{item.title}</h4>
                  <p className="timeline-item__desc">{item.description}</p>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
