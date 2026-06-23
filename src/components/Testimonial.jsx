import { useState } from 'react'
import { A } from '../lib/assets'
import { useReveal } from '../hooks/useReveal'
import { TextAnimate } from './TextAnimate'
import styles from './Testimonial.module.css'

const TESTIMONIALS = [
  { 
    thumb: A.mohitTyagi, 
    quote: "Newral is handling complete tech with top most efficiency, they helped us completely transform our platform's performance and scalability. From major cost optimization to faster video delivery and a smoother user experience, their execution was exceptional. The platform is now more stable, efficient, and growth-ready.", 
    name: "Mohit Tyagi", 
    role: "Founder, Competishun" 
  },
  { 
    thumb: A.astonCofer, 
    quote: "Newral has been a valuable partner in our growth journey. Their scalable monitoring solutions and efficient DevOps workflows brought stability and clarity to our operations. We highly recommend their services.", 
    name: "Ashton Cofer", 
    role: "Co-Founder & CTO of FIZZ | Forbes 30U30" 
  },
  { 
    thumb: A.sameerBansal, 
    quote: "Newral helped us upgrade our technology at Bansal Classes with ease. Their strong software development support improved our operational efficiency and enhanced the overall student experience.", 
    name: "Sameer Bansal", 
    role: "Founder, Bansal Classes" 
  },
  { 
    thumb: A.tThumb4, 
    quote: "Yash and his team built our OTT Bharat app with precision and professionalism. Their team delivered a user-friendly platform. And now they are handling tech of NeetKakaJEE (the parent company).", 
    name: "Abhimanyu Kumawat", 
    role: "Founder, OTT Bharat, Neetkakajee" 
  },
]

export default function Testimonial() {
  const rR = useReveal()
  const [activeIndex, setActiveIndex] = useState(0)

  const activeData = TESTIMONIALS[activeIndex]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`section-heading ${styles.heading}`}>
          <TextAnimate as="span" animation="blurIn" by="word" once duration={0.6}>
            Trusted by
          </TextAnimate>{' '}
          <TextAnimate as="span" className="serif" animation="blurIn" by="word" once duration={0.5} delay={0.3}>
            Shark Tank India Founders
          </TextAnimate>
        </h2>
        <div ref={rR} className={`${styles.row} reveal d1`}>
          <div className={styles.thumbs}>
            {TESTIMONIALS.map((t, i) => (
              <div 
                key={i} 
                onClick={() => setActiveIndex(i)}
                className={`${styles.thumb} ${i === TESTIMONIALS.length - 1 ? styles.fadeOut : ''} ${i === activeIndex ? styles.active : ''}`}
              >
                <img src={t.thumb} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.quoteBlock}>
                <img className={styles.stars} src={A.tStars} alt="5 stars" />
                <p className={styles.quote}>
                  {activeData.quote}
                </p>
              </div>
              <div className={styles.author}>
                <img className={styles.avatar} src={activeData.thumb} alt="" />
                <p className={styles.name}>{activeData.name}</p>
                <p className={styles.role}>{activeData.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
