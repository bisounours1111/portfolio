import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import './HeroSection.css'

export default function HeroSection({ profile }) {
  const { t } = useI18n()
  const [photoStyle, setPhotoStyle] = useState({})
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduceMotion(prefersReduced)

    if (prefersReduced) return

    function onMouseMove(event) {
      const x = (event.clientX / window.innerWidth - 0.5) * 24
      const y = (event.clientY / window.innerHeight - 0.5) * 24

      setPhotoStyle({
        transform: `translate(${x}px, ${y}px) rotateX(${-y * 0.15}deg) rotateY(${x * 0.15}deg)`,
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  function resetPhoto() {
    setPhotoStyle({})
  }

  return (
    <section id="home" className="hero section">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="hero__badge animate-in" style={{ '--delay': '0ms' }}>
            <span className="hero__badge-dot" />
            {t('hero.badge')}
          </span>

          <h1 className="hero__title animate-in" style={{ '--delay': '80ms' }}>
            {profile.name}
          </h1>
          <p className="hero__role animate-in" style={{ '--delay': '160ms' }}>
            {profile.title}
          </p>
          {profile.heroText && (
            <p className="hero__text animate-in" style={{ '--delay': '240ms' }}>
              {profile.heroText}
            </p>
          )}

          <div className="hero__meta animate-in" style={{ '--delay': '320ms' }}>
            <span>
              <i className="bx bx-map" /> {profile.location}
            </span>
            <a href={`mailto:${profile.email}`}>
              <i className="bx bx-envelope" /> {profile.email}
            </a>
            <a href={profile.phoneHref}>
              <i className="bx bx-phone" /> {profile.phone}
            </a>
          </div>

          <div className="hero__actions animate-in" style={{ '--delay': '400ms' }}>
            <a href="#projects" className="btn btn-primary">
              {t('hero.projects')}
            </a>
            <a href="#contact" className="btn btn-outline">
              {t('hero.contact')}
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv.pdf`}
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bx-download" /> {t('hero.cv')}
            </a>
          </div>
        </div>

        <div className="hero__visual animate-in" style={{ '--delay': '200ms' }}>
          <div className="hero__ring hero__ring--1" />
          <div className="hero__ring hero__ring--2" />
          <div className="hero__glow" />
          <div className="hero__photo" style={photoStyle} onMouseLeave={reduceMotion ? undefined : resetPhoto}>
            <img
              src={`${import.meta.env.BASE_URL}photo.webp`}
              alt={`${profile.name}, ${profile.title} — ${profile.location}`}
              width={352}
              height={352}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      <a href="#skills" className="hero__scroll" aria-label="Scroll">
        <span>{t('hero.scrollHint')}</span>
        <i className="bx bx-chevrons-down" />
      </a>
    </section>
  )
}
