import { useEffect, useRef, useState } from 'react'

export default function FadeText({ text = '', as: Component = 'p', className = '', delay = 0 }) {
  const ref = useRef(null)
  // Track `visible` in React state rather than via imperative classList.add —
  // otherwise a re-render reconciles className back to its JSX value and strips
  // the class, leaving the words stuck hidden.
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  const words = text.split(' ')

  return (
    <Component ref={ref} className={`${className} fade-text${visible ? ' visible' : ''}`}>
      {words.map((word, i) => (
        <span key={i} className="word" style={{ transitionDelay: `${delay + i * 0.04}s` }}>
          {word}&nbsp;
        </span>
      ))}
    </Component>
  )
}
