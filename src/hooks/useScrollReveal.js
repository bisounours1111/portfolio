import { useEffect, useRef } from 'react'

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

export function useScrollReveal({ delay = 0, direction } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('reveal')
    el.style.setProperty('--reveal-delay', `${delay}ms`)

    if (direction) {
      el.classList.add(`reveal--${direction}`)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('reveal--visible')
      return
    }

    getObserver().observe(el)
    return () => observer?.unobserve(el)
  }, [delay, direction])

  return ref
}
