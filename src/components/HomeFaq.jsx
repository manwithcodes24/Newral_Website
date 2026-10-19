import { useState } from 'react'
import { motion } from 'framer-motion'
import { HOME_FAQS } from '../data/homeFaqs'
import styles from './HomeFaq.module.css'

// Same accordion as the service pages. Answers stay in the DOM when collapsed
// so crawlers and AI answer engines can read every one.
export default function HomeFaq() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section className={styles.block} aria-labelledby="home-faq-heading">
      <div className="container">
        <h2 id="home-faq-heading" className={`section-heading ${styles.heading} reveal`}>
          Frequently asked <span className="serif">questions</span>
        </h2>
        <div className={styles.faqList}>
          {HOME_FAQS.map((faq, i) => {
            const open = openFaq === i
            return (
              <div key={faq.q} className={`${styles.faq} reveal`}>
                <h3 className={styles.faqHeading}>
                  <button
                    className={styles.faqQ}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    aria-controls={`home-faq-${i}`}
                  >
                    <span>{faq.q}</span>
                    <motion.span
                      className={styles.faqIcon}
                      animate={{ rotate: open ? 45 : 0 }}
                      style={{ color: open ? 'var(--accent-blue)' : 'var(--text-secondary)' }}
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>
                </h3>
                <motion.div
                  id={`home-faq-${i}`}
                  initial={false}
                  animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={styles.faqA}>{faq.a}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
