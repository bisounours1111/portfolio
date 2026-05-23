<script setup>
defineProps({
  experiences: { type: Array, required: true },
  education: { type: Array, required: true },
})
</script>

<template>
  <section id="experience" class="section section--alt">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">Experience & Education</h2>
      </header>

      <div class="timeline-grid">
        <div class="timeline-column">
          <h3 class="timeline-column__title">Professional Experience</h3>
          <div class="timeline">
            <article v-for="item in experiences" :key="item.title" class="timeline-item card">
              <div class="timeline-item__marker"></div>
              <time class="timeline-item__date">{{ item.year }}</time>
              <h4 class="timeline-item__title">{{ item.title }}</h4>
              <p class="timeline-item__company">{{ item.company }}</p>
              <p class="timeline-item__stack">{{ item.stack }}</p>
              <ul class="timeline-item__list">
                <li v-for="(highlight, i) in item.highlights" :key="i">{{ highlight }}</li>
              </ul>
            </article>
          </div>
        </div>

        <div class="timeline-column">
          <h3 class="timeline-column__title">Education & Certifications</h3>
          <div class="timeline">
            <article v-for="item in education" :key="item.title" class="timeline-item card">
              <div class="timeline-item__marker"></div>
              <time class="timeline-item__date">{{ item.year }}</time>
              <h4 class="timeline-item__title">{{ item.title }}</h4>
              <p class="timeline-item__desc">{{ item.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section--alt {
  background: linear-gradient(180deg, transparent, rgba(125, 83, 222, 0.04), transparent);
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
}

.timeline-column__title {
  font-family: var(--font-display);
  font-size: 1.375rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.timeline-item {
  position: relative;
  padding-left: 1.25rem;
  border-left: 2px solid var(--color-border);
}

.timeline-item__marker {
  position: absolute;
  left: -7px;
  top: 1.5rem;
  width: 12px;
  height: 12px;
  background: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--color-accent-glow);
}

.timeline-item__date {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.timeline-item__title {
  font-size: 1.0625rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.timeline-item__company {
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.timeline-item__stack {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.timeline-item__desc {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.timeline-item__list {
  padding-left: 1.125rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
}

.timeline-item__list li {
  margin-bottom: 0.35rem;
}
</style>
