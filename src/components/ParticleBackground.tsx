import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  r: number;
  g: number;
  b: number;
  driftX: number;
  driftY: number;
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
    const starCount = 300;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < starCount; i++) {
      const isGreen = Math.random() > 0.5;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        baseOpacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        r: isGreen ? 100 + Math.floor(Math.random() * 80) : 220 + Math.floor(Math.random() * 35),
        g: isGreen ? 200 + Math.floor(Math.random() * 55) : 230 + Math.floor(Math.random() * 25),
        b: isGreen ? 80 + Math.floor(Math.random() * 60) : 220 + Math.floor(Math.random() * 35),
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.15,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      stars.forEach((star) => {
        // Gentle drift
        star.x += star.driftX;
        star.y += star.driftY;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkling
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity * (0.5 + 0.5 * twinkle);

        // Soft glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${opacity * 0.08})`;
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${opacity})`;
        ctx.fill();

        // Cross sparkle on bright stars
        if (star.size > 1.5 && opacity > 0.6) {
          const sparkleLen = star.size * 2.5 * opacity;
          ctx.strokeStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${opacity * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - sparkleLen, star.y);
          ctx.lineTo(star.x + sparkleLen, star.y);
          ctx.moveTo(star.x, star.y - sparkleLen);
          ctx.lineTo(star.x, star.y + sparkleLen);
          ctx.stroke();
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
