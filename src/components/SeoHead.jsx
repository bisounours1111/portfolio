import { useEffect } from 'react'
import { profile } from '../data/portfolio.js'
import { getAbsoluteAssetUrl, getCanonicalUrl, SITE } from '../data/site.js'
import { removeElements, upsertJsonLd, upsertLink, upsertMeta } from '../utils/seo.js'
import { useI18n } from '../i18n/I18nContext.jsx'

const HREFLANG_ID_PREFIX = 'seo-hreflang-'

export default function SeoHead() {
  const { locale, messages } = useI18n()
  const { meta } = messages

  useEffect(() => {
    const canonicalUrl = getCanonicalUrl()
    const imageUrl = getAbsoluteAssetUrl('photo.webp')
    const ogLocale = locale === 'fr' ? 'fr_FR' : 'en_US'
    const alternateLocale = locale === 'fr' ? 'en_US' : 'fr_FR'

    document.title = meta.title
    document.documentElement.lang = locale

    upsertMeta('name', 'description', meta.description)
    upsertMeta('name', 'keywords', meta.keywords)
    upsertMeta('name', 'author', profile.name)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    upsertMeta('name', 'googlebot', 'index, follow')
    upsertMeta('name', 'theme-color', '#1c1c1c')

    upsertLink('canonical', canonicalUrl)
    upsertLink('icon', getAbsoluteAssetUrl('favicon.svg'), { type: 'image/svg+xml' })
    upsertLink('manifest', getAbsoluteAssetUrl('manifest.webmanifest'))

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', `${profile.name} — ${meta.jobTitle}`)
    upsertMeta('property', 'og:locale', ogLocale)
    upsertMeta('property', 'og:locale:alternate', alternateLocale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', imageUrl)

    if (SITE.twitterHandle) {
      upsertMeta('name', 'twitter:site', SITE.twitterHandle)
    }

    removeElements(`link[rel="alternate"][hreflang]`)
    ;['fr', 'en', 'x-default'].forEach((lang) => {
      upsertLink('alternate', canonicalUrl, { hreflang: lang, id: `${HREFLANG_ID_PREFIX}${lang}` })
    })

    const sameAs = [profile.linkedin, profile.github].filter(Boolean)

    upsertJsonLd('seo-jsonld-person', {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      url: canonicalUrl,
      image: imageUrl,
      email: profile.email,
      telephone: profile.phone,
      jobTitle: meta.jobTitle,
      description: meta.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lille',
        addressCountry: 'FR',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Ynov Lille',
      },
      knowsAbout: meta.skills,
      sameAs,
    })

    upsertJsonLd('seo-jsonld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: canonicalUrl,
      description: meta.description,
      inLanguage: [locale === 'fr' ? 'fr-FR' : 'en-US'],
      author: {
        '@type': 'Person',
        name: profile.name,
      },
    })

    upsertJsonLd('seo-jsonld-profile', {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: meta.title,
      url: canonicalUrl,
      description: meta.description,
      mainEntity: {
        '@type': 'Person',
        name: profile.name,
        jobTitle: meta.jobTitle,
      },
    })
  }, [locale, meta])

  return null
}
