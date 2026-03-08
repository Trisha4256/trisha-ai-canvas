import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Award, GraduationCap, Star } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "3", label: "Projects", glow: "glow-pink" },
  { icon: GraduationCap, value: "1", label: "Internship", glow: "glow-cyan" },
  { icon: Award, value: "5+", label: "Certificates", glow: "glow-purple" },
  { icon: Star, value: "100%", label: "SSC Score", glow: "glow-pink" },
];

const iconColors = ["text-primary", "text-secondary", "text-accent", "text-neon-yellow"];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      {/* Background orb */}
      <div className="orb orb-pink w-48 h-48 top-10 right-10 opacity-20" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            A motivated and detail-oriented CSE (AI & ML) student eager to apply technical skills in Python, Java, Power BI, and web development to deliver impactful data-driven solutions. Committed to continuous learning and contributing to innovative projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" }}
              className={`anime-card p-6 text-center group cursor-default`}
            >
              <div className="relative z-10">
                <s.icon className={`w-8 h-8 mx-auto mb-3 ${iconColors[i]} group-hover:scale-125 transition-transform duration-300`} />
                <p className="font-heading text-2xl md:text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
