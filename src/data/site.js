export const SITE = {
  url: 'https://bisounours1111.github.io/portfolio',
  name: 'Yanis DAÏ — Portfolio',
  locale: 'fr_FR',
  twitterHandle: '',
}

export function getCanonicalUrl(path = '') {
  const base = SITE.url.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath === '/' ? '' : normalizedPath}/`.replace(/\/+$/, '/')
}

export function getAssetUrl(path) {
  const base = import.meta.env.BASE_URL || '/'
  const normalized = path.replace(/^\//, '')
  return `${base}${normalized}`
}

export function getAbsoluteAssetUrl(path) {
  const siteBase = SITE.url.replace(/\/$/, '')
  const normalized = path.replace(/^\//, '')
  return `${siteBase}/${normalized}`
}
