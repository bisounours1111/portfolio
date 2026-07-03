import { useEffect, useState } from 'react'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  )
}
