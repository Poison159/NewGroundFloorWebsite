import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import data from '../data/portfolio.json'

export default function Contact() {
  const { ref, visible } = useScrollReveal()
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [sectionRevealed, setSectionRevealed] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const handleScroll = () => {
      const rect = el!.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      const scrolled = window.innerHeight - rect.top
      setProgress(Math.max(0, Math.min(1, scrolled / total)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const p = progress

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative',
        background: '#050505',
        transition: 'background 0.8s',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem',
          maxWidth: 1000,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          ref={ref}
          style={{
            flex: 1,
            minWidth: 0,
            maxWidth: 480,
            transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            opacity: visible ? 1 : 0,
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Let's{' '}
            <span style={{ color: '#d2ff00' }}>Build</span>
            <br />
            Together
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginTop: '1.25rem',
            }}
          >
            We're always looking for new projects. Whether you need an app, website, or analytics —
            we'd love to hear from you.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '2rem',
              alignItems: 'flex-start',
            }}
          >
            <a
              href="mailto:info@groundfloor.africa"
              style={{
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '0.75rem 2rem',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 100,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d2ff00'
                e.currentTarget.style.color = '#000'
                e.currentTarget.style.borderColor = '#d2ff00'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              }}
            >
              info@groundfloor.africa
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '3rem',
              justifyContent: 'flex-start',
            }}
          >
            {data.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#d2ff00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <svg
          viewBox="0 0 200 200"
          style={{
            flexShrink: 0,
            width: 'clamp(180px, 25vw, 300px)',
            height: 'clamp(180px, 25vw, 300px)',
            opacity: sectionRevealed ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <g>
            {/* Top-left puzzle piece */}
            <g
              opacity={0.08 + p * 0.2}
              transform={`translate(${-70 * (1 - p)}, ${-70 * (1 - p)}) rotate(${15 * (1 - p)})`}
              style={{ transformOrigin: '78px 78px' }}
            >
              <path
                d="M 78 78 L 100 78 L 100 86 Q 103 86 103 89 Q 103 92 100 92 L 100 100 L 92 100 Q 92 103 89 103 Q 86 103 86 100 L 78 100 Z"
                fill="rgba(210,255,0,0.03)"
                stroke="#d2ff00"
                strokeWidth="0.8"
              />
            </g>

            {/* Top-right puzzle piece */}
            <g
              opacity={0.08 + p * 0.2}
              transform={`translate(${70 * (1 - p)}, ${-70 * (1 - p)}) rotate(${-15 * (1 - p)})`}
              style={{ transformOrigin: '122px 78px' }}
            >
              <path
                d="M 100 78 L 122 78 L 122 100 L 114 100 Q 114 103 111 103 Q 108 103 108 100 L 100 100 L 100 92 Q 103 92 103 89 Q 103 86 100 86 Z"
                fill="rgba(210,255,0,0.03)"
                stroke="#d2ff00"
                strokeWidth="0.8"
              />
            </g>

            {/* Bottom-left puzzle piece */}
            <g
              opacity={0.08 + p * 0.2}
              transform={`translate(${-70 * (1 - p)}, ${70 * (1 - p)}) rotate(${-15 * (1 - p)})`}
              style={{ transformOrigin: '78px 122px' }}
            >
              <path
                d="M 78 100 L 86 100 Q 86 103 89 103 Q 92 103 92 100 L 100 100 L 100 106 Q 103 106 103 109 Q 103 112 100 112 L 100 122 L 78 122 Z"
                fill="rgba(210,255,0,0.03)"
                stroke="#d2ff00"
                strokeWidth="0.8"
              />
            </g>

            {/* Bottom-right puzzle piece */}
            <g
              opacity={0.08 + p * 0.2}
              transform={`translate(${70 * (1 - p)}, ${70 * (1 - p)}) rotate(${15 * (1 - p)})`}
              style={{ transformOrigin: '122px 122px' }}
            >
              <path
                d="M 100 100 L 108 100 Q 108 103 111 103 Q 114 103 114 100 L 122 100 L 122 122 L 100 122 L 100 112 Q 103 112 103 109 Q 103 106 100 106 Z"
                fill="rgba(210,255,0,0.03)"
                stroke="#d2ff00"
                strokeWidth="0.8"
              />
            </g>
          </g>
        </svg>
      </div>
    </section>
  )
}
