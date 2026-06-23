import { A } from '../lib/assets'
import { useReveal } from '../hooks/useReveal'
import { TextAnimate } from './TextAnimate'
import styles from './Projects.module.css'

const SLIDES = [
  { src: A.heroFlip2, alt: 'Project 1', title: 'Ride Sharing App', tag: 'UI/UX Design' },
  { src: A.heroInline2, alt: 'Project 2', title: 'E-commerce Platform', tag: 'Web Development' },
  { src: A.heroFlip3, alt: 'Project 3', title: 'Fintech Dashboard', tag: 'Product Strategy' },
]

export default function Projects() {
  const rT = useReveal()
  const rB = useReveal()

  return (
    <section className={styles.section} id="projects">
      <div className={styles.inner}>
        <h2 className="section-heading">
          <TextAnimate as="span" animation="blurIn" by="word" once duration={0.6}>
            Some of our
          </TextAnimate>{' '}
          <TextAnimate as="span" className="serif" animation="blurIn" by="word" once duration={0.5} delay={0.3}>
            recent projects
          </TextAnimate>
        </h2>

        <div ref={rT} className={`${styles.trackWrap} reveal d1`}>
          <div className={styles.track}>
            {[...SLIDES, ...SLIDES].map((s, i) => (
              <div key={i} className={`${styles.slide} ${i === 0 ? styles.first : ''}`}>
                <img src={s.src} alt={`${s.title} — ${s.tag} project by Newral`} loading="lazy" width="393" height="295" />
                <div className={styles.info}>
                  <p className={styles.pTitle}>{s.title}</p>
                  <p className={styles.pTag}>{s.tag}</p>
                </div>
                {/* <div className={styles.viewProject}>
                  <img src={A.arrowUp} alt="" />
                  <span>View Project</span>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        <button ref={rB} className="btn-dark btn-lg reveal d2" style={{ letterSpacing: '-0.8px' }}>
          View all projects
          <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
        </button>
      </div>
    </section>
  )
}
