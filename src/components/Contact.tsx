import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Linkedin, Github } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name,
        email: form.email,
        message: form.message,
      });
      if (error) throw error;
      toast({ title: "Message sent! ✨", description: "Thanks for reaching out, I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setSending(false);
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="orb orb-pink w-64 h-64 -bottom-20 -left-20 opacity-15" />
      <div className="orb orb-cyan w-48 h-48 top-20 right-10 opacity-10" />

      <div className="container mx-auto max-w-2xl relative z-10">
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
          className="anime-card p-8 space-y-5 border border-primary/15"
        >
          <div className="relative z-10 space-y-5">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Message</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                placeholder="Your message..." />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
              <Send className="w-4 h-4 mr-2" /> {sending ? "Sending..." : "Send Message"}
            </Button>
          </div>
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
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-8 border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
          <a
            href="https://github.com/Trisha4256"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-8 border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Github className="w-5 h-5" /> GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
