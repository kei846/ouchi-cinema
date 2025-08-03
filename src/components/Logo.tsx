
import { motion } from "framer-motion";

const Logo = ({ onComplete }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        onAnimationComplete={onComplete}
      >
        <h1 className="text-6xl text-white font-press-start">
          OUCHI-CINEMA
        </h1>
      </motion.div>
    </div>
  );
};

export default Logo;
