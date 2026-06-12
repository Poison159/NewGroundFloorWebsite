import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import data from '../data/portfolio.json'

function TeamCard({ member, index }: { member: typeof data.team[0]; index: number }) {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
        gap: '3rem',
        alignItems: 'center',
        padding: '3rem 0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : `translateY(60px) scale(0.95)`,
        transition: `all 0.8s cubic-bezier(0.65, 0, 0.35, 1) ${index * 0.15}s`,
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 3,
            background: '#667eea',
            borderRadius: 2,
            marginBottom: '1rem',
          }}
        />
        <h3
          style={{
            color: '#fff',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </h3>
        <p
          style={{
            color: '#667eea',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginTop: '0.5rem',
            letterSpacing: '0.02em',
          }}
        >
          {member.role}
        </p>
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginTop: '0.75rem',
          }}
        >
          {member.description}
        </p>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            color: '#667eea',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            borderBottom: '1px solid rgba(102,126,234,0.3)',
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#667eea')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(102,126,234,0.3)')}
        >
          LinkedIn →
        </a>
      </div>

      <div
          style={{
            flex: 1,
            minWidth: 0,
            aspectRatio: '1/1',
            borderRadius: 24,
            overflow: 'hidden',
            position: 'relative',
            background: '#111',
            maxWidth: 300,
            border: '2px solid #d2ff00',
          }}
      >
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: visible ? 'scale(1)' : 'scale(1.15)',
            transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        />
      </div>
    </div>
  )
}

type Pt = { x: number; y: number }

function X({ cx, cy, opacity }: { cx: number; cy: number; opacity: number }) {
  const s = 2.5
  return (
    <g opacity={opacity}>
      <line x1={cx - s} y1={cy - s} x2={cx + s} y2={cy + s} stroke="#d2ff00" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx + s} y1={cy - s} x2={cx - s} y2={cy + s} stroke="#d2ff00" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  )
}

function O({ cx, cy, opacity }: { cx: number; cy: number; opacity: number }) {
  return (
    <circle cx={cx} cy={cy} r="3.5" fill="none" stroke="#d2ff00" strokeWidth="1.5" opacity={opacity} />
  )
}

export default function Team() {
  const { ref, visible } = useScrollReveal(0.05)
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
      { threshold: 0.05 }
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
      const p = Math.max(0, Math.min(1, scrolled / total))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fade = (start: number, end: number) => {
    if (progress < start) return 0
    if (progress > end) return 1
    return (progress - start) / (end - start)
  }

  const base = 0.08
  const op = (start: number, end: number) => base * fade(start, end)

  // X positions (defense) — reduced for cleaner look
  const xs: Pt[] = [
    { x: 72, y: 22 },
    { x: 80, y: 42 },
    { x: 68, y: 65 },
    { x: 62, y: 82 },
  ]

  // O positions (offense) — reduced for cleaner look
  const os: Pt[] = [
    { x: 28, y: 20 },
    { x: 20, y: 42 },
    { x: 32, y: 65 },
    { x: 38, y: 82 },
  ]

  // Play paths — reduced to match
  const paths = [
    { d: 'M 28,20 Q 50,8 72,22', dashed: false },
    { d: 'M 20,42 Q 50,32 80,42', dashed: true },
    { d: 'M 32,65 Q 50,55 68,65', dashed: false },
    { d: 'M 38,82 Q 50,72 62,82', dashed: true },
  ]

  // Arrowheads at end of each path
  const arrows: { from: Pt; to: Pt }[] = [
    { from: { x: 68, y: 21 }, to: { x: 72, y: 22 } },
    { from: { x: 76, y: 42 }, to: { x: 80, y: 42 } },
    { from: { x: 64, y: 65 }, to: { x: 68, y: 65 } },
    { from: { x: 58, y: 82 }, to: { x: 62, y: 82 } },
  ]

  const arrowH = (pt: Pt, angle: number, opacity: number) => {
    const rad = angle * Math.PI / 180
    const s = 3
    return (
      <polygon
        points={`${pt.x},${pt.y} ${pt.x - s * Math.cos(rad - 0.5)},${pt.y - s * Math.sin(rad - 0.5)} ${pt.x - s * Math.cos(rad + 0.5)},${pt.y - s * Math.sin(rad + 0.5)}`}
        fill="#d2ff00"
        opacity={opacity}
      />
    )
  }

  return (
    <section
      id="team"
      ref={sectionRef}
      style={{
        padding: '6rem 3rem',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 3,
            background: '#667eea',
            borderRadius: 2,
            marginBottom: '1rem',
          }}
        />
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          The{' '}
          <span style={{ color: '#d2ff00' }}>Team</span>
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '1rem',
            marginTop: '0.75rem',
            maxWidth: 500,
          }}
        >
          Meet the people behind Groundfloor — senior engineers with decades of combined experience.
        </p>

        <div style={{ marginTop: '2rem', position: 'relative', zIndex: 1 }}>
          {data.team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>

      {/* Game plan background */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: sectionRevealed ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        {/* Center formation circle */}
        <circle cx="50" cy="48" r="18" fill="none" stroke="#d2ff00" strokeWidth="1" opacity={op(0, 0.25)} />
        <circle cx="50" cy="48" r="11" fill="none" stroke="#d2ff00" strokeWidth="0.8" opacity={op(0.05, 0.3)} strokeDasharray="2 2" />

        {/* Midfield line */}
        <line x1="5" y1="48" x2="50" y2="48" stroke="#d2ff00" strokeWidth="0.8" opacity={op(0.02, 0.2)} strokeDasharray="1.5 3" />
        <line x1="50" y1="48" x2="95" y2="48" stroke="#d2ff00" strokeWidth="0.8" opacity={op(0.02, 0.2)} strokeDasharray="1.5 3" />

        {/* X's (defense) */}
        {xs.map((p, i) => (
          <X key={`x-${i}`} cx={p.x} cy={p.y} opacity={op(0.1 + i * 0.02, 0.4 + i * 0.02)} />
        ))}

        {/* O's (offense) */}
        {os.map((p, i) => (
          <O key={`o-${i}`} cx={p.x} cy={p.y} opacity={op(0.15 + i * 0.02, 0.45 + i * 0.02)} />
        ))}

        {/* Play paths */}
        {paths.map((path, i) => (
          <path
            key={`path-${i}`}
            d={path.d}
            fill="none"
            stroke="#d2ff00"
            strokeWidth="0.8"
            opacity={op(0.3 + i * 0.03, 0.6 + i * 0.03)}
            strokeDasharray={path.dashed ? '2 3' : 'none'}
            strokeLinecap="round"
          />
        ))}

        {/* Arrowheads */}
        {arrows.map((a, i) => {
          const angle = Math.atan2(a.to.y - a.from.y, a.to.x - a.from.x) * 180 / Math.PI
          return arrowH(a.to, angle, op(0.35 + i * 0.03, 0.65 + i * 0.03))
        })}

        {/* Play number */}
        <text
          x="50"
          y="8"
          textAnchor="middle"
          fill="#d2ff00"
          fontSize="3"
          fontWeight="700"
          opacity={op(0.5, 0.75) * base * 4}
          style={{ fontFamily: 'monospace' }}
        >
          PLAY 1
        </text>
      </svg>
    </section>
  )
}
