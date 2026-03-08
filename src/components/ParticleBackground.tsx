import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const colors = [
  "330, 85%, 60%",  // pink
  "190, 90%, 50%",  // cyan
  "270, 80%, 65%",  // purple
  "45, 100%, 60%",  // yellow
];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const particleCount = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const glow = Math.sin(p.pulse) * 0.3 + 0.7;
        const currentSize = p.size * glow;

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.color}, ${p.opacity * 0.15 * glow})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.color}, ${p.opacity * glow})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const gradient = ctx.createLinearGradient(p.x, p.y, particles[j].x, particles[j].y);
            gradient.addColorStop(0, `hsla(${p.color}, ${0.12 * (1 - dist / 120)})`);
            gradient.addColorStop(1, `hsla(${particles[j].color}, ${0.12 * (1 - dist / 120)})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
