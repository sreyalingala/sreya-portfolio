import { useMemo, useRef } from 'react'
import { motion as Motion, useInView, useReducedMotion } from 'framer-motion'
import { experience } from '../data/portfolio.js'
import { sectionEntranceProps } from '../utils/sectionEntrance.js'
import styles from './Experience.module.css'

const ease = [0.22, 1, 0.36, 1]

const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
}

/** End of period as sortable value (higher = more recent). Present = max. */
function periodEndSortKey(period) {
  if (/\bPresent\b/i.test(period)) return Number.MAX_SAFE_INTEGER
  const sep = period.includes('–') ? '–' : '-'
  const right = period.split(sep)[1]?.trim()
  if (!right) return 0
  const [monStr, yearStr] = right.split(/\s+/)
  const year = parseInt(yearStr, 10)
  const monKey = monStr?.slice(0, 3)
  const month = MONTHS[monKey] ?? 0
  if (Number.isNaN(year)) return 0
  return year * 12 + month
}

function sortExperienceReverseChrono(jobs) {
  return [...jobs].sort(
    (a, b) => periodEndSortKey(b.period) - periodEndSortKey(a.period)
  )
}

function isIndiaInternationalRole(job) {
  return (
    job.company.includes('Brane') ||
    job.location.toLowerCase().includes('india')
  )
}

export default function Experience() {
  const timelineRef = useRef(null)
  const inView = useInView(timelineRef, { once: true, margin: '-8% 0px' })
  const reduce = useReducedMotion()

  const orderedJobs = useMemo(() => sortExperienceReverseChrono(experience), [])

  return (
    <Motion.section
      id="experience"
      className={`section-container ${styles.section}`}
      aria-label="Experience"
      {...sectionEntranceProps(reduce)}
    >
      <p className={styles.eyebrow}>Experience</p>

      <h2 className={styles.heading}>
        Impact in <span className={styles.headingAccent}>Role &amp; Projects</span>
      </h2>

      <p className={styles.intro}>
        3 roles · Data Analysis · Business Intelligence · Stakeholder Reporting · 2 countries
      </p>

      <div ref={timelineRef} className={styles.timeline}>
        <div className={styles.rail} aria-hidden="true" />
        <div className={styles.rows}>
          {orderedJobs.map((job, index) => {
            const isCurrent = /\bPresent\b/i.test(job.period)
            const isInternational = isIndiaInternationalRole(job)

            return (
              <div key={`${job.company}-${job.period}`} className={styles.row}>
                <div className={styles.dotWrap}>
                  <div
                    className={`${styles.dot} ${isInternational ? styles.dotInternational : ''}`}
                    aria-hidden="true"
                  />
                </div>
                <Motion.article
                  className={styles.card}
                  initial={{ x: 60, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.2,
                    ease,
                  }}
                >
                  <header className={styles.cardHeader}>
                    <div className={styles.titleBlock}>
                      <h3 className={styles.jobTitle}>{job.title}</h3>
                      <p className={styles.meta}>
                        <span className={styles.company}>{job.company}</span>
                        {isInternational ? (
                          <span className={styles.indiaBadge} aria-label="India">
                            <span aria-hidden="true">🌏 </span>
                            India
                          </span>
                        ) : null}
                        <span className={styles.separator}> · </span>
                        {job.location}
                      </p>
                    </div>
                    <div className={styles.periodCluster}>
                      {isCurrent ? (
                        <span className={styles.currentBadge}>
                          <span className={styles.pulseDot} aria-hidden="true" />
                          <span className={styles.currentLabel}>Current</span>
                        </span>
                      ) : null}
                      <span className={styles.periodBadge}>{job.period}</span>
                    </div>
                  </header>

                  <div className={styles.metrics} aria-label="Key impact metrics">
                    {job.metrics.map((m) => (
                      <span key={m} className={styles.metric}>
                        {m}
                      </span>
                    ))}
                  </div>

                  <ul className={styles.list}>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </Motion.article>
              </div>
            )
          })}
        </div>
      </div>
    </Motion.section>
  )
}
