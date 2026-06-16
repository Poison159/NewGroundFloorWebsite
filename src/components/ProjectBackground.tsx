import { useRef, useEffect } from 'react'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function rgbToStr(r: number, g: number, b: number) {
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`
}

function lerpColor(c1: string, c2: string, t: number) {
  const a = hexToRgb(c1)
  const b = hexToRgb(c2)
  return rgbToStr(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t))
}

function toRgba(color: string, alpha: number) {
  const m = color.match(/rgb\((\d+),(\d+),(\d+)\)/)
  if (m) return `rgba(${m[1]},${m[2]},${m[3]},${alpha})`
  const h = color.replace('#', '')
  if (h.length === 6) {
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${alpha})`
  }
  return color
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  speed: number
  phase: number
}

interface ProjectBackgroundProps {
  activeIndex: number
  colors: string[]
  enabled?: boolean
}

export default function ProjectBackground({ activeIndex, colors, enabled = true }: ProjectBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const animRef = useRef(0)

  useEffect(() => {
    const count = 60
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        size: 1.5 + Math.random() * 3,
        speed: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      })
    }
    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let running = true

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      if (!running) return
      timeRef.current += 0.016
      const time = timeRef.current
      const w = canvas.width
      const h = canvas.height

      const total = colors.length
      const rawPos = activeIndex
      const idx = Math.floor(rawPos)
      const t = rawPos - idx
      const c1 = colors[Math.min(idx, total - 1)]
      const c2 = colors[Math.min(idx + 1, total - 1)]
      const currentColor = t > 0 && c2 ? lerpColor(c1, c2, t) : c1

      const bg = hexToRgb(colors[Math.min(idx, total - 1)])
      const bgColor = `rgb(${Math.max(0, bg.r - 20)},${Math.max(0, bg.g - 20)},${Math.max(0, bg.b - 20)})`

      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, w, h)

      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6)
      grad.addColorStop(0, toRgba(currentColor, 0.06))
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      const particles = particlesRef.current
      for (const p of particles) {
        p.x += p.vx + Math.sin(time * p.speed + p.phase) * 0.2
        p.y += p.vy
        p.vy -= 0.001

        if (p.y < -20) {
          p.y = h + 20
          p.x = Math.random() * w
          p.vy = (Math.random() - 0.5) * 0.3 - 0.15
        }
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20

        ctx.globalAlpha = 0.15 + Math.sin(time * 0.5 + p.phase) * 0.1
        ctx.fillStyle = currentColor
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 0.04
        ctx.beginPath()
        ctx.arc(p.x + 15, p.y + 15, p.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      running = false
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [activeIndex, colors])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: enabled ? 'block' : 'none',
      }}
    />
  )
}
