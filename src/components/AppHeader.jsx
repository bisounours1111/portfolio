import { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n } from '../i18n/I18nContext.jsx'
import './AppHeader.css'

const SECTION_IDS = ['home', 'skills', 'experience', 'projects', 'contact']

function getSectionId(href) {
  if (href.startsWith('#')) return href.slice(1)
  if (href.includes('#')) return href.split('#')[1]
  return null
}

export default function AppHeader({ links }) {
  const { t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  function closeMenu() {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  function toggleMenu() {
    setMenuOpen((open) => {
      document.body.style.overflow = open ? '' : 'hidden'
      return !open
    })
  }

  useEffect(() => {
    function updateActiveSection() {
      setScrolled(window.scrollY > 20)

      const offset = 120
      let current = SECTION_IDS[0]

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection()

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <header
      className={`site-header site-header--loaded${scrolled ? ' site-header--scrolled' : ''}`}
    >
      <div className="container site-header__inner">
        <a href="#home" className="site-header__brand" onClick={closeMenu}>
          Yanis
        </a>

        <button
          className="site-header__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={t('nav.toggleMenu')}
          onClick={toggleMenu}
        >
          <span className={`site-header__toggle-bar${menuOpen ? ' open' : ''}`} />
          <span className={`site-header__toggle-bar${menuOpen ? ' open' : ''}`} />
          <span className={`site-header__toggle-bar${menuOpen ? ' open' : ''}`} />
        </button>

        <nav className={`site-header__nav${menuOpen ? ' site-header__nav--open' : ''}`}>
          {links.map((link) => {
            const sectionId = getSectionId(link.to)
            const isCv = link.className?.includes('button_cv')

            return (
              <a
                key={link.label}
                href={link.to}
                className={[
                  'site-header__link',
                  link.className,
                  sectionId === activeSection ? 'site-header__link--active' : '',
                  isCv ? 'site-header__link--cv' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            )
          })}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  )
}
