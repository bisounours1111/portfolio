<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../i18n'

defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()

const photoRef = ref(null)
const photoStyle = ref({})
const reduceMotion = ref(false)

function onMouseMove(event) {
  if (reduceMotion.value || !photoRef.value) return

  const x = (event.clientX / window.innerWidth - 0.5) * 24
  const y = (event.clientY / window.innerHeight - 0.5) * 24

  photoStyle.value = {
    transform: `translate(${x}px, ${y}px) rotateX(${-y * 0.15}deg) rotateY(${x * 0.15}deg)`,
  }
}

function resetPhoto() {
  photoStyle.value = {}
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion.value) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <section id="home" class="hero section">
    <div class="container hero__grid">
      <div class="hero__content">
        <span class="hero__badge animate-in" style="--delay: 0ms">
          <span class="hero__badge-dot"></span>
          {{ t('hero.badge') }}
        </span>

        <h1 class="hero__title animate-in" style="--delay: 80ms">{{ profile.name }}</h1>
        <p class="hero__role animate-in" style="--delay: 160ms">{{ profile.title }}</p>
        <p v-if="profile.heroText" class="hero__text animate-in" style="--delay: 240ms">
          {{ profile.heroText }}
        </p>

        <div class="hero__meta animate-in" style="--delay: 320ms">
          <span><i class="bx bx-map"></i> {{ profile.location }}</span>
          <a :href="`mailto:${profile.email}`"><i class="bx bx-envelope"></i> {{ profile.email }}</a>
          <a :href="profile.phoneHref"><i class="bx bx-phone"></i> {{ profile.phone }}</a>
        </div>

        <div class="hero__actions animate-in" style="--delay: 400ms">
          <a href="#projects" class="btn btn-primary">{{ t('hero.projects') }}</a>
          <a href="#contact" class="btn btn-outline">{{ t('hero.contact') }}</a>
          <a href="/cv.pdf" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
            <i class="bx bx-download"></i> {{ t('hero.cv') }}
          </a>
        </div>
      </div>

      <div class="hero__visual animate-in" style="--delay: 200ms">
        <div class="hero__ring hero__ring--1"></div>
        <div class="hero__ring hero__ring--2"></div>
        <div class="hero__glow"></div>
        <div ref="photoRef" class="hero__photo" :style="photoStyle" @mouseleave="resetPhoto">
          <img src="/photo.webp" :alt="profile.name" />
        </div>
      </div>
    </div>

    <a href="#skills" class="hero__scroll" aria-label="Scroll">
      <span>{{ t('hero.scrollHint') }}</span>
      <i class="bx bx-chevrons-down"></i>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: calc(var(--header-height) + 3rem);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

.animate-in {
  opacity: 0;
  transform: translateY(24px);
  animation: hero-enter 0.8s var(--ease-out-expo) forwards;
  animation-delay: var(--delay, 0ms);
}

@keyframes hero-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  margin-bottom: 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-accent);
  background: var(--color-accent-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-accent-glow);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

.hero__title {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  line-height: 1.05;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #fefefe 0%, #b794f6 45%, #7d53de 70%, #fefefe 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation:
    hero-enter 0.8s var(--ease-out-expo) forwards,
    title-shimmer 6s linear infinite;
  animation-delay: var(--delay, 0ms), 1s;
}

@keyframes title-shimmer {
  to {
    background-position: 200% center;
  }
}

.hero__role {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 1.25rem;
}

.hero__text {
  font-size: 1.0625rem;
  color: var(--color-text-muted);
  max-width: 32rem;
  margin-bottom: 1.75rem;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin-bottom: 2rem;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.hero__meta a {
  transition: color var(--transition), transform var(--transition);
}

.hero__meta a:hover {
  color: var(--color-accent);
  transform: translateX(3px);
}

.hero__meta i {
  color: var(--color-accent);
  margin-right: 0.35rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero__visual {
  position: relative;
  display: flex;
  justify-content: center;
  perspective: 1000px;
}

.hero__ring {
  position: absolute;
  border: 1px solid rgba(125, 83, 222, 0.25);
  border-radius: 2rem;
  animation: ring-spin 20s linear infinite;
}

.hero__ring--1 {
  inset: -12%;
  border-style: dashed;
}

.hero__ring--2 {
  inset: -6%;
  animation-direction: reverse;
  animation-duration: 14s;
}

@keyframes ring-spin {
  to {
    transform: rotate(360deg);
  }
}

.hero__glow {
  position: absolute;
  inset: 5%;
  background: radial-gradient(circle, var(--color-accent-glow), transparent 70%);
  filter: blur(50px);
  animation: glow-pulse 4s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.hero__photo {
  position: relative;
  width: min(100%, 22rem);
  aspect-ratio: 1;
  border-radius: 2rem;
  overflow: hidden;
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-glow);
  transition: transform 0.15s ease-out;
  animation: photo-float 5s ease-in-out infinite;
}

@keyframes photo-float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -10px;
  }
}

.hero__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  translate: -50% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  animation: bounce-scroll 2s ease-in-out infinite;
}

.hero__scroll i {
  font-size: 1.25rem;
  color: var(--color-accent);
}

@keyframes bounce-scroll {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }

  .hero__badge {
    margin-inline: auto;
  }

  .hero__text,
  .hero__meta {
    margin-inline: auto;
  }

  .hero__meta {
    justify-content: center;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__visual {
    order: -1;
  }

  .hero__photo {
    width: min(70%, 16rem);
  }

  .hero__scroll {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-in,
  .hero__title,
  .hero__photo,
  .hero__glow,
  .hero__ring,
  .hero__badge-dot,
  .hero__scroll {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .hero__title {
    -webkit-text-fill-color: var(--color-text-primary);
    background: none;
  }
}
</style>
