import { A } from '../lib/assets'
import { useReveal } from '../hooks/useReveal'
import FadeText from './FadeText'
import styles from './FooterCTA.module.css'

export default function FooterCTA() {
  const rC = useReveal()

  return (
    <section className={styles.section} id="contact">
      <img className={styles.glow}    src={A.footerGlow} alt="" />
      <img className={styles.waveBg}  src={A.footerWave} alt="" />
      <FadeText as="h2" className={styles.heading} text="Book a 15-min call" />
      <FadeText
        as="p"
        className={styles.sub}
        text="Book a free 15-minute call with our Noida-based team to discuss UI/UX design, app development, and DevOps for your product."
        delay={0.15}
      />
      <iframe
        ref={rC}
        className={`${styles.cal} reveal d2`}
        src="https://cal.com/newralfounder?theme=light"
        title="Book a discovery call"
        style={{ border: 'none' }}
      />
    </section>
  )
}
