import { motion } from "motion/react";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 border-2 border-main-gold border-t-transparent rounded-full animate-spin"></div>
        <p className="text-medium-gray">Loading...</p>
      </div>
    </motion.div>
  );
};

export default Loader;
