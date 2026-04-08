import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-scroll'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { sectionEntranceProps } from '../utils/sectionEntrance.js'
import { useInView } from 'react-intersection-observer'
import { ChevronDown } from 'lucide-react'
/**
 * Stats shown below: sourced from portfolio.js `stats` — keep in sync:
 * 500K+ Records Analyzed · 22+ KPIs Defined & Tracked · 6+ AI Tools · 3 Years Experience
 */
import { personalInfo, stats } from '../data/portfolio.js'
import styles from './Hero.module.css'

function parseStatTarget(display) {
  if (display.includes('K')) {
    const n = parseInt(display.replace(/\D/g, ''), 10) || 0
    return { end: n, format: (v) => `${v}K+` }
  }
  if (display.endsWith('%')) {
    const n = parseInt(display, 10) || 0
    return { end: n, format: (v) => `${v}%` }
  }
  if (display.endsWith('+') && !display.includes('K')) {
    const n = parseInt(display, 10) || 0
    return { end: n, format: (v) => `${v}+` }
  }
  return { end: 0, format: () => display }
}

function StatCounter({ number: targetStr, label, inView }) {
  const { end, format } = parseStatTarget(targetStr)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || end === 0) return

    let startTime = null
    const duration = 1600
    let rafId = 0

    const easeOutCubic = (t) => 1 - (1 - t) ** 3

    const tick = (now) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(t)
      setValue(Math.round(eased * end))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, end])

  const display = end === 0 ? targetStr : format(value)

  return (
    <div className={styles.stat}>
      <span className={styles.statNum}>{display}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

const fadeUp = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

export default function Hero() {
  const reduce = useReducedMotion()
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  })

  const scrollToAbout = useCallback(() => {
    const el = document.getElementById('about')
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Motion.section
      id="home"
      className={styles.hero}
      aria-label="Hero"
      {...sectionEntranceProps(reduce)}
    >
      <div className={styles.bgMesh} aria-hidden="true">
        <Motion.div
          className={`${styles.blob} ${styles.blobIndigo}`}
          animate={reduce ? {} : { y: [0, 20, 0], x: [0, 15, 0] }}
          transition={{
            duration: reduce ? 0 : 8,
            repeat: reduce ? 0 : Infinity,
            ease: 'easeInOut',
            delay: 0,
          }}
        />
        <Motion.div
          className={`${styles.blob} ${styles.blobCyan}`}
          animate={reduce ? {} : { y: [0, -18, 0], x: [0, -12, 0] }}
          transition={{
            duration: reduce ? 0 : 7,
            repeat: reduce ? 0 : Infinity,
            ease: 'easeInOut',
            delay: reduce ? 0 : 1.2,
          }}
        />
        <Motion.div
          className={`${styles.blob} ${styles.blobPurple}`}
          animate={reduce ? {} : { y: [0, 22, 0], x: [0, 10, 0] }}
          transition={{
            duration: reduce ? 0 : 6.5,
            repeat: reduce ? 0 : Infinity,
            ease: 'easeInOut',
            delay: reduce ? 0 : 2,
          }}
        />
      </div>
      <div className={styles.dotGrid} aria-hidden="true" />

      <div className={styles.inner}>
        <Motion.p
          className={styles.label}
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {personalInfo.title}
        </Motion.p>

        <Motion.h1
          className={styles.name}
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {personalInfo.name}
        </Motion.h1>

        <Motion.p
          className={styles.tagline}
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {personalInfo.tagline}
        </Motion.p>

        <Motion.div
          ref={statsRef}
          className={styles.stats}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: 'contents' }}>
              {i > 0 && <div className={styles.statDivider} aria-hidden="true" />}
              <StatCounter
                number={s.number}
                label={s.label}
                inView={statsInView}
              />
            </div>
          ))}
        </Motion.div>

        <Motion.div
          className={styles.ctas}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="projects"
            smooth
            duration={500}
            offset={-80}
            className={styles.ctaPrimary}
            aria-label="Scroll to projects section"
          >
            View My Work
          </Link>
          <Link
            to="contact"
            smooth
            duration={500}
            offset={-80}
            className={styles.ctaGhost}
            aria-label="Scroll to contact section"
          >
            Get In Touch
          </Link>
        </Motion.div>

        <div className={styles.roleTargets} aria-hidden="true">
          <span className={styles.roleTargetsIntro}>Open to roles in:</span>
          <span className={styles.roleBadge}>Data Analyst</span>
          <span className={styles.roleBadge}>Business Analyst</span>
          <span className={styles.roleBadge}>BI Engineer</span>
        </div>
      </div>

      <Motion.button
        type="button"
        className={styles.scrollHint}
        onClick={scrollToAbout}
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <span>Scroll</span>
        <Motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{
            duration: reduce ? 0 : 1.4,
            repeat: reduce ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={22} strokeWidth={2} aria-hidden="true" />
        </Motion.span>
      </Motion.button>
    </Motion.section>
  )
}
