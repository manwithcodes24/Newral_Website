import { Link } from 'react-router-dom'
import { FOUNDER, BUSINESS } from '../lib/site'
import styles from './FounderNote.module.css'

// Visible founder attribution (E-E-A-T) — mirrors the Person entity in the JSON-LD.
export default function FounderNote() {
  return (
    <section className={styles.section} aria-labelledby="founder-heading">
      <div className="container">
        <div className={`${styles.card} reveal`}>
          <img
            className={styles.photo}
            src="/assets/dreamTeam_5.webp"
            alt={`${FOUNDER.name}, founder of Newral`}
            loading="lazy"
            width="1000"
            height="750"
          />
          <div className={styles.text}>
            <p className={styles.eyebrow}>Founded in {BUSINESS.foundingDate}</p>
            <h2 id="founder-heading" className={styles.name}>
              {FOUNDER.name}
              <span className={styles.role}>Founder, Newral</span>
            </h2>
            <p className={styles.bio}>
              {FOUNDER.name} founded Newral in {BUSINESS.foundingDate} to give startups and growing businesses one
              accountable team that designs, builds and runs their product. He also founded{' '}
              <a href="https://synappses.in" target="_blank" rel="noopener noreferrer">Synappses</a>, Newral’s learning
              platform. Today Newral works with teams like Competishun, Bansal Classes, FIZZ and NEET Kaka JEE —{' '}
              <Link to="/work">see our work</Link>.
            </p>
            <a className={styles.link} href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
