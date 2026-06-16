import { useState, useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  size: number;
  alpha: number;
  phase: number;
}

const S = 6;

function distributeInRect(i: number, step: number, w: number, h: number, zVal: number = 0): [number, number, number] {
  const idx = i % step;
  const cols = Math.ceil(Math.sqrt(step));
  const rows = Math.ceil(step / cols);
  const col = idx % cols;
  const row = Math.floor(idx / cols);
  const x = (col / (cols - 1 || 1)) * w - w / 2;
  const y = (row / (rows - 1 || 1)) * h - h / 2;
  return [x, y, zVal + (Math.random() - 0.5) * 3];
}

const PHONE_W = 36 * S;
const PHONE_H = 66 * S;
const PHONE_R = 6 * S;
const PHONE_BEZEL = 4 * S;

type ShapeName = 'phone' | 'website' | 'graph';

const SHAPES: Record<ShapeName, (i: number, total: number) => [number, number, number]> = {
  phone: (i: number, total: number) => {
    const bodyPct = 0.45;
    const screenPct = 0.45;
    const notchPct = 0.05;
    const bodyEnd = Math.floor(total * bodyPct);
    const screenEnd = bodyEnd + Math.floor(total * screenPct);
    const notchEnd = screenEnd + Math.floor(total * notchPct);

    if (i < bodyEnd) {
      const idx = i;
      const cnt = bodyEnd;
      const cols = Math.ceil(Math.sqrt(cnt));
      const rows = Math.ceil(cnt / cols);
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      let x = (col / (cols - 1 || 1)) * PHONE_W - PHONE_W / 2;
      let y = (row / (rows - 1 || 1)) * PHONE_H - PHONE_H / 2;
      const hw = PHONE_W / 2 - PHONE_R;
      const hh = PHONE_H / 2 - PHONE_R;
      if (Math.abs(x) > hw && Math.abs(y) > hh) {
        const dx = Math.abs(x) - hw;
        const dy = Math.abs(y) - hh;
        if (Math.sqrt(dx * dx + dy * dy) > PHONE_R) {
          const angle = Math.atan2(dy, dx);
          const cx = Math.sign(x) * hw;
          const cy = Math.sign(y) * hh;
          x = cx + Math.cos(angle) * PHONE_R;
          y = cy + Math.sin(angle) * PHONE_R;
        }
      }
      return [x, y, (Math.random() - 0.5) * 2];
    } else if (i < screenEnd) {
      const idx = i - bodyEnd;
      const cnt = screenEnd - bodyEnd;
      const sw = PHONE_W - PHONE_BEZEL * 2;
      const sh = PHONE_H - PHONE_BEZEL * 3 - 8;
      return distributeInRect(idx, cnt, sw, sh, 1);
    } else if (i < notchEnd) {
      const idx = i - screenEnd;
      const cnt = notchEnd - screenEnd;
      const notchW = 12;
      const notchH = 4;
      return distributeInRect(idx, cnt, notchW, notchH, 2);
    } else {
      const idx = i - notchEnd;
      const cnt = total - notchEnd;
      const barW = 14;
      const barH = 2.5;
      return distributeInRect(idx, cnt, barW, barH, 2);
    }
  },
  website: (i: number, total: number) => {
    const half = Math.floor(total / 2);
    const ww = 75 * S;
    const wh = 50 * S;
    const barH = 10 * S;
    if (i < half) {
      return distributeInRect(i, half, ww, wh);
    } else {
      const idx = i - half;
      const rem = total - half;
      const third = Math.floor(rem / 3);
      if (idx < third) {
        const dotIdx = idx % 3;
        return [-ww / 2 + 8 + dotIdx * 7, -wh / 2 + barH / 2, (Math.random() - 0.5) * 2];
      } else if (idx < third * 2) {
        const t = (idx - third) / (rem - third * 2);
        return [t * ww - ww / 2, -wh / 2 + barH / 2 + 1, (Math.random() - 0.5) * 2];
      } else {
        const t = (idx - third * 2) / (rem - third * 2);
        const lineY = -wh / 2 + barH + 4 + (t * (wh - barH - 6));
        return [0, lineY, (Math.random() - 0.5) * 2];
      }
    }
  },
  graph: (i: number, total: number) => {
    const numBars = 5;
    const barW = 10 * S;
    const gap = 4 * S;
    const totalW = numBars * (barW + gap) - gap;
    const maxH = 55 * S;
    const barHeights = [35, 55, 25, 45, 50];
    const axisY = maxH / 2 + 6;

    const half = Math.floor(total / 2);
    if (i < half) {
      const idx = i % half;
      const barIdx = Math.floor(idx / (half / numBars));
      const localIdx = idx % Math.ceil(half / numBars);
      const bIdx = Math.min(barIdx, numBars - 1);
      const bh = barHeights[bIdx];
      const barX = -totalW / 2 + bIdx * (barW + gap) + barW / 2;
      const barY = axisY - (localIdx / Math.ceil(half / numBars)) * bh;
      return [barX + (Math.random() - 0.5) * barW * 0.7, barY, (Math.random() - 0.5) * 3];
    } else {
      const idx = i - half;
      const rem = total - half;
      const axisPart = Math.floor(rem / 2);
      if (idx < axisPart) {
        const t = idx / axisPart;
        return [-totalW / 2 - 5 + t * (totalW + 10), axisY, (Math.random() - 0.5) * 2];
      } else {
        const t = (idx - axisPart) / (rem - axisPart);
        const yStart = axisY;
        const yEnd = -maxH / 2 - 6;
        return [-totalW / 2 - 6, yStart + t * (yEnd - yStart), (Math.random() - 0.5) * 2];
      }
    }
  },
};

const LABELS: Record<ShapeName, string> = {
  phone: 'Mobile',
  website: 'Web',
  graph: 'Analytics',
};

export default function ParticleShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentShapeRef = useRef<ShapeName>('phone');
  const timeRef = useRef(0);
  const animRef = useRef(0);
  const [activeShape, setActiveShape] = useState<ShapeName>('phone');

  const initParticles = useCallback(() => {
    const count = 2500;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 400,
        vx: 0,
        vy: 0,
        vz: 0,
        targetX: 0,
        targetY: 0,
        targetZ: 0,
        size: 0.5 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  const setShape = useCallback((shape: ShapeName) => {
    currentShapeRef.current = shape;
    setActiveShape(shape);
    const particles = particlesRef.current;
    const total = particles.length;
    particles.forEach((p, i) => {
      const [tx, ty, tz] = SHAPES[shape](i, total);
      p.targetX = tx;
      p.targetY = ty;
      p.targetZ = tz;
    });
  }, []);

  useEffect(() => {
    initParticles();
    setShape('phone');
  }, [initParticles, setShape]);

  // Auto-cycle shapes every 3 seconds
  useEffect(() => {
    const shapes: ShapeName[] = ['phone', 'website', 'graph'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % shapes.length;
      setShape(shapes[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, [setShape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      timeRef.current += 0.016;
      const time = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      ctx.save();
      ctx.translate(w / 2, h / 2);

      particles.forEach((p) => {
        const springForce = 0.02;
        const damping = 0.92;

        p.vx += (p.targetX - p.x) * springForce;
        p.vy += (p.targetY - p.y) * springForce;
        p.vz += (p.targetZ - p.z) * springForce;

        p.vx *= damping;
        p.vy *= damping;
        p.vz *= damping;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        const perspective = 300 / (300 + p.z);
        const px = p.x * perspective;
        const py = p.y * perspective;
        const size = p.size * perspective;

        const speed = Math.sqrt(p.vx ** 2 + p.vy ** 2 + p.vz ** 2);
        const hue = 210 + speed * 40;
        const sat = 50 + speed * 30;
        const light = 60 + speed * 20;

        ctx.globalAlpha = p.alpha * perspective * 0.8;
        ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
        ctx.beginPath();
        ctx.arc(px, py, size * (0.5 + 0.5 * Math.sin(time * 0.5 + p.phase)), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          border: '1px solid #d2ff00',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '1rem',
          }}
        >
          <span
            style={{
              background: '#d2ff00',
              borderRadius: 20,
              padding: '0.4rem 1.2rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
            }}
          >
            {LABELS[activeShape]}
          </span>
        </div>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '500px',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}
