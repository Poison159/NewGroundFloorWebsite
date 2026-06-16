import { useState, useEffect, useRef } from 'react'
import ParticleShapes from './ParticleShapes'

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const sectionHeight = el.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollable = sectionHeight - viewportHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrollable > 0 ? scrolled / scrollable : 1))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const textFillProgress = Math.min(1, progress / 0.6)

  const text = "We use AI to accelerate development, keeping your costs low. A portion covers the AI tokens used; the rest goes into senior developer time, architecture, and quality assurance."
  const charsToShow = Math.floor(textFillProgress * text.length)

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        height: '200vh',
        position: 'relative',
        background: '#0a0a0a',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            maxWidth: 1200,
            margin: '0 auto',
            width: '100%',
            gap: '4rem',
            padding: '3rem',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                lineHeight: 1.5,
                fontWeight: 300,
                letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              {text.split('').map((char, i) => (
                <span
                  key={i}
                  style={{
                    color: i < charsToShow ? '#fff' : 'rgba(255,255,255,0.25)',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <ParticleShapes />
          </div>
        </div>
      </div>
    </section>
  )
}
