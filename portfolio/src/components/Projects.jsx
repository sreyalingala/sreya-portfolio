import { useMemo, useRef, useState } from 'react'
import {
  motion as Motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { personalInfo, projects } from '../data/portfolio.js'
import { sectionEntranceProps } from '../utils/sectionEntrance.js'
import styles from './Projects.module.css'

const ease = [0.22, 1, 0.36, 1]

/** lucide-react v1.7 has no Github export; match Lucide stroke style */
function GithubIcon({ size = 24, className, 'aria-hidden': ariaHidden = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

/** Default visible bullets before "Show more"; same for every card */
const BULLET_PREVIEW = 3

const MAX_OUTCOMES = 3

const CASE_STUDY_ROW_START_INDEX = 4

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'bi', label: 'BI & Reporting' },
  { id: 'sql', label: 'SQL' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'python', label: 'Python & EDA' },
]

/** Map project title → filter ids (matches spec; not raw badge strings). */
const TITLE_FILTER_IDS = {
  'Customer Retention & Product Performance Analytics': ['bi', 'python'],
  'Enterprise Sales Analytics & Reporting Pipeline': ['bi', 'sql'],
  'Retail Decision Copilot': ['fullstack'],
  'Credit Card Customer Behavior Analytics': ['bi', 'python'],
  'Hospital Patient & Appointment Analytics': ['sql'],
  'Mental Health & Work Productivity in Tech': ['python'],
}

function projectMatchesFilter(filterId, project) {
  if (filterId === 'all') return true
  return TITLE_FILTER_IDS[project.title]?.includes(filterId) ?? false
}

function sortGithubFirstStable(list) {
  const portfolioIndex = (p) => projects.findIndex((x) => x.title === p.title)
  return [...list].sort((a, b) => {
    const ag = a.github ? 1 : 0
    const bg = b.github ? 1 : 0
    if (bg !== ag) return bg - ag
    return portfolioIndex(a) - portfolioIndex(b)
  })
}

function ProjectsGroupDivider({ animationIndex, reduce, inView }) {
  const visible = reduce || inView
  return (
    <Motion.div
      className={styles.groupDivider}
      role="presentation"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.4,
        delay: reduce ? 0 : animationIndex * 0.1,
        ease,
      }}
    >
      <span className={styles.groupDividerLabelLeft}>Open Source</span>
      <span className={styles.groupDividerLine} aria-hidden="true" />
      <span className={styles.groupDividerLabelRight}>Case Studies</span>
    </Motion.div>
  )
}

function ProjectCard({ project, animationIndex, reduce, inView }) {
  const [expanded, setExpanded] = useState(false)
  const hasGithub = Boolean(project.github)
  const hasLive = Boolean(project.live)
  const hasBottomLinks = hasGithub || hasLive
  const totalBullets = project.bullets.length
  const hasMore = totalBullets > BULLET_PREVIEW
  const visibleBullets =
    expanded || !hasMore
      ? project.bullets
      : project.bullets.slice(0, BULLET_PREVIEW)

  const displayedOutcomes = project.outcomes.slice(0, MAX_OUTCOMES)

  const delay = reduce ? 0 : animationIndex * 0.1
  const visible = reduce || inView

  return (
    <Motion.article
      layout
      className={styles.card}
      initial={reduce ? false : { y: 30, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      exit={{ y: 16, opacity: 0 }}
      transition={{
        layout: { duration: 0.35, ease },
        y: { duration: 0.45, delay, ease },
        opacity: { duration: 0.4, delay, ease },
      }}
    >
      <div className={styles.cardMain}>
        <div className={styles.cardTop}>
          <span className={styles.badge}>{project.badge}</span>
        </div>

        <h3 className={styles.title}>{project.title}</h3>

        <p className={styles.description}>{project.description}</p>

        <div className={styles.tools} aria-label="Tools used">
          {project.tools.map((tool) => (
            <span key={tool} className={styles.tool}>
              {tool}
            </span>
          ))}
        </div>

        <ul className={styles.list}>
          {visibleBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        {hasMore ? (
          <button
            type="button"
            className={styles.toggleBullets}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? '↑ Show less' : '↓ Show more'}
          </button>
        ) : null}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.outcomes} aria-label="Outcomes">
          {displayedOutcomes.map((outcome) => (
            <span key={outcome} className={styles.outcome}>
              {outcome}
            </span>
          ))}
        </div>

        {hasBottomLinks ? (
          <div className={styles.bottomLinks}>
            {hasGithub ? (
              <a
                className={styles.textLink}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={16} />
                View Code →
              </a>
            ) : null}
            {hasLive ? (
              <a
                className={styles.textLink}
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
                Live →
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Motion.article>
  )
}

export default function Projects() {
  const reduce = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('all')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  const filtered = useMemo(() => {
    const list = projects.filter((p) => projectMatchesFilter(activeFilter, p))
    return sortGithubFirstStable(list)
  }, [activeFilter])

  const showGroupDivider =
    activeFilter === 'all' &&
    filtered.length === projects.length &&
    filtered.length > CASE_STUDY_ROW_START_INDEX

  const ghProfile = personalInfo.github ?? 'https://github.com/sreyalingala'

  function animationIndexForCard(cardIndex) {
    if (!showGroupDivider || cardIndex < CASE_STUDY_ROW_START_INDEX) {
      return cardIndex
    }
    return cardIndex + 1
  }

  return (
    <Motion.section
      ref={sectionRef}
      id="projects"
      className={`section-container ${styles.section}`}
      aria-label="Projects"
      {...sectionEntranceProps(reduce)}
    >
      <p className={styles.eyebrow}>Projects</p>

      <h2 className={styles.heading}>
        Selected <span className={styles.headingAccent}>Work</span>
      </h2>

      <p className={styles.intro}>
        Projects spanning data analysis, business intelligence, SQL engineering, and full-stack
        analytics applications.
      </p>

      <div className={styles.filterRow} role="tablist" aria-label="Filter projects">
        {FILTERS.map(({ id, label }) => {
          const selected = activeFilter === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`projects-filter-${id}`}
              className={styles.filterTab}
              onClick={() => setActiveFilter(id)}
            >
              {selected ? (
                <Motion.span
                  layoutId="projectsFilterPill"
                  className={styles.filterTabFill}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 32,
                  }}
                />
              ) : null}
              <span className={styles.filterTabLabel}>{label}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.flatMap((project, i) => {
            const nodes = []
            if (showGroupDivider && i === CASE_STUDY_ROW_START_INDEX) {
              nodes.push(
                <ProjectsGroupDivider
                  key="projects-group-divider"
                  animationIndex={CASE_STUDY_ROW_START_INDEX}
                  reduce={reduce}
                  inView={inView}
                />,
              )
            }
            nodes.push(
              <ProjectCard
                key={project.title}
                project={project}
                animationIndex={animationIndexForCard(i)}
                reduce={reduce}
                inView={inView}
              />,
            )
            return nodes
          })}
        </AnimatePresence>
      </div>

      <div className={styles.ghCtaWrap}>
        <a
          className={styles.ghCta}
          href={ghProfile}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon size={20} />
          See all repositories on GitHub →
        </a>
      </div>
    </Motion.section>
  )
}
