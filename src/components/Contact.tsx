import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    // Store in localStorage as fallback (real backend can be added)
    try {
      const submissions = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
      submissions.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem("contact_submissions", JSON.stringify(submissions));
      toast({ title: "Message sent! ✨", description: "Thanks for reaching out, I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setSending(false);
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Get In <span className="text-gradient">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-center mb-10"
        >
          Have a question or want to work together? Drop me a message!
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Message</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
              placeholder="Your message..."
            />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
            <Send className="w-4 h-4 mr-2" /> {sending ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center mt-8"
        >
          <a
            href="https://www.linkedin.com/in/g-trisha-448a79333"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="heroOutline" size="lg">
              <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
            </Button>
          </a>
          <a
            href="https://github.com/Trisha4256"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="heroOutline" size="lg">
              <Github className="w-5 h-5 mr-2" /> GitHub
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
