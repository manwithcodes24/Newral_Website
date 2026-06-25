import { useEffect, useRef } from 'react'
import { A } from '../lib/assets'
import { useTransitionNavigate } from '../context/TransitionContext'
import styles from './Hero.module.css'

function FlipBox({ images, className, intervalMs = 2600, startDelay = 1200 }) {
  const boxRef = useRef(null)

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const imgs = box.querySelectorAll('img')
    if (imgs.length < 2) return
    let i = 0
    const id = setTimeout(() => {
      const interval = setInterval(() => {
        const current = imgs[i]
        i = (i + 1) % imgs.length
        const next = imgs[i]
        current.classList.remove('active', styles.flipIn)
        current.classList.add(styles.flipOut)
        next.classList.remove(styles.flipOut)
        next.classList.add('active', styles.flipIn)
        setTimeout(() => current.classList.remove(styles.flipOut), 600)
      }, intervalMs)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(id)
  }, [intervalMs, startDelay])

  return (
    <div ref={boxRef} className={`${styles.flipBox} ${className || ''}`}>
      {images.map((src, idx) => (
        <img key={src} src={src} alt="" className={idx === 0 ? 'active' : ''} />
      ))}
    </div>
  )
}

export default function Hero() {
  const navigate = useTransitionNavigate()

  return (
    <section className={styles.hero}>
      <picture>
        <source media="(max-width: 768px)" srcSet={A.heroBgMobile} />
        <img className={styles.bg} src={A.heroBg} alt="" fetchPriority="high" loading="eager" />
      </picture>
      <div className={`${styles.content} container`}>

        {/* Single semantic H1 for SEO; the stylised lines below are visual only */}
        <h1 className="sr-only">
          UI/UX Design &amp; App Development Agency in Noida, Delhi NCR — Newral builds products that scale beautifully.
        </h1>

        <div className={styles.title} aria-hidden="true">
          {/* Line 1 */}
          <div className={styles.line1}>
            <div className={`${styles.display} ${styles.hf1}`}>we build products</div>
            <div className={`${styles.cardStack} ${styles.hf2}`}>
              <img className={styles.cBack} src={A.heroCardBack} alt="" />
              <FlipBox
                images={[A.heroFlip1, A.heroFlip2, A.heroFlip3]}
                className={styles.stackFlip}
                intervalMs={2600}
                startDelay={1200}
              />
            </div>
          </div>

          {/* Line 2 */}
          <div className={styles.line2}>
            <div className={styles.hf2}>
              <span className={styles.display} style={{ marginRight: '0.2em' }}>that</span>
              <span className={`${styles.serif} ${styles.blue}`}>scale</span>
            </div>
            {/* <picture> serves WebP (110 KB) to modern browsers,
                GIF (786 KB) only to legacy ones */}
            <picture>
              <source srcSet={A.heroInlineWebp} type="image/webp" />
              <img
                className={`${styles.inlineFlip} ${styles.hf3}`}
                src={A.heroInlineGif}
                alt=""
                fetchPriority="high"
                loading="eager"
              />
            </picture>
            <div className={`${styles.serif} ${styles.blue} ${styles.hf3}`}>beautifully</div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={`${styles.ctaRow} ${styles.hf4}`}>
            <button className="btn-dark btn-lg" onClick={() => navigate('/services')}>
              Explore our services
              <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
            </button>
            <button onClick={()=> window.open("https://api.whatsapp.com/send?phone=+917080682448&text=https://api.whatsapp.com/send?phone=+917080682448&text=hi i am interested to work with newral for web or App Dev")} className="btn-whatsapp">
              <img src={A.whatsapp} alt="" />
              Chat on WhatsApp
            </button>
          </div>
          <p className={`${styles.sub} ${styles.hf5}`}>
            Newral is a Noida-based tech agency crafting UI/UX design, app development,
            and DevOps systems that help startups and modern businesses scale faster.
          </p>
        </div>

      </div>
    </section>
  )
}
