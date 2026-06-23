import { useEffect, useRef } from 'react'
import { A } from '../lib/assets'
import { useReveal } from '../hooks/useReveal'
import FadeText from './FadeText'
import { TextAnimate } from './TextAnimate'
import styles from './Services.module.css'

const SERVICES = [
  {
    idx: '{ 1 }', title: 'UI/UX Design', color: 'c1',
    desc: 'User-first UI/UX design — research, wireframes, and polished interfaces that turn complex products into intuitive experiences people love.',
  },
  {
    idx: '{ 2 }', title: 'Graphic Design', color: 'c2',
    desc: 'Brand identity, logos, and marketing graphics that make your startup look sharp, consistent, and memorable across every channel.',
  },
  {
    idx: '{ 3 }', title: 'App Development', color: 'c3',
    desc: 'Fast, scalable iOS, Android, and cross-platform apps built with modern frameworks, clean code, and performance baked in from day one.',
  },
  {
    idx: '{ 4 }', title: 'Web Development', color: 'c4',
    desc: 'Conversion-focused websites and web apps — responsive, lightning-fast, and SEO-ready, engineered to grow with your business.',
  },
  {
    idx: '{ 5 }', title: 'DevOps', color: 'c5',
    desc: 'CI/CD pipelines, cloud infrastructure, and automated deployments that keep your product reliable, secure, and ready to scale.',
  },
]

export default function Services() {
  const stackRef = useRef(null)

  useEffect(() => {
    function update() {
      if (!stackRef.current) return
      const items = stackRef.current.querySelectorAll('[data-stack-item]')
      items.forEach((item, idx) => {
        const card = item.querySelector('[data-card]')
        const next = items[idx + 1]
        if (!next || !card) { if (card) { card.style.transform = ''; card.style.filter = '' } return }
        const nRect = next.getBoundingClientRect()
        const cRect = card.getBoundingClientRect()
        let overlap = (cRect.bottom - nRect.top) / cRect.height
        overlap = Math.min(1, Math.max(0, overlap))
        card.style.transform = `scale(${1 - overlap * 0.06})`
        card.style.filter    = `brightness(${1 - overlap * 0.25})`
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>
        <h2 className="section-heading" style={{ maxWidth: 529 }}>
          <TextAnimate as="span" animation="blurIn" by="word" once duration={0.6}>
            See how our services
          </TextAnimate>{' '}
          <TextAnimate as="span" className="serif" animation="blurIn" by="word" once duration={0.5} delay={0.4}>
            drive your success
          </TextAnimate>
        </h2>
        <div ref={stackRef} className={styles.stack}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className={styles.stackItem} data-stack-item style={{ '--stack-top': `${96 + i * 16}px` }}>
              <div className={`${styles.card} ${styles[s.color]}`} data-card>
                <p className={`${styles.idx} reveal`}>{s.idx}</p>
                <TextAnimate as="h3" className={styles.title} animation="blurIn" by="word" once duration={0.5}>
                  {s.title}
                </TextAnimate>
                <FadeText className={`${styles.desc} d2`} text={s.desc} />
                <img className={styles.shot} src={A.serviceShot} alt={`${s.title} work sample by Newral, Noida`} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
