import { A } from '../lib/assets'
import styles from './CoreValues.module.css'
import { TextAnimate } from './TextAnimate'

const VALUES = [
  {
    title: 'Transparent Communication',
    desc: 'We prioritize open dialogue, ensuring clients are informed at every turn. Our clear communication fosters trust and alignment, enriching collaboration.',
    img: A.aboutValueOrb1
  },
  {
    title: 'Precision Management',
    desc: 'Our meticulous planning and execution ensure project success. Deadlines are met, objectives achieved, and complexities managed seamlessly, guaranteeing client satisfaction.',
    img: A.aboutValueOrb2
  },
  {
    title: 'Meticulous Detail',
    desc: 'We obsess over details, perfecting design elements to deliver exceptional outcomes. From aesthetics to functionality, our dedication shines through in every pixel.',
    img: A.aboutValueOrb3
  }
]

export default function CoreValues() {
  const headingSegments = [
    { text: "Why " },
    { text: "Newral?", className: styles.serif }
  ]

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <TextAnimate
            as="h2"
            animation="blurIn"
            by="word"
            once={true}
            duration={0.4}
          >
            {headingSegments}
          </TextAnimate>
          <TextAnimate
            as="p"
            animation="blurIn"
            by="word"
            once={true}
            className={styles.subtitle}
            duration={0.6}
            delay={0.1}
          >
            Newral combines product design, scalable development, and growth-focused systems to help startups and modern businesses move faster.
          </TextAnimate>
        </div>
        
        <div className={styles.grid}>
          {VALUES.map((v, i) => (
            <div key={i} className={styles.card}>
              <img src={v.img} alt="" className={styles.iconImage} />
              <TextAnimate
                as="h3"
                animation="blurIn"
                by="word"
                once={true}
                duration={0.4}
                delay={i * 0.1}
              >
                {v.title}
              </TextAnimate>
              <TextAnimate
                as="p"
                animation="blurIn"
                by="word"
                once={true}
                duration={0.5}
                delay={i * 0.1 + 0.1}
              >
                {v.desc}
              </TextAnimate>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

