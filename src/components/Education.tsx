import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const timeline = [
  {
    degree: "B.Tech – CSE (AI & ML)",
    institution: "Eswar College of Engineering",
    period: "2022 – Present",
    score: "78.83%",
    color: "from-primary to-accent",
    dotColor: "bg-primary",
    glowClass: "glow-pink",
  },
  {
    degree: "Intermediate – MPC",
    institution: "SKRBR College",
    period: "2020 – 2022",
    score: "92.3%",
    color: "from-secondary to-accent",
    dotColor: "bg-secondary",
    glowClass: "glow-cyan",
  },
  {
    degree: "SSC",
    institution: "Swami School",
    period: "2020",
    score: "100%",
    color: "from-neon-yellow to-primary",
    dotColor: "bg-neon-yellow",
    glowClass: "glow-pink",
  },
];

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="orb orb-cyan w-56 h-56 bottom-10 left-10 opacity-15" />
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
        >
          My <span className="text-gradient">Education</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, hsl(330 85% 60%), hsl(270 80% 65%), hsl(190 90% 50%), transparent)" }}
          />

          {timeline.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, type: "spring" }}
              className={`relative flex items-start mb-10 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${item.dotColor} z-10 mt-6 ${item.glowClass}`} />

              <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="anime-card p-5">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 justify-start">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <span className="text-xs font-medium text-secondary">{item.period}</span>
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-lg">{item.degree}</h3>
                    <p className="text-sm text-muted-foreground">{item.institution}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${item.color} text-background`}>
                      {item.score}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
