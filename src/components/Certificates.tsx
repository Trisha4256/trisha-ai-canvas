import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Trophy, Keyboard, Users } from "lucide-react";

const certificates = [
  {
    icon: Award,
    title: "Generative AI Workshop",
    year: "2025",
    color: "text-primary",
    description: "Completed an intensive hands-on workshop on Generative AI covering LLMs, prompt engineering, and real-world AI application development.",
  },
  {
    icon: Trophy,
    title: "AMR Hackmaina 2K25",
    year: "2025",
    color: "text-accent",
    description: "Participated in a competitive hackathon event, collaborating with peers to build innovative tech solutions under time constraints.",
  },
  {
    icon: Award,
    title: "Advance Python Oriented Program",
    year: "2024",
    color: "text-secondary",
    description: "Mastered advanced Python concepts including OOP, data structures, decorators, and building scalable applications.",
  },
  {
    icon: Keyboard,
    title: "Typewriting English Lower (30 WPM)",
    year: "2021",
    color: "text-accent",
    description: "Certified in English typewriting at lower grade with a speed of 30 words per minute, demonstrating typing proficiency.",
  },
  {
    icon: Keyboard,
    title: "Typewriting English Higher (45 WPM)",
    year: "2022",
    color: "text-primary",
    description: "Achieved higher grade certification with 45 WPM, showcasing improved speed and accuracy in professional typing.",
  },
  {
    icon: Users,
    title: "Member of Student Activity Council",
    year: "",
    color: "text-primary",
    description: "Active member organizing college events, workshops, and cultural activities, developing leadership and teamwork skills.",
  },
  {
    icon: Trophy,
    title: "Multiple Quizzes & Competitions",
    year: "",
    color: "text-accent",
    description: "Participated and won multiple inter-college quizzes and technical competitions, showcasing knowledge across various domains.",
  },
];

const Certificates = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="section-padding relative" ref={ref}>
      <div className="orb orb-purple w-52 h-52 top-0 right-0 opacity-15" />
      <div className="container mx-auto relative z-10">
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
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, type: "spring" }}
              className="anime-card p-5 group cursor-default"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <c.icon className={`w-5 h-5 ${c.color}`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-sm">{c.title}</h3>
                    {c.year && (
                      <span className="text-xs text-muted-foreground">{c.year}</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
