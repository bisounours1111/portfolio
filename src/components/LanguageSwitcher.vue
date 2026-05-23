<script setup>
import { useI18n } from '../i18n'

const { locale, setLocale } = useI18n()

const options = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]
</script>

<template>
  <div class="lang-switcher" role="group" aria-label="Language">
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="lang-switcher__btn"
      :class="{ 'lang-switcher__btn--active': locale === option.code }"
      :aria-pressed="locale === option.code"
      @click="setLocale(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.5rem;
  padding: 0.2rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
}

.lang-switcher__btn {
  padding: 0.35rem 0.65rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: color var(--transition), background var(--transition);
}

.lang-switcher__btn:hover {
  color: var(--color-text-primary);
}

.lang-switcher__btn--active {
  color: var(--color-text-primary);
  background: var(--color-accent-muted);
}

@media (max-width: 900px) {
  .lang-switcher {
    margin-left: 0;
    align-self: center;
    margin-top: 0.5rem;
  }
}
</style>
