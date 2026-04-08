import { Fragment } from 'react'
import { Link } from 'react-scroll'
import { Mail, ExternalLink } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { personalInfo } from '../data/portfolio.js'
import styles from './Footer.module.css'

const scrollOpts = {
  smooth: true,
  duration: 500,
  offset: -80,
}

const FOOTER_NAV = [
  { to: 'about', label: 'About' },
  { to: 'projects', label: 'Projects' },
  { to: 'contact', label: 'Contact' },
]

export default function Footer() {
  const { email, linkedin } = personalInfo
  const activeSection = useActiveSection(88)

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <p className={styles.credit}>© 2026 Sreya Sri Lingala</p>

        <nav className={styles.nav} aria-label="Footer">
          {FOOTER_NAV.map((item, index) => (
            <Fragment key={item.to}>
              {index > 0 ? (
                <span className={styles.sep} aria-hidden="true">
                  {' '}
                  ·{' '}
                </span>
              ) : null}
              <Link
                to={item.to}
                {...scrollOpts}
                className={`${styles.navLink} ${activeSection === item.to ? styles.navLinkActive : ''}`}
                activeClass={styles.navLinkActive}
              >
                {item.label}
              </Link>
            </Fragment>
          ))}
        </nav>

        <div className={styles.icons}>
          <a
            className={styles.iconLink}
            href={`mailto:${email}`}
            aria-label="Email"
          >
            <Mail size={20} strokeWidth={2} aria-hidden="true" />
          </a>
          <a
            className={styles.iconLink}
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
          >
            <ExternalLink size={20} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className={styles.note}>Built with React + Framer Motion</p>
    </footer>
  )
}
