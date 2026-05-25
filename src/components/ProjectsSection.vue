<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from '../i18n'
import ProjectDetailModal from './ProjectDetailModal.vue'

const props = defineProps({
  projects: { type: Array, required: true },
})

const { t } = useI18n()

const viewportRef = ref(null)
const currentIndex = ref(0)
const touchStartX = ref(0)
const visibleCount = ref(3)
const slideWidth = ref(0)
const transitionEnabled = ref(true)
const isAnimating = ref(false)
const selectedProject = ref(null)

const sortedProjects = computed(() =>
  [...props.projects].sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0
    const yearB = parseInt(b.year, 10) || 0
    return yearB - yearA
  }),
)

const projectCount = computed(() => sortedProjects.value.length)

const extendedProjects = computed(() => {
  if (!projectCount.value) return []
  return [
    ...sortedProjects.value,
    ...sortedProjects.value,
    ...sortedProjects.value,
  ]
})

const trackOffset = computed(() => {
  if (!slideWidth.value || !projectCount.value) return 0
  const centerOffset = Math.floor(visibleCount.value / 2)
  return (currentIndex.value - centerOffset) * slideWidth.value
})

const trackStyle = computed(() => ({
  transform: `translateX(-${trackOffset.value}px)`,
  transition: transitionEnabled.value ? 'transform 0.45s var(--ease-out-expo)' : 'none',
}))

function updateLayout() {
  if (!viewportRef.value) return

  const width = viewportRef.value.offsetWidth
  if (width < 640) visibleCount.value = 1
  else if (width < 960) visibleCount.value = 2
  else visibleCount.value = 3

  slideWidth.value = width / visibleCount.value
}

function getSlideRole(trackIndex) {
  const centerOffset = Math.floor(visibleCount.value / 2)
  const centerIndex = currentIndex.value
  if (trackIndex === centerIndex) return 'center'
  if (trackIndex === centerIndex - 1 || trackIndex === centerIndex + 1) return 'side'
  return 'hidden'
}

async function normalizeIndex() {
  const count = projectCount.value
  if (!count) return

  if (currentIndex.value >= count * 2) {
    transitionEnabled.value = false
    currentIndex.value -= count
    await nextTick()
    transitionEnabled.value = true
  } else if (currentIndex.value < count) {
    transitionEnabled.value = false
    currentIndex.value += count
    await nextTick()
    transitionEnabled.value = true
  }
}

async function moveBy(step) {
  if (!projectCount.value || isAnimating.value) return

  isAnimating.value = true
  currentIndex.value += step

  await new Promise((resolve) => setTimeout(resolve, 450))
  await normalizeIndex()
  isAnimating.value = false
}

function prev() {
  moveBy(-1)
}

function next() {
  moveBy(1)
}

function onTouchStart(event) {
  touchStartX.value = event.touches[0].clientX
}

function onTouchEnd(event) {
  const diff = touchStartX.value - event.changedTouches[0].clientX
  if (Math.abs(diff) < 50) return
  if (diff > 0) next()
  else prev()
}

function openProject(project) {
  const match = sortedProjects.value.find((item) => item.title === project.title)
  selectedProject.value = match || project
  document.body.style.overflow = 'hidden'
}

function closeProject() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

function onKeydown(event) {
  if (selectedProject.value) return
  if (event.key === 'ArrowLeft') prev()
  if (event.key === 'ArrowRight') next()
}

let resizeObserver

onMounted(() => {
  currentIndex.value = projectCount.value || 0
  updateLayout()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', updateLayout)

  if (viewportRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(updateLayout)
    resizeObserver.observe(viewportRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', updateLayout)
  resizeObserver?.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <header v-scroll-reveal class="section-header">
        <h2 class="section-title">{{ t('sections.projects') }}</h2>
      </header>

      <div
        v-scroll-reveal
        class="carousel"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div ref="viewportRef" class="carousel__viewport">
          <div class="carousel__track" :style="trackStyle">
            <article
              v-for="(project, index) in extendedProjects"
              :key="`${project.title}-${index}`"
              class="carousel__slide"
              :class="{
                'carousel__slide--center': getSlideRole(index) === 'center',
                'carousel__slide--side': getSlideRole(index) === 'side',
              }"
              :style="{ width: `${slideWidth}px` }"
            >
              <div class="carousel__slide-inner">
                <div class="carousel__media">
                  <img :src="project.image" :alt="project.title" loading="lazy" />
                </div>

                <div class="carousel__content">
                  <h3 class="carousel__title">{{ project.title }}</h3>
                  <p class="carousel__year">{{ project.year }}</p>
                  <p v-if="project.technologies" class="carousel__stack">
                    {{ project.technologies }}
                  </p>

                  <button
                    type="button"
                    class="carousel__details btn btn-outline btn-sm"
                    @click="openProject(project)"
                  >
                    {{ t('projectModal.details') }}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="carousel__footer">
          <button
            type="button"
            class="carousel__nav"
            :aria-label="t('projectsCarousel.prev')"
            :disabled="isAnimating"
            @click="prev"
          >
            <i class="bx bx-chevron-left"></i>
          </button>

          <span class="carousel__counter">
            {{ ((currentIndex - projectCount) % projectCount + projectCount) % projectCount + 1 }}
            / {{ projectCount }}
          </span>

          <button
            type="button"
            class="carousel__nav"
            :aria-label="t('projectsCarousel.next')"
            :disabled="isAnimating"
            @click="next"
          >
            <i class="bx bx-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <ProjectDetailModal :project="selectedProject" @close="closeProject" />
  </section>
</template>

<style scoped>
.carousel {
  width: 100%;
}

.carousel__viewport {
  overflow: hidden;
  padding-block: 0.75rem;
}

.carousel__track {
  display: flex;
  align-items: center;
  will-change: transform;
}

.carousel__slide {
  flex-shrink: 0;
  padding-inline: 0.5rem;
  transition:
    transform 0.45s var(--ease-out-expo),
    opacity 0.45s var(--ease-out-expo);
  transform: scale(0.9);
  opacity: 0.55;
}

.carousel__slide--side {
  transform: scale(0.9);
  opacity: 0.75;
}

.carousel__slide--center {
  transform: scale(1);
  opacity: 1;
  z-index: 1;
}

.carousel__slide-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  overflow: hidden;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.carousel__slide--center .carousel__slide-inner {
  border-color: var(--color-border);
  box-shadow: var(--shadow-card);
}

.carousel__media {
  aspect-ratio: 4 / 3;
  background: var(--color-bg-elevated);
  overflow: hidden;
}

.carousel__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__content {
  padding: 1rem 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.carousel__title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
}

.carousel__year {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.carousel__stack {
  font-size: 0.75rem;
  color: var(--color-accent);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.carousel__details {
  margin-top: auto;
  padding-top: 0.5rem;
  align-self: flex-start;
}

.carousel__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1rem;
}

.carousel__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: border-color var(--transition), background var(--transition), opacity var(--transition);
}

.carousel__nav:hover:not(:disabled) {
  border-color: var(--color-border);
  background: var(--color-accent-muted);
}

.carousel__nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel__nav i {
  font-size: 1.5rem;
}

.carousel__counter {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-muted);
  min-width: 3rem;
  text-align: center;
}

@media (max-width: 959px) {
  .carousel__slide:not(.carousel__slide--center) {
    transform: scale(0.92);
    opacity: 0.7;
  }
}

@media (max-width: 639px) {
  .carousel__slide {
    transform: scale(1);
    opacity: 1;
    padding-inline: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel__track,
  .carousel__slide {
    transition: none;
  }
}
</style>
