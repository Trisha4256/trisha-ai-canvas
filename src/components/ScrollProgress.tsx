import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(142 70% 45%), hsl(100 60% 50%), hsl(160 60% 40%))",
      }}
    />
  );
};

export default ScrollProgress;
