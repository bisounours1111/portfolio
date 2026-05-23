<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n'

const props = defineProps({
  projects: { type: Array, required: true },
})

const { t } = useI18n()

function parseTechnologies(technologies) {
  return technologies.split(',').map((t) => t.trim())
}

const sortedProjects = computed(() =>
  [...props.projects].sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0
    const yearB = parseInt(b.year, 10) || 0
    return yearB - yearA
  }),
)
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">{{ t('sections.projects') }}</h2>
      </header>

      <div class="projects-grid">
        <article v-for="project in sortedProjects" :key="project.title" class="project-card card">
          <div class="project-card__media">
            <img :src="project.image" :alt="project.title" loading="lazy" />
            <span class="project-card__year">{{ project.year }}</span>
          </div>
          <div class="project-card__body">
            <h3 class="project-card__title">{{ project.title }}</h3>
            <div class="project-card__tags">
              <span
                v-for="tech in parseTechnologies(project.technologies)"
                :key="tech"
                class="chip chip--sm"
              >
                {{ tech }}
              </span>
            </div>
            <p v-if="project.description" class="project-card__desc">{{ project.description }}</p>
            <a
              v-if="project.link"
              :href="project.link"
              class="btn btn-outline btn-sm project-card__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('projectLink.view') }} <i class="bx bx-link-external"></i>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-bg-elevated);
}

.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .project-card__media img {
  transform: scale(1.05);
}

.project-card__year {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(28, 28, 28, 0.85);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  backdrop-filter: blur(8px);
}

.project-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-card__title {
  font-family: var(--font-family);
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.project-card__desc {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  flex: 1;
  margin-bottom: 1rem;
  line-height: 1.55;
}

.project-card__link {
  align-self: flex-start;
}
</style>
