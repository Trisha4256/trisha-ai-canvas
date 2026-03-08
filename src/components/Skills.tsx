import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "Java", "SQL", "HTML", "CSS"],
    accent: "border-primary/30 hover:border-primary/60",
    tagBg: "hover:bg-primary/10 hover:border-primary/40",
  },
  {
    title: "Tools",
    skills: ["Power BI", "Excel"],
    accent: "border-secondary/30 hover:border-secondary/60",
    tagBg: "hover:bg-secondary/10 hover:border-secondary/40",
  },
  {
    title: "Platforms",
    skills: ["VS Code", "Jupyter Notebook"],
    accent: "border-accent/30 hover:border-accent/60",
    tagBg: "hover:bg-accent/10 hover:border-accent/40",
  },
  {
    title: "Typing",
    skills: ["30 WPM (Lower)", "45 WPM (Higher)"],
    accent: "border-neon-yellow/30 hover:border-neon-yellow/60",
    tagBg: "hover:bg-neon-yellow/10 hover:border-neon-yellow/40",
  },
];

const titleColors = ["text-primary", "text-secondary", "text-accent", "text-neon-yellow"];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="orb orb-purple w-64 h-64 top-20 right-20 opacity-15" />
      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Technical <span className="text-gradient">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + gi * 0.12, type: "spring" }}
              className={`anime-card p-6 border ${group.accent} transition-all duration-500`}
            >
              <div className="relative z-10">
                <h3 className={`font-heading font-bold mb-4 ${titleColors[gi]}`}>{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + gi * 0.1 + si * 0.05 }}
                      className={`px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium border border-border/50 ${group.tagBg} transition-all duration-300 cursor-default`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
