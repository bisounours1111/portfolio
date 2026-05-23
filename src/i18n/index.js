import { ref, computed, watch } from 'vue'
import en from './locales/en.js'
import fr from './locales/fr.js'

const locales = { en, fr }
const STORAGE_KEY = 'portfolio-locale'

function detectLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && locales[saved]) return saved
  return navigator.language?.startsWith('fr') ? 'fr' : 'en'
}

export const locale = ref(detectLocale())

watch(
  locale,
  (value) => {
    localStorage.setItem(STORAGE_KEY, value)
    document.documentElement.lang = value

    const messages = locales[value] ?? locales.en
    document.title = messages.meta.title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', messages.meta.description)
  },
  { immediate: true },
)

export function useI18n() {
  const messages = computed(() => locales[locale.value] ?? locales.en)

  function t(key) {
    return key.split('.').reduce((obj, part) => obj?.[part], messages.value) ?? key
  }

  function setLocale(code) {
    if (locales[code]) locale.value = code
  }

  return { locale, messages, t, setLocale }
}
