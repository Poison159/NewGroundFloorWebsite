import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16;
    const cols = Math.floor(canvas.width / fontSize);
    const rows = Math.floor(canvas.height / fontSize);

    const chars = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        chars.push({
          x: x * fontSize,
          y: y * fontSize,
          char: Math.random() > 0.5 ? '1' : '0',
          speed: 0.1 + Math.random() * 0.15,
          offset: Math.random() * 200,
        });
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(30, 30, 30, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
      ctx.font = `${fontSize}px monospace`;

      const time = Date.now();

      for (const c of chars) {
        const cyclePos = ((time * c.speed + c.offset) % 200) / 200;
        const yOffset = cyclePos * canvas.height;

        if (Math.random() < 0.002) {
          c.char = Math.random() > 0.5 ? '1' : '0';
        }

        ctx.fillText(c.char, c.x, (c.y + yOffset) % canvas.height);
      }
    };

    const interval = setInterval(draw, 80);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.4,
      }}
    />
  );
}
