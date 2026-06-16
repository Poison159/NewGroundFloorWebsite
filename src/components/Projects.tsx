import { useState, useCallback, useRef, useEffect } from 'react'
import data from '../data/portfolio.json'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AnimatedCard from './AnimatedCard'
import RedactedReveal from './RedactedReveal'

const BINARY_COUNT = 62
const binaryDigits = Array.from({ length: BINARY_COUNT }, (_, i) => ({
  digit: Math.random() > 0.5 ? '1' : '0',
  opacity: 0.1 + Math.random() * 0.15,
}))

interface WordData {
  digit: string
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
}

function initWord(bin: typeof binaryDigits[0], w: number, h: number): WordData {
  return {
    digit: bin.digit,
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    opacity: bin.opacity,
  }
}

export default function Projects() {
  const { ref, visible } = useScrollReveal(0.05)
  const projects = data.portfolio
  const totalSlides = 1 + projects.length

  const [activeSlide, setActiveSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [projectIndex, setProjectIndex] = useState(0)
  const [dismissing, setDismissing] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [sectionRevealed, setSectionRevealed] = useState(false)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [cardsRevealed, setCardsRevealed] = useState(false)
  const [cardEntryDone, setCardEntryDone] = useState(false)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [arrowPos, setArrowPos] = useState({ x: 0, y: 0, angle: 0 })
  const smoothPathRef = useRef<SVGPathElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const wordsRef = useRef<WordData[]>([])
  const imagePreloaded = useRef(false)

  // Preload images once
  useEffect(() => {
    if (imagePreloaded.current) return
    imagePreloaded.current = true
    projects.forEach(project => {
      if (project.id === 'project-1') return
      const urls: string[] = [project.image, project.imageHover, ...(project.images || [])].filter(Boolean) as string[]
      urls.forEach(url => { const img = new Image(); img.src = url })
    })
  }, [projects])

  const starsRef = useRef<{ left: string; top: string; size: number; delay: string; dur: string }[]>([])

  if (starsRef.current.length === 0) {
    starsRef.current = Array.from({ length: 80 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2.5,
      delay: `${Math.random() * 6}s`,
      dur: `${3 + Math.random() * 5}s`,
    }))
  }

  const snapTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const snapCleanupRef = useRef<ReturnType<typeof setTimeout>>()

  // Carousel scroll progress with snap on release
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollable = sectionHeight - viewportHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrollable > 0 ? scrolled / scrollable : 1))

      const track = trackRef.current
      if (!track) return

      // Immediate transform during scroll (no transition)
      track.style.transition = 'none'
      const carouselEndP = (totalSlides - 1) / totalSlides
      const carouselP = Math.min(p / carouselEndP, 1)
      const translateX = -carouselP * (totalSlides - 1) * 100
      track.style.transform = `translateX(${translateX}vw)`

      const rawSlide = carouselP * (totalSlides - 1)
      setActiveSlide(Math.round(rawSlide))

      // Debounce: snap to nearest slide when scrolling stops
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current)
      if (snapCleanupRef.current) clearTimeout(snapCleanupRef.current)

      snapTimerRef.current = setTimeout(() => {
        const nearestSlide = Math.round(rawSlide)
        const snapP = nearestSlide / (totalSlides - 1)
        const snapX = -snapP * (totalSlides - 1) * 100

        track.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
        track.style.transform = `translateX(${snapX}vw)`
        setActiveSlide(nearestSlide)

        snapCleanupRef.current = setTimeout(() => {
          track.style.transition = 'none'
        }, 600)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current)
      if (snapCleanupRef.current) clearTimeout(snapCleanupRef.current)
    }
  }, [totalSlides])

  // Swipe card observers
  useEffect(() => {
    const el = cardsContainerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsRevealed(true)
          setTimeout(() => setCardEntryDone(true), 1900)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Arrow path
  useEffect(() => {
    const computeArrow = () => {
      const section = document.getElementById('projects')
      const container = section?.querySelector('[data-projects-container]') as HTMLElement | null
      const startMarker = section?.querySelector('[data-projects-path-start]') as HTMLElement | null
      const cards = section?.querySelectorAll<HTMLElement>('[data-card-image]')
      if (!section || !container || !startMarker || !cards || cards.length === 0) return

      const containerRect = container.getBoundingClientRect()
      const startRect = startMarker.getBoundingClientRect()
      const startX = startRect.left - containerRect.left + startRect.width / 2
      const startY = startRect.top - containerRect.top + startRect.height / 2

      const points: { x: number; y: number }[] = [{ x: startX, y: startY }]

      cards.forEach((card) => {
        const r = card.getBoundingClientRect()
        const cx = (r.left + r.right) / 2 - containerRect.left
        const cy = (r.top + r.bottom) / 2 - containerRect.top
        const prev = points[points.length - 1]
        points.push({ x: cx, y: prev.y })
        points.push({ x: cx, y: cy })
      })

      const sectionRect = section.getBoundingClientRect()
      const containerBottom = containerRect.bottom - containerRect.top
      const lastPt = points[points.length - 1]
      points.push({ x: lastPt.x, y: containerBottom })

      const rawProgress = Math.max(0, Math.min(1,
        (window.innerHeight - startRect.top) / (window.innerHeight + (sectionRect.bottom - startRect.top))
      ))

      const n = points.length
      let d = `M ${points[0].x} ${points[0].y}`
      for (let i = 0; i < n - 1; i++) {
        const pPrev = points[Math.max(0, i - 1)]
        const p1 = points[i]
        const p2 = points[i + 1]
        const pNext = points[Math.min(n - 1, i + 2)]
        const cp1x = p1.x + (p2.x - pPrev.x) / 6
        const cp1y = p1.y + (p2.y - pPrev.y) / 6
        const cp2x = p2.x - (pNext.x - p1.x) / 6
        const cp2y = p2.y - (pNext.y - p1.y) / 6
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
      }

      if (smoothPathRef.current) {
        smoothPathRef.current.setAttribute('d', d)
        const totalLen = smoothPathRef.current.getTotalLength()
        if (totalLen > 0) {
          const len = totalLen * rawProgress
          const clamped = Math.max(0, Math.min(totalLen, len))
          const pt = smoothPathRef.current.getPointAtLength(clamped)
          const prevPt = smoothPathRef.current.getPointAtLength(Math.max(0, clamped - 3))
          const angle = Math.atan2(pt.y - prevPt.y, pt.x - prevPt.x) * 180 / Math.PI - 90
          setArrowPos({ x: pt.x, y: pt.y, angle })
        }
      }
    }

    window.addEventListener('scroll', computeArrow, { passive: true })
    computeArrow()
    return () => window.removeEventListener('scroll', computeArrow)
  }, [])

  // Floating code words
  useEffect(() => {
    const container = cardsRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    wordsRef.current = binaryDigits.map(k => initWord(k, w, h))
    wordRefs.current = new Array(binaryDigits.length)

    let raf: number
    const step = () => {
      const cw = container.clientWidth
      const ch = container.clientHeight
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const words = wordsRef.current

      for (let i = 0; i < words.length; i++) {
        const w = words[i]
        const dx = w.x - mx
        const dy = w.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (200 - dist) / 200 * 1.2
          w.vx += (dx / dist) * force * 0.3
          w.vy += (dy / dist) * force * 0.3
        }

        w.vx *= 0.99
        w.vy *= 0.99
        w.x += w.vx
        w.y += w.vy

        if (w.x < 0) { w.x = 0; w.vx *= -0.8 }
        if (w.x > cw) { w.x = cw; w.vx *= -0.8 }
        if (w.y < 0) { w.y = 0; w.vy *= -0.8 }
        if (w.y > ch) { w.y = ch; w.vy *= -0.8 }

        const el = wordRefs.current[i]
        if (el) {
          el.style.transform = `translate(${w.x}px, ${w.y}px)`
        }
      }

      for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
          const a = words[i]
          const b = words[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = 30
          if (dist < minDist && dist > 0.01) {
            const overlap = (minDist - dist) / 2
            const nx = dx / dist
            const ny = dy / dist
            a.x -= nx * overlap
            a.y -= ny * overlap
            b.x += nx * overlap
            b.y += ny * overlap
            const relVx = a.vx - b.vx
            const relVy = a.vy - b.vy
            const relDot = relVx * nx + relVy * ny
            if (relDot > 0) {
              a.vx -= nx * relDot * 0.5
              a.vy -= ny * relDot * 0.5
              b.vx += nx * relDot * 0.5
              b.vy += ny * relDot * 0.5
            }
          }
        }
      }

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const beforeAfterProjects = data.portfolio.filter(p => p.id !== 'project-1' && p.id !== 'project-2')

  const dismiss = useCallback(() => {
    if (dismissing) return
    setDismissing(true)
    setTimeout(() => {
      setProjectIndex(i => (i + 1) % beforeAfterProjects.length)
      setDismissing(false)
      setHovered(false)
    }, 400)
  }, [dismissing, beforeAfterProjects.length])

  const visibleCards = []
  const numVisible = Math.min(4, beforeAfterProjects.length)
  for (let i = 0; i < numVisible; i++) {
    visibleCards.push({
      project: beforeAfterProjects[(projectIndex + i) % beforeAfterProjects.length],
      stackIndex: i,
    })
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0a0a0a',
      }}
    >
      {/* Horizontal carousel */}
      <div
        style={{
          height: `${(totalSlides + 1) * 100}vh`,
          position: 'relative',
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
          {/* Starry night background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, #0a0a2e 0%, #0a0a0a 100%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {starsRef.current.map((s, i) => (
              <span
                key={i}
                className="star"
                style={{
                  position: 'absolute',
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  borderRadius: '50%',
                  background: '#fff',
                  animationDelay: s.delay,
                  animationDuration: s.dur,
                }}
              />
            ))}
          </div>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Header slide */}
            <div
              style={{
                minWidth: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
              }}
            >
              <div
                ref={ref}
                style={{
                  maxWidth: 1200,
                  margin: '0 auto',
                  width: '100%',
                  transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
                  transform: visible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: visible ? 1 : 0,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 3,
                    background: '#d2ff00',
                    borderRadius: 2,
                    marginBottom: '1rem',
                  }}
                />
                <RedactedReveal
                  lines={['Featured', 'Projects']}
                  as="h2"
                  stagger={250}
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.2,
                  }}
                  highlightIndex={1}
                  highlightColor="#d2ff00"
                />
                <RedactedReveal
                  lines={[
                    'Modern apps, websites, and data analytics',
                    'built for Africa.',
                  ]}
                  as="p"
                  stagger={200}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                    lineHeight: 1.6,
                    marginTop: '0.75rem',
                    maxWidth: 520,
                  }}
                  barColor="rgba(210,255,0,0.3)"
                />
              </div>
            </div>

            {/* Project slides */}
            {projects.map((project, i) => (
              <div
                key={project.id}
                style={{
                  minWidth: '100vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3rem',
                }}
              >
                <div
                  style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <AnimatedCard
                    title={project.title}
                    description={project.description}
                    tags={project.tech}
                    image={project.image}
                    imageHover={project.imageHover}
                    images={project.images}
                    video={project.video}
                    appStore={project.appStore}
                    playStore={project.playStore}
                    url={project.url}
                    color={project.color}
                    index={i}
                    cardIndex={i}
                    phoneCollage={project.id === 'project-1'}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.6rem',
              zIndex: 10,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                style={{
                  width: i === activeSlide ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  background: i === activeSlide ? '#d2ff00' : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s cubic-bezier(0.65, 0, 0.35, 1)',
                }}
                aria-label={`Go to slide ${i}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Before & After Swipe Cards */}
      <div
        data-projects-container
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '6rem 3rem',
          position: 'relative',
        }}
      >
        <span
          data-projects-path-start
          style={{
            position: 'absolute',
            left: '1rem',
            top: '5rem',
            opacity: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            fontSize: 0,
          }}
          aria-hidden
        />

        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: -1,
            opacity: sectionRevealed ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <path ref={smoothPathRef} d="" fill="none" stroke="none" />
          {arrowPos.y > 0 && (
            <g
              transform={`translate(${arrowPos.x},${arrowPos.y}) rotate(${arrowPos.angle})`}
              style={{ transition: 'transform 0.15s linear' }}
            >
              <ellipse cx="0" cy="-1" rx="7" ry="9" fill="none" stroke="#d2ff00" strokeWidth="2" />
              <circle cx="0" cy="-12" r="5" fill="none" stroke="#d2ff00" strokeWidth="2" />
              <polygon points="5,-14 12,-12 5,-10" fill="#d2ff00" />
              <circle cx="1.5" cy="-13" r="1.2" fill="#d2ff00" />
              <g className="bird-wing-l" style={{ transformOrigin: '-7px -1px' }}>
                <path d="M -7,-1 C -16,-7 -22,-3 -24,2 C -22,7 -16,10 -7,3" fill="none" stroke="#d2ff00" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <g className="bird-wing-r" style={{ transformOrigin: '7px -1px' }}>
                <path d="M 7,-1 C 16,-7 22,-3 24,2 C 22,7 16,10 7,3" fill="none" stroke="#d2ff00" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <path d="M -4,7 C -8,11 -10,13 -8,15" fill="none" stroke="#d2ff00" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 4,7 C 8,11 10,13 8,15" fill="none" stroke="#d2ff00" strokeWidth="1.5" strokeLinecap="round" />
              <g className="bird-leg-l" style={{ transformOrigin: '-2px 8px' }}>
                <line x1="-2" y1="8" x2="-3" y2="16" stroke="#d2ff00" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <g className="bird-leg-r" style={{ transformOrigin: '2px 8px' }}>
                <line x1="2" y1="8" x2="3" y2="16" stroke="#d2ff00" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </g>
          )}
        </svg>

        <div ref={cardsContainerRef} style={{ marginTop: '3rem' }}>
          <div
            ref={cardsRef}
            style={{ position: 'relative', overflow: 'hidden' }}
            onMouseMove={(e) => {
              const rect = cardsRef.current?.getBoundingClientRect()
              if (rect) {
                mouseRef.current = {
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                }
              }
            }}
            onMouseLeave={() => {
              mouseRef.current = { x: -1000, y: -1000 }
            }}
          >
            {binaryDigits.map((_, i) => (
              <span
                key={i}
                ref={el => { wordRefs.current[i] = el }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transform: 'translate(0, 0)',
                  width: 24,
                  height: 24,
                  borderRadius: 20,
                  background: 'rgba(210, 255, 0, 0.04)',
                  border: '1px solid rgba(210, 255, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace",
                  color: '#d2ff00',
                  opacity: wordsRef.current[i]?.opacity ?? 0.15,
                  pointerEvents: 'none',
                  zIndex: 1,
                  userSelect: 'none',
                }}
              >
                {wordsRef.current[i]?.digit}
              </span>
            ))}
            <div
              style={{
                width: 40,
                height: 3,
                background: '#d2ff00',
                borderRadius: 2,
                marginBottom: '1rem',
              }}
            />
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
              }}
            >
              <span style={{ color: '#d2ff00' }}>Before</span> &{' '}
              <span style={{ color: '#d2ff00' }}>After</span>
            </h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                lineHeight: 1.6,
                marginTop: '0.5rem',
                maxWidth: 560,
              }}
            >
              We modernise outdated business websites into stunning experiences that reflect who they are — their brand, their culture, and what they do.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2rem',
                perspective: 1200,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 820,
                  aspectRatio: '1.6 / 1',
                }}
              >
                {visibleCards.map(({ project, stackIndex }) => {
                  const isTop = stackIndex === 0
                  const offset = stackIndex * 12
                  const scale = 1 - stackIndex * 0.03
                  const rot = stackIndex * 1.5
                  const isEntering = cardsRevealed && !cardEntryDone
                  const staggerDelay = (numVisible - 1 - stackIndex) * (1.5 / numVisible)

                  const entryTransform = `translateY(${offset + 60}px) scale(${scale}) rotate(${rot}deg)`
                  const finalTransform = `translateY(${offset}px) scale(${scale}) rotate(${rot}deg)`

                  return (
                    <div
                      key={`${projectIndex}-${project.id}`}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: 16,
                        overflow: 'hidden',
                        background: '#111',
                        border: '2px solid #d2ff00',
                        boxShadow: isTop
                          ? '0 20px 60px rgba(0,0,0,0.5)'
                          : '0 8px 30px rgba(0,0,0,0.4)',
                        transform: cardsRevealed ? finalTransform : entryTransform,
                        opacity: cardsRevealed ? (dismissing && isTop ? 0 : 1) : 0,
                        transition: isEntering
                          ? `transform 0.5s cubic-bezier(0.65, 0, 0.35, 1) ${staggerDelay}s, opacity 0.5s ease ${staggerDelay}s`
                          : dismissing
                            ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease'
                            : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                        cursor: isTop ? 'pointer' : 'default',
                        zIndex: 10 - stackIndex,
                        pointerEvents: isTop ? 'auto' : 'none',
                        userSelect: 'none',
                      }}
                      className={isTop && dismissing ? 'swipe-dismiss' : ''}
                      onClick={isTop ? dismiss : undefined}
                      onMouseEnter={isTop ? () => setHovered(true) : undefined}
                      onMouseLeave={isTop ? () => setHovered(false) : undefined}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: isTop && hovered ? 0 : 1,
                          transform: isTop && hovered ? 'scale(0.95)' : 'scale(1)',
                          transition: isTop
                            ? 'opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
                            : 'none',
                        }}
                      />
                      <img
                        src={project.imageHover}
                        alt={`${project.title} hover`}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: isTop && hovered ? 1 : 0,
                          transform: isTop && hovered ? 'scale(1)' : 'scale(1.1)',
                          transition: isTop
                            ? 'opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
                            : 'none',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                          opacity: isTop && hovered ? 1 : 0,
                          transition: isTop ? 'opacity 0.4s' : 'none',
                          pointerEvents: 'none',
                        }}
                      />

                      <div
                        style={{
                          position: 'absolute',
                          top: '1.25rem',
                          left: '1.25rem',
                          zIndex: 2,
                          opacity: isTop && !hovered ? 0.7 : 0,
                          transition: isTop ? 'opacity 0.4s' : 'none',
                        }}
                      >
                        <span
                          style={{
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                            background: 'rgba(0,0,0,0.4)',
                            padding: '0.35rem 0.85rem',
                            borderRadius: 100,
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          click to swipe
                        </span>
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1.5rem',
                          left: '1.5rem',
                          zIndex: 2,
                          opacity: isTop ? 1 : 0,
                          transition: isTop ? 'opacity 0.4s 0.1s' : 'none',
                        }}
                      >
                        <p
                          style={{
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                          }}
                        >
                          {project.title}
                        </p>
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1.5rem',
                          right: '1.5rem',
                          zIndex: 2,
                          opacity: isTop ? 1 : 0,
                          transition: isTop ? 'opacity 0.4s 0.1s' : 'none',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.35rem 0.85rem',
                            borderRadius: 100,
                            background: '#d2ff00',
                            color: '#0a0a0a',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {hovered ? 'Before' : 'After'}
                        </span>
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          top: '1.25rem',
                          right: '1.25rem',
                          zIndex: 2,
                          opacity: isTop ? 0.4 : 0.15,
                        }}
                      >
                        <span
                          style={{
                            color: '#fff',
                            fontSize: '2rem',
                            fontWeight: 700,
                          }}
                        >
                          {(projectIndex + stackIndex + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .star {
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.5); }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; transform: scale(1.2); }
        }
        .swipe-dismiss {
          transform: translateX(120%) rotate(16deg) !important;
          opacity: 0 !important;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease !important;
        }
        @keyframes bird-flap-l {
          0%, 100% { transform: rotate(-35deg); }
          50% { transform: rotate(25deg); }
        }
        @keyframes bird-flap-r {
          0%, 100% { transform: rotate(35deg); }
          50% { transform: rotate(-25deg); }
        }
        @keyframes bird-dangle-l {
          0%, 100% { transform: rotate(12deg); }
          50% { transform: rotate(-12deg); }
        }
        @keyframes bird-dangle-r {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(12deg); }
        }
        .bird-wing-l { animation: bird-flap-l 0.3s ease-in-out infinite; }
        .bird-wing-r { animation: bird-flap-r 0.3s ease-in-out infinite; }
        .bird-leg-l { animation: bird-dangle-l 0.5s ease-in-out infinite; }
        .bird-leg-r { animation: bird-dangle-r 0.5s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
