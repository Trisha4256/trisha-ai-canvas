import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
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
    const starCount = 200;
    const speed = 0.5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
        }

        const scale = 300 / star.z;
        const sx = star.x * scale + cx;
        const sy = star.y * scale + cy;
        const r = star.size * scale * 0.5;

        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) return;

        const brightness = Math.min(1, (1000 - star.z) / 800) * star.opacity;

        // Green-tinted stars with some white
        const green = Math.random() > 0.7 ? 255 : 180 + Math.floor(Math.random() * 75);
        const red = Math.random() > 0.7 ? 255 : Math.floor(green * 0.5);
        const blue = Math.random() > 0.7 ? 255 : Math.floor(green * 0.3);

        // Glow
        ctx.beginPath();
        ctx.arc(sx, sy, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${brightness * 0.1})`;
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(r, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${brightness})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    // Clear canvas initially
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
