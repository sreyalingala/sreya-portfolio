import { motion as Motion, useReducedMotion } from 'framer-motion'
import { certifications } from '../data/portfolio.js'
import styles from './Certifications.module.css'

function topBarClass(icon) {
  return icon === 'powerbi' ? styles.topBarMs : styles.topBarCisco
}

function badgeClass(icon) {
  return icon === 'powerbi' ? styles.badgeMs : styles.badgeCisco
}

function codeBadgeClass(icon) {
  return icon === 'powerbi' ? styles.codeBadgeMs : styles.codeBadgeCisco
}

function footerLine(icon) {
  return icon === 'powerbi'
    ? 'Issued by Microsoft · Verified credential'
    : 'Issued by Cisco Networking Academy · Verified credential'
}

export default function Certifications() {
  const reduce = useReducedMotion()

  const headerMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, ease: 'easeOut' },
      }

  const cardMotion = (index) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, x: index === 0 ? -40 : 40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: {
            duration: 0.5,
            ease: 'easeOut',
            delay: index === 0 ? 0.1 : 0.25,
          },
        }

  return (
    <section
      id="certifications"
      className={`section-container ${styles.section}`}
      aria-label="Certifications and credentials"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <Motion.div {...headerMotion}>
          <p className={styles.eyebrow}>Credentials</p>
          <h2 className={styles.heading}>Certifications &amp; Credentials</h2>
          <p className={styles.subtext}>
            Verified credentials complementing hands-on analytics experience.
          </p>
        </Motion.div>

        <div className={styles.cardGrid}>
          {certifications.map((cert, index) => (
            <Motion.article
              key={`${cert.code}-${cert.issuer}`}
              className={styles.card}
              aria-label={cert.fullName}
              {...cardMotion(index)}
            >
              <div className={topBarClass(cert.icon)} aria-hidden="true" />
              <div className={styles.block1}>
                <div className={styles.issuerLeft}>
                  <span className={badgeClass(cert.icon)} aria-hidden="true">
                    {cert.icon === 'powerbi' ? 'MS' : 'Ci'}
                  </span>
                  <span className={styles.issuerName}>{cert.issuer}</span>
                </div>
                <span className={styles.verified}>✓ Verified</span>
              </div>
              <h3 className={styles.certName}>{cert.name}</h3>
              <div className={styles.codeDateRow}>
                <span className={codeBadgeClass(cert.icon)}>{cert.code}</span>
                <span className={styles.dateText}>{cert.date}</span>
              </div>
              <p className={styles.description}>{cert.description}</p>
              <div className={styles.skillsBlock}>
                <p className={styles.skillsLabel}>Skills Covered</p>
                <div className={styles.skillPills}>
                  {cert.skills.map((skill) => (
                    <span key={skill} className={styles.skillPill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <p className={styles.footerLine}>{footerLine(cert.icon)}</p>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
