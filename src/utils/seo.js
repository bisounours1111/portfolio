export function upsertMeta(attribute, key, content) {
  if (!content) return

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

export function upsertLink(rel, href, extra = {}) {
  if (!href) return

  const selector = Object.entries(extra).reduce(
    (acc, [name, value]) => `${acc}[${name}="${value}"]`,
    `link[rel="${rel}"]`,
  )

  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    Object.entries(extra).forEach(([name, value]) => element.setAttribute(name, value))
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

export function upsertJsonLd(id, data) {
  let script = document.getElementById(id)

  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(data)
}

export function removeElements(selector) {
  document.head.querySelectorAll(selector).forEach((element) => element.remove())
}
