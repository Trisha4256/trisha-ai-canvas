import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  r: number;
  g: number;
  b: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];
    const starCount = 250;
    const speed = 3;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const makeColor = () => {
      const isWhite = Math.random() > 0.6;
      if (isWhite) return { r: 220 + Math.floor(Math.random() * 35), g: 255, b: 220 + Math.floor(Math.random() * 35) };
      return {
        r: 50 + Math.floor(Math.random() * 80),
        g: 180 + Math.floor(Math.random() * 75),
        b: 50 + Math.floor(Math.random() * 60),
      };
    };

    for (let i = 0; i < starCount; i++) {
      const color = makeColor();
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        ...color,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
          const color = makeColor();
          star.r = color.r;
          star.g = color.g;
          star.b = color.b;
        }

        const scale = 300 / star.z;
        const sx = star.x * scale + cx;
        const sy = star.y * scale + cy;
        const radius = star.size * scale * 0.5;

        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) return;

        const brightness = Math.min(1, (1000 - star.z) / 600) * star.opacity;

        // Trail line
        const prevZ = star.z + speed * 2;
        const prevScale = 300 / prevZ;
        const px = star.x * prevScale + cx;
        const py = star.y * prevScale + cy;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${brightness * 0.3})`;
        ctx.lineWidth = Math.max(radius * 0.5, 0.5);
        ctx.stroke();

        // Glow
        ctx.beginPath();
        ctx.arc(sx, sy, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${brightness * 0.08})`;
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(radius, 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${brightness})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
