import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './locales/en.js'
import fr from './locales/fr.js'

const locales = { en, fr }
const STORAGE_KEY = 'portfolio-locale'

const I18nContext = createContext(null)

function detectLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && locales[saved]) return saved
  return navigator.language?.startsWith('fr') ? 'fr' : 'en'
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale)
  const messages = useMemo(() => locales[locale] ?? locales.en, [locale])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
    document.title = messages.meta.title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', messages.meta.description)
  }, [locale, messages])

  const t = useCallback(
    (key) => key.split('.').reduce((obj, part) => obj?.[part], messages) ?? key,
    [messages],
  )

  const setLocale = useCallback((code) => {
    if (locales[code]) setLocaleState(code)
  }, [])

  return (
    <I18nContext.Provider value={{ locale, messages, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
