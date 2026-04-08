export const sectionEase = [0.22, 1, 0.36, 1]

/** Framer props for one-time section reveal (respects reduced motion). */
export function sectionEntranceProps(reduceMotion) {
  if (reduceMotion) return {}
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5, ease: sectionEase },
  }
}
