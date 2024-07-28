// src/pages/Gallery/LoadingIndicator.jsx
import React from "react";
import { motion } from "framer-motion";

const LoadingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-12 text-center"
    >
      <motion.div
        className="inline-block h-12 w-12 border-t-4 border-b-4 border-purple-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <p className="mt-4 text-lg text-gray-600">Loading amazing images...</p>
    </motion.div>
  );
};

export default LoadingIndicator;
