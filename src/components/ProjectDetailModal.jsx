import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '../i18n/I18nContext.jsx'
import './ProjectDetailModal.css'

function resolveAsset(path) {
  if (!path || path.startsWith('http')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export default function ProjectDetailModal({ project, onClose }) {
  const { t } = useI18n()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  const gallery = useMemo(() => {
    if (!project?.gallery?.length) return []
    return project.gallery.filter((item) => item.src).map((item) => ({
      ...item,
      src: resolveAsset(item.src),
    }))
  }, [project])

  const hasGallery = gallery.length > 0
  const selectedImage = gallery[selectedImageIndex] ?? null
  const hasImageCaption = Boolean(selectedImage?.caption)

  useEffect(() => {
    setSelectedImageIndex(0)
  }, [project])

  useEffect(() => {
    if (project) {
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
    }
  }, [project])

  useEffect(() => {
    if (!project) return

    function onKeydown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [project, onClose])

  if (!project) return null

  function onBackdropClick(event) {
    if (event.target === event.currentTarget) onClose()
  }

  return createPortal(
    <div
      className={`project-modal${visible ? ' project-modal--visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onBackdropClick}
    >
      <div className="project-modal__panel">
        <header className="project-modal__header">
          <div>
            <p className="project-modal__year">{project.year}</p>
            <h3 className="project-modal__title">{project.title}</h3>
          </div>
          <button
            type="button"
            className="project-modal__close"
            aria-label={t('projectModal.close')}
            onClick={onClose}
          >
            <i className="bx bx-x" />
          </button>
        </header>

        <div className={`project-modal__body${!hasGallery ? ' project-modal__body--no-gallery' : ''}`}>
          {hasGallery && (
            <aside className="project-modal__gallery">
              <p className="project-modal__label">{t('projectModal.gallery')}</p>
              <ul className="project-modal__gallery-list">
                {gallery.map((item, index) => (
                  <li key={`${item.src}-${index}`}>
                    <button
                      type="button"
                      className={`project-modal__gallery-item${index === selectedImageIndex ? ' project-modal__gallery-item--active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img src={item.src} alt={`${project.title} ${index + 1}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="project-modal__details">
            <section className="project-modal__bio">
              <h4 className="project-modal__label">{t('projectModal.projectBio')}</h4>
              {project.description ? (
                <p className="project-modal__text">{project.description}</p>
              ) : (
                <p className="project-modal__text project-modal__text--muted">
                  {t('projectModal.noProjectBio')}
                </p>
              )}
              {project.technologies && (
                <p className="project-modal__stack">{project.technologies}</p>
              )}
              {project.link && (
                <a
                  href={project.link}
                  className="project-modal__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('projectModal.visit')}
                  <i className="bx bx-link-external" />
                </a>
              )}
            </section>

            {hasImageCaption && (
              <section className="project-modal__caption">
                <h4 className="project-modal__label">{t('projectModal.imageCaption')}</h4>
                <p className="project-modal__text">{selectedImage.caption}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
