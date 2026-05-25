<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import { useI18n } from '../i18n'

const props = defineProps({
  project: { type: Object, default: null },
})

const emit = defineEmits(['close'])

const { t } = useI18n()
const selectedImageIndex = ref(0)

const gallery = computed(() => {
  if (!props.project?.gallery?.length) return []
  return props.project.gallery.filter((item) => item.src)
})

const hasGallery = computed(() => gallery.value.length > 0)

const selectedImage = computed(
  () => gallery.value[selectedImageIndex.value] ?? null,
)

const hasImageCaption = computed(() => Boolean(selectedImage.value?.caption))

watch(
  () => props.project,
  (project) => {
    selectedImageIndex.value = 0
    if (project) window.addEventListener('keydown', onKeydown)
    else window.removeEventListener('keydown', onKeydown)
  },
)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

function close() {
  emit('close')
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) close()
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="project"
        class="project-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="project.title"
        @click="onBackdropClick"
      >
        <div class="project-modal__panel">
          <header class="project-modal__header">
            <div>
              <p class="project-modal__year">{{ project.year }}</p>
              <h3 class="project-modal__title">{{ project.title }}</h3>
            </div>
            <button
              type="button"
              class="project-modal__close"
              :aria-label="t('projectModal.close')"
              @click="close"
            >
              <i class="bx bx-x"></i>
            </button>
          </header>

          <div
            class="project-modal__body"
            :class="{ 'project-modal__body--no-gallery': !hasGallery }"
          >
            <aside v-if="hasGallery" class="project-modal__gallery">
              <p class="project-modal__label">{{ t('projectModal.gallery') }}</p>
              <ul class="project-modal__gallery-list">
                <li v-for="(item, index) in gallery" :key="`${item.src}-${index}`">
                  <button
                    type="button"
                    class="project-modal__gallery-item"
                    :class="{ 'project-modal__gallery-item--active': index === selectedImageIndex }"
                    @click="selectedImageIndex = index"
                  >
                    <img :src="item.src" :alt="`${project.title} ${index + 1}`" />
                  </button>
                </li>
              </ul>
            </aside>

            <div class="project-modal__details">
              <section class="project-modal__bio">
                <h4 class="project-modal__label">{{ t('projectModal.projectBio') }}</h4>
                <p v-if="project.description" class="project-modal__text">
                  {{ project.description }}
                </p>
                <p v-else class="project-modal__text project-modal__text--muted">
                  {{ t('projectModal.noProjectBio') }}
                </p>
                <p v-if="project.technologies" class="project-modal__stack">
                  {{ project.technologies }}
                </p>
                <a
                  v-if="project.link"
                  :href="project.link"
                  class="project-modal__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ t('projectModal.visit') }}
                  <i class="bx bx-link-external"></i>
                </a>
              </section>

              <section v-if="hasImageCaption" class="project-modal__caption">
                <h4 class="project-modal__label">{{ t('projectModal.imageCaption') }}</h4>
                <p class="project-modal__text">{{ selectedImage.caption }}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.project-modal {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
}

.project-modal__panel {
  width: min(100%, 56rem);
  max-height: min(90vh, 44rem);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius-lg) + 0.25rem);
  background: var(--color-bg-elevated);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.project-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.project-modal__year {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 0.25rem;
}

.project-modal__title {
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.25;
}

.project-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background var(--transition), border-color var(--transition);
}

.project-modal__close:hover {
  background: var(--color-accent-muted);
  border-color: var(--color-border);
}

.project-modal__close i {
  font-size: 1.5rem;
}

.project-modal__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  min-height: 0;
  flex: 1;
}

.project-modal__body--no-gallery {
  grid-template-columns: 1fr;
}

.project-modal__gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border-right: 1px solid var(--color-border-subtle);
  min-height: 0;
}

.project-modal__gallery-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  padding-right: 0.25rem;
  min-height: 0;
}

.project-modal__gallery-item {
  width: 100%;
  padding: 0;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg);
  cursor: pointer;
  transition: border-color var(--transition), transform var(--transition);
}

.project-modal__gallery-item:hover {
  transform: translateY(-2px);
}

.project-modal__gallery-item--active {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px rgba(125, 83, 222, 0.2);
}

.project-modal__gallery-item img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
}

.project-modal__details {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.project-modal__bio,
.project-modal__caption {
  padding: 1.25rem 1.5rem;
}

.project-modal__bio {
  flex: 1;
  overflow-y: auto;
  border-bottom: 1px solid var(--color-border-subtle);
}

.project-modal__caption {
  flex-shrink: 0;
  max-height: 40%;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.02);
}

.project-modal__label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.65rem;
}

.project-modal__text {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

.project-modal__text--muted {
  color: var(--color-text-muted);
  font-style: italic;
}

.project-modal__stack {
  margin-top: 0.85rem;
  font-size: 0.8125rem;
  color: var(--color-accent);
  line-height: 1.5;
}

.project-modal__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--transition);
}

.project-modal__link:hover {
  color: var(--color-accent);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-active .project-modal__panel,
.modal-leave-active .project-modal__panel {
  transition: transform 0.25s var(--ease-out-expo), opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .project-modal__panel,
.modal-leave-to .project-modal__panel {
  transform: translateY(12px) scale(0.98);
  opacity: 0;
}

@media (max-width: 768px) {
  .project-modal {
    padding: 0.75rem;
  }

  .project-modal__panel {
    max-height: 92vh;
  }

  .project-modal__body {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .project-modal__gallery {
    border-right: none;
    border-bottom: 1px solid var(--color-border-subtle);
    max-height: 14rem;
  }

  .project-modal__gallery-list {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 0.25rem;
  }

  .project-modal__gallery-item {
    min-width: 10rem;
  }

  .project-modal__caption {
    max-height: none;
  }
}
</style>
