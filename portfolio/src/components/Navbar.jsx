import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-scroll'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Linkedin } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection.js'
import GithubIcon from './GithubIcon.jsx'
import styles from './Navbar.module.css'

const GITHUB_PROFILE = 'https://github.com/sreyalingala'
const LINKEDIN_PROFILE = 'https://linkedin.com/in/lingala-sreya-sri'

const NAV_ITEMS = [
  { to: 'about', label: 'About' },
  { to: 'certifications', label: 'Certifications' },
  { to: 'skills', label: 'Skills' },
  { to: 'ai-workflow', label: 'AI Workflow' },
  { to: 'experience', label: 'Experience' },
  { to: 'projects', label: 'Projects' },
  { to: 'contact', label: 'Contact' },
]

const scrollOpts = {
  smooth: true,
  duration: 500,
  offset: -80,
  spy: true,
  spyThrottle: 100,
}

function computeScrollProgress() {
  const docEl = document.documentElement
  const body = document.body
  const scrollTop = window.scrollY ?? docEl.scrollTop
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    docEl.clientHeight,
    docEl.scrollHeight,
    docEl.offsetHeight
  )
  const winH = window.innerHeight
  const scrollable = Math.max(0, height - winH)
  if (scrollable <= 0) return 100
  let pct = (scrollTop / scrollable) * 100
  if (scrollTop >= scrollable - 2) pct = 100
  return Math.min(100, Math.max(0, pct))
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(88)

  const updateScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
    setProgress(computeScrollProgress())
  }, [])

  useEffect(() => {
    queueMicrotask(() => updateScroll())
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [updateScroll])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className={styles.progressTrack} aria-hidden="true">
        <div
          className={styles.progressFill}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      <Motion.nav
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        role="navigation"
        aria-label="Main"
      >
        <div className={styles.inner}>
          <Link
            to="home"
            smooth
            duration={500}
            offset={-80}
            className={`${styles.logo} ${activeSection === 'home' ? styles.logoActive : ''}`}
            onClick={closeMenu}
            aria-label="Go to top"
          >
            Sreya
          </Link>

          <div className={styles.desktopLinks}>
            {NAV_ITEMS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                {...scrollOpts}
                className={`${styles.navLink} ${activeSection === to ? styles.navLinkActive : ''}`}
                activeClass={styles.navLinkActive}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className={styles.navSocial}>
            <a
              className={styles.navSocialLink}
              href={LINKEDIN_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              className={styles.navSocialLink}
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
            >
              <GithubIcon size={20} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={24} strokeWidth={2} aria-hidden="true" /> : <Menu size={24} strokeWidth={2} aria-hidden="true" />}
          </button>
        </div>
      </Motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            key="mobile-menu"
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className={styles.overlayClose}
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X size={28} strokeWidth={2} aria-hidden="true" />
            </button>
            {NAV_ITEMS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                {...scrollOpts}
                className={`${styles.overlayLink} ${activeSection === to ? styles.overlayLinkActive : ''}`}
                activeClass={styles.overlayLinkActive}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            <a
              className={styles.overlayGithub}
              href={LINKEDIN_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <Linkedin size={22} strokeWidth={2} aria-hidden="true" />
              LinkedIn ↗
            </a>
            <a
              className={styles.overlayGithub}
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <GithubIcon size={22} aria-hidden="true" />
              GitHub ↗
            </a>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
