import { useState } from 'react'
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Code2,
  Database,
  LayoutDashboard,
  BarChart3,
  Cloud,
  Wind,
} from 'lucide-react'
import { skills } from '../data/portfolio.js'
import { sectionEntranceProps } from '../utils/sectionEntrance.js'
import styles from './Skills.module.css'

const ALL = 'all'

const ease = [0.22, 1, 0.36, 1]

const FEATURED_STACK = [
  { label: 'Python', Icon: Code2 },
  { label: 'SQL', Icon: Database },
  { label: 'Tableau', Icon: LayoutDashboard },
  { label: 'Power BI', Icon: BarChart3 },
  { label: 'Snowflake', Icon: Cloud },
  { label: 'Airflow', Icon: Wind },
]

const FEATURED_AI_LABELS = ['Claude', 'GPT-4', 'Power BI Copilot', 'Cursor AI']

const FEATURED_BA_LABELS = [
  'Requirements Gathering',
  'Stakeholder Mgmt',
  'KPI Definition',
]

const AI_SKILLS_CATEGORY = 'AI & LLM Tools'
const BUSINESS_ANALYSIS_CATEGORY = 'Business Analysis'
const CLOUD_TOOLS_CATEGORY = 'Cloud & Tools'

const AI_PILLS_INITIAL = 6

function isFeaturedSkill(name) {
  if (name === 'Python') return true
  if (name === 'Advanced SQL') return true
  if (name === 'Tableau' || name === 'Power BI' || name === 'Snowflake') return true
  if (name === 'Apache Airflow') return true
  if (name === 'dbt') return true
  if (name.startsWith('AWS')) return true
  return false
}

const pillList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.035, delayChildren: 0.05 },
  },
}

const pillItem = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease },
  },
}

function pillClassName(isAiCategory, isBaCategory, item) {
  if (isAiCategory) return `${styles.pill} ${styles.pillAi}`
  if (isBaCategory) return `${styles.pill} ${styles.pillBa}`
  if (isFeaturedSkill(item)) return `${styles.pill} ${styles.pillFeatured}`
  return styles.pill
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(ALL)
  const [aiPillsExpanded, setAiPillsExpanded] = useState(false)
  const reduce = useReducedMotion()

  const filtered =
    activeTab === ALL
      ? skills
      : skills.filter((c) => c.category === activeTab)

  const tabIds = [ALL, ...skills.map((s) => s.category)]

  function tabDisplayLabel(id) {
    if (id === ALL) return 'All'
    const entry = skills.find((s) => s.category === id)
    return entry?.tabLabel ?? id
  }

  const isAllView = activeTab === ALL

  return (
    <Motion.section
      id="skills"
      className={`section-container ${styles.section}`}
      aria-label="Skills"
      {...sectionEntranceProps(reduce)}
    >
      <p className={styles.eyebrow}>Technical Skills</p>

      <h2 className={styles.heading}>What I Bring to the Table</h2>

      <div className={styles.featuredBanner}>
        <p className={styles.featuredTitle}>Featured Stack</p>
        <div className={styles.featuredScrollWrap}>
          <div className={styles.featuredTrack}>
            {FEATURED_STACK.map((entry) => {
              const IconComponent = entry.Icon
              return (
                <div key={entry.label} className={styles.featuredBadge}>
                  <IconComponent size={18} strokeWidth={2} aria-hidden="true" />
                  <span>{entry.label}</span>
                </div>
              )
            })}
            <span className={styles.featuredPipe} aria-hidden="true">
              |
            </span>
            {FEATURED_AI_LABELS.map((label) => (
              <div key={label} className={styles.featuredBadgeText}>
                {label}
              </div>
            ))}
            {FEATURED_BA_LABELS.map((label) => (
              <div key={label} className={styles.featuredBadgeBa}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Skill categories">
        {tabIds.map((id) => {
          const label = tabDisplayLabel(id)
          const selected = activeTab === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`skills-panel-${id}`}
              id={`skills-tab-${id}`}
              className={`${styles.tab} ${selected ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <Motion.div
          key={activeTab}
          id={`skills-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeTab}`}
          className={`${styles.grid} ${!isAllView ? styles.gridSingle : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.map((cat, i) => {
            const isAiCategory = cat.category === AI_SKILLS_CATEGORY
            const isBaCategory = cat.category === BUSINESS_ANALYSIS_CATEGORY
            const isCloudCategory = cat.category === CLOUD_TOOLS_CATEGORY

            const spanBa = isAllView && isBaCategory
            const spanCloudTablet = isAllView && isCloudCategory

            const collapseAi =
              isAllView &&
              isAiCategory &&
              cat.items.length > AI_PILLS_INITIAL
            const aiVisible = collapseAi
              ? cat.items.slice(0, AI_PILLS_INITIAL)
              : []
            const aiExtra = collapseAi
              ? cat.items.slice(AI_PILLS_INITIAL)
              : []

            return (
              <Motion.article
                key={cat.category}
                className={`${styles.card} ${isAiCategory ? styles.cardAi : ''} ${isBaCategory ? styles.cardBa : ''} ${spanBa ? styles.cardSpanBa : ''} ${spanCloudTablet ? styles.cardSpanCloudTablet : ''} ${isCloudCategory ? styles.cardCloud : ''}`}
                layout
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.08,
                  ease,
                }}
              >
                <h3
                  className={`${styles.cardTitle} ${isAiCategory ? styles.cardTitleGradient : ''} ${isBaCategory ? styles.cardTitleBa : ''}`}
                >
                  {isAiCategory
                    ? `✦ ${cat.category}`
                    : isBaCategory
                      ? `◈ ${cat.category}`
                      : cat.category}
                </h3>
                {isAiCategory ? (
                  collapseAi ? (
                  <>
                    <Motion.div
                      className={styles.pills}
                      variants={pillList}
                      initial="hidden"
                      animate="show"
                    >
                      {aiVisible.map((item) => (
                        <Motion.span
                          key={item}
                          variants={pillItem}
                          className={pillClassName(true, false, item)}
                        >
                          {item}
                        </Motion.span>
                      ))}
                    </Motion.div>
                    {aiExtra.length > 0 && (
                      <>
                        <div
                          className={`${styles.aiExtraWrap} ${aiPillsExpanded ? styles.aiExtraWrapOpen : ''}`}
                        >
                          <div className={styles.aiExtraInner}>
                            <Motion.div
                              className={styles.pills}
                              variants={pillList}
                              initial="hidden"
                              animate={aiPillsExpanded ? 'show' : 'hidden'}
                            >
                              {aiExtra.map((item) => (
                                <Motion.span
                                  key={item}
                                  variants={pillItem}
                                  className={pillClassName(true, false, item)}
                                >
                                  {item}
                                </Motion.span>
                              ))}
                            </Motion.div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className={styles.aiMoreBtn}
                          onClick={() => setAiPillsExpanded((v) => !v)}
                          aria-expanded={aiPillsExpanded}
                        >
                          {aiPillsExpanded
                            ? '↑ Show less'
                            : `↓ +${aiExtra.length} more`}
                        </button>
                      </>
                    )}
                  </>
                  ) : (
                    <Motion.div
                      className={styles.pills}
                      variants={pillList}
                      initial="hidden"
                      animate="show"
                    >
                      {cat.items.map((item) => (
                        <Motion.span
                          key={item}
                          variants={pillItem}
                          className={pillClassName(true, false, item)}
                        >
                          {item}
                        </Motion.span>
                      ))}
                    </Motion.div>
                  )
                ) : (
                  <Motion.div
                    className={styles.pills}
                    variants={pillList}
                    initial="hidden"
                    animate="show"
                  >
                    {cat.items.map((item) => (
                      <Motion.span
                        key={item}
                        variants={pillItem}
                        className={pillClassName(
                          false,
                          isBaCategory,
                          item,
                        )}
                      >
                        {item}
                      </Motion.span>
                    ))}
                  </Motion.div>
                )}
              </Motion.article>
            )
          })}
        </Motion.div>
      </AnimatePresence>
    </Motion.section>
  )
}
