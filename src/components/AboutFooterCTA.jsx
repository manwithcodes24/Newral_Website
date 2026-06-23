import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, easeIn } from 'framer-motion'
import { A } from '../lib/assets'
import styles from './AboutFooterCTA.module.css'
import { TextAnimate } from './TextAnimate'

export default function AboutFooterCTA() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 30,
    restDelta: 0.001
  })

  const xLeft  = useTransform(smoothProgress, [0, 1], ["0%", "-125%"], { ease: easeIn })
  const xRight = useTransform(smoothProgress, [0, 1], ["0%",  "125%"], { ease: easeIn })

  const contentOpacity = useTransform(smoothProgress, [0.25, 0.9], [0, 1])
  const contentScale   = useTransform(smoothProgress, [0.25, 0.9], [0.85, 1])

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.stickyContainer}>

        {/* Revealing Content */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className={styles.contentWrap}
        >
          <TextAnimate
            as="h2"
            animation="blurIn"
            by="word"
            once={true}
            className={styles.heading}
            duration={0.5}
          >
            Want to join the team?
          </TextAnimate>

          <div className={styles.btnRow}>
            <button className={`btn-dark btn-lg ${styles.btn}`}>
              Apply for role
              <span className="arrow-circle"><img src={A.arrowSm} alt="" /></span>
            </button>
          </div>
        </motion.div>

        {/* Splitting image — both desktop and mobile */}
        <div className={styles.imageContainer}>
          <motion.div style={{ x: xLeft }} className={styles.leftHalf}>
            <img src={A.aboutJoinTeam} alt="Office collaboration" loading="lazy" decoding="async" />
          </motion.div>
          <motion.div style={{ x: xRight }} className={styles.rightHalf}>
            <img src={A.aboutJoinTeam} alt="Office collaboration" loading="lazy" decoding="async" />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
