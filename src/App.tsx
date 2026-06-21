import { useState, useCallback, useEffect, useRef } from 'react'
import Header from './components/Header'
import Loader from './components/Loader'
import Hero from './components/Hero'
import HorizontalScroll from './components/HorizontalScroll'
import Projects from './components/Projects'
import Team from './components/Team'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import CursorTrail from './components/CursorTrail'
import Cube3D from './components/Cube3D'
import { useActiveSection } from './hooks/useScrollReveal'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [cursorEnabled, setCursorEnabled] = useState(false)
  const [cubeProgress, setCubeProgress] = useState(0)
  const [loopPhase, setLoopPhase] = useState<'idle' | 'closing' | 'opening'>('idle')
  const loopPhaseRef = useRef(loopPhase)
  loopPhaseRef.current = loopPhase
  const activeSection = useActiveSection()

  useEffect(() => {
    let reachedBottom = false
    let reachedTop = false
    let loopTimer: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      const hero = document.getElementById('hero')
      const work = document.getElementById('work')
      if (!hero || !work) return

      const heroTop = hero.offsetTop
      const workTop = work.offsetTop
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      const start = heroTop
      const end = workTop - windowHeight * 0.3
      const raw = (scrollY - start) / (end - start)
      setCubeProgress(Math.max(0, Math.min(1.3, raw)))

      const scrollBottom = scrollY + windowHeight
      const docHeight = document.documentElement.scrollHeight

      if (scrollY <= 5 && !reachedTop && loopPhaseRef.current === 'idle') {
        reachedTop = true
        setLoopPhase('closing')
        loopTimer = setTimeout(() => {
          window.scrollTo(0, docHeight)
          setLoopPhase('opening')
          loopTimer = setTimeout(() => {
            setLoopPhase('idle')
          }, 700)
        }, 700)
      } else if (scrollY > 5) {
        reachedTop = false
      }

      if (scrollBottom >= docHeight - 5 && !reachedBottom && loopPhaseRef.current === 'idle') {
        reachedBottom = true
        setLoopPhase('closing')
        loopTimer = setTimeout(() => {
          window.scrollTo(0, 0)
          setLoopPhase('opening')
          loopTimer = setTimeout(() => {
            setLoopPhase('idle')
          }, 700)
        }, 700)
      } else if (scrollBottom < docHeight - 5) {
        reachedBottom = false
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(loopTimer)
    }
  }, [])

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
      <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        {cursorEnabled && <CursorTrail />}
        {loading && <Loader onComplete={handleLoaderComplete} />}

      <Cube3D progress={cubeProgress} />
      <Header activeSection={activeSection} cursorEnabled={cursorEnabled} onToggleCursor={() => setCursorEnabled(c => !c)} />

      <main
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Hero />
        <HorizontalScroll />
        <Projects />
        <Team />
        <Process />
        <Pricing />
        <Contact />
      </main>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#0a0a0a',
          clipPath: loopPhase === 'idle'
            ? 'circle(0% at 50% 50%)'
            : 'circle(150% at 50% 50%)',
          transition: loopPhase === 'idle'
            ? 'none'
            : 'clip-path 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
          pointerEvents: 'none',
        }}
      />
      <footer
        style={{
          padding: '2rem 3rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
          © 2026 GroundFloor Technologies. All rights reserved.
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
          Built with passion in South Africa
        </span>
      </footer>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; scrollbar-width: none; }
        body { background: #0a0a0a; }
        ::-webkit-scrollbar { display: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        a { color: inherit; }
      `}</style>
    </div>
  )
}
