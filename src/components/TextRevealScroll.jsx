import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import styles from './TextRevealScroll.module.css'

function normalize(word) {
  return word.toLowerCase().replace(/[.,!?'"]/g, '')
}

export function TextRevealScroll({ text, className, eyebrow, highlights = [] }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const words = text.split(' ')
  const highlightSet = new Set(highlights.map(normalize))

  return (
    <div ref={containerRef} className={styles.track}>
      <div className={styles.sticky}>
        <div className={styles.glow} aria-hidden="true" />

        {eyebrow && (
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {eyebrow}
          </span>
        )}

        <p className={`${styles.paragraph} ${className || ''}`}>
          {words.map((word, i) => {
            // Stagger each word across the scroll, with a long overlap so the
            // reveal reads as one continuous sweep rather than discrete steps.
            const start = i / words.length
            const end = Math.min(1, start + 3 / words.length)
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                highlight={highlightSet.has(normalize(word))}
              >
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </div>
  )
}

function Word({ children, progress, range, highlight }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [14, 0])
  const blurPx = useTransform(progress, range, [10, 0])
  const filter = useMotionTemplate`blur(${blurPx}px)`

  return (
    <span className={styles.word}>
      <motion.span
        className={highlight ? styles.highlight : undefined}
        style={{ display: 'inline-block', opacity, y, filter, willChange: 'opacity, transform, filter' }}
      >
        {children}
      </motion.span>
      {' '}
    </span>
  )
}
