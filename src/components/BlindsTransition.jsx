import { motion } from 'framer-motion'
import styles from './BlindsTransition.module.css'

export default function BlindsTransition({ phase, onCoverComplete, onRevealComplete }) {
  const numRows = 10

  return (
    <div className={styles.overlay}>
      {[...Array(numRows)].map((_, i) => {
        const delay = i * 0.04 // snappy, 40ms stagger per row

        return (
          <motion.div
            key={i}
            className={styles.blind}
            style={{
              height: `${100 / numRows}%`,
              transformOrigin: phase === 'covering' ? 'top' : 'bottom',
            }}
            initial={{ scaleY: 0 }}
            animate={
              phase === 'covering'
                ? { scaleY: 1, transition: { duration: 0.35, delay, ease: [0.76, 0, 0.24, 1] } }
                : { scaleY: 0, transition: { duration: 0.35, delay, ease: [0.76, 0, 0.24, 1] } }
            }
            onAnimationComplete={() => {
              // Only call completed callback on the last row to prevent multiple firings
              if (i === numRows - 1) {
                if (phase === 'covering') {
                  onCoverComplete()
                } else if (phase === 'revealing') {
                  onRevealComplete()
                }
              }
            }}
          />
        )
      })}
    </div>
  )
}
