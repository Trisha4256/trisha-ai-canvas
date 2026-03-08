import { ArrowUp, Linkedin, Github } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-8 px-4 relative">
    <div className="absolute inset-0 bg-anime-gradient opacity-30" />
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
      <p className="text-sm text-muted-foreground">
        Built with ❤️ by <span className="text-gradient font-medium">Trisha</span>
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => window.open("https://www.linkedin.com/in/g-trisha-448a79333", "_blank", "noopener,noreferrer")}
          className="text-muted-foreground hover:text-secondary transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button
          onClick={() => window.open("https://github.com/Trisha4256", "_blank", "noopener,noreferrer")}
          className="text-muted-foreground hover:text-accent transition-colors"
        >
          <Github className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-border transition-all"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  </footer>
);

export default Footer;
