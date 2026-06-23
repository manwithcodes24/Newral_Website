import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './StickyTag.module.css'

export default function StickyTag() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles.tag} onClick={() => setIsOpen(true)}>
        <p>
          <span className={styles.light}>Recognised by </span>
          Y Combinator Founders
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Header */}
              <div className={styles.modalHeader}>
                <p className={styles.modalSub}>Among India's Top Builders</p>
                <h2 className={styles.modalTitle}>
                  Recognized by <span>Y Combinator</span>
                </h2>
                <p className={styles.modalDesc}>
                  From winning national-level hackathons to being recognized by top global ecosystems, we build with speed, precision, and real-world impact.
                </p>
              </div>

              {/* Grid Cards */}
              <div className={styles.cardsGrid}>
                {/* Card 1 */}
                <div className={styles.card}>
                  <div className={styles.cardImgWrap}>
                    <img 
                      src="https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938422/jsmp26sdzlzudwexnc1x.png" 
                      alt="Vibecon Wingathon Winners trophy" 
                      className={styles.cardImg} 
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardTag}>Top Builders at Vibecon</span>
                    <h3 className={styles.cardTitle}>Wingathon Winners</h3>
                    <p className={styles.cardText}>
                      Won 1st place among India's top builders by shipping high-performance solutions under extreme time pressure.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className={styles.card}>
                  <div className={styles.cardImgWrap}>
                    <img 
                      src="https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938383/m744uuccyqbqqfc4h6gk.jpg" 
                      alt="Emergent YC Developers list" 
                      className={styles.cardImg} 
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardTag}>Recognized by YC &amp; Emergent</span>
                    <h3 className={styles.cardTitle}>Top 300 Developers in India</h3>
                    <p className={styles.cardText}>
                      Selected among India's top 300 builders for our ability to design, build, and scale real-world products.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
