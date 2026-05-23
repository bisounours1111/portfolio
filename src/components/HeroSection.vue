<script setup>
import { useI18n } from '../i18n'

defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()
</script>

<template>
  <section id="home" class="hero section">
    <div class="container hero__grid">
      <div class="hero__content">
        <h1 class="hero__title">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.title }}</p>
        <p v-if="profile.heroText" class="hero__text">{{ profile.heroText }}</p>

        <div class="hero__meta">
          <span><i class="bx bx-map"></i> {{ profile.location }}</span>
          <a :href="`mailto:${profile.email}`"><i class="bx bx-envelope"></i> {{ profile.email }}</a>
          <a :href="profile.phoneHref"><i class="bx bx-phone"></i> {{ profile.phone }}</a>
        </div>

        <div class="hero__actions">
          <a href="#projects" class="btn btn-primary">{{ t('hero.projects') }}</a>
          <a href="#contact" class="btn btn-outline">{{ t('hero.contact') }}</a>
          <a href="/cv.pdf" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
            <i class="bx bx-download"></i> {{ t('hero.cv') }}
          </a>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__glow"></div>
        <div class="hero__photo">
          <img src="/photo.webp" :alt="profile.name" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
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

.hero__title {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  line-height: 1.05;
  margin-bottom: 0.5rem;
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

.hero__meta a:hover {
  color: var(--color-accent);
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
}

.hero__glow {
  position: absolute;
  inset: 10%;
  background: radial-gradient(circle, var(--color-accent-glow), transparent 70%);
  filter: blur(40px);
}

.hero__photo {
  position: relative;
  width: min(100%, 22rem);
  aspect-ratio: 1;
  border-radius: 2rem;
  overflow: hidden;
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-glow);
}

.hero__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
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
}
</style>
