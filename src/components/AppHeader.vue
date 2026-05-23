<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  links: {
    type: Array,
    required: true,
  },
})

const menuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')

const sectionIds = ['home', 'skills', 'experience', 'projects', 'contact']

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

function isHashLink(link) {
  return link.to.startsWith('#') || link.to.includes('#')
}

function isRouteLink(link) {
  return !link.external && !isHashLink(link) && link.to.startsWith('/')
}

function getSectionId(href) {
  if (href.startsWith('#')) return href.slice(1)
  if (href.includes('#')) return href.split('#')[1]
  return null
}

function updateActiveSection() {
  scrolled.value = window.scrollY > 20

  const offset = 120
  let current = sectionIds[0]

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= offset) {
      current = id
    }
  }

  activeSection.value = current
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header" :class="{ 'site-header--scrolled': scrolled }">
    <div class="container site-header__inner">
      <a href="#home" class="site-header__brand" @click="closeMenu">Yanis</a>

      <button
        class="site-header__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <span class="site-header__toggle-bar" :class="{ open: menuOpen }"></span>
        <span class="site-header__toggle-bar" :class="{ open: menuOpen }"></span>
        <span class="site-header__toggle-bar" :class="{ open: menuOpen }"></span>
      </button>

      <nav class="site-header__nav" :class="{ 'site-header__nav--open': menuOpen }">
        <template v-for="link in links" :key="link.label">
          <RouterLink
            v-if="isRouteLink(link)"
            :to="link.to"
            class="site-header__link"
            :class="link.class"
            @click="closeMenu"
          >
            {{ link.label }}
          </RouterLink>
          <a
            v-else
            :href="link.to"
            class="site-header__link"
            :class="[
              link.class,
              { 'site-header__link--active': getSectionId(link.to) === activeSection },
              { 'site-header__link--cv': link.class?.includes('button_cv') },
            ]"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  height: var(--header-height);
  transition: background var(--transition), backdrop-filter var(--transition), border-color var(--transition);
}

.site-header--scrolled {
  background: rgba(28, 28, 28, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border-subtle);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.site-header__brand {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text-primary);
  transition: color var(--transition);
}

.site-header__brand:hover {
  color: var(--color-accent);
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.site-header__link {
  padding: 0.5rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-muted);
  border-radius: var(--radius-full);
  transition: color var(--transition), background var(--transition);
}

.site-header__link:hover,
.site-header__link--active {
  color: var(--color-text-primary);
  background: var(--color-accent-muted);
}

.site-header__link--cv {
  margin-left: 0.5rem;
  background: var(--color-accent);
  color: var(--color-text-primary) !important;
}

.site-header__link--cv:hover {
  background: var(--color-accent-hover);
}

.site-header__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.site-header__toggle-bar {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: transform var(--transition), opacity var(--transition);
}

.site-header__toggle-bar.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.site-header__toggle-bar.open:nth-child(2) {
  opacity: 0;
}

.site-header__toggle-bar.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 900px) {
  .site-header__toggle {
    display: flex;
  }

  .site-header__nav {
    position: fixed;
    inset: var(--header-height) 0 0;
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
    gap: 0.5rem;
    background: rgba(28, 28, 28, 0.98);
    backdrop-filter: blur(20px);
    transform: translateX(100%);
    transition: transform var(--transition);
  }

  .site-header__nav--open {
    transform: translateX(0);
  }

  .site-header__link {
    padding: 1rem;
    font-size: 1.125rem;
    border-radius: var(--radius-md);
  }

  .site-header__link--cv {
    margin-left: 0;
    text-align: center;
  }
}
</style>
