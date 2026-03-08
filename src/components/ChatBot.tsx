import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

const TRISHA_CONTEXT = `You are Trisha's personal portfolio assistant. Answer questions about Trisha based on this info:

- Name: Gandlaparthi Trisha
- Title: Graduate, CSE (AI & ML), Eswar College of Engineering
- Skills: Python, Java, SQL, HTML, CSS, Power BI, Excel, VS Code, Jupyter Notebook
- Projects: Food Sales Trend Analysis (Power BI, 1000+ records, 15% efficiency boost), Fire Department Analysis (Vibe Coding, 85% compliance improvement), Basic Customized Avatar Builder (Frontend)
- Internship: Power BI Intern at Data Valley (2025) - dashboard design, 1000+ records, 95% accuracy, 20% decision efficiency improvement
- Education: B.Tech CSE AI&ML (78.83%), Intermediate MPC (92.3%), SSC (100%)
- Certificates: Generative AI Workshop 2025, AMR Hackmaina 2K25, Advance Python 2024, Typewriting Lower 30WPM, Higher 45WPM
- Activities: Member of Student Activity Council, multiple quizzes and competitions
- Contact: gtrisha4256@gmail.com, +91-9391869281
- LinkedIn: linkedin.com/in/g-trisha-448a79333, GitHub: github.com/Trisha4256

Be friendly, concise, and professional. If asked something not about Trisha, politely redirect.`;

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! ✨ I'm Trisha's portfolio assistant. Ask me anything about her skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          systemPrompt: TRISHA_CONTEXT,
        },
      });

      if (response.error) throw new Error(response.error.message);
      const data = response.data;
      const reply = data?.choices?.[0]?.message?.content || data?.reply || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error("Chat error:", e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later!" },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow hover:scale-110 transition-transform"
        style={{ background: "linear-gradient(135deg, hsl(142 70% 45%), hsl(100 60% 50%))" }}
      >
        {open ? <X className="w-6 h-6 text-foreground" /> : <MessageCircle className="w-6 h-6 text-foreground" />}
      </button>

      <a
        href="#contact"
        className="fixed bottom-6 left-6 z-50 px-5 py-3 rounded-full glass-strong text-primary font-heading font-semibold text-sm hover:glow-border transition-all hidden md:flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" /> Hire Me
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm glass-strong rounded-2xl overflow-hidden flex flex-col border border-primary/20"
            style={{ height: "min(500px, 70vh)" }}
          >
            <div className="p-4 border-b border-border/30" style={{ background: "linear-gradient(135deg, hsl(142 70% 45% / 0.1), hsl(100 60% 50% / 0.1))" }}>
              <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Trisha's Assistant
              </h3>
              <p className="text-xs text-muted-foreground">Ask about skills, projects & more</p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md text-foreground"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                    style={m.role === "user" ? { background: "linear-gradient(135deg, hsl(142 70% 45%), hsl(100 60% 50%))" } : {}}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border/30">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about Trisha..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground disabled:opacity-50 hover:scale-105 transition-transform"
                  style={{ background: "linear-gradient(135deg, hsl(142 70% 45%), hsl(100 60% 50%))" }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
