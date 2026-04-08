import { useEffect, useState } from 'react'

const SECTION_IDS = [
  'home',
  'about',
  'certifications',
  'skills',
  'ai-workflow',
  'experience',
  'projects',
  'contact',
]

/**
 * Tracks which section is most likely "current" for nav highlighting (scroll spy).
 * @param {number} headerOffset pixels from top (navbar + progress bar)
 */
export function useActiveSection(headerOffset = 88) {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const compute = () => {
      const y = window.scrollY + headerOffset
      let current = 'home'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        if (top <= y + 2) current = id
      }
      setActive(current)
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [headerOffset])

  return active
}
