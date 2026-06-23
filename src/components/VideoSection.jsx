import { useEffect, useRef } from 'react'
import { A } from '../lib/assets'
import styles from './VideoSection.module.css'

export default function VideoSection() {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    function update() {
      const section = sectionRef.current
      const frame = frameRef.current
      if (!section || !frame) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      let p = 1 - (rect.top + rect.height / 2 - vh / 2) / (vh * 0.9)
      p = Math.min(1, Math.max(0, p))
      const rotate = 28 * (1 - p)
      const scale = 0.8 + 0.2 * p
      frame.style.transform = `rotateX(${rotate}deg) scale(${scale})`
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    // Lazy-load src + play/pause based on viewport intersection.
    // rootMargin: '400px' means the browser starts fetching the video
    // 400px before it scrolls into view — poster stays visible until
    // enough data has buffered, so there's no stuck-thumbnail flash.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current
        if (!video) return
        if (entry.isIntersecting) {
          // Inject src only on first intersection so we don't download
          // 5.8 MB on initial page load
          if (!video.getAttribute('src')) {
            video.setAttribute('src', '/assets/hero_video.mp4')
            video.load()
          }
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '400px' }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={frameRef} className={styles.frame}>
        {/* No src here — injected lazily by IntersectionObserver above.
            poster shows immediately as a crisp thumbnail until the video
            has buffered enough to play without a stutter. */}
        <video
          ref={videoRef}
          className={styles.video}
          poster={A.videoThumb}
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
    </section>
  )
}
