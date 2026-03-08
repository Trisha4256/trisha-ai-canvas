import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Trophy, Keyboard, Users } from "lucide-react";

const certificates = [
  { icon: Award, title: "Generative AI Workshop", year: "2025" },
  { icon: Trophy, title: "AMR Hackmaina 2K25", year: "2025" },
  { icon: Award, title: "Advance Python Oriented Program", year: "2024" },
  { icon: Keyboard, title: "Typewriting English Lower (30 WPM)", year: "2021" },
  { icon: Keyboard, title: "Typewriting English Higher (45 WPM)", year: "2022" },
  { icon: Users, title: "Member of Student Activity Council", year: "" },
  { icon: Trophy, title: "Multiple Quizzes & Competitions", year: "" },
];

const Certificates = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Certificates & <span className="text-gradient">Achievements</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {certificates.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="glass rounded-xl p-5 group hover:glow-border transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-sm">{c.title}</h3>
                  {c.year && (
                    <span className="text-xs text-muted-foreground">{c.year}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
