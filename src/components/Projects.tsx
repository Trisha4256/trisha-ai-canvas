import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Flame, User } from "lucide-react";

const projects = [
  {
    icon: BarChart3,
    title: "Food Sales Trend Analysis",
    subtitle: "Power BI Dashboard",
    description: "Analyzed 1,000+ records to uncover sales patterns, leading to a 15% improvement in sales efficiency through actionable insights.",
    tags: ["Power BI", "Data Analysis", "Dashboard"],
  },
  {
    icon: Flame,
    title: "Fire Department Analysis",
    subtitle: "Vibe Coding Project",
    description: "Built an analytical tool achieving 85% compliance tracking improvement and 20% reduction in emergency response delays.",
    tags: ["Vibe Coding", "Analytics", "Compliance"],
  },
  {
    icon: User,
    title: "Customized Avatar Builder",
    subtitle: "Frontend Application",
    description: "Interactive avatar customization tool with real-time preview, built with modern frontend technologies.",
    tags: ["HTML", "CSS", "JavaScript", "UI/UX"],
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="glass rounded-xl p-6 group hover:glow-border transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-1">{p.title}</h3>
                <p className="text-xs text-primary mb-3">{p.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground border border-border/50"
                    >
                      {t}
                    </span>
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

export default Projects;
