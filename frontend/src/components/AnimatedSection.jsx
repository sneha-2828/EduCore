import { motion } from "framer-motion";

export default function AnimatedSection({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

