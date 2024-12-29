import { motion } from "framer-motion";
 // Import the CSS file

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      {/* Simple Loading Spinner */}
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
