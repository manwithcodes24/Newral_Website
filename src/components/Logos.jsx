import { A } from '../lib/assets'
import { useReveal } from '../hooks/useReveal'
import { TextAnimate } from './TextAnimate'
import styles from './Logos.module.css'

// 3 unique source files — duplicate entries just to fill the marquee width.
// Keep the array at exactly 8 items so [...LOGOS, ...LOGOS] = 16 cards per
// strip, which is enough for a seamless loop without extra DOM bloat.
const LOGOS = [A.logoImg8, A.logoImg9, A.logoImg10, A.logoImg11, A.logoImg12, A.logoImg13]

// Preload the 3 unique logo files so they're in-cache by the time the
// marquee animation starts (each file is ~2–3 KB, negligible cost).
const UNIQUE_SRCS = [...new Set(LOGOS)]

export default function Logos() {
  const r2 = useReveal()

  return (
    <section className={styles.section} id="about">
      {/* Hint browser to fetch the 3 unique logo images immediately */}
      {UNIQUE_SRCS.map(src => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}

      <div className={styles.inner}>
        <TextAnimate as="p" className={styles.label} animation="blurIn" by="word" once duration={0.5}>
          Trusted by 50+ companies
        </TextAnimate>
        <div ref={r2} className={`${styles.strips} reveal d1`}>
          <div className={`${styles.strip} ${styles.left}`}>
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <div key={i} className={styles.card}>
                <img src={src} alt="" loading="eager" decoding="sync" />
              </div>
            ))}
          </div>
          <div className={`${styles.strip} ${styles.right}`}>
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <div key={i} className={styles.card}>
                <img src={src} alt="" loading="eager" decoding="sync" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
