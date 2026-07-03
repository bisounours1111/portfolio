import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import ScrollReveal from './ScrollReveal'
import ProjectDetailModal from './ProjectDetailModal'
import './ProjectsSection.css'

function resolveAsset(path) {
  if (!path || path.startsWith('http')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export default function ProjectsSection({ projects }) {
  const { t } = useI18n()
  const viewportRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [slideWidth, setSlideWidth] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const sortedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        const yearA = parseInt(a.year, 10) || 0
        const yearB = parseInt(b.year, 10) || 0
        return yearB - yearA
      }),
    [projects],
  )

  const projectCount = sortedProjects.length

  const extendedProjects = useMemo(() => {
    if (!projectCount) return []
    return [...sortedProjects, ...sortedProjects, ...sortedProjects]
  }, [sortedProjects, projectCount])

  const trackOffset = slideWidth && projectCount
    ? (currentIndex - Math.floor(visibleCount / 2)) * slideWidth
    : 0

  const updateLayout = useCallback(() => {
    if (!viewportRef.current) return

    const width = viewportRef.current.offsetWidth
    let count = 3
    if (width < 640) count = 1
    else if (width < 960) count = 2

    setVisibleCount(count)
    setSlideWidth(width / count)
  }, [])

  const getSlideRole = useCallback(
    (trackIndex) => {
      const centerIndex = currentIndex
      if (trackIndex === centerIndex) return 'center'
      if (trackIndex === centerIndex - 1 || trackIndex === centerIndex + 1) return 'side'
      return 'hidden'
    },
    [currentIndex],
  )

  const normalizeIndex = useCallback(() => {
    if (!projectCount) return

    setCurrentIndex((i) => {
      if (i >= projectCount * 2) {
        setTransitionEnabled(false)
        setTimeout(() => setTransitionEnabled(true), 20)
        return i - projectCount
      }
      if (i < projectCount) {
        setTransitionEnabled(false)
        setTimeout(() => setTransitionEnabled(true), 20)
        return i + projectCount
      }
      return i
    })
  }, [projectCount])

  const moveBy = useCallback(
    async (step) => {
      if (!projectCount || isAnimating) return

      setIsAnimating(true)
      setCurrentIndex((i) => i + step)

      await new Promise((resolve) => setTimeout(resolve, 450))
      await normalizeIndex()
      setIsAnimating(false)
    },
    [projectCount, isAnimating, normalizeIndex],
  )

  const prev = useCallback(() => moveBy(-1), [moveBy])
  const next = useCallback(() => moveBy(1), [moveBy])

  function onTouchStart(event) {
    setTouchStartX(event.touches[0].clientX)
  }

  function onTouchEnd(event) {
    const diff = touchStartX - event.changedTouches[0].clientX
    if (Math.abs(diff) < 50) return
    if (diff > 0) next()
    else prev()
  }

  function openProject(project) {
    const match = sortedProjects.find((item) => item.title === project.title)
    setSelectedProject(match || project)
    document.body.style.overflow = 'hidden'
  }

  function closeProject() {
    setSelectedProject(null)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    setCurrentIndex(projectCount || 0)
  }, [projectCount])

  useEffect(() => {
    updateLayout()
    window.addEventListener('resize', updateLayout)

    let resizeObserver
    if (viewportRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateLayout)
      resizeObserver.observe(viewportRef.current)
    }

    return () => {
      window.removeEventListener('resize', updateLayout)
      resizeObserver?.disconnect()
    }
  }, [updateLayout])

  useEffect(() => {
    function onKeydown(event) {
      if (selectedProject) return
      if (event.key === 'ArrowLeft') prev()
      if (event.key === 'ArrowRight') next()
    }

    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  }, [selectedProject, prev, next])

  const displayIndex =
    projectCount > 0
      ? ((currentIndex - projectCount) % projectCount + projectCount) % projectCount + 1
      : 0

  return (
    <section id="projects" className="section">
      <div className="container">
        <ScrollReveal as="header" className="section-header">
          <h2 className="section-title">{t('sections.projects')}</h2>
        </ScrollReveal>

        <ScrollReveal
          className="carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div ref={viewportRef} className="carousel__viewport">
            <div
              className="carousel__track"
              style={{
                transform: `translateX(-${trackOffset}px)`,
                transition: transitionEnabled ? 'transform 0.45s var(--ease-out-expo)' : 'none',
              }}
            >
              {extendedProjects.map((project, index) => {
                const role = getSlideRole(index)
                return (
                  <article
                    key={`${project.title}-${index}`}
                    className={[
                      'carousel__slide',
                      role === 'center' ? 'carousel__slide--center' : '',
                      role === 'side' ? 'carousel__slide--side' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{ width: `${slideWidth}px` }}
                  >
                    <div className="carousel__slide-inner">
                      <div className="carousel__media">
                        <img src={resolveAsset(project.image)} alt={project.title} loading="lazy" />
                      </div>

                      <div className="carousel__content">
                        <h3 className="carousel__title">{project.title}</h3>
                        <p className="carousel__year">{project.year}</p>
                        {project.technologies && (
                          <p className="carousel__stack">{project.technologies}</p>
                        )}

                        <button
                          type="button"
                          className="carousel__details btn btn-outline btn-sm"
                          onClick={() => openProject(project)}
                        >
                          {t('projectModal.details')}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="carousel__footer">
            <button
              type="button"
              className="carousel__nav"
              aria-label={t('projectsCarousel.prev')}
              disabled={isAnimating}
              onClick={prev}
            >
              <i className="bx bx-chevron-left" />
            </button>

            <span className="carousel__counter">
              {displayIndex} / {projectCount}
            </span>

            <button
              type="button"
              className="carousel__nav"
              aria-label={t('projectsCarousel.next')}
              disabled={isAnimating}
              onClick={next}
            >
              <i className="bx bx-chevron-right" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <ProjectDetailModal project={selectedProject} onClose={closeProject} />
    </section>
  )
}
