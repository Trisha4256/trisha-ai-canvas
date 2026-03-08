import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, TrendingUp, Target, CheckCircle2 } from "lucide-react";

const highlights = [
  { icon: Target, text: "Dashboard design & data visualization" },
  { icon: TrendingUp, text: "Analyzed 1,000+ records" },
  { icon: CheckCircle2, text: "95% data accuracy achieved" },
  { icon: TrendingUp, text: "20% improvement in decision efficiency" },
];

const Internships = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="internships" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Work <span className="text-gradient">Experience</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 glow-border"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-foreground">Power BI Intern</h3>
              <p className="text-primary text-sm font-medium">Data Valley • 2025</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <h.icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-foreground">{h.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Internships;
