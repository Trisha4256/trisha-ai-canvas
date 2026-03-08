import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleBackground from "./ParticleBackground";

const roles = ["AI & ML Engineer", "Power BI Developer", "Frontend Developer", "Data Analyst"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden anime-bg">
      <ParticleBackground />

      {/* Floating Orbs */}
      <div className="orb orb-pink w-72 h-72 -top-20 -left-20" />
      <div className="orb orb-cyan w-96 h-96 -bottom-32 -right-32" />
      <div className="orb orb-purple w-64 h-64 top-1/3 right-1/4" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-[1]" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-2 rounded-full text-sm font-medium border border-primary/30 bg-primary/10 text-primary glow-pink">
            ✦ Welcome to my universe
          </span>
        </motion.div>

        {/* Big name box with starry background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
          className="relative mx-auto max-w-3xl mb-8 rounded-2xl overflow-hidden border border-primary/20"
          style={{ background: "linear-gradient(135deg, hsl(120 5% 5%), hsl(142 10% 8%), hsl(120 5% 4%))" }}
        >
          {/* Stars inside the box */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-foreground"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.2,
                  animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
            {/* Nebula glow effects inside box */}
            <div className="absolute w-40 h-40 rounded-full top-0 left-1/4 opacity-20"
              style={{ background: "radial-gradient(circle, hsl(142 70% 45% / 0.6), transparent)", filter: "blur(30px)" }} />
            <div className="absolute w-32 h-32 rounded-full bottom-0 right-1/4 opacity-20"
              style={{ background: "radial-gradient(circle, hsl(160 60% 40% / 0.6), transparent)", filter: "blur(30px)" }} />
            <div className="absolute w-24 h-24 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
              style={{ background: "radial-gradient(circle, hsl(100 60% 50% / 0.6), transparent)", filter: "blur(20px)" }} />
          </div>

          <div className="relative z-10 py-10 md:py-14 px-6">
            <p className="text-secondary font-heading text-lg md:text-xl mb-3">Hi, I'm</p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold mb-3 tracking-tight">
              <span className="text-gradient">TRISHA</span>
            </h1>
            <p className="font-heading text-lg md:text-2xl text-foreground/80 mb-2">
              GANDLAPARTHI
            </p>
            <div className="h-px w-24 mx-auto my-4" style={{ background: "linear-gradient(90deg, transparent, hsl(142 70% 45%), hsl(160 60% 40%), transparent)" }} />
            <p className="text-muted-foreground text-sm md:text-base flex items-center justify-center gap-2">
              <Monitor className="w-4 h-4 text-secondary" />
              <span>Web</span>
              <span className="text-primary">+</span>
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Mobile</span>
              <span className="text-muted-foreground/50">— works everywhere</span>
            </p>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold mb-6"
        >
          <span className="text-foreground">I'm a </span>
          <span className="text-gradient">{text}</span>
          <span className="animate-pulse text-primary">|</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8"
        >
          Graduate in CSE (AI & ML) passionate about building
          data-driven solutions and intelligent applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center relative z-20"
        >
          <a href="#projects">
            <Button variant="hero" size="lg">
              <ExternalLink className="w-4 h-4 mr-2" /> View My Work
            </Button>
          </a>
          <Button
            variant="heroOutline"
            size="lg"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Trisha_Resume.pdf";
              link.download = "Trisha_Resume.pdf";
              link.click();
            }}
          >
            <Download className="w-4 h-4 mr-2" /> Download Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-4 justify-center mt-8 relative z-20"
        >
          <button
            onClick={() => window.open("https://www.linkedin.com/in/g-trisha-448a79333", "_blank", "noopener,noreferrer")}
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-secondary hover:glow-cyan transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </button>
          <button
            onClick={() => window.open("https://github.com/Trisha4256", "_blank", "noopener,noreferrer")}
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-accent hover:glow-purple transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
