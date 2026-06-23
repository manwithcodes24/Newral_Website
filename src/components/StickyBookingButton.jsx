import { useState, useEffect } from 'react'
import { useTransitionNavigate } from '../context/TransitionContext'
import styles from './StickyBookingButton.module.css'

export default function StickyBookingButton() {
  const [visible, setVisible] = useState(false)
  const navigate = useTransitionNavigate()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#contact')
    }
  }

  return (
    <div className={`${styles.wrapper} ${visible ? styles.show : ''}`}>
      <a
        className={styles.frameParent}
        href="https://cal.com/newralfounder"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <div className={styles.frameGroup}>
          {/* Left: dot + label */}
          <div className={styles.ellipseParent}>
            <span className={styles.dot} />
            <span className={styles.label}>Book a discovery call</span>
          </div>
          {/* Right: circular arrow */}
          <div className={styles.arrowCircle} aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M9 23L23 9M23 9H12M23 9V20" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </a>
    </div>
  )
}
