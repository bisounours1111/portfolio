import { useI18n } from '../i18n/I18nContext.jsx'
import './LanguageSwitcher.css'

const OPTIONS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          className={`lang-switcher__btn${locale === option.code ? ' lang-switcher__btn--active' : ''}`}
          aria-pressed={locale === option.code}
          onClick={() => setLocale(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
