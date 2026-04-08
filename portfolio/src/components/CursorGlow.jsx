import { useEffect, useState } from 'react'
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CursorGlow.module.css'

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mqFine = window.matchMedia('(pointer: fine)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(mqFine.matches && !mqReduce.matches)
    sync()
    mqFine.addEventListener('change', sync)
    mqReduce.addEventListener('change', sync)
    return () => {
      mqFine.removeEventListener('change', sync)
      mqReduce.removeEventListener('change', sync)
    }
  }, [])

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.45 })
  const springY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.45 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <Motion.div
      className={styles.glow}
      style={{ left: springX, top: springY }}
      aria-hidden="true"
    />
  )
}
