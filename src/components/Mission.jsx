import { A } from '../lib/assets'
import styles from './Mission.module.css'
import { TextAnimate } from './TextAnimate'

export default function Mission() {
  const headingSegments = [
    { text: "We " },
    { text: "unite " },
    { text: "brand, ", className: styles.serif },
    { text: "culture ", className: styles.serif },
    { text: "and " },
    { text: "experience ", className: styles.serif },
    { text: "to " },
    { text: "drive " },
    { text: "impact " },
    { text: "inside " },
    { text: "and " },
    { text: "outside " },
    { text: "an " },
    { text: "organisation." }
  ]

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.textCol}>
          <TextAnimate
            as="p"
            animation="blurIn"
            by="word"
            once={true}
            className={styles.label}
            duration={0.4}
          >
            OUR VISION
          </TextAnimate>
          <TextAnimate
            as="h2"
            animation="blurIn"
            by="word"
            once={true}
            className={styles.heading}
            duration={0.6}
          >
            {headingSegments}
          </TextAnimate>
          <TextAnimate
            as="p"
            animation="blurIn"
            by="word"
            once={true}
            className={styles.subtext}
            duration={0.6}
            delay={0.2}
          >
            Your product may be stronger, but slow or inconsistent design means competitors look more credible and launch faster. They win early adopters before you're even in the market. By the time you're ready, they've already become the default choice.
          </TextAnimate>
        </div>
        <div className={styles.imgCol}>
          <img src={A.aboutMission} alt="Mission" className={styles.img} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}
