import { useCallback, useId, useState } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { aiTools, aiWorkflows } from '../data/portfolio.js'
import { sectionEntranceProps } from '../utils/sectionEntrance.js'
import styles from './AIWorkflow.module.css'

const ease = [0.22, 1, 0.36, 1]

const LOGO_COLORS = {
  claude: 'var(--accent)',
  openai: '#10b981',
  gemini: '#3b82f6',
  cursor: '#f59e0b',
  powerbi: '#ef4444',
  api: 'var(--accent-2)',
}

function toolBorderColor(logo) {
  return LOGO_COLORS[logo] ?? 'var(--accent)'
}

function toolNameColor(logo) {
  return LOGO_COLORS[logo] ?? 'var(--accent)'
}

export default function AIWorkflow() {
  const reduce = useReducedMotion()
  const baseId = useId()
  const [pinned, setPinned] = useState(() => new Set())
  const [hoveredLogo, setHoveredLogo] = useState(null)

  const togglePin = useCallback((logo) => {
    setPinned((prev) => {
      const next = new Set(prev)
      if (next.has(logo)) next.delete(logo)
      else next.add(logo)
      return next
    })
  }, [])

  const toolsContainer = reduce
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.12 },
        variants: {
          hidden: {},
          show: {
            transition: { staggerChildren: 0.07, delayChildren: 0.05 },
          },
        },
      }

  const toolItem = reduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, x: -20 },
          show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease },
          },
        },
      }

  const workflowsContainer = reduce
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.1 },
        variants: {
          hidden: {},
          show: {
            transition: { staggerChildren: 0.1, delayChildren: 0.08 },
          },
        },
      }

  const workflowItem = reduce
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, x: 20 },
          show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.45, ease },
          },
        },
      }

  const displayedWorkflows = aiWorkflows.filter((w) =>
    [
      'SQL Development',
      'Dashboard Storytelling',
      'Business Requirements Translation',
    ].includes(w.workflow),
  )

  return (
    <Motion.section
      id="ai-workflow"
      className={`section-container ${styles.section}`}
      aria-label="AI-augmented analyst workflow"
      {...sectionEntranceProps(reduce)}
    >
      <p className={styles.eyebrow}>Modern Analyst Toolkit</p>

      <h2 className={styles.heading}>AI-Augmented, SQL-Grounded</h2>
      <p className={styles.subtext}>
        I combine SQL, BI, and business analysis skills with AI tools to work faster, communicate
        clearer, and deliver insights stakeholders can actually act on.
      </p>

      <div className={styles.panels}>
        <div>
          <h3 className={styles.panelTitle}>Tools I Use</h3>
          <Motion.div className={styles.toolsList} {...toolsContainer}>
            {aiTools.map((entry) => {
              const borderC = toolBorderColor(entry.logo)
              const nameC = toolNameColor(entry.logo)
              const expanded = hoveredLogo === entry.logo || pinned.has(entry.logo)
              const previewCount = 2
              const shownUses = expanded ? entry.uses : entry.uses.slice(0, previewCount)

              return (
                <Motion.article
                  key={entry.tool}
                  className={styles.toolRow}
                  style={{ borderLeftColor: borderC }}
                  {...toolItem}
                  onMouseEnter={() => setHoveredLogo(entry.logo)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  onClick={() => togglePin(entry.logo)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      togglePin(entry.logo)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={expanded}
                  aria-controls={`${baseId}-uses-${entry.logo}`}
                >
                  <div className={styles.toolName} style={{ color: nameC }}>
                    {entry.tool}
                  </div>
                  <Motion.div
                    id={`${baseId}-uses-${entry.logo}`}
                    className={styles.pillsOuter}
                    layout
                    transition={{ layout: { duration: 0.35, ease } }}
                  >
                    <div className={styles.pillsWrap}>
                      {shownUses.map((use) => (
                        <span
                          key={use}
                          className={styles.pill}
                          style={{
                            background: `color-mix(in srgb, ${nameC} 8%, transparent)`,
                          }}
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </Motion.div>
                </Motion.article>
              )
            })}
          </Motion.div>
        </div>

        <div>
          <h3 className={styles.panelTitle}>How It Changes My Workflow</h3>
          <Motion.div className={styles.workflowList} {...workflowsContainer}>
            {displayedWorkflows.map((row) => (
              <Motion.div key={row.workflow} className={styles.workflowRow} {...workflowItem}>
                <p className={styles.workflowName}>{row.workflow}</p>
                <div className={styles.columnHeaders}>
                  <span className={`${styles.headerPill} ${styles.headerManual}`}>Manual</span>
                  <span className={`${styles.headerPill} ${styles.headerAi}`}>AI-Augmented</span>
                </div>
                <div className={styles.miniGrid}>
                  <div>
                    <div className={styles.colLabel}>Before</div>
                    <Motion.p
                      className={`${styles.colText} ${styles.colTextBefore}`}
                      initial={reduce ? false : { opacity: 0 }}
                      whileInView={reduce ? {} : { opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      {row.before}
                    </Motion.p>
                  </div>
                  <div>
                    <div className={styles.colLabel}>After AI</div>
                    <Motion.p
                      className={`${styles.colText} ${styles.colTextAfter}`}
                      initial={reduce ? false : { opacity: 0 }}
                      whileInView={reduce ? {} : { opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, ease, delay: reduce ? 0 : 0.3 }}
                    >
                      {row.after}
                    </Motion.p>
                  </div>
                </div>
                <p className={styles.impactChip}>⚡ {row.impact}</p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </div>

      <p className={styles.bottomStrip}>
        This portfolio was designed and built using Cursor AI, Claude, and React — an example of
        AI-augmented work in practice.
      </p>
    </Motion.section>
  )
}
