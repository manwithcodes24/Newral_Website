import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { A } from '../lib/assets'
import styles from './DreamTeam.module.css'
import { TextAnimate } from './TextAnimate'

export default function DreamTeam() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Apply spring physics to scroll progress for buttery-smooth movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  // Create differing parallax speeds for each image to add depth
  const yImg1 = useTransform(smoothProgress, [0, 1], [0, -100])
  const yImg2 = useTransform(smoothProgress, [0, 1], [0, -250])
  const yImg3 = useTransform(smoothProgress, [0, 1], [0, -120])
  const yImg4 = useTransform(smoothProgress, [0, 1], [0, -200])
  const yImg5 = useTransform(smoothProgress, [0, 1], [0, -80])

  const headingSegments = [
    { text: "dream " },
    { text: "team " },
    { text: "makes " },
    { text: "\n" },
    { text: "the ", className: styles.serif },
    { text: "dreamwork", className: styles.serif }
  ]

  return (
    <section className={styles.section} ref={containerRef}>
      {/* Sticky Text Container */}
      <div className={styles.stickyContainer}>
        <div className={styles.textWrap}>
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
        </div>
      </div>

      {/* Floating Images */}
      <motion.img
        style={{ y: yImg1 }}
        className={`${styles.img} ${styles.img1}`}
        src={A.dreamTeam7}
        alt="Team Member"
      />
      <motion.img
        style={{ y: yImg2 }}
        className={`${styles.img} ${styles.img2}`}
        src={A.dreamTeam2}
        alt="Team Member"
      />
      <motion.img
        style={{ y: yImg3 }}
        className={`${styles.img} ${styles.img3}`}
        src={A.dreamTeam3}
        alt="Team Member"
      />
      <motion.img
        style={{ y: yImg4 }}
        className={`${styles.img} ${styles.img4}`}
        src={A.dreamTeam4}
        alt="Team Member"
      />
      <motion.img
        style={{ y: yImg5 }}
        className={`${styles.img} ${styles.img5}`}
        src={A.dreamTeam5}
        alt="Team Member"
      />
    </section>
  )
}
