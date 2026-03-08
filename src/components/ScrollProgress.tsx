import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(330 85% 60%), hsl(270 80% 65%), hsl(190 90% 50%))",
      }}
    />
  );
};

export default ScrollProgress;
