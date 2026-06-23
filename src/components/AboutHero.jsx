import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { A } from '../lib/assets'
import styles from './AboutHero.module.css'
import { TextAnimate } from './TextAnimate'
import { TextRevealScroll } from './TextRevealScroll'

const ROLES = [
  "Builders",
  "Creators",
  "Makers",
  "Innovators",
  "Pioneers",
  "Dreamers",
  "Architects",
  "Operators"
];

export default function AboutHero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section className={styles.section}>
      <div 
        className={styles.gradientBg} 
        style={{ 
          backgroundImage: `url(${A.aboutHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      ></div>
      <div className="container relative z-10">
        <h1 className={styles.heading}>
          <TextAnimate as="span" animation="blurIn" by="word" once={true} duration={0.5}>
            we are the
          </TextAnimate>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className={styles.pill}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>
        
        <div className={styles.content}>
          <div className={styles.imageBlock}>
            {/* The polaroid from the design */}
            <div className={styles.polaroidImageWrapper}>
              <img src={A.aboutPolaroidReal} alt="Work over coffee" className={styles.polaroidImgFull} />
            </div>
          </div>
          
          <div className={styles.textBlockRight}>
            <TextAnimate 
              as="p" 
              animation="blurIn" 
              by="word" 
              once={true} 
              className={styles.subtext}
              duration={0.6}
              delay={0.2}
            >
              Newral combines product design, scalable development, and growth-focused systems to help startups and modern businesses move faster.
            </TextAnimate>
          </div>
        </div>
      </div>
    </section>
    
    <section className={styles.giantTextSection}>
      <TextRevealScroll
        text="We've delivered 140+ projects for startups and SaaS companies. Our services help them grow with smoother websites and better experiences."
        highlights={['140+', 'projects', 'smoother', 'websites', 'better', 'experiences.']}
        className={styles.giantText}
      />
    </section>
    </>
  )
}
