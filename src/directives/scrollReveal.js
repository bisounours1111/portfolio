const observerOptions = {
  root: null,
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.12,
}

let observer

function getObserver() {
  if (observer) return observer

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  return observer
}

export const vScrollReveal = {
  mounted(el, binding) {
    const options = binding.value ?? {}
    const delay = options.delay ?? 0

    el.classList.add('reveal')
    el.style.setProperty('--reveal-delay', `${delay}ms`)

    if (options.direction) {
      el.classList.add(`reveal--${options.direction}`)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('reveal--visible')
      return
    }

    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
