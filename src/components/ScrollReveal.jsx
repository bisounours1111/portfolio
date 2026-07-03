import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ScrollReveal({ children, delay = 0, direction, className = '', as: Tag = 'div', ...props }) {
  const ref = useScrollReveal({ delay, direction })

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}
