import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Flame, User } from "lucide-react";

const projects = [
  {
    icon: BarChart3,
    title: "Food Sales Trend Analysis",
    subtitle: "Power BI Dashboard",
    description: "Analyzed 1,000+ records of food sales data to uncover hidden patterns and seasonal trends. Built interactive Power BI dashboards with drill-down capabilities, leading to a 15% improvement in sales efficiency through data-driven decision making.",
    tags: ["Power BI", "Data Analysis", "Dashboard"],
    iconColor: "text-primary",
    borderColor: "hover:border-primary/40",
  },
  {
    icon: Flame,
    title: "Fire Department Analysis",
    subtitle: "Vibe Coding Project",
    description: "Developed a comprehensive analytical tool for fire department operations using vibe coding techniques. Achieved 85% compliance tracking improvement and reduced emergency response delays by 20% through real-time data monitoring and automated reporting systems.",
    tags: ["Vibe Coding", "Analytics", "Compliance"],
    iconColor: "text-accent",
    borderColor: "hover:border-accent/40",
  },
  {
    icon: User,
    title: "Customized Avatar Builder",
    subtitle: "Vibe Coding Project",
    description: "Built an interactive avatar customization platform allowing users to personalize characters in real-time. Features include dynamic skin tones, hairstyles, accessories, and outfit selections powered by modern frontend technologies and creative vibe coding approaches.",
    tags: ["Vibe Coding", "HTML", "CSS", "JavaScript"],
    iconColor: "text-secondary",
    borderColor: "hover:border-secondary/40",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="orb orb-pink w-72 h-72 bottom-0 left-0 opacity-15" />
      <div className="orb orb-cyan w-48 h-48 top-20 right-20 opacity-10" />

      <div className="container mx-auto relative z-10">
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
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, type: "spring" }}
              className={`anime-card p-6 ${p.borderColor} border border-border/30`}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <p.icon className={`w-6 h-6 ${p.iconColor}`} />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-1">{p.title}</h3>
                <p className={`text-xs ${p.iconColor} mb-3 font-medium`}>{p.subtitle}</p>
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
