import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Internships from "@/components/Internships";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ScrollProgress from "@/components/ScrollProgress";
import ParticleBackground from "@/components/ParticleBackground";

const SectionDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`relative h-24 overflow-hidden ${flip ? "rotate-180" : ""}`}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        fill="url(#dividerGrad)"
        opacity=".15"
      />
      <defs>
        <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(142 70% 45%)" />
          <stop offset="50%" stopColor="hsl(100 60% 50%)" />
          <stop offset="100%" stopColor="hsl(160 60% 40%)" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: `linear-gradient(hsl(142 70% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(142 70% 45%) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
    }}
  />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Full-page star background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      <GridPattern />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider flip />
      <Education />
      <SectionDivider />
      <Skills />
      <SectionDivider flip />
      <Projects />
      <SectionDivider />
      <Internships />
      <SectionDivider flip />
      <Certificates />
      <SectionDivider />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
