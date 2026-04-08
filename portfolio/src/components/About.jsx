import { motion as Motion, useReducedMotion } from 'framer-motion'
import { sectionEntranceProps } from '../utils/sectionEntrance.js'
import styles from './About.module.css'

export default function About() {
  const reduce = useReducedMotion()

  return (
    <Motion.section
      id="about"
      className={`section-container ${styles.section}`}
      aria-label="About"
      {...sectionEntranceProps(reduce)}
    >
      <div className={styles.aboutGrid}>
        <div className={styles.colLeft}>
          <p className={styles.eyebrow}>About Me</p>

          <h2 className={styles.heading}>
            Analyst. Storyteller.{' '}
            <span className={styles.headingAccent}>Decision-Enabler.</span>
          </h2>

          <div className={styles.roleBadges} aria-hidden="true">
            <span className={styles.roleBadge}>📊 Data Analyst</span>
            <span className={styles.roleBadge}>💼 Business Analyst</span>
            <span className={styles.roleBadge}>📈 BI Engineer</span>
          </div>

          <p className={styles.bio}>
            I&apos;m a data and business analyst completing my MS in CS at Virginia Tech.
            I turn complex datasets into clear decisions — bridging the gap between
            business stakeholders and technical data systems.
          </p>

          <p className={styles.bio}>
            From gathering requirements and defining KPIs to building executive dashboards
            and automating pipelines — I use SQL, Python, and AI tools like Claude and
            Power BI Copilot to deliver analytics that stakeholders can actually act on.
            I care about making data useful, not just present.
          </p>
        </div>

        <div className={styles.colRight}>
          <div className={styles.subsectionHeader}>
            <span className={styles.subsectionLabel}>Education</span>
            <span className={styles.subsectionRule} aria-hidden="true" />
          </div>
          <div className={styles.eduCards}>
            <article className={styles.eduCard}>
              <p className={styles.eduDegree}>MS Computer Science</p>
              <p className={styles.eduMeta}>
                Virginia Tech · Alexandria, VA · Aug 2024–May 2026
              </p>
              <p className={styles.eduGpa}>GPA: 4.0/4.0</p>
              <p className={styles.eduCoursework}>
                Relevant: Data Analytics, Machine Learning, Databases, Visual Analytics
              </p>
            </article>
            <article className={styles.eduCard}>
              <p className={styles.eduDegree}>BS Computer Science</p>
              <p className={styles.eduMeta}>
                ABV-IIITM Gwalior · India · Nov 2020–May 2024
              </p>
              <p className={styles.eduGpa}>GPA: 3.85/4.0</p>
              <p className={styles.eduCoursework}>
                Relevant: Data Structures, DBMS, Statistics, Business Intelligence
              </p>
            </article>
          </div>

          <div className={styles.terminalSpacer} aria-hidden="true" />

          <div className={styles.terminalWrap}>
            <div className={styles.terminal}>
              <div className={styles.terminalBar} aria-hidden="true">
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
                <span className={styles.terminalTitle}>query.sql — portfolio</span>
              </div>
              <div className={styles.terminalBody}>
                <pre className={styles.code}>
                  <code>
                    <span className={styles.kw}>SELECT</span>{' '}
                    <span className={styles.ident}>analyst</span>,{' '}
                    <span className={styles.kw}>COUNT</span>(<span className={styles.ident}>kpis</span>
                    ){` `}
                    <span className={styles.kw}>AS</span>{' '}
                    <span className={styles.ident}>kpis_delivered</span>,{'\n'}
                    {`       `}
                    <span className={styles.fn}>ROUND</span>(<span className={styles.kw}>AVG</span>(
                    <span className={styles.ident}>latency_reduction</span>),{' '}
                    <span className={styles.num}>1</span>){` `}
                    <span className={styles.kw}>AS</span>{' '}
                    <span className={styles.ident}>avg_improvement</span>
                    {'\n'}
                    <span className={styles.kw}>FROM</span>{' '}
                    <span className={styles.ident}>sreya_portfolio</span>
                    {'\n'}
                    <span className={styles.kw}>WHERE</span>{' '}
                    <span className={styles.ident}>year</span> ={' '}
                    <span className={styles.num}>2025</span>
                    {'\n'}
                    <span className={styles.kw}>GROUP BY</span>{' '}
                    <span className={styles.ident}>analyst</span>;
                    {'\n'}
                    <span className={styles.comment}>
                      -- Result: 18 KPIs, 34% avg improvement
                    </span>
                    <span className={styles.cursor} aria-hidden="true" />
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion.section>
  )
}
