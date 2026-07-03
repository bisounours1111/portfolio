import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import ScrollReveal from './ScrollReveal'
import './ContactSection.css'

export default function ContactSection({ profile, socialLinks }) {
  const { t } = useI18n()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState(false)

  async function submitContact(event) {
    event.preventDefault()
    setSubmitting(true)
    setSubmitMessage('')
    setSubmitError(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Failed to send')

      setForm({ name: '', email: '', message: '' })
      setSubmitMessage(t('contact.success'))
    } catch {
      setSubmitMessage(t('contact.error'))
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <section id="contact" className="section section--alt">
        <div className="container">
          <ScrollReveal as="header" className="section-header">
            <h2 className="section-title">{t('sections.contact')}</h2>
          </ScrollReveal>

          <div className="contact-grid">
            <ScrollReveal direction="left" className="contact-info card">
              <div className="contact-info__item">
                <i className="bx bx-map" />
                <div>
                  <span className="contact-info__label">{t('contact.location')}</span>
                  <span>{profile.location}</span>
                </div>
              </div>
              <div className="contact-info__item">
                <i className="bx bx-envelope" />
                <div>
                  <span className="contact-info__label">{t('contact.email')}</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
              </div>
              <div className="contact-info__item">
                <i className="bx bx-phone" />
                <div>
                  <span className="contact-info__label">{t('contact.phone')}</span>
                  <a href={profile.phoneHref}>{profile.phone}</a>
                </div>
              </div>

              <div className="contact-info__socials">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="contact-info__social"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    aria-label={link.icon}
                  >
                    <i className={link.icon} />
                  </a>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100} className="contact-form card">
              <form onSubmit={submitContact}>
                <div className="form-field">
                  <label htmlFor="name">{t('contact.name')}</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">{t('contact.email')}</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? t('contact.sending') : t('contact.send')}
                </button>
                {submitMessage && (
                  <p className={`form-feedback${submitError ? ' form-feedback--error' : ''}`}>
                    {submitMessage}
                  </p>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ScrollReveal as="footer" className="site-footer">
        <div className="container site-footer__inner">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </ScrollReveal>
    </>
  )
}
