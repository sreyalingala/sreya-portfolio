import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CursorGlow from './components/CursorGlow.jsx'

const BelowFold = lazy(() => import('./BelowFold.jsx'))

function BelowFoldFallback() {
  return <div className="below-fold-placeholder" aria-hidden="true" />
}

/**
 * Page order: Navbar → Hero → (BelowFold) About → Certifications → Skills →
 * AIWorkflow → Experience → Projects → Contact → Footer. Sections live in BelowFold.jsx.
 */
function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero />
      <Suspense fallback={<BelowFoldFallback />}>
        <BelowFold />
      </Suspense>
    </>
  )
}

export default App
