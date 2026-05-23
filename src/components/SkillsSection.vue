<script setup>
import { useI18n } from '../i18n'

defineProps({
  technicalSkills: { type: Array, required: true },
  languages: { type: Array, required: true },
  interests: { type: Array, required: true },
  softSkills: { type: Array, required: true },
})

const { t } = useI18n()
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">{{ t('sections.skills') }}</h2>
      </header>

      <div class="skills-grid">
        <article v-for="group in technicalSkills" :key="group.category" class="card skill-card">
          <h3 class="skill-card__title">{{ group.category }}</h3>
          <div class="skill-card__chips">
            <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
          </div>
        </article>
      </div>

      <div class="skills-secondary">
        <article class="card skill-card">
          <h3 class="skill-card__title">{{ t('sections.languages') }}</h3>
          <ul class="skill-list">
            <li v-for="lang in languages" :key="lang.name">
              <span>{{ lang.name }}</span>
              <span class="chip chip--sm">{{ lang.level }}</span>
            </li>
          </ul>
        </article>

        <article class="card skill-card">
          <h3 class="skill-card__title">{{ t('sections.interests') }}</h3>
          <div class="skill-card__chips">
            <span v-for="interest in interests" :key="interest" class="chip">{{ interest }}</span>
          </div>
        </article>
      </div>

      <div class="soft-skills">
        <h3 class="soft-skills__heading">{{ t('sections.softSkills') }}</h3>
        <div class="soft-skills__grid">
          <article v-for="skill in softSkills" :key="skill.title" class="card soft-skill-card">
            <h4 class="soft-skill-card__title">{{ skill.title }}</h4>
            <p class="soft-skill-card__text">{{ skill.description }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.skills-secondary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
}

.skill-card__title {
  font-family: var(--font-family);
  font-size: 1.25rem;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.skill-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip--sm {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
}

.skill-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-text-secondary);
}

.soft-skills__heading {
  font-family: var(--font-family);
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
}

.soft-skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.soft-skill-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.soft-skill-card__text {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}
</style>
