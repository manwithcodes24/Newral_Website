import { A } from '../lib/assets'
import { useReveal } from '../hooks/useReveal'
import { TextAnimate } from './TextAnimate'
import styles from './HowWeWork.module.css'

const steps = [
  {
    step: "{ Step 1 }",
    title: "Brief/Short details",
    img: A.howWeWork1,
  },
  {
    step: "{ Step 2 }",
    title: "Design & Prototype",
    img: A.howWeWork2,
  },
  {
    step: "{ Step 3 }",
    title: "Development & Launch",
    img: A.howWeWork3,
  }
];

function StepCard({ s, i }) {
  const ref = useReveal()
  return (
    <>
      <div ref={ref} className={`${styles.stack} reveal`} style={{ top: `calc(var(--stack-top, clamp(82px, 10vw, 120px)) + ${i * 40}px)`, zIndex: i + 1 }}>
        <div className={styles.cardFront}>
          <img className={styles.bgImg} style={{ opacity: 1 }} src={s.img} alt={s.title} width="260" height="331" loading="lazy" decoding="async" />
        </div>
      </div>
      <div className={styles.spacer} />
    </>
  )
}

export default function HowWeWork() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <TextAnimate as="h2" className={styles.title} animation="blurIn" by="word" once duration={0.6}>
          How We Work
        </TextAnimate>
        <div className={styles.cardsWrapper}>
          {steps.map((s, i) => (
            <StepCard key={i} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
