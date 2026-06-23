import { useEffect, useRef } from 'react'
import { A } from '../lib/assets'
import styles from './StatsSection.module.css'

const STATS = [
  { num: '{ 01 }', big: '5+',    caption: 'Years of Experience',    wave: A.wave1 },
  { num: '{ 02 }', big: '120+',  caption: 'Successful Launches',    wave: A.wave2 },
  { num: '{ 03 }', big: '100%',  caption: 'On-Time Agile Delivery', wave: A.wave3 },
  { num: '{ 04 }', big: '12+',   caption: 'Modern Tech Stacks',     wave: A.wave4 },
]

const clamp01 = v => Math.min(1, Math.max(0, v))
const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2

export default function StatsSection() {
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)
  const weAreRef   = useRef(null)
  const newralRef  = useRef(null)
  const cardsRef   = useRef(null)

  useEffect(() => {
    function update() {
      const section = sectionRef.current
      const stage   = stageRef.current
      const weAre   = weAreRef.current
      const newral  = newralRef.current
      const cards   = cardsRef.current
      if (!section || !stage || !weAre || !newral || !cards) return

      const total = section.offsetHeight - window.innerHeight
      const p = clamp01(-section.getBoundingClientRect().top / total)

      const stageW = stage.clientWidth
      const stageH = stage.clientHeight
      const gap = stageW * 0.04

      // texts: centered → corners
      let dxWe, dyWe, dxNw, dyNw
      if (window.innerWidth <= 768) {
        // mobile: words start stacked as a centered block, then split up/down
        const overlap = weAre.offsetHeight * 0.25
        const blockH = weAre.offsetHeight + newral.offsetHeight - overlap
        const startYWe = (stageH - blockH) / 2
        const startYNw = startYWe + weAre.offsetHeight - overlap
        dxWe = (stageW - weAre.offsetWidth) / 2
        dyWe = startYWe
        dxNw = (stageW - newral.offsetWidth) / 2 - (stageW - newral.offsetWidth)
        dyNw = startYNw - (stageH - newral.offsetHeight)
      } else {
        const pairW = weAre.offsetWidth + gap + newral.offsetWidth
        const startX = (stageW - pairW) / 2
        const centerY = (stageH - weAre.offsetHeight) / 2
        dxWe = startX
        dyWe = centerY
        dxNw = (startX + weAre.offsetWidth + gap) - (stageW - newral.offsetWidth)
        dyNw = centerY - (stageH - newral.offsetHeight)
      }
      const tText = 1 - easeInOut(clamp01(p / 0.40))
      weAre.style.transform = `translate(${dxWe * tText}px, ${dyWe * tText}px)`
      newral.style.transform = `translate(${dxNw * tText}px, ${dyNw * tText}px)`

      // cards: fade in stacked → spread
      const tIn     = easeInOut(clamp01((p - 0.35) / 0.25))
      const tSpread = easeInOut(clamp01((p - 0.60) / 0.40))

      Array.from(cards.children).forEach((card, i) => {
        const centerLeft = (stageW - card.offsetWidth) / 2
        const dx = window.innerWidth <= 768 ? 0 : (centerLeft - card.offsetLeft) * (1 - tSpread)
        const dy = 60 * (1 - tIn)
        card.style.transform = `translate(${dx}px, ${dy}px)`
        card.style.opacity   = tIn
        card.style.zIndex    = 10 - i
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <div ref={stageRef} className={styles.stage}>
          <p ref={weAreRef} className={styles.weAre}>We are</p>

          <div ref={cardsRef} className={styles.cards}>
            {STATS.map(s => (
              <div key={s.num} className={styles.card}>
                <img className={styles.wave} src={s.wave} alt="" />
                <div className={styles.cardContent}>
                  <p className={styles.numLabel}>{s.num}</p>
                  <div>
                    <p className={styles.big}>{s.big}</p>
                    <p className={styles.caption}>{s.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p ref={newralRef} className={styles.newral}>Newral</p>
        </div>
      </div>
    </section>
  )
}
