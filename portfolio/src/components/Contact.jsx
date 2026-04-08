import { motion as Motion, useReducedMotion } from 'framer-motion'
import { personalInfo } from '../data/portfolio.js'
import { sectionEntranceProps } from '../utils/sectionEntrance.js'
import GithubIcon from './GithubIcon.jsx'
import styles from './Contact.module.css'

const FLOAT_DOTS = [
  { size: 120, top: '8%', left: '6%' },
  { size: 80, top: '42%', right: '10%' },
  { size: 64, bottom: '18%', left: '12%' },
  { size: 96, bottom: '12%', right: '18%' },
]

const subtext =
  "I'm always open to discussing data, analytics, and opportunities where thoughtful insights can drive real impact. Open to Data Analyst, Business Analyst, and BI Engineer roles · Available 2026."

const GITHUB_PROFILE = 'https://github.com/sreyalingala'

export default function Contact() {
  const { email, phone, linkedin, location, availability, github } = personalInfo
  const githubUrl = github ?? GITHUB_PROFILE
  const telHref = `tel:${phone.replace(/\D/g, '')}`
  const reduce = useReducedMotion()

  return (
    <Motion.section
      id="contact"
      className={`section-container ${styles.section}`}
      aria-label="Contact"
      {...sectionEntranceProps(reduce)}
    >
      <div className={styles.bgDecor} aria-hidden="true">
        {FLOAT_DOTS.map((dot, index) => (
          <Motion.div
            key={index}
            className={styles.floatDot}
            style={{
              width: dot.size,
              height: dot.size,
              top: dot.top,
              left: dot.left,
              right: dot.right,
              bottom: dot.bottom,
            }}
            initial={{ opacity: reduce ? 0.45 : 0.3 }}
            animate={
              reduce
                ? { opacity: 0.45 }
                : { opacity: [0.3, 0.6, 0.3] }
            }
            transition={{
              duration: reduce ? 0 : 3.2,
              repeat: reduce ? 0 : Infinity,
              ease: 'easeInOut',
              delay: reduce ? 0 : index * 0.45,
            }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.eyebrow}>Get In Touch</p>

          <h2 className={styles.heading}>Let&apos;s Build Something with Data</h2>

          <p className={styles.subtext}>{subtext}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.ctaRow}>
            <a
              className={`${styles.btn} ${styles.btnEmail}`}
              href={`mailto:${email}`}
              aria-label={`Send email to ${email}`}
            >
              Email Me
            </a>
            <a
              className={`${styles.btn} ${styles.btnLinkedin}`}
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile in a new tab"
            >
              LinkedIn
            </a>
            <a
              className={`${styles.btn} ${styles.btnLinkedin}`}
              href={githubUrl}
              target="_blank"
              rel="noopener"
              aria-label="Open GitHub profile in a new tab"
            >
              <GithubIcon size={20} aria-hidden="true" />
              GitHub Profile
            </a>
          </div>

          <div className={styles.links}>
            <a className={styles.link} href={`mailto:${email}`} aria-label={`Email ${email}`}>
              {email}
            </a>
            <a className={styles.link} href={telHref} aria-label={`Call ${phone}`}>
              {phone}
            </a>
          </div>

          <p className={styles.meta}>
            <span aria-hidden="true">📍 </span>
            {location} · {availability}
          </p>
        </div>
      </div>
    </Motion.section>
  )
}
