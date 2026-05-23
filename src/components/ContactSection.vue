<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n'

defineProps({
  profile: { type: Object, required: true },
  socialLinks: { type: Array, required: true },
})

const { t } = useI18n()

const form = ref({ name: '', email: '', message: '' })
const submitting = ref(false)
const submitMessage = ref('')
const submitError = ref(false)

async function submitContact() {
  submitting.value = true
  submitMessage.value = ''
  submitError.value = false

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!response.ok) throw new Error('Failed to send')

    form.value = { name: '', email: '', message: '' }
    submitMessage.value = t('contact.success')
  } catch {
    submitMessage.value = t('contact.error')
    submitError.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="section section--alt">
    <div class="container">
      <header v-scroll-reveal class="section-header">
        <h2 class="section-title">{{ t('sections.contact') }}</h2>
      </header>

      <div class="contact-grid">
        <aside v-scroll-reveal="{ direction: 'left' }" class="contact-info card">
          <div class="contact-info__item">
            <i class="bx bx-map"></i>
            <div>
              <span class="contact-info__label">{{ t('contact.location') }}</span>
              <span>{{ profile.location }}</span>
            </div>
          </div>
          <div class="contact-info__item">
            <i class="bx bx-envelope"></i>
            <div>
              <span class="contact-info__label">{{ t('contact.email') }}</span>
              <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            </div>
          </div>
          <div class="contact-info__item">
            <i class="bx bx-phone"></i>
            <div>
              <span class="contact-info__label">{{ t('contact.phone') }}</span>
              <a :href="profile.phoneHref">{{ profile.phone }}</a>
            </div>
          </div>

          <div class="contact-info__socials">
            <a
              v-for="link in socialLinks"
              :key="link.href"
              :href="link.href"
              class="contact-info__social"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              :aria-label="link.icon"
            >
              <i :class="link.icon"></i>
            </a>
          </div>
        </aside>

        <form v-scroll-reveal="{ direction: 'right', delay: 100 }" class="contact-form card" @submit.prevent="submitContact">
          <div class="form-field">
            <label for="name">{{ t('contact.name') }}</label>
            <input v-model="form.name" id="name" type="text" required />
          </div>
          <div class="form-field">
            <label for="email">{{ t('contact.email') }}</label>
            <input v-model="form.email" id="email" type="email" required />
          </div>
          <div class="form-field">
            <label for="message">{{ t('contact.message') }}</label>
            <textarea
              v-model="form.message"
              id="message"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? t('contact.sending') : t('contact.send') }}
          </button>
          <p
            v-if="submitMessage"
            class="form-feedback"
            :class="{ 'form-feedback--error': submitError }"
          >
            {{ submitMessage }}
          </p>
        </form>
      </div>
    </div>
  </section>

  <footer v-scroll-reveal class="site-footer">
    <div class="container site-footer__inner">
      <p>&copy; {{ new Date().getFullYear() }} {{ profile.name }}</p>
    </div>
  </footer>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 1.5rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-info__item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.contact-info__item i {
  font-size: 1.25rem;
  color: var(--color-accent);
  margin-top: 0.15rem;
}

.contact-info__item div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.contact-info__label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.contact-info__item a:hover {
  color: var(--color-accent);
}

.contact-info__socials {
  display: flex;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

.contact-info__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-accent);
  transition: background var(--transition), transform var(--transition);
}

.contact-info__social:hover {
  background: var(--color-accent-muted);
  transform: translateY(-2px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-field label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.form-field input,
.form-field textarea {
  padding: 0.875rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
  resize: vertical;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
  transform: translateY(-1px);
}

.form-field input::placeholder,
.form-field textarea::placeholder {
  color: var(--color-text-muted);
}

.form-feedback {
  font-size: 0.9375rem;
  color: var(--color-accent);
}

.form-feedback--error {
  color: var(--color-danger);
}

.site-footer {
  padding: 2rem 0 3rem;
  border-top: 1px solid var(--color-border-subtle);
}

.site-footer__inner {
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
