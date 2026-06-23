import { A } from '../lib/assets'
import { useReveal } from '../hooks/useReveal'
import { TextAnimate } from './TextAnimate'
import styles from './Pricing.module.css'

const plans = [
  { title: 'Mobile & Web Apps',     price: '$5999', from: true, features: ['4 - 8 Weeks to Delivery', 'Dedicated Product Team'] },
  { title: 'Brand & Design Systems', price: '$2499', from: true, features: ['2 - 3 Weeks to Delivery', 'Unlimited Revisions'] },
]

export default function Pricing() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headGroup}>
          <h2 className="section-heading" style={{ maxWidth: 742 }}>
            <TextAnimate as="span" animation="blurIn" by="word" once duration={0.6}>
              Own a Product Team for the Price of
            </TextAnimate>{' '}
            <TextAnimate as="span" className="serif" animation="blurIn" by="word" once duration={0.5} delay={0.4}>
              One Mid-Level Hire
            </TextAnimate>
          </h2>
          <TextAnimate as="p" className={styles.sub} animation="blurIn" by="word" once duration={0.6} delay={0.2}>
            Most partners slow teams down with handoffs and delays. We work as an extension of your team, combining strategy, design, and development support to help you move faster.
          </TextAnimate>
        </div>

        <div className={styles.carousel}>
          {plans.map((p, i) => {
            const r = useReveal()
            return (
              <div key={p.title} ref={r} className={`${styles.planCard} reveal`} style={{ '--delay': `${i * 0.12}s` }}>
                <h3 className={styles.planTitle}>{p.title}</h3>
                <div className={styles.planPrice}>
                  <span className={styles.starts}>Starts at </span>
                  <span className={styles.amount}>{p.price}</span>
                </div>
                {p.features.map((f, fi) => (
                  <p key={fi} className={styles.planFeature} style={{ top: 214 + fi * 47 }}>{f}</p>
                ))}
              </div>
            )
          })}

          {/* Featured card */}
          <div className={`${styles.planFeatured} reveal d2`}>
            <div className={styles.planInner}>
              <h3 className={styles.planTitle}>Websites &amp; Landing Pages</h3>
              <div className={styles.planPrice}>
                <span className={styles.starts}>Starts at </span>
                <span className={styles.amount}>$3499</span>
              </div>
              <p className={styles.planFeature} style={{ top: 214 }}>2 - 4 Weeks to Delivery</p>
              <p className={styles.planFeature} style={{ top: 261 }}>Unlimited Revisions</p>
              <img className={styles.planWave} src={A.planWave} alt="" />
            </div>
            <p className={styles.planSave}>Save up to 25%</p>
          </div>
        </div>
      </div>
    </section>
  )
}
